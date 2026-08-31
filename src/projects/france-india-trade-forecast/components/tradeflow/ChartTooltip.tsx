export interface TooltipRow {
  label: string;
  value: string;
}

export function TooltipShell({
  title,
  rows,
  note,
}: {
  title: string;
  rows: TooltipRow[];
  note?: string | undefined;
}) {
  return (
    <div className="min-w-[10rem] rounded-md border border-hairline bg-panel px-3 py-2 shadow-[0_6px_18px_rgba(20,28,48,0.1)]">
      <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-slate-muted">
        {title}
      </p>
      <dl className="mt-1.5 space-y-1">
        {rows.map((r) => (
          <div key={r.label} className="flex items-baseline justify-between gap-4">
            <dt className="text-xs text-slate-muted">{r.label}</dt>
            <dd className="text-xs font-semibold tabular-nums text-navy">{r.value}</dd>
          </div>
        ))}
      </dl>
      {note && <p className="mt-1.5 text-[0.68rem] text-saffron">{note}</p>}
    </div>
  );
}
