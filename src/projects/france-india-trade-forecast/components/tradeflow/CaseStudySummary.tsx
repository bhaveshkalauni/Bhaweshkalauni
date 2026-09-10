import type { AnalysisReport } from "@/src/projects/france-india-trade-forecast/lib/analysis";
import { formatEur } from "@/src/projects/france-india-trade-forecast/lib/trade-data";

function pct(v: number | null): string {
  if (v == null || !Number.isFinite(v)) return "—";
  return `${(v * 100).toFixed(0)}%`;
}

export function CaseStudySummary({ report }: { report: AnalysisReport }) {
  const h = report.headline;
  const beat =
    h.mapeTrendH1 != null && h.mapeSeasonalH1 != null
      ? h.mapeTrendH1 < h.mapeSeasonalH1
        ? `that beats seasonal-naive (${pct(h.mapeSeasonalH1)})`
        : `which does not beat seasonal-naive (${pct(h.mapeSeasonalH1)}) — the trend term is kept only where it earns its place`
      : "versus seasonal-naive and last-month naive on the same origins";

  return (
    <section className="rounded-lg border border-hairline bg-panel px-5 py-6 sm:px-6">
      <p className="text-[0.68rem] font-medium uppercase tracking-wide text-slate-muted">
        Case summary
      </p>
      <ol className="mt-3 space-y-2.5 text-sm leading-relaxed text-navy-soft">
        <li>
          <span className="font-medium text-navy">Question. </span>
          Which France→India soft-goods import chapters (HS 52, 61, 62, 63, 64) need planner
          attention in the next three months?
        </li>
        <li>
          <span className="font-medium text-navy">Data. </span>
          Eurostat Comext {report.meta.datasetId}, monthly France imports from India,{" "}
          {report.meta.historyStartLabel} – {report.meta.historyEndLabel}. Snapshot baked at build
          time — not a live API call.
        </li>
        <li>
          <span className="font-medium text-navy">Method. </span>
          Seasonal-naive + trend: F(t) = A(t−12) × (1 + trailing-12 YoY). Holt-Winters was rejected
          because its smoothing parameters are hard to defend.
        </li>
        <li>
          <span className="font-medium text-navy">Validation. </span>
          Rolling-origin backtest, one-month ahead MAPE {pct(h.mapeTrendH1)} {beat}. Naive last-month
          MAPE {pct(h.mapeNaiveH1)}.
        </li>
        <li>
          <span className="font-medium text-navy">Finding. </span>
          Rolling-12 import value {formatEur(h.importValueM, 0)}; next-quarter projection{" "}
          {formatEur(h.forecastM, 0)}.{" "}
          {h.flaggedLabel ? (
            <>
              {h.flaggedLabel} is flagged {h.flaggedSeverity?.toLowerCase()} — {h.flaggedAction}.
            </>
          ) : (
            <>No chapter sits outside its own 1.5σ residual corridor this month.</>
          )}
        </li>
      </ol>
    </section>
  );
}
