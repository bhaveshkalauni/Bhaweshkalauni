import { formatEur, formatPct, type Alert, type CategoryRow, type Dataset, type FlowKey } from "./trade-data";

function direction(flow: FlowKey): "inbound" | "outbound" {
  return flow === "fr_imports_in" ? "inbound" : "outbound";
}

function severityOf(row: Pick<CategoryRow, "variance" | "volatilityLabel" | "unitValueDelta">): Alert["severity"] {
  if (Math.abs(row.variance) >= 15 || (row.volatilityLabel === "High" && row.variance <= -8)) {
    return "High";
  }
  if (Math.abs(row.variance) >= 8 || Math.abs(row.unitValueDelta) >= 8) {
    return "Medium";
  }
  return "Low";
}

function impactScore(row: Pick<CategoryRow, "variance" | "latestValue">): number {
  return Math.abs(row.variance) * Math.max(row.latestValue, 0.01);
}

export function explainCategory(
  row: Omit<CategoryRow, "explanation" | "recommendation">,
  flow: FlowKey,
): { explanation: string; recommendation: string } {
  const dir = direction(flow);
  const varAbs = formatPct(Math.abs(row.variance));
  if (row.variance <= -8 && Math.abs(row.unitValueDelta) < 4) {
    return {
      explanation: `Monthly ${dir} value is ${varAbs} below the seasonally adjusted expectation. Volume, not price, explains most of the gap.`,
      recommendation:
        "Confirm shipment status with primary suppliers and hold a short safety buffer until arrivals normalise.",
    };
  }
  if (row.unitValueDelta >= 8) {
    return {
      explanation: `Value is holding while mix or price moves: average unit value is ${formatPct(row.unitValueDelta)} year-on-year. This is a landed-cost signal, not a demand signal.`,
      recommendation:
        "Reprice landed cost for the next assortment and check whether freight, fibre, or FX is driving the increase.",
    };
  }
  if (row.variance >= 8) {
    return {
      explanation: `${dir[0]?.toUpperCase()}${dir.slice(1)} flows are ${varAbs} ahead of the seasonal baseline, which can compress warehouse intake if the peak has shifted earlier.`,
      recommendation: "Shift receiving capacity forward and pre-book dock slots for the next intake wave.",
    };
  }
  if (row.volatilityLabel === "High") {
    return {
      explanation:
        "A relatively small or lumpy monthly series makes percentage variance look large relative to absolute exposure.",
      recommendation: "Aggregate smaller orders into fewer consolidated shipments to cut unit freight and forecast noise.",
    };
  }
  return {
    explanation: `Variance has stayed near the historical corridor (${formatPct(row.variance)} vs. seasonal expectation).`,
    recommendation: "No action needed beyond monitoring; keep the standard replenishment cadence.",
  };
}

function alertCopy(
  row: CategoryRow,
  flow: FlowKey,
): Pick<Alert, "title" | "detail" | "action"> {
  const dir = direction(flow);
  if (row.variance <= -8 && Math.abs(row.unitValueDelta) < 4) {
    return {
      title: `${row.label} ${formatPct(Math.abs(row.variance))} below expected`,
      detail: `${row.label} ${dir} value is running below its seasonal band while unit value is ${formatPct(row.unitValueDelta)} year-on-year.`,
      action: "Review supplier lead time",
    };
  }
  if (row.unitValueDelta >= 8) {
    return {
      title: `Unit value rising for ${row.label.toLowerCase()}`,
      detail: `Average unit value is ${formatPct(row.unitValueDelta)} year-on-year at ${formatEur(row.latestValue)} in the latest month, pointing to cost pass-through rather than mix alone.`,
      action: "Re-check landed cost assumptions",
    };
  }
  if (row.variance >= 8) {
    return {
      title: `${row.label} peak running early`,
      detail: `The latest month is ${formatPct(row.variance)} above the seasonally adjusted expectation, which can pull intake forward versus the prior two years.`,
      action: "Re-phase inbound receiving slots",
    };
  }
  if (row.volatilityLabel === "High") {
    return {
      title: `${row.label} flows lumpy`,
      detail: `Volumes are ${formatEur(row.latestValue)} in the latest month with high month-to-month dispersion, so forecast confidence is wide.`,
      action: "Confirm next-cycle order coverage",
    };
  }
  return {
    title: `${row.label} inside seasonal range`,
    detail: `After recent swings, monthly ${dir} flows are close to the expected corridor (${formatPct(row.variance)} variance).`,
    action: "Release buffer stock hold",
  };
}

export function buildAlerts(data: Dataset, flow: FlowKey): Alert[] {
  if (data.isEmpty) return [];
  return [...data.categoryRows]
    .sort((a, b) => impactScore(b) - impactScore(a))
    .slice(0, 3)
    .map((row, i) => {
      const copy = alertCopy(row, flow);
      return {
        id: row.id,
        rank: i + 1,
        severity: severityOf(row),
        categoryId: row.id,
        ...copy,
      };
    });
}
