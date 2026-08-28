import type { DatasetMeta } from "@/lib/trade-data";

export function Methodology({ meta }: { meta: DatasetMeta }) {
  const source = meta.updated
    ? `Eurostat Comext ${meta.datasetId} · ${meta.historyStartLabel} – ${meta.historyEndLabel}`
    : "Eurostat Comext DS-045409";
  return (
    <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
      <div className="rounded-lg border border-hairline bg-panel px-5 py-5">
        <h2 className="text-[0.95rem] font-semibold tracking-tight text-navy">Methodology</h2>
        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-muted">
          This interface forecasts <strong className="font-medium text-navy-soft">inbound trade
          flows</strong> — declared customs value and net weight moving between France and India — not
          retail demand. Forecasts use a seasonal-naive baseline with a trend term and a widening
          confidence band across the projection horizon, so variance is judged against a seasonally
          adjusted expectation rather than the prior month.
        </p>
        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-muted">
          Live figures come from <strong className="font-medium text-navy-soft">Eurostat
          (Comext)</strong>, the EU publication of extra-EU customs declarations filed with{" "}
          <strong className="font-medium text-navy-soft">French Customs (Douanes)</strong>. Coverage is
          monthly at HS2 and HS4, refreshed when Eurostat releases the next official period (typically
          a 6–8 week lag).
        </p>
        <dl className="mt-4 grid gap-3 border-t border-hairline pt-4 sm:grid-cols-3">
          {[
            ["Data source", source],
            ["Forecast horizon", `3 months (${meta.forecastLabel})`],
            ["Granularity", "Monthly · HS2 / HS4"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-[0.66rem] uppercase tracking-wide text-slate-muted">{k}</dt>
              <dd className="mt-1 text-xs font-medium text-navy">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-lg border border-hairline bg-navy px-5 py-5">
        <h2 className="text-[0.95rem] font-semibold tracking-tight text-panel">Project note</h2>
        <p className="mt-2 text-xs leading-relaxed text-panel/70">
          First project in a supply-chain and operations portfolio. Live on this site at{" "}
          <span className="font-mono text-panel/90">/projects/france-india-trade-forecast</span>.
        </p>
        <p className="mt-3 text-xs leading-relaxed text-panel/70">
          No authentication and no paid APIs. Charts, filters, and alerts run against one cached
          Comext extract (France–India, last 15 years). Latest official month:{" "}
          {meta.latestMonthLabel}.
        </p>
      </div>
    </div>
  );
}
