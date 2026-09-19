/**
 * Build the Excel model and Power BI star-schema pack from the same Comext extract
 * the case-study page uses. Refresh: npm run fetch:comext && npm run artifacts:tradeflow
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import ExcelJS from "exceljs";
import {
  EXTRACT,
  SOFT_GOODS_HS2,
  analyzeSoftGoods,
  applyBand,
  bandsFrom,
  forecastAt,
  trailingGrowth,
  walkForwardRows,
  type Hs2,
  type MethodId,
} from "../src/projects/france-india-trade-forecast/lib/analysis.ts";
import { addMonths, MONTH_LABELS } from "../src/projects/france-india-trade-forecast/lib/trade-data.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DATA = join(ROOT, "public", "data");
const PBI_DIR = join(PUBLIC_DATA, "powerbi");
const XLSX_PATH = join(PUBLIC_DATA, "tradeflow-france-india-softgoods.xlsx");
const ZIP_PATH = join(PUBLIC_DATA, "tradeflow-powerbi.zip");
const TEXTILE_HS = new Set(["52", "61", "62", "63"]);
const METHOD_LABEL: Record<MethodId, string> = {
  trend: "seasonal-naive + trend",
  seasonal: "seasonal-naive",
  naive: "last-month naive",
};

function ymDate(ym: string): Date {
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, (m ?? 1) - 1, 1));
}

function monthName(ym: string): string {
  const monthIndex = Number(ym.slice(5, 7)) - 1;
  return MONTH_LABELS[monthIndex] ?? ym;
}

function csvEscape(value: string | number | boolean | null | undefined): string {
  if (value == null) return "";
  const s = String(value);
  if (/[",\n]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

function toCsv(headers: string[], rows: Record<string, string | number | boolean | null | undefined>[]): string {
  return [headers.join(","), ...rows.map((row) => headers.map((h) => csvEscape(row[h])).join(","))].join("\n") + "\n";
}

function basketSeries(field: "valueEur" | "qty100kg"): (number | null)[] {
  return EXTRACT.times.map((_, i) => {
    let total = 0;
    let any = false;
    for (const hs2 of SOFT_GOODS_HS2) {
      const v = EXTRACT.series[hs2]?.[field][i] ?? null;
      if (v != null) {
        total += v;
        any = true;
      }
    }
    return any ? total : null;
  });
}

function rollingSum(values: (number | null)[], end: number, window: number): number | null {
  let total = 0;
  let n = 0;
  for (let i = end; i > end - window && i >= 0; i -= 1) {
    const v = values[i];
    if (v == null) continue;
    total += v;
    n += 1;
  }
  return n ? total : null;
}

function decompose(prevValue: number, prevKg: number, currValue: number, currKg: number) {
  const p0 = prevKg > 0 ? prevValue / prevKg : null;
  const p1 = currKg > 0 ? currValue / currKg : null;
  const volumeEffect = p0 == null ? null : (currKg - prevKg) * p0;
  const priceEffect = p0 == null || p1 == null ? null : (p1 - p0) * currKg;
  return {
    prevValue,
    currValue,
    deltaValue: currValue - prevValue,
    prevKg,
    currKg,
    prevEurPerKg: p0,
    currEurPerKg: p1,
    volumeEffect,
    priceEffect,
    reconDelta: volumeEffect != null && priceEffect != null ? volumeEffect + priceEffect : null,
  };
}

function buildTables() {
  const report = analyzeSoftGoods(24);
  const times = EXTRACT.times;
  const origin = times.length - 1;
  const latest = times[origin]!;
  const valueBasket = basketSeries("valueEur");
  const qtyBasket = basketSeries("qty100kg");
  const basketRows = walkForwardRows(times, valueBasket);
  const basketBands = bandsFrom(
    basketRows.map((row) => ({
      period: row.targetPeriod,
      horizon: row.horizon,
      method: row.method,
      ape: row.ape,
      bandE: row.residualPct,
    })),
  );

  const dimDate = [];
  const lastForecast = addMonths(latest, 3);
  let cursor = times[0]!;
  while (cursor <= lastForecast) {
    const date = ymDate(cursor);
    const monthNum = date.getUTCMonth() + 1;
    const isActual = cursor <= latest;
    dimDate.push({
      Date: cursor + "-01",
      YearMonth: cursor,
      Year: date.getUTCFullYear(),
      MonthNumber: monthNum,
      MonthName: monthName(cursor),
      Quarter: `Q${Math.ceil(monthNum / 3)}`,
      IsActual: isActual,
      IsForecast: !isActual,
      RedSeaRegime: cursor < "2023-11" ? "pre-Nov 2023" : "from Nov 2023",
    });
    cursor = addMonths(cursor, 1);
  }

  const dimCategory = report.categories.map((c) => ({
    HS2: c.hs2,
    Category: c.label,
    Family: TEXTILE_HS.has(c.hs2) ? "Textile" : "Footwear",
    Basket: "Soft goods",
    AnnualizedCV: c.cvAnnualized,
    LatestZ: c.zScore,
    Severity: c.severity,
    GrowthG: c.growthG,
    BeatsSeasonalAtH1: c.beatsSeasonalAtH1,
    Note:
      c.hs2 === "64"
        ? "Footwear — keep in the soft-goods basket; a textiles-only Eurostat table will not reconcile."
        : "Textile chapter.",
  }));

  const factImports = [];
  for (let i = 0; i < times.length; i += 1) {
    const ym = times[i]!;
    for (const hs2 of SOFT_GOODS_HS2) {
      const series = EXTRACT.series[hs2]!;
      const valueEur = series.valueEur[i] ?? null;
      const qty100kg = series.qty100kg[i] ?? null;
      const weightKg = qty100kg == null ? null : qty100kg * 100;
      factImports.push({
        Date: ym + "-01",
        YearMonth: ym,
        HS2: hs2,
        Category: series.label,
        ValueEUR: valueEur,
        Qty100kg: qty100kg,
        WeightKg: weightKg,
        WeightTonnes: qty100kg == null ? null : qty100kg * 0.1,
        UnitValueEurPerKg: valueEur != null && weightKg ? valueEur / weightKg : null,
        ValueMissing: valueEur == null,
        QtyMissing: qty100kg == null,
      });
    }
  }

  const factForecast = [];
  const pushForecast = (
    hs2: string,
    label: string,
    values: (number | null)[],
    volumes: (number | null)[],
    grain: "category" | "basket",
  ) => {
    const rows = walkForwardRows(times, values);
    const bands = bandsFrom(
      rows.map((row) => ({
        period: row.targetPeriod,
        horizon: row.horizon,
        method: row.method,
        ape: row.ape,
        bandE: row.residualPct,
      })),
    );
    const g = trailingGrowth(values, origin);
    for (const horizon of [1, 2, 3] as const) {
      const period = addMonths(latest, horizon);
      const value = forecastAt(values, origin, horizon, "trend");
      const volume = forecastAt(volumes, origin, horizon, "trend");
      const band = bands.find((b) => b.horizon === horizon)!;
      const interval = value == null ? null : applyBand(value, band);
      factForecast.push({
        Date: period + "-01",
        YearMonth: period,
        Grain: grain,
        HS2: hs2,
        Category: label,
        Horizon: horizon,
        Method: "seasonal-naive + trend",
        GrowthG: g,
        ForecastEUR: value,
        ForecastTonnes: volume == null ? null : volume * 0.1,
        BandLowerEUR: interval?.lower ?? null,
        BandUpperEUR: interval?.upper ?? null,
        BandType: band.usePercentiles ? "p10/p90" : "z=1.28 * sigma_h",
        SigmaH: band.sigma,
        Skew: band.skew,
      });
    }
  };

  for (const hs2 of SOFT_GOODS_HS2) {
    pushForecast(hs2, EXTRACT.series[hs2]!.label, EXTRACT.series[hs2]!.valueEur, EXTRACT.series[hs2]!.qty100kg, "category");
  }
  pushForecast("BASKET", "Soft goods basket", valueBasket, qtyBasket, "basket");

  const factBacktest = [];
  const pushBacktest = (hs2: string, label: string, values: (number | null)[], grain: "category" | "basket") => {
    for (const row of walkForwardRows(times, values)) {
      factBacktest.push({
        Grain: grain,
        HS2: hs2,
        Category: label,
        OriginYearMonth: row.originPeriod,
        TargetYearMonth: row.targetPeriod,
        Horizon: row.horizon,
        Method: METHOD_LABEL[row.method],
        ActualEUR: row.actual,
        ForecastEUR: row.forecast,
        APE: row.ape,
        ResidualPct: row.residualPct,
        RedSeaRegime: row.targetPeriod < "2023-11" ? "pre-Nov 2023" : "from Nov 2023",
      });
    }
  };
  for (const hs2 of SOFT_GOODS_HS2) {
    pushBacktest(hs2, EXTRACT.series[hs2]!.label, EXTRACT.series[hs2]!.valueEur, "category");
  }
  pushBacktest("BASKET", "Soft goods basket", valueBasket, "basket");

  const accuracy = [];
  const pushAccuracy = (grain: string, hs2: string, label: string, cells: typeof report.basketAccuracy) => {
    for (const cell of cells) {
      accuracy.push({
        Grain: grain,
        HS2: hs2,
        Category: label,
        Method: METHOD_LABEL[cell.method],
        Horizon: cell.horizon,
        N: cell.n,
        MAPE: cell.mape,
        MdAPE: cell.mdape,
      });
    }
  };
  pushAccuracy("basket", "BASKET", "Soft goods basket", report.basketAccuracy);
  for (const c of report.categories) pushAccuracy("category", c.hs2, c.label, c.accuracy);

  const gapLog =
    EXTRACT.gaps.length > 0
      ? EXTRACT.gaps.map((g) => ({
          HS2: g.product,
          YearMonth: g.period,
          Field: g.field,
          Handling: "Leave null. Do not zero-fill. Omit F(t) when A(t-12) is missing.",
        }))
      : SOFT_GOODS_HS2.map((hs2) => ({
          HS2: hs2,
          YearMonth: "",
          Field: "VALUE_IN_EUROS",
          Handling: "No missing value months at HS2 for this reporter/partner/flow. Confidential trade can still bias partner totals low.",
        }));

  const last12Value = rollingSum(valueBasket, origin, 12) ?? 0;
  const prev12Value = rollingSum(valueBasket, origin - 12, 12) ?? 0;
  const last12Kg = (rollingSum(qtyBasket, origin, 12) ?? 0) * 100;
  const prev12Kg = (rollingSum(qtyBasket, origin - 12, 12) ?? 0) * 100;
  const volumePrice = [
    {
      Grain: "basket",
      HS2: "BASKET",
      Category: "Soft goods basket",
      Window: "rolling-12 vs prior-12",
      ...decompose(prev12Value, prev12Kg, last12Value, last12Kg),
    },
    ...SOFT_GOODS_HS2.map((hs2) => {
      const values = EXTRACT.series[hs2]!.valueEur;
      const qty = EXTRACT.series[hs2]!.qty100kg;
      const currV = rollingSum(values, origin, 12) ?? 0;
      const prevV = rollingSum(values, origin - 12, 12) ?? 0;
      const currKg = (rollingSum(qty, origin, 12) ?? 0) * 100;
      const prevKg = (rollingSum(qty, origin - 12, 12) ?? 0) * 100;
      return {
        Grain: "category",
        HS2: hs2,
        Category: EXTRACT.series[hs2]!.label,
        Window: "rolling-12 vs prior-12",
        ...decompose(prevV, prevKg, currV, currKg),
      };
    }),
  ];

  const kpis = [
    { Metric: "Import value rolling-12 EUR", WebPageUnit: "EUR m", ValueEUR: last12Value, ValueOnPage: report.headline.importValueM },
    { Metric: "3-month forecast EUR", WebPageUnit: "EUR m", ValueEUR: report.headline.forecastM * 1_000_000, ValueOnPage: report.headline.forecastM },
    { Metric: "Basket MAPE h=1 seasonal-naive + trend", WebPageUnit: "ratio", ValueEUR: report.headline.mapeTrendH1, ValueOnPage: report.headline.mapeTrendH1 },
    { Metric: "Basket MAPE h=1 seasonal-naive", WebPageUnit: "ratio", ValueEUR: report.headline.mapeSeasonalH1, ValueOnPage: report.headline.mapeSeasonalH1 },
    { Metric: "Basket MAPE h=1 last-month naive", WebPageUnit: "ratio", ValueEUR: report.headline.mapeNaiveH1, ValueOnPage: report.headline.mapeNaiveH1 },
    { Metric: "Alert firing High", WebPageUnit: "count", ValueEUR: report.firingRate.high, ValueOnPage: report.firingRate.high },
    { Metric: "Alert firing Medium", WebPageUnit: "count", ValueEUR: report.firingRate.medium, ValueOnPage: report.firingRate.medium },
    { Metric: "Alert firing N", WebPageUnit: "count", ValueEUR: report.firingRate.total, ValueOnPage: report.firingRate.total },
    { Metric: "Latest official month", WebPageUnit: "period", ValueEUR: latest, ValueOnPage: latest },
  ];

  const alerts = report.categories.map((c) => ({
    HS2: c.hs2,
    Category: c.label,
    Severity: c.severity,
    LatestZ: c.zScore,
    VariancePct: c.variancePct / 100,
    AnnualizedCV: c.cvAnnualized,
    LatestValueEUR: c.latestValueM * 1_000_000,
  }));

  return {
    report,
    latest,
    dimDate,
    dimCategory,
    factImports,
    factForecast,
    factBacktest,
    accuracy,
    gapLog,
    volumePrice,
    kpis,
    alerts,
    basketBands,
    valueBasket,
  };
}

async function addSheetTable(
  wb: ExcelJS.Workbook,
  name: string,
  rows: Record<string, unknown>[],
  percentCols: string[] = [],
  numberCols: string[] = [],
) {
  const ws = wb.addWorksheet(name);
  if (!rows.length) {
    ws.getCell("A1").value = "No rows";
    return ws;
  }
  const headers = Object.keys(rows[0]!);
  ws.addTable({
    name: `tbl${name.replaceAll(/[^A-Za-z0-9]/g, "")}`,
    ref: "A1",
    headerRow: true,
    totalsRow: false,
    style: { theme: "TableStyleMedium2", showRowStripes: true },
    columns: headers.map((header) => ({ name: header, filterButton: true })),
    rows: rows.map((row) => headers.map((header) => row[header] ?? null)),
  });
  ws.views = [{ state: "frozen", ySplit: 1 }];
  ws.columns = headers.map((header) => ({
    header,
    width: Math.min(28, Math.max(12, header.length + 2)),
  }));
  const percent = new Set(percentCols);
  const numeric = new Set(numberCols);
  for (let r = 2; r <= rows.length + 1; r += 1) {
    headers.forEach((header, i) => {
      const cell = ws.getRow(r).getCell(i + 1);
      if (percent.has(header) && typeof cell.value === "number") cell.numFmt = "0.0%";
      else if (numeric.has(header) && typeof cell.value === "number") cell.numFmt = "#,##0.00";
    });
  }
  return ws;
}

function addCover(wb: ExcelJS.Workbook, latest: string, report: ReturnType<typeof analyzeSoftGoods>) {
  const ws = wb.addWorksheet("Cover", { properties: { tabColor: { argb: "FF0F2A44" } } });
  ws.getColumn(1).width = 28;
  ws.getColumn(2).width = 88;
  const rows: [string, string][] = [
    ["Workbook", "France–India soft-goods import forecast — modelling artifact"],
    ["Question", "Which HS 52/61/62/63/64 chapters need planner attention in the next 3 months?"],
    ["Source", `${EXTRACT.source} ${EXTRACT.datasetId} · reporter FR · partner IN · flow imports`],
    ["History", `${EXTRACT.times[0]} → ${latest}`],
    ["Snapshot fetched", EXTRACT.fetchedAt],
    ["LatestPeriod", latest],
    ["Method", "F(t) = A(t−12) × (1 + trailing-12 YoY). Holt-Winters / FORECAST.ETS rejected."],
    ["Band", "Per-horizon residual σ (or p10/p90 if skewed). Not ±1.28σ√h."],
    ["Basket MAPE h=1", `${((report.headline.mapeTrendH1 ?? NaN) * 100).toFixed(1)}% vs seasonal-naive ${((report.headline.mapeSeasonalH1 ?? NaN) * 100).toFixed(1)}% and naive ${((report.headline.mapeNaiveH1 ?? NaN) * 100).toFixed(1)}%`],
    ["Power BI", "Load DimDate, DimCategory, FactImports, FactForecast from this file. Measures are in the Power BI pack."],
    ["Refresh", "npm run fetch:comext && npm run artifacts:tradeflow — then refresh Power BI from this workbook, not the API."],
    ["Reconcile", "KPI sheet ValueOnPage must match the case-study page. Same extract, same engine."],
    ["License note", "Power BI free cannot publish-to-web. This workbook is the portable model; the site is the public surface."],
  ];
  rows.forEach(([k, v], i) => {
    ws.getCell(i + 1, 1).value = k;
    ws.getCell(i + 1, 1).font = { bold: true };
    ws.getCell(i + 1, 2).value = v;
    ws.getCell(i + 1, 2).alignment = { wrapText: true };
  });
  ws.getRow(6).getCell(2).name = "LatestPeriod";
}

function addMethodology(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet("Methodology");
  ws.getColumn(1).width = 22;
  ws.getColumn(2).width = 110;
  const blocks: [string, string][] = [
    [
      "Data",
      "Eurostat Comext DS-045409, monthly France imports from India, HS2 52/61/62/63/64, from Jan 2011. Weight is QUANTITY_IN_100KG (×100 = kg). HS 64 is footwear, so the basket is soft goods, not textiles. Missing months stay null — never zero-filled. Confidential trade is suppressed, not zero; partner totals can run low.",
    ],
    [
      "Forecast",
      "F(t) = A(t−12) × (1 + g), g = average of the last 12 observable year-on-year rates. g is one multiplier, so there is no extra drift across h = 1, 2, 3. FORECAST.ETS / Holt-Winters was rejected because the smoothing parameters are hard to defend under questioning.",
    ],
    [
      "Backtest",
      "Rolling origin from month 24. At each origin, forecast h = 1–3 using only data then available. Errors are percentage-based and per category. Report MAPE and MdAPE against seasonal-naive and last-month naive.",
    ],
    [
      "Band",
      "σ_h from those residuals, per series, per horizon. If |skew| > 0.5, use the 10th/90th percentiles instead of z = 1.28. Do not scale with √h: for h ≤ 3 the seasonal base A(t+h−12) is an observed actual.",
    ],
    [
      "Alerts",
      "z-score of the latest residual vs that chapter’s own trailing residual distribution. High |z| > 2, Medium 1.5–2. Thresholds were chosen for firing rate, not round numbers.",
    ],
    [
      "Horizon",
      "Three months is about one India→France ocean cycle (6–10 weeks door-to-door, 3–5 weeks port-to-port) plus a reaction buffer — not two cycles.",
    ],
    [
      "Star schema",
      "FactImports is Month × Category. Volatility and z live on DimCategory so they cannot be SUMmed. DimDate is a continuous calendar and is the official date table in Power BI.",
    ],
    [
      "Refresh tradeoff",
      "A hardcoded workbook path is fragile. Production would use a gateway or a shared drive. Here the JSON extract is the workbook, rebuilt by the artifact script, so the site, Excel, and Power BI stay on one snapshot.",
    ],
  ];
  blocks.forEach(([title, body], i) => {
    const r = i * 3 + 1;
    ws.getCell(r, 1).value = title;
    ws.getCell(r, 1).font = { bold: true };
    ws.getCell(r + 1, 2).value = body;
    ws.getCell(r + 1, 2).alignment = { wrapText: true };
    ws.getRow(r + 1).height = 48;
  });
}

function addCalculator(wb: ExcelJS.Workbook, latest: string) {
  const ws = wb.addWorksheet("Calculator");
  ws.getCell("A1").value = "Live Excel formulas for the current origin (Cover!LatestPeriod). Backtest rows are too many for formulas; they are in FactBacktest from the same engine.";
  ws.mergeCells("A1:L1");
  ws.getCell("A3").value = "HS2";
  ws.getCell("B3").value = "Category";
  const yoyMonths = Array.from({ length: 12 }, (_, k) => addMonths(latest, -k));
  yoyMonths.forEach((ym, i) => {
    ws.getCell(3, 3 + i).value = ym;
  });
  ws.getCell("O3").value = "g";
  ws.getCell("P3").value = "F(t+1)";
  ws.getCell("Q3").value = "F(t+2)";
  ws.getCell("R3").value = "F(t+3)";

  SOFT_GOODS_HS2.forEach((hs2, rowIdx) => {
    const r = 4 + rowIdx;
    ws.getCell(r, 1).value = hs2;
    ws.getCell(r, 2).value = EXTRACT.series[hs2]!.label;
    yoyMonths.forEach((ym, i) => {
      const lag = addMonths(ym, -12);
      const col = 3 + i;
      const now = `SUMIFS(tblFactImports[ValueEUR],tblFactImports[HS2],$A${r},tblFactImports[YearMonth],${col}$3)`;
      const ago = `SUMIFS(tblFactImports[ValueEUR],tblFactImports[HS2],$A${r},tblFactImports[YearMonth],"${lag}")`;
      ws.getCell(r, col).value = { formula: `IFERROR(${now}/${ago}-1,NA())` };
      ws.getCell(r, col).numFmt = "0.0%";
    });
    ws.getCell(r, 15).value = { formula: `AGGREGATE(1,6,C${r}:N${r})` };
    ws.getCell(r, 15).numFmt = "0.0%";
    for (const h of [1, 2, 3]) {
      const baseYm = addMonths(latest, h - 12);
      const col = 15 + h;
      ws.getCell(r, col).value = {
        formula: `SUMIFS(tblFactImports[ValueEUR],tblFactImports[HS2],$A${r},tblFactImports[YearMonth],"${baseYm}")*(1+$O${r})`,
      };
      ws.getCell(r, col).numFmt = "#,##0";
    }
  });
  ws.getColumn(2).width = 22;
  for (let c = 3; c <= 18; c += 1) ws.getColumn(c).width = 12;
}

function addPowerQueryDoc(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet("PowerQueryM");
  ws.getColumn(1).width = 120;
  ws.getCell("A1").value = POWER_QUERY_M;
  ws.getCell("A1").alignment = { wrapText: true, vertical: "top" };
  ws.getRow(1).height = 420;
}

const POWER_QUERY_M = `// Power BI: Get Data → Blank query → Advanced Editor.
// Point Source to this workbook. Excel owns the forecast; Power BI presents it.
let
  Source = Excel.Workbook(File.Contents("tradeflow-france-india-softgoods.xlsx"), null, true),
  DimDate = Table.TransformColumnTypes(Source{[Item="tblDimDate",Kind="Table"]}[Data], {{"Date", type date}}),
  DimCategory = Source{[Item="tblDimCategory",Kind="Table"]}[Data],
  FactImports = Table.TransformColumnTypes(Source{[Item="tblFactImports",Kind="Table"]}[Data], {{"Date", type date}}),
  FactForecast = Table.TransformColumnTypes(Source{[Item="tblFactForecast",Kind="Table"]}[Data], {{"Date", type date}}),
  FactBacktest = Source{[Item="tblFactBacktest",Kind="Table"]}[Data]
in
  FactImports
`;

const DAX = `/* TradeFlow measures — define these before building visuals.
   Mark DimDate[Date] as the official Date table.
   Relate DimDate[Date] 1:* FactImports[Date]
          DimCategory[HS2] 1:* FactImports[HS2]
          DimDate[Date] 1:* FactForecast[Date]
          DimCategory[HS2] 1:* FactForecast[HS2]  (filter FactForecast Grain = "category")
   Volatility lives on DimCategory. Never SUM it.
*/

