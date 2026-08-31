import { Delta } from "./shared";
import { formatEur, formatTonnes, type Dataset } from "@/src/projects/france-india-trade-forecast/lib/trade-data";

function Kpi({
  label,
  value,
  delta,
  invert,
  helper,
}: {
  label: string;
  value: string;
  delta: number;
  invert?: boolean | undefined;
  helper: string;
}) {
  return (
    <div className="rounded-lg border border-hairline bg-panel px-4 py-4">
      <p className="text-[0.68rem] font-medium uppercase tracking-wide text-slate-muted">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold tabular-nums tracking-tight text-navy">{value}</span>
        <Delta value={delta} invert={invert} />
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-muted">{helper}</p>
    </div>
  );
}

export function KpiCards({ data }: { data: Dataset }) {
  const k = data.kpis;
  if (data.isEmpty) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {["Import value", "Volume", "3-month forecast", "Volatility risk"].map((l) => (
          <div key={l} className="rounded-lg border border-dashed border-hairline bg-panel px-4 py-4">
            <p className="text-[0.68rem] font-medium uppercase tracking-wide text-slate-muted">{l}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-muted">—</p>
            <p className="mt-2 text-xs text-slate-muted">No series in the current selection.</p>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Kpi
        label="Import value"
        value={formatEur(k.importValue, 0)}
        delta={k.importValueDelta}
        helper={`Rolling 12 months to ${data.meta?.latestMonthLabel ?? "latest month"} vs. prior 12 months.`}
      />
      <Kpi
        label="Volume"
        value={formatTonnes(k.volume)}
        delta={k.volumeDelta}
        helper="Net weight of inbound shipments, same comparison window."
      />
      <Kpi
        label="3-month forecast"
        value={formatEur(k.forecast, 0)}
        delta={k.forecastDelta}
        helper={`${data.meta?.forecastLabel ?? "next 3 months"} projection vs. same quarter last year.`}
      />
      <Kpi
        label="Volatility risk"
        value={`${k.volatility.toFixed(1)}%`}
        delta={k.volatilityDelta}
        invert
        helper="Annualised dispersion of monthly flows; higher means less predictable."
      />
    </div>
  );
}
