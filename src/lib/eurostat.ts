/**
 * Eurostat Comext client (DS-045409). No API key.
 * Fetches France–India monthly extra-EU trade and caches the extract for 24h.
 */

import { seriesKey, type SeriesPair, type TradeExtract } from "./trade-extract";

export const COMEXT_DATASET = "DS-045409";
export const COMEXT_BASE =
  "https://ec.europa.eu/eurostat/api/comext/dissemination/statistics/1.0/data";

/** HS2 chapters + representative HS4 codes used by the dashboard. */
export const COMEXT_PRODUCTS = [
  "42",
  "52",
  "61",
  "62",
  "63",
  "64",
  "4202",
  "5205",
  "6109",
  "6204",
  "6302",
  "6403",
] as const;

const HISTORY_START = "2011-01";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 60_000;

export type { TradeExtract } from "./trade-extract";

interface JsonStatDimension {
  category: {
    index: Record<string, number>;
    label?: Record<string, string>;
  };
}

interface JsonStat {
  updated?: string;
  value?: Record<string, number>;
  id?: string[];
  size?: number[];
  dimension?: Record<string, JsonStatDimension>;
}

type CacheEntry = { extract: TradeExtract; storedAt: number };

let memoryCache: CacheEntry | null = null;

function codesByPosition(dim: JsonStatDimension | undefined): string[] {
  if (!dim) return [];
  const out: string[] = [];
  for (const [code, pos] of Object.entries(dim.category.index)) {
    out[pos] = code;
  }
  return out;
}

function decodeIndex(flatIndex: number, sizes: number[]): number[] {
  const coords = new Array<number>(sizes.length);
  let remaining = flatIndex;
  for (let d = sizes.length - 1; d >= 0; d -= 1) {
    const size = sizes[d] ?? 1;
    coords[d] = size === 0 ? 0 : remaining % size;
    remaining = size === 0 ? 0 : Math.floor(remaining / size);
  }
  return coords;
}

export function parseComextJsonStat(raw: unknown): TradeExtract {
  const json = raw as JsonStat;
  const ids = json.id ?? [];
  const sizes = json.size ?? [];
  const dims = json.dimension ?? {};
  const values = json.value ?? {};

  const dimCodes: Record<string, string[]> = {};
  for (const id of ids) {
    const dim = dims[id];
    if (dim) dimCodes[id] = codesByPosition(dim);
  }

  const productIdx = ids.indexOf("product");
  const flowIdx = ids.indexOf("flow");
  const indicatorIdx = ids.indexOf("indicators");
  const timeIdx = ids.indexOf("time");

  const timesAll = dimCodes["time"] ?? [];
  const products = dimCodes["product"] ?? [];
  const flows = dimCodes["flow"] ?? [];
  const indicators = dimCodes["indicators"] ?? [];

  const lookup = new Map<string, number>();
  let latestIdx = -1;

  for (const [flat, amount] of Object.entries(values)) {
    if (!Number.isFinite(amount)) continue;
    const coords = decodeIndex(Number(flat), sizes);
    const product = products[coords[productIdx] ?? -1];
    const flow = flows[coords[flowIdx] ?? -1];
    const indicator = indicators[coords[indicatorIdx] ?? -1];
    const t = coords[timeIdx] ?? -1;
    const time = timesAll[t];
    if (!product || !flow || !indicator || !time) continue;
    lookup.set(`${flow}|${product}|${time}|${indicator}`, amount);
    if (indicator === "VALUE_IN_EUROS" && t > latestIdx) latestIdx = t;
  }

  if (latestIdx < 0 || timesAll.length === 0) {
    throw new Error("Eurostat Comext returned no France–India observations.");
  }

  const times = timesAll.slice(0, latestIdx + 1);
  const latestPeriod = times[times.length - 1] ?? timesAll[latestIdx] ?? HISTORY_START;
  const series: Record<string, SeriesPair> = {};

  for (const flow of flows) {
    if (flow !== "1" && flow !== "2") continue;
    for (const product of products) {
      const value: number[] = [];
      const volume: number[] = [];
      for (const time of times) {
        const eur = lookup.get(`${flow}|${product}|${time}|VALUE_IN_EUROS`);
        const qty100 = lookup.get(`${flow}|${product}|${time}|QUANTITY_IN_100KG`);
        value.push(eur != null ? eur / 1_000_000 : 0);
        volume.push(qty100 != null ? qty100 * 0.1 : 0);
      }
      series[seriesKey(flow, product)] = { value, volume };
    }
  }

  return {
    datasetId: COMEXT_DATASET,
    updated: json.updated ?? new Date().toISOString(),
    fetchedAt: new Date().toISOString(),
    stale: false,
    times,
    latestPeriod,
    series,
  };
}

function buildComextUrl(): string {
  const url = new URL(`${COMEXT_BASE}/${COMEXT_DATASET.toLowerCase()}`);
  url.searchParams.set("format", "JSON");
  url.searchParams.set("lang", "EN");
  url.searchParams.set("reporter", "FR");
  url.searchParams.set("partner", "IN");
  url.searchParams.set("freq", "M");
  url.searchParams.set("sinceTimePeriod", HISTORY_START);
  for (const product of COMEXT_PRODUCTS) url.searchParams.append("product", product);
  url.searchParams.append("flow", "1");
  url.searchParams.append("flow", "2");
  url.searchParams.append("indicators", "VALUE_IN_EUROS");
  url.searchParams.append("indicators", "QUANTITY_IN_100KG");
  return url.toString();
}

async function fetchComext(): Promise<TradeExtract> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(buildComextUrl(), {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Eurostat Comext HTTP ${response.status}`);
    }
    const json: unknown = await response.json();
    return parseComextJsonStat(json);
  } finally {
    clearTimeout(timer);
  }
}

export async function loadTradeExtract(): Promise<TradeExtract> {
  const now = Date.now();
  if (memoryCache && now - memoryCache.storedAt < CACHE_TTL_MS) {
    return memoryCache.extract;
  }

  try {
    const extract = await fetchComext();
    memoryCache = { extract, storedAt: now };
    return extract;
  } catch (error) {
    if (memoryCache) {
      return { ...memoryCache.extract, stale: true };
    }
    const message = error instanceof Error ? error.message : "Eurostat Comext request failed";
    throw new Error(message);
  }
}
