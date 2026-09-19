import extractJson from "../data/comext-fr-in-softgoods.json";
import {
  CATEGORIES,
  FORECAST_MONTHS,
  addMonths,
  formatForecastWindow,
  formatPeriod,
  shortMonth,
  type Alert,
  type CategoryRow,
  type Dataset,
  type DatasetMeta,
  type MonthPoint,
} from "./trade-data";

export const SOFT_GOODS_HS2 = ["52", "61", "62", "63", "64"] as const;
export type Hs2 = (typeof SOFT_GOODS_HS2)[number];

export interface ComextExtract {
  datasetId: string;
  source: string;
  reporter: string;
  partner: string;
  flow: string;
  products: string[];
  weightUnit: string;
  missingDataRule: string;
  updated: string | null;
  fetchedAt: string;
  times: string[];
  latestPeriod: string;
  series: Record<string, { label: string; valueEur: (number | null)[]; qty100kg: (number | null)[] }>;
  gaps: { product: string; period: string; field: string }[];
}

export const EXTRACT = extractJson as ComextExtract;

const Z_NORMAL = 1.28;
const SKEW_THRESHOLD = 0.5;
const HIGH_Z = 2;
const MEDIUM_Z = 1.5;
const RED_SEA_START = "2023-11";

export type MethodId = "trend" | "seasonal" | "naive";

export interface AccuracyCell {
  method: MethodId;
  horizon: 1 | 2 | 3;
  n: number;
  mape: number;
  mdape: number;
}

export interface HorizonBand {
  horizon: 1 | 2 | 3;
  n: number;
  sigma: number;
  skew: number;
  usePercentiles: boolean;
  p10: number;
  p90: number;
}

export interface CategoryModel {
  id: string;
  hs2: string;
  label: string;
  latestValueM: number;
  latestVolumeT: number;
  unitValue: number;
  cvAnnualized: number;
  zScore: number;
  severity: Alert["severity"];
  variancePct: number;
  growthG: number | null;
  forecasts: {
    period: string;
    valueM: number | null;
    volumeT: number | null;
    lowerM: number | null;
    upperM: number | null;
    horizon: 1 | 2 | 3;
  }[];
  bands: HorizonBand[];
  accuracy: AccuracyCell[];
  beatsSeasonalAtH1: boolean | null;
}

export interface AnalysisReport {
  meta: DatasetMeta;
  dataset: Dataset;
  alerts: Alert[];
  categories: CategoryModel[];
  basketAccuracy: AccuracyCell[];
  headline: {
    mapeTrendH1: number | null;
    mapeSeasonalH1: number | null;
    mapeNaiveH1: number | null;
    flaggedLabel: string | null;
    flaggedSeverity: Alert["severity"] | null;
    flaggedAction: string | null;
    importValueM: number;
    forecastM: number;
  };
  redSea: { beforeMape: number | null; afterMape: number | null; nBefore: number; nAfter: number };
  gapCounts: Record<string, number>;
  firingRate: { high: number; medium: number; total: number };
}

function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0);
}

function mean(arr: number[]): number {
  return arr.length ? sum(arr) / arr.length : NaN;
}

function stdev(arr: number[]): number {
  if (arr.length < 2) return NaN;
  const m = mean(arr);
  return Math.sqrt(sum(arr.map((x) => (x - m) ** 2)) / (arr.length - 1));
}

function median(arr: number[]): number {
  if (!arr.length) return NaN;
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid]! : (s[mid - 1]! + s[mid]!) / 2;
}

