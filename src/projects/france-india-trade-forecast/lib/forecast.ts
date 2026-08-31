import { seriesKey, type TradeExtract } from "./trade-extract";
import {
  CATEGORIES,
  DATE_RANGES,
  FORECAST_MONTHS,
  PRODUCT_GROUPS,
  addMonths,
  emptyDataset,
  emptyMeta,
  flowToComext,
  formatForecastWindow,
  formatPeriod,
  parsePeriod,
  shortMonth,
  type CategoryRow,
  type Dataset,
  type DatasetMeta,
  type Filters,
  type MonthPoint,
} from "./trade-data";
import { explainCategory } from "./alerts";

function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0);
}

function unitValue(valueM: number, volumeT: number): number {
  if (volumeT <= 0) return 0;
  return (valueM * 1_000_000) / (volumeT * 1000);
}

function annualisedVolatility(values: number[]): number {
  if (values.length < 3) return 0;
  const rets: number[] = [];
  for (let i = 1; i < values.length; i += 1) {
    const prev = values[i - 1] ?? 0;
    const curr = values[i] ?? 0;
    if (prev <= 0) continue;
    rets.push(curr / prev - 1);
  }
  if (rets.length < 2) return 0;
  const mean = sum(rets) / rets.length;
  const variance = sum(rets.map((r) => (r - mean) ** 2)) / (rets.length - 1);
  return Math.sqrt(Math.max(0, variance)) * Math.sqrt(12);
}

function volatilityLabel(v: number): "Low" | "Moderate" | "High" {
  if (v >= 0.24) return "High";
  if (v >= 0.16) return "Moderate";
  return "Low";
}

function toPoint(
  i: number,
  period: string,
  value: number,
  volume: number,
  forecast: boolean,
): MonthPoint {
  const { year } = parsePeriod(period);
  return {
    i,
    month: formatPeriod(period),
    shortMonth: shortMonth(period),
    year,
    value,
    volume,
    unitValue: unitValue(value, volume),
    forecast,
  };
}

function seasonalNaive(actual: number[], horizon: number): number[] {
  const n = actual.length;
  const last12 = actual.slice(-12);
  const prev12 = actual.slice(-24, -12);
  const prevSum = sum(prev12);
  const trend = prev12.length === 12 && prevSum > 0 ? sum(last12) / prevSum : 1;
  const out: number[] = [];
  for (let h = 1; h <= horizon; h += 1) {
    const yearAgo = actual[n - 12 + (h - 1)] ?? actual[n - 1] ?? 0;
    out.push(yearAgo * trend);
  }
  return out;
}

function metaFromExtract(extract: TradeExtract, times: string[]): DatasetMeta {
  const latest = extract.latestPeriod;
  const start = times[0] ?? latest;
  return {
    source: "Eurostat Comext",
    datasetId: extract.datasetId,
    updated: extract.updated,
    latestPeriod: latest,
    latestMonthLabel: formatPeriod(latest),
    forecastLabel: formatForecastWindow(latest),
    historyStartLabel: formatPeriod(start),
    historyEndLabel: formatPeriod(latest),
    stale: extract.stale,
  };
}

