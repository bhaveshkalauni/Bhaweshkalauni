/**
 * Pull Eurostat Comext DS-045409 (FR reporter, IN partner, imports, HS2 52/61/62/63/64)
 * and bake a static extract. Missing months stay null — never zero-filled.
 *
 * Usage: node scripts/fetch-comext.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DATASET = "DS-045409";
const BASE = "https://ec.europa.eu/eurostat/api/comext/dissemination/statistics/1.0/data";
const PRODUCTS = ["52", "61", "62", "63", "64"];
const HISTORY_START = "2011-01";
const LABELS = {
  52: "Cotton yarn & woven cotton",
  61: "Knitted apparel",
  62: "Woven apparel",
  63: "Made-ups / home textiles",
  64: "Footwear",
};

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function codesByPosition(dim) {
  const out = [];
  for (const [code, pos] of Object.entries(dim?.category?.index ?? {})) out[pos] = code;
  return out;
}

function decodeIndex(flatIndex, sizes) {
  const coords = new Array(sizes.length);
  let remaining = flatIndex;
  for (let d = sizes.length - 1; d >= 0; d -= 1) {
    const size = sizes[d] ?? 1;
    coords[d] = size === 0 ? 0 : remaining % size;
    remaining = size === 0 ? 0 : Math.floor(remaining / size);
  }
  return coords;
}

function buildUrl() {
  const url = new URL(`${BASE}/${DATASET.toLowerCase()}`);
  url.searchParams.set("format", "JSON");
  url.searchParams.set("lang", "EN");
  url.searchParams.set("reporter", "FR");
  url.searchParams.set("partner", "IN");
  url.searchParams.set("freq", "M");
  url.searchParams.set("sinceTimePeriod", HISTORY_START);
  url.searchParams.append("flow", "1");
  url.searchParams.append("indicators", "VALUE_IN_EUROS");
  url.searchParams.append("indicators", "QUANTITY_IN_100KG");
  for (const p of PRODUCTS) url.searchParams.append("product", p);
  return url.toString();
}

function parse(json) {
  const ids = json.id ?? [];
  const sizes = json.size ?? [];
  const dims = json.dimension ?? {};
  const values = json.value ?? {};
  const dimCodes = {};
  for (const id of ids) {
    if (dims[id]) dimCodes[id] = codesByPosition(dims[id]);
  }
  const productIdx = ids.indexOf("product");
  const flowIdx = ids.indexOf("flow");
  const indicatorIdx = ids.indexOf("indicators");
  const timeIdx = ids.indexOf("time");
  const timesAll = dimCodes.time ?? [];
  const products = dimCodes.product ?? [];
  const flows = dimCodes.flow ?? [];
  const indicators = dimCodes.indicators ?? [];
  const lookup = new Map();
  let latestIdx = -1;

  for (const [flat, amount] of Object.entries(values)) {
    if (!Number.isFinite(amount)) continue;
    const coords = decodeIndex(Number(flat), sizes);
    const product = products[coords[productIdx] ?? -1];
    const flow = flows[coords[flowIdx] ?? -1];
    const indicator = indicators[coords[indicatorIdx] ?? -1];
    const t = coords[timeIdx] ?? -1;
    const time = timesAll[t];
    if (!product || flow !== "1" || !indicator || !time) continue;
    lookup.set(`${product}|${time}|${indicator}`, amount);
    if (indicator === "VALUE_IN_EUROS" && t > latestIdx) latestIdx = t;
  }

  if (latestIdx < 0) throw new Error("Comext returned no France–India import values.");

  const times = timesAll.slice(0, latestIdx + 1);
  const series = {};
  const gaps = [];

  for (const product of PRODUCTS) {
    const valueEur = [];
    const qty100kg = [];
    for (const time of times) {
      const eur = lookup.get(`${product}|${time}|VALUE_IN_EUROS`);
      const qty = lookup.get(`${product}|${time}|QUANTITY_IN_100KG`);
      valueEur.push(eur == null ? null : eur);
      qty100kg.push(qty == null ? null : qty);
      if (eur == null) gaps.push({ product, period: time, field: "VALUE_IN_EUROS" });
      if (qty == null) gaps.push({ product, period: time, field: "QUANTITY_IN_100KG" });
    }
    series[product] = { label: LABELS[product], valueEur, qty100kg };
  }

  return {
    datasetId: DATASET,
    source: "Eurostat Comext",
    reporter: "FR",
    partner: "IN",
    flow: "1",
    freq: "M",
    products: PRODUCTS,
    weightUnit: "QUANTITY_IN_100KG (×100 = kg; ×0.1 = tonnes)",
    missingDataRule:
      "Nulls are suppressed or unpublished months. Do not zero-fill. Forecasts that need A(t-12) are omitted when that month is missing.",
    updated: json.updated ?? null,
    fetchedAt: new Date().toISOString(),
    times,
    latestPeriod: times[times.length - 1],
    series,
    gaps,
  };
}

function toCsv(extract) {
  const lines = ["Month,HS Code,Category,Value EUR,Net Weight kg"];
  for (const product of extract.products) {
    const s = extract.series[product];
    for (let i = 0; i < extract.times.length; i += 1) {
      const eur = s.valueEur[i];
      const qty = s.qty100kg[i];
      const kg = qty == null ? "" : qty * 100;
      lines.push(
        [
          extract.times[i],
          product,
          `"${s.label}"`,
          eur == null ? "" : eur,
          kg,
        ].join(","),
      );
    }
  }
  return `${lines.join("\n")}\n`;
}

const url = buildUrl();
console.log("GET", url);
const res = await fetch(url, { headers: { Accept: "application/json" } });
if (!res.ok) throw new Error(`Comext HTTP ${res.status}`);
const json = await res.json();
const extract = parse(json);

const jsonPath = join(root, "src/projects/france-india-trade-forecast/data/comext-fr-in-softgoods.json");
const csvPath = join(root, "public/data/comext-fr-in-softgoods.csv");
await mkdir(dirname(jsonPath), { recursive: true });
await mkdir(dirname(csvPath), { recursive: true });
await writeFile(jsonPath, `${JSON.stringify(extract, null, 2)}\n`);
await writeFile(csvPath, toCsv(extract));

const gapByProduct = Object.fromEntries(
  PRODUCTS.map((p) => [p, extract.gaps.filter((g) => g.product === p && g.field === "VALUE_IN_EUROS").length]),
);
console.log("latestPeriod", extract.latestPeriod);
console.log("months", extract.times.length);
console.log("value gaps by HS2", gapByProduct);
console.log("wrote", jsonPath);
console.log("wrote", csvPath);
