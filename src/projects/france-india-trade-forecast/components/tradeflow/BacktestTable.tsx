import type { AccuracyCell, AnalysisReport } from "@/src/projects/france-india-trade-forecast/lib/analysis";

const METHOD_LABEL: Record<AccuracyCell["method"], string> = {
  trend: "Seasonal-naive + trend",
  seasonal: "Seasonal-naive",
  naive: "Last-month naive",
};

function pct(v: number): string {
  if (!Number.isFinite(v)) return "—";
  return `${(v * 100).toFixed(1)}%`;
}

export function BacktestTable({ report }: { report: AnalysisReport }) {
  const rows = report.basketAccuracy.filter((c) => c.horizon === 1 || c.horizon === 3);
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-sm">
        <thead>
          <tr className="border-b border-hairline text-left text-[0.68rem] uppercase tracking-wide text-slate-muted">
            <th className="py-2 pr-4 font-medium">Method</th>
            <th className="py-2 pr-4 font-medium">Horizon</th>
            <th className="py-2 pr-4 text-right font-medium">n</th>
            <th className="py-2 pr-4 text-right font-medium">MAPE</th>
            <th className="py-2 text-right font-medium">MdAPE</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-hairline">
          {rows.map((c) => (
            <tr key={`${c.method}-${c.horizon}`}>
              <td className="py-2.5 pr-4 text-navy">{METHOD_LABEL[c.method]}</td>
              <td className="py-2.5 pr-4 text-navy-soft">h = {c.horizon}</td>
              <td className="py-2.5 pr-4 text-right tabular-nums text-navy-soft">{c.n}</td>
              <td className="py-2.5 pr-4 text-right tabular-nums font-medium text-navy">
                {pct(c.mape)}
              </td>
              <td className="py-2.5 text-right tabular-nums text-navy-soft">{pct(c.mdape)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-xs leading-relaxed text-slate-muted">
        Errors are percentage-based on the five-chapter basket. MdAPE sits beside MAPE because MAPE
        is unstable when a month is small — cotton (HS 52) in particular.
      </p>
    </div>
  );
}
