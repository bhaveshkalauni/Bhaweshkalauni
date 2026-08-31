export type FlowKey = "fr_imports_in" | "fr_exports_out";
export type HsLevel = "HS2" | "HS4";

export interface CategoryMeta {
  id: string;
  label: string;
  hs2: string;
  hs4: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { id: "knitted", label: "Knitted apparel", hs2: "61", hs4: "6109" },
  { id: "woven", label: "Woven apparel", hs2: "62", hs4: "6204" },
  { id: "yarn", label: "Cotton yarn", hs2: "52", hs4: "5205" },
  { id: "home", label: "Home textiles", hs2: "63", hs4: "6302" },
  { id: "footwear", label: "Footwear", hs2: "64", hs4: "6403" },
  { id: "leather", label: "Leather accessories", hs2: "42", hs4: "4202" },
];

const CORE_CATEGORY_IDS = ["knitted", "woven", "yarn", "home", "footwear"] as const;

export const PRODUCT_GROUPS: { id: string; label: string; categories: string[] }[] = [
  { id: "all", label: "Apparel & textiles", categories: [...CORE_CATEGORY_IDS] },
  { id: "apparel", label: "Apparel only", categories: ["knitted", "woven"] },
  { id: "yarn", label: "Yarn & fibre", categories: ["yarn"] },
  { id: "home", label: "Home textiles", categories: ["home"] },
  { id: "footwear", label: "Footwear", categories: ["footwear"] },
  { id: "leather", label: "Leather accessories", categories: ["leather"] },
];

export const DATE_RANGES = [
  { id: "12", label: "Last 12 months", months: 12 },
  { id: "24", label: "Last 24 months", months: 24 },
  { id: "36", label: "Last 36 months", months: 36 },
  { id: "180", label: "Full history (15 years)", months: 180 },
] as const;

export const FLOWS = [
  { id: "fr_imports_in" as FlowKey, label: "France imports from India" },
  { id: "fr_exports_out" as FlowKey, label: "France exports to India" },
];

export const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export const FORECAST_MONTHS = 3;

export interface Filters {
  flow: FlowKey;
  group: string;
  hsLevel: HsLevel;
  range: string;
}

export interface MonthPoint {
  i: number;
  month: string;
  shortMonth: string;
  year: number;
  value: number;
  volume: number;
  unitValue: number;
  forecast: boolean;
}

export interface CategoryRow {
  id: string;
  label: string;
  hsCode: string;
  latestValue: number;
  variance: number;
  volatility: number;
  volatilityLabel: "Low" | "Moderate" | "High";
  latestVolume: number;
  unitValue: number;
  unitValueDelta: number;
  series: MonthPoint[];
  explanation: string;
  recommendation: string;
}

export interface DatasetMeta {
  source: string;
  datasetId: string;
  updated: string;
  latestPeriod: string;
  latestMonthLabel: string;
  forecastLabel: string;
  historyStartLabel: string;
  historyEndLabel: string;
  stale: boolean;
}

export interface Dataset {
  months: MonthPoint[];
  actualMonths: MonthPoint[];
  forecastMonths: MonthPoint[];
  chartData: {
    month: string;
    shortMonth: string;
    actual: number | null;
    forecast: number | null;
    lower: number | null;
    upper: number | null;
    volume: number | null;
    unitValue: number | null;
  }[];
  kpis: {
    importValue: number;
    importValueDelta: number;
    volume: number;
    volumeDelta: number;
    forecast: number;
    forecastDelta: number;
    volatility: number;
    volatilityDelta: number;
  };
  categoryRows: CategoryRow[];
  topCategories: { label: string; value: number }[];
  isEmpty: boolean;
  meta: DatasetMeta;
}

export interface Alert {
  id: string;
  rank: number;
  severity: "High" | "Medium" | "Low";
  title: string;
  detail: string;
  action: string;
  categoryId: string;
}

export function parsePeriod(ym: string): { year: number; monthIndex: number } {
  const [yearPart = "0", monthPart = "1"] = ym.split("-");
  return { year: Number(yearPart), monthIndex: Number(monthPart) - 1 };
}

export function formatPeriod(ym: string): string {
  const { year, monthIndex } = parsePeriod(ym);
  const label = MONTH_LABELS[monthIndex] ?? "Jan";
  return `${label} ${year}`;
}

export function addMonths(ym: string, n: number): string {
  const { year, monthIndex } = parsePeriod(ym);
  const d = new Date(Date.UTC(year, monthIndex + n, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function shortMonth(ym: string): string {
  const { monthIndex } = parsePeriod(ym);
  return MONTH_LABELS[monthIndex] ?? "Jan";
}

export function formatForecastWindow(latestPeriod: string, horizon = FORECAST_MONTHS): string {
  const start = formatPeriod(addMonths(latestPeriod, 1));
  const end = formatPeriod(addMonths(latestPeriod, horizon));
  const startBits = start.split(" ");
  const endBits = end.split(" ");
  if (startBits[1] === endBits[1]) {
    return `${startBits[0] ?? ""}–${endBits[0] ?? ""} ${endBits[1] ?? ""}`;
  }
  return `${start} – ${end}`;
}

export function emptyMeta(stale = false): DatasetMeta {
  return {
    source: "Eurostat Comext",
    datasetId: "DS-045409",
    updated: "",
    latestPeriod: "",
    latestMonthLabel: "—",
    forecastLabel: "next 3 months",
    historyStartLabel: "2011",
    historyEndLabel: "—",
    stale,
  };
}

export function emptyDataset(meta: DatasetMeta = emptyMeta()): Dataset {
  return {
    months: [],
    actualMonths: [],
    forecastMonths: [],
    chartData: [],
    kpis: {
      importValue: 0,
      importValueDelta: 0,
      volume: 0,
      volumeDelta: 0,
      forecast: 0,
      forecastDelta: 0,
      volatility: 0,
      volatilityDelta: 0,
    },
    categoryRows: [],
    topCategories: [],
    isEmpty: true,
    meta,
  };
}

export function formatEur(m: number, digits = 1) {
  if (m >= 1000) return `€${(m / 1000).toFixed(2)}bn`;
  return `€${m.toFixed(digits)}m`;
}

export function formatTonnes(t: number) {
  if (t >= 1000) return `${(t / 1000).toFixed(1)}k t`;
  return `${Math.round(t)} t`;
}

export function formatPct(p: number, digits = 1) {
  const s = p > 0 ? "+" : "";
  return `${s}${p.toFixed(digits)}%`;
}

export function flowToComext(flow: FlowKey): "1" | "2" {
  return flow === "fr_imports_in" ? "1" : "2";
}

export function datasetToCsv(data: Dataset): string {
  const lines = [
    "Month,Actual EUR m,Forecast EUR m,Lower EUR m,Upper EUR m,Volume t,Unit value EUR/kg",
  ];
  for (const row of data.chartData) {
    lines.push(
      [
        row.month,
        row.actual ?? "",
        row.forecast ?? "",
        row.lower ?? "",
        row.upper ?? "",
        row.volume ?? "",
        row.unitValue ?? "",
      ].join(","),
    );
  }
  lines.push("");
  lines.push("KPI,Value");
  lines.push(`Import value EUR m (12m),${data.kpis.importValue}`);
  lines.push(`Volume t (12m),${data.kpis.volume}`);
  lines.push(`3-month forecast EUR m,${data.kpis.forecast}`);
  lines.push(`Volatility %,${data.kpis.volatility}`);
  lines.push(`Latest official period,${data.meta.latestPeriod}`);
  lines.push(`Source,${data.meta.source} ${data.meta.datasetId}`);
  return lines.join("\n");
}