Import Value :=
SUM ( FactImports[ValueEUR] )

Import Value R12 :=
CALCULATE (
    [Import Value],
    DATESINPERIOD ( DimDate[Date], MAX ( DimDate[Date] ), -12, MONTH )
)

Import Value R12 YoY % :=
VAR Curr = [Import Value R12]
VAR Prev =
    CALCULATE ( [Import Value R12], SAMEPERIODLASTYEAR ( DimDate[Date] ) )
RETURN
    DIVIDE ( Curr - Prev, Prev )

Volume Tonnes :=
SUM ( FactImports[WeightTonnes] )

Volume R12 t :=
CALCULATE (
    [Volume Tonnes],
    DATESINPERIOD ( DimDate[Date], MAX ( DimDate[Date] ), -12, MONTH )
)

Unit Value EUR per kg :=
DIVIDE ( [Import Value], SUM ( FactImports[WeightKg] ) )

Forecast 3M EUR :=
CALCULATE (
    SUM ( FactForecast[ForecastEUR] ),
    FactForecast[Grain] = "basket",
    FactForecast[Horizon] IN { 1, 2, 3 }
)

Band Lower 3M :=
CALCULATE (
    SUM ( FactForecast[BandLowerEUR] ),
    FactForecast[Grain] = "basket"
)