function percentile(arr: number[], p: number): number {
  if (!arr.length) return NaN;
  const s = [...arr].sort((a, b) => a - b);
  const idx = (s.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return s[lo]!;
  return s[lo]! + (s[hi]! - s[lo]!) * (idx - lo);
}

function skewness(arr: number[]): number {
  if (arr.length < 3) return 0;
  const m = mean(arr);
  const s = stdev(arr);
  if (!s) return 0;
  return mean(arr.map((x) => (x - m) ** 3)) / s ** 3;
}

function eurToM(v: number | null | undefined): number | null {
  if (v == null || !Number.isFinite(v)) return null;
  return v / 1_000_000;
}

function qtyToTonnes(q: number | null | undefined): number | null {
  if (q == null || !Number.isFinite(q)) return null;
  return q * 0.1;
}

function unitValue(valueM: number | null, volumeT: number | null): number {
  if (valueM == null || volumeT == null || volumeT <= 0) return 0;
  return (valueM * 1_000_000) / (volumeT * 1000);
}

export function trailingGrowth(values: (number | null)[], origin: number): number | null {
  const rates: number[] = [];
  for (let i = origin; i >= origin - 11 && i >= 12; i -= 1) {
    const now = values[i];
    const ago = values[i - 12];
    if (now == null || ago == null || ago === 0) continue;
    rates.push(now / ago - 1);
  }
  if (!rates.length) return null;
  return mean(rates);
}

export function forecastAt(
  values: (number | null)[],
  origin: number,
  horizon: number,
  method: MethodId,
): number | null {
  const base = values[origin];
  const seasonal = values[origin + horizon - 12];
  if (method === "naive") return base ?? null;
  if (seasonal == null) return null;
  if (method === "seasonal") return seasonal;
  const g = trailingGrowth(values, origin);
  if (g == null) return seasonal;
  return seasonal * (1 + g);
}

export interface WalkForwardRow {
  originIndex: number;
  originPeriod: string;
  targetPeriod: string;
  horizon: 1 | 2 | 3;
  method: MethodId;
  actual: number;
  forecast: number;
  ape: number;
  residualPct: number;
}

interface Residual {
  period: string;
  horizon: 1 | 2 | 3;
  method: MethodId;
  ape: number;
  bandE: number;
}

export function walkForwardRows(times: string[], values: (number | null)[]): WalkForwardRow[] {
  const out: WalkForwardRow[] = [];
  const last = values.length - 1;
  for (let origin = 23; origin < last; origin += 1) {
    for (const horizon of [1, 2, 3] as const) {
      const t = origin + horizon;
      if (t > last) continue;
      const actual = values[t];
      if (actual == null || actual === 0) continue;
      for (const method of ["trend", "seasonal", "naive"] as MethodId[]) {
        const f = forecastAt(values, origin, horizon, method);
        if (f == null) continue;
        out.push({
          originIndex: origin,
          originPeriod: times[origin]!,
          targetPeriod: times[t]!,
          horizon,
          method,
          actual,
          forecast: f,
          ape: Math.abs(f - actual) / Math.abs(actual),
          residualPct: (actual - f) / f,
        });
      }
    }
  }
  return out;
}

function backtestSeries(times: string[], values: (number | null)[]): Residual[] {
  return walkForwardRows(times, values).map((row) => ({
    period: row.targetPeriod,
    horizon: row.horizon,
    method: row.method,
    ape: row.ape,
    bandE: row.residualPct,
  }));
}

function accuracyFrom(residuals: Residual[], method: MethodId, horizon: 1 | 2 | 3): AccuracyCell {
  const apes = residuals.filter((r) => r.method === method && r.horizon === horizon).map((r) => r.ape);
  return {
    method,
    horizon,
    n: apes.length,
    mape: apes.length ? mean(apes) : NaN,
    mdape: apes.length ? median(apes) : NaN,
  };
}

function allAccuracy(residuals: Residual[]): AccuracyCell[] {
  const cells: AccuracyCell[] = [];
  for (const method of ["trend", "seasonal", "naive"] as MethodId[]) {
    for (const horizon of [1, 2, 3] as const) cells.push(accuracyFrom(residuals, method, horizon));
  }
  return cells;
}

export function bandsFrom(residuals: Residual[]): HorizonBand[] {
  return ([1, 2, 3] as const).map((horizon) => {
    const e = residuals.filter((r) => r.method === "trend" && r.horizon === horizon).map((r) => r.bandE);
    const skew = skewness(e);
    return {
      horizon,
      n: e.length,
      sigma: stdev(e),
      skew,
      usePercentiles: Math.abs(skew) > SKEW_THRESHOLD,
      p10: percentile(e, 0.1),
      p90: percentile(e, 0.9),
    };
  });
}

export function applyBand(f: number, band: HorizonBand): { lower: number; upper: number } {
  if (band.usePercentiles && Number.isFinite(band.p10) && Number.isFinite(band.p90)) {
    return {
      lower: f * (1 + Math.min(band.p10, band.p90)),
      upper: f * (1 + Math.max(band.p10, band.p90)),
    };
  }
  const s = Number.isFinite(band.sigma) ? band.sigma : 0.15;
  return { lower: f * (1 - Z_NORMAL * s), upper: f * (1 + Z_NORMAL * s) };
}

function annualizedCv(values: (number | null)[]): number {
  const xs = values.filter((v): v is number => v != null && Number.isFinite(v));
  if (xs.length < 3) return 0;
  const m = mean(xs);
  if (!m) return 0;
  return (stdev(xs) / Math.abs(m)) * Math.sqrt(12);
}

function categoryMeta(hs2: string) {
  return CATEGORIES.find((c) => c.hs2 === hs2);
}

function deviations(values: (number | null)[]): { pct: number }[] {
  const out: { pct: number }[] = [];
  for (let i = 23; i < values.length; i += 1) {
    const actual = values[i];
    const f = forecastAt(values, i - 1, 1, "trend");
    if (actual == null || f == null || f === 0) continue;
    out.push({ pct: (actual - f) / f });
  }
  return out;
}

function zAndSeverity(values: (number | null)[]) {
  const devs = deviations(values);
  const latest = devs[devs.length - 1];
  const hist = devs.slice(0, -1).map((d) => d.pct);
  const s = stdev(hist);
  const z = latest && s ? latest.pct / s : 0;
  const az = Math.abs(z);
  const severity: Alert["severity"] = az > HIGH_Z ? "High" : az > MEDIUM_Z ? "Medium" : "Low";
  return { z, severity, variancePct: (latest?.pct ?? 0) * 100 };
}

function firingRate(): AnalysisReport["firingRate"] {
  let high = 0;
  let medium = 0;
  let total = 0;
  for (const hs2 of SOFT_GOODS_HS2) {
    const values = EXTRACT.series[hs2]?.valueEur.map(eurToM) ?? [];
    const devs = deviations(values);
    total += devs.length;
    const histSigma = stdev(devs.map((d) => d.pct));
    if (!histSigma) continue;
    for (const d of devs) {
      const az = Math.abs(d.pct / histSigma);
      if (az > HIGH_Z) high += 1;
      else if (az > MEDIUM_Z) medium += 1;
    }
  }
  return { high, medium, total };
}

function toPoint(i: number, period: string, value: number, volume: number, forecast: boolean): MonthPoint {
  return {
    i,
    month: formatPeriod(period),
    shortMonth: shortMonth(period),
    year: Number(period.slice(0, 4)),
    value,
    volume,
    unitValue: unitValue(value, volume),
    forecast,
  };
}

function basketSeries(times: string[]) {
  const value: (number | null)[] = [];
  const volume: (number | null)[] = [];
  for (let i = 0; i < times.length; i += 1) {
    let v = 0;
    let q = 0;
    let any = false;
    for (const hs2 of SOFT_GOODS_HS2) {
      const ev = eurToM(EXTRACT.series[hs2]?.valueEur[i] ?? null);
      const tv = qtyToTonnes(EXTRACT.series[hs2]?.qty100kg[i] ?? null);
      if (ev != null) {
        v += ev;
        any = true;
      }
      if (tv != null) q += tv;
    }
    value.push(any ? v : null);
    volume.push(any ? q : null);
  }
  return { value, volume };
}

function explain(model: CategoryModel) {
  const label = model.label;
  if (model.severity === "High" && model.variancePct < 0) {
    return {
      title: `${label} ${Math.abs(model.variancePct).toFixed(0)}% below seasonal+trend`,
      detail: `Latest month is ${model.zScore.toFixed(1)}σ below this chapter’s own residual history — not a flat 20% cutoff.`,
      action: "Confirm supplier shipments and hold a short safety buffer",
      explanation: `Inbound value is ${Math.abs(model.variancePct).toFixed(1)}% below the seasonal-naive+trend expectation.`,
      recommendation:
        "Confirm shipment status with primary suppliers and hold a short safety buffer until arrivals normalise.",
    };
  }
  if (model.severity === "High" && model.variancePct > 0) {
    return {
      title: `${label} running ${model.variancePct.toFixed(0)}% ahead of expectation`,
      detail: `Latest month is ${model.zScore.toFixed(1)}σ above this chapter’s residual history, which can pull warehouse intake forward.`,
      action: "Re-phase inbound receiving slots",
      explanation: `Flows are ${model.variancePct.toFixed(1)}% ahead of the seasonal+trend baseline for this chapter.`,
      recommendation: "Shift receiving capacity forward and pre-book dock slots for the next intake wave.",
    };
  }
  if (model.severity === "Medium") {
    return {
      title: `${label} outside its usual corridor`,
      detail: `z = ${model.zScore.toFixed(1)} versus this chapter’s own trailing deviations (Medium is 1.5–2σ).`,
      action: "Watch next two arrivals before changing safety stock",
      explanation: `The latest month sits ${model.zScore.toFixed(1)} standard deviations from this category’s own forecast residuals.`,
      recommendation: "Keep the standard cadence but review the next two vessel arrivals before changing buffers.",
    };
  }
  return {
    title: `${label} inside its own seasonal range`,
    detail: `z = ${model.zScore.toFixed(1)}; below the 1.5σ medium threshold for this chapter.`,
    action: "Keep standard replenishment cadence",
    explanation: `Variance is inside this category’s historical residual corridor (z = ${model.zScore.toFixed(1)}).`,
    recommendation: "No action beyond monitoring; keep the standard replenishment cadence.",
  };
}

function buildCategory(hs2: Hs2, times: string[]): CategoryModel {
  const raw = EXTRACT.series[hs2]!;
  const values = raw.valueEur.map(eurToM);
  const volumes = raw.qty100kg.map(qtyToTonnes);
  const origin = times.length - 1;
  const residuals = backtestSeries(times, values);
  const bands = bandsFrom(residuals);
  const accuracy = allAccuracy(residuals);
  const { z, severity, variancePct } = zAndSeverity(values);
  const meta = categoryMeta(hs2);
  const latestValueM = values[origin] ?? 0;
  const latestVolumeT = volumes[origin] ?? 0;
  const forecasts = ([1, 2, 3] as const).map((horizon) => {
    const period = addMonths(times[origin]!, horizon);
    const valueM = forecastAt(values, origin, horizon, "trend");
    const volumeT = forecastAt(volumes, origin, horizon, "trend");
    const band = bands.find((b) => b.horizon === horizon)!;
    const interval = valueM == null ? null : applyBand(valueM, band);
    return {
      period,
      valueM,
      volumeT,
      lowerM: interval?.lower ?? null,
      upperM: interval?.upper ?? null,
      horizon,
    };
  });
  const h1 = accuracy.find((c) => c.method === "trend" && c.horizon === 1);
  const s1 = accuracy.find((c) => c.method === "seasonal" && c.horizon === 1);
  return {
    id: meta?.id ?? hs2,
    hs2,
    label: meta?.label ?? raw.label,
    latestValueM,
    latestVolumeT,
    unitValue: unitValue(latestValueM, latestVolumeT),
    cvAnnualized: annualizedCv(values),
    zScore: z,
    severity,
    variancePct,
    growthG: trailingGrowth(values, origin),
    forecasts,
    bands,
    accuracy,
    beatsSeasonalAtH1:
      h1 && s1 && Number.isFinite(h1.mape) && Number.isFinite(s1.mape) ? h1.mape < s1.mape : null,
  };
}

export function analyzeSoftGoods(rangeMonths = 24): AnalysisReport {
  const times = EXTRACT.times;
  const n = times.length;
  const origin = n - 1;
  const basket = basketSeries(times);
  const basketResiduals = backtestSeries(times, basket.value);
  const basketBands = bandsFrom(basketResiduals);
  const basketAccuracy = allAccuracy(basketResiduals);
  const categories = SOFT_GOODS_HS2.map((hs2) => buildCategory(hs2, times));

  const actualAll: MonthPoint[] = times.map((period, i) =>
    toPoint(i, period, basket.value[i] ?? 0, basket.volume[i] ?? 0, false),
  );
  const forecastMonths: MonthPoint[] = ([1, 2, 3] as const).map((h) => {
    const period = addMonths(times[origin]!, h);
    const value = forecastAt(basket.value, origin, h, "trend") ?? 0;
    const volume = forecastAt(basket.volume, origin, h, "trend") ?? 0;
    return toPoint(n + h - 1, period, value, volume, true);
  });
  const actualMonths = actualAll.slice(-rangeMonths);
  const months = [...actualMonths, ...forecastMonths];
  const chartData = months.map((p, idx) => {
    const isF = p.forecast;
    const horizon = (isF ? p.i - (n - 1) : 0) as 0 | 1 | 2 | 3;
    const band = basketBands.find((b) => b.horizon === horizon);
    const interval = isF && band ? applyBand(p.value, band) : null;
    return {
      month: p.month,
      shortMonth: p.shortMonth,
      actual: isF ? null : p.value,
      forecast: isF ? p.value : months[idx + 1]?.forecast ? p.value : null,
      lower: interval?.lower ?? null,
      upper: interval?.upper ?? null,
      volume: isF ? null : p.volume,
      unitValue: isF ? null : p.unitValue,
    };
  });

  const last12 = actualAll.slice(-12);
  const prev12 = actualAll.slice(-24, -12);
  const sumField = (arr: MonthPoint[], k: "value" | "volume") => arr.reduce((a, p) => a + p[k], 0);
  const importValue = sumField(last12, "value");
  const prevValue = sumField(prev12, "value");
  const volume = sumField(last12, "volume");
  const prevVolume = sumField(prev12, "volume");
  const forecastTotal = sumField(forecastMonths, "value");
  const sameQuarterSum = sumField(actualAll.slice(-12, -9), "value");

  const meta: DatasetMeta = {
    source: EXTRACT.source,
    datasetId: EXTRACT.datasetId,
    updated: EXTRACT.updated ?? EXTRACT.fetchedAt,
    latestPeriod: EXTRACT.latestPeriod,
    latestMonthLabel: formatPeriod(EXTRACT.latestPeriod),
    forecastLabel: formatForecastWindow(EXTRACT.latestPeriod, FORECAST_MONTHS),
    historyStartLabel: formatPeriod(times[0] ?? "2011-01"),
    historyEndLabel: formatPeriod(EXTRACT.latestPeriod),
    stale: false,
  };

  const categoryRows: CategoryRow[] = categories.map((c) => {
    const copy = explain(c);
    const values = EXTRACT.series[c.hs2]!.valueEur.map(eurToM);
    const volumes = EXTRACT.series[c.hs2]!.qty100kg.map(qtyToTonnes);
    const actualPts = times.map((period, i) =>
      toPoint(i, period, values[i] ?? 0, volumes[i] ?? 0, false),
    );
    const forecastPts = c.forecasts.map((f, h) =>
      toPoint(n + h, f.period, f.valueM ?? 0, f.volumeT ?? 0, true),
    );
    return {
      id: c.id,
      label: c.label,
      hsCode: c.hs2,
      latestValue: c.latestValueM,
      variance: c.variancePct,
      volatility: c.cvAnnualized,
      volatilityLabel: c.cvAnnualized >= 0.45 ? "High" : c.cvAnnualized >= 0.28 ? "Moderate" : "Low",
      latestVolume: c.latestVolumeT,
      unitValue: c.unitValue,
      unitValueDelta: 0,
      series: [...actualPts.slice(-24), ...forecastPts],
      explanation: copy.explanation,
      recommendation: copy.recommendation,
    };
  });

  const dataset: Dataset = {
    months,
    actualMonths,
    forecastMonths,
    chartData,
    kpis: {
      importValue,
      importValueDelta: prevValue > 0 ? (importValue / prevValue - 1) * 100 : 0,
      volume,
      volumeDelta: prevVolume > 0 ? (volume / prevVolume - 1) * 100 : 0,
      forecast: forecastTotal,
      forecastDelta: sameQuarterSum > 0 ? (forecastTotal / sameQuarterSum - 1) * 100 : 0,
      volatility: annualizedCv(basket.value) * 100,
      volatilityDelta: 0,
    },
    categoryRows,
    topCategories: categories
      .map((c) => ({
        label: c.label,
        value: EXTRACT.series[c.hs2]!.valueEur.slice(-12).reduce((a, v) => a + (eurToM(v) ?? 0), 0),
      }))
      .sort((a, b) => b.value - a.value),
    isEmpty: false,
    meta,
  };

  const alerts = categories
    .map((c) => {
      const copy = explain(c);
      return {
        id: c.id,
        rank: 0,
        severity: c.severity,
        categoryId: c.id,
        title: copy.title,
        detail: copy.detail,
        action: copy.action,
      } satisfies Alert;
    })
    .sort((a, b) => {
      const rank = { High: 0, Medium: 1, Low: 2 };
      return rank[a.severity] - rank[b.severity];
    })
    .map((a, i) => ({ ...a, rank: i + 1 }))
    .slice(0, 3);

  const flagged = alerts.find((a) => a.severity !== "Low") ?? null;
  const trendH1 = basketAccuracy.find((c) => c.method === "trend" && c.horizon === 1);
  const seasonalH1 = basketAccuracy.find((c) => c.method === "seasonal" && c.horizon === 1);
  const naiveH1 = basketAccuracy.find((c) => c.method === "naive" && c.horizon === 1);
  const trendH1All = basketResiduals.filter((r) => r.method === "trend" && r.horizon === 1);
  const before = trendH1All.filter((r) => r.period < RED_SEA_START);
  const after = trendH1All.filter((r) => r.period >= RED_SEA_START);

  return {
    meta,
    dataset,
    alerts,
    categories,
    basketAccuracy,
    headline: {
      mapeTrendH1: trendH1 && Number.isFinite(trendH1.mape) ? trendH1.mape : null,
      mapeSeasonalH1: seasonalH1 && Number.isFinite(seasonalH1.mape) ? seasonalH1.mape : null,
      mapeNaiveH1: naiveH1 && Number.isFinite(naiveH1.mape) ? naiveH1.mape : null,
      flaggedLabel: flagged ? categoryRows.find((r) => r.id === flagged.categoryId)?.label ?? null : null,
      flaggedSeverity: flagged?.severity ?? null,
      flaggedAction: flagged?.action ?? null,
      importValueM: importValue,
      forecastM: forecastTotal,
    },
    redSea: {
      beforeMape: before.length ? mean(before.map((r) => r.ape)) : null,
      afterMape: after.length ? mean(after.map((r) => r.ape)) : null,
      nBefore: before.length,
      nAfter: after.length,
    },
    gapCounts: Object.fromEntries(
      SOFT_GOODS_HS2.map((p) => [
        p,
        EXTRACT.gaps.filter((g) => g.product === p && g.field === "VALUE_IN_EUROS").length,
      ]),
    ),
    firingRate: firingRate(),
  };
}