export function buildDatasetFromExtract(extract: TradeExtract, filters: Filters): Dataset {
  const group = PRODUCT_GROUPS.find((g) => g.id === filters.group) ?? PRODUCT_GROUPS[0]!;
  const cats = CATEGORIES.filter((c) => group.categories.includes(c.id));
  const rangeMonths = DATE_RANGES.find((r) => r.id === filters.range)?.months ?? 24;
  const flow = flowToComext(filters.flow);
  const allTimes = extract.times;
  const meta = metaFromExtract(extract, allTimes);

  if (cats.length === 0 || allTimes.length === 0) {
    return emptyDataset(meta);
  }

  const n = allTimes.length;
  const totalsValue = new Array<number>(n).fill(0);
  const totalsVolume = new Array<number>(n).fill(0);

  const perCat = cats.map((cat) => {
    const product = filters.hsLevel === "HS2" ? cat.hs2 : cat.hs4;
    const pair = extract.series[seriesKey(flow, product)];
    const value = pair?.value.slice() ?? new Array<number>(n).fill(0);
    const volume = pair?.volume.slice() ?? new Array<number>(n).fill(0);
    while (value.length < n) value.push(0);
    while (volume.length < n) volume.push(0);
    for (let i = 0; i < n; i += 1) {
      totalsValue[i] = (totalsValue[i] ?? 0) + (value[i] ?? 0);
      totalsVolume[i] = (totalsVolume[i] ?? 0) + (volume[i] ?? 0);
    }
    return { cat, product, value, volume };
  });

  const forecastValues = seasonalNaive(totalsValue, FORECAST_MONTHS);
  const forecastVolumes = seasonalNaive(totalsVolume, FORECAST_MONTHS);

  const actualAll: MonthPoint[] = allTimes.map((period, i) =>
    toPoint(i, period, totalsValue[i] ?? 0, totalsVolume[i] ?? 0, false),
  );
  const forecastMonths: MonthPoint[] = forecastValues.map((value, h) => {
    const period = addMonths(extract.latestPeriod, h + 1);
    return toPoint(n + h, period, value, forecastVolumes[h] ?? 0, true);
  });

  const actualMonths = actualAll.slice(-rangeMonths);
  const months = [...actualMonths, ...forecastMonths];

  const chartData = months.map((p, idx) => {
    const isF = p.forecast;
    const horizon = isF ? p.i - n + 1 : 0;
    const band = p.value * 0.08 + (isF ? p.value * 0.04 * horizon : 0);
    return {
      month: p.month,
      shortMonth: p.shortMonth,
      actual: isF ? null : p.value,
      forecast: isF ? p.value : months[idx + 1]?.forecast ? p.value : null,
      lower: isF ? p.value - band : null,
      upper: isF ? p.value + band : null,
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
  const sameQuarterLast = actualAll.slice(-12, -9);
  const sameQuarterSum = sumField(sameQuarterLast, "value");
  const forecastDelta =
    sameQuarterSum > 0 ? (forecastTotal / sameQuarterSum - 1) * 100 : 0;

  const recentVals = last12.map((p) => p.value);
  const priorVals = prev12.map((p) => p.value);
  const vol = annualisedVolatility(recentVals);
  const prevVol = annualisedVolatility(priorVals);

  const categoryRows: CategoryRow[] = perCat.map(({ cat, product, value, volume: volSeries }) => {
    const catForecast = seasonalNaive(value, FORECAST_MONTHS);
    const catForecastVol = seasonalNaive(volSeries, FORECAST_MONTHS);
    const actualPts = allTimes.map((period, i) =>
      toPoint(i, period, value[i] ?? 0, volSeries[i] ?? 0, false),
    );
    const forecastPts = catForecast.map((v, h) => {
      const period = addMonths(extract.latestPeriod, h + 1);
      return toPoint(n + h, period, v, catForecastVol[h] ?? 0, true);
    });
    const latest = actualPts[actualPts.length - 1] ?? actualPts[0]!;
    const yearAgo = actualPts[actualPts.length - 13];
    const last12v = value.slice(-12);
    const prev12v = value.slice(-24, -12);
    const prevSum = sum(prev12v);
    const growth = prev12v.length === 12 && prevSum > 0 ? sum(last12v) / prevSum - 1 : 0;
    const expected = (yearAgo?.value ?? latest.value) * (1 + growth);
    const uvNow = latest.unitValue;
    const uvPrev = yearAgo?.unitValue ?? uvNow;
    const volMetric = annualisedVolatility(value.slice(-24));
    const rowBase = {
      id: cat.id,
      label: cat.label,
      hsCode: product,
      latestValue: latest.value,
      variance: expected > 0 ? (latest.value / expected - 1) * 100 : 0,
      volatility: volMetric,
      volatilityLabel: volatilityLabel(volMetric),
      latestVolume: latest.volume,
      unitValue: uvNow,
      unitValueDelta: uvPrev > 0 ? (uvNow / uvPrev - 1) * 100 : 0,
      series: [...actualPts.slice(-24), ...forecastPts],
    };
    const copy = explainCategory(rowBase, filters.flow);
    return { ...rowBase, ...copy };
  });

  const topCategories = categoryRows
    .map((r) => ({
      label: r.label,
      value: r.series.filter((p) => !p.forecast).slice(-12).reduce((a, p) => a + p.value, 0),
    }))
    .sort((a, b) => b.value - a.value);

  return {
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
      forecastDelta,
      volatility: vol * 100,
      volatilityDelta: (vol - prevVol) * 100,
    },
    categoryRows,
    topCategories,
    isEmpty: false,
    meta,
  };
}

export function extractMeta(extract: TradeExtract | undefined): DatasetMeta {
  if (!extract) return emptyMeta();
  return metaFromExtract(extract, extract.times);
}