Band Upper 3M :=
CALCULATE (
    SUM ( FactForecast[BandUpperEUR] ),
    FactForecast[Grain] = "basket"
)

Selected CV :=
SELECTEDVALUE ( DimCategory[AnnualizedCV] )

Selected Z :=
SELECTEDVALUE ( DimCategory[LatestZ] )

MAPE Trend h1 :=
CALCULATE (
    AVERAGE ( FactBacktest[APE] ),
    FactBacktest[Grain] = "basket",
    FactBacktest[Horizon] = 1,
    FactBacktest[Method] = "seasonal-naive + trend"
)
`;

async function buildWorkbook(tables: ReturnType<typeof buildTables>) {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Bhawesh Chandra Kalauni";
  wb.created = new Date();
  addCover(wb, tables.latest, tables.report);
  addMethodology(wb);
  await addSheetTable(wb, "DimDate", tables.dimDate);
  await addSheetTable(wb, "DimCategory", tables.dimCategory, ["AnnualizedCV", "GrowthG"], ["LatestZ"]);
  await addSheetTable(
    wb,
    "FactImports",
    tables.factImports,
    [],
    ["ValueEUR", "Qty100kg", "WeightKg", "WeightTonnes", "UnitValueEurPerKg"],
  );
  await addSheetTable(
    wb,
    "FactForecast",
    tables.factForecast,
    ["GrowthG", "SigmaH", "Skew"],
    ["ForecastEUR", "ForecastTonnes", "BandLowerEUR", "BandUpperEUR"],
  );
  await addSheetTable(
    wb,
    "FactBacktest",
    tables.factBacktest,
    ["APE", "ResidualPct"],
    ["ActualEUR", "ForecastEUR"],
  );
  await addSheetTable(wb, "Accuracy", tables.accuracy, ["MAPE", "MdAPE"]);
  await addSheetTable(wb, "GapLog", tables.gapLog);
  await addSheetTable(wb, "Alerts", tables.alerts, ["VariancePct", "AnnualizedCV"], ["LatestZ", "LatestValueEUR"]);
  await addSheetTable(
    wb,
    "VolumePrice",
    tables.volumePrice,
    [],
    ["prevValue", "currValue", "deltaValue", "prevKg", "currKg", "prevEurPerKg", "currEurPerKg", "volumeEffect", "priceEffect", "reconDelta"],
  );
  await addSheetTable(wb, "KPI", tables.kpis);
  addCalculator(wb, tables.latest);
  addPowerQueryDoc(wb);
  const dax = wb.addWorksheet("DAX");
  dax.getColumn(1).width = 100;
  dax.getCell("A1").value = DAX;
  dax.getCell("A1").alignment = { wrapText: true, vertical: "top" };
  dax.getRow(1).height = 420;
  await wb.xlsx.writeFile(XLSX_PATH);
}

async function writeCsvs(tables: ReturnType<typeof buildTables>) {
  const files: [string, string[], Record<string, unknown>[]][] = [
    ["dim_date.csv", Object.keys(tables.dimDate[0]!), tables.dimDate],
    ["dim_category.csv", Object.keys(tables.dimCategory[0]!), tables.dimCategory],
    ["fact_imports.csv", Object.keys(tables.factImports[0]!), tables.factImports],
    ["fact_forecast.csv", Object.keys(tables.factForecast[0]!), tables.factForecast],
    ["fact_backtest.csv", Object.keys(tables.factBacktest[0]!), tables.factBacktest],
    ["fact_accuracy.csv", Object.keys(tables.accuracy[0]!), tables.accuracy],
  ];
  for (const [name, headers, rows] of files) {
    await writeFile(join(PBI_DIR, name), toCsv(headers, rows as Record<string, string | number | boolean | null | undefined>[]), "utf8");
  }
  await writeFile(join(PBI_DIR, "measures.dax"), DAX, "utf8");
  await writeFile(join(PBI_DIR, "transform.m"), POWER_QUERY_M, "utf8");
}

function zipPowerBi() {
  try {
    execFileSync("tar.exe", ["-a", "-cf", ZIP_PATH, "-C", PBI_DIR, "dim_date.csv", "dim_category.csv", "fact_imports.csv", "fact_forecast.csv", "fact_backtest.csv", "fact_accuracy.csv", "measures.dax", "transform.m", "README.md"], {
      stdio: "inherit",
    });
  } catch {
    console.warn("Could not zip Power BI pack with tar.exe; CSV files are still in public/data/powerbi.");
  }
}

const tables = buildTables();
await mkdir(PBI_DIR, { recursive: true });
await buildWorkbook(tables);
await writeCsvs(tables);
zipPowerBi();

const kpi = tables.kpis.find((k) => k.Metric.startsWith("Import value"))!;
console.log(`Wrote ${XLSX_PATH}`);
console.log(`Wrote ${PBI_DIR}`);
console.log(`Rolling-12 EUR m = ${Number(kpi.ValueOnPage).toFixed(3)} (page) / ${(Number(kpi.ValueEUR) / 1_000_000).toFixed(3)} (fact)`);
console.log(`FactImports ${tables.factImports.length} rows · FactBacktest ${tables.factBacktest.length} rows`);
