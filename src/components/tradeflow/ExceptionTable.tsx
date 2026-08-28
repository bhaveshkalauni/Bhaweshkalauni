import { Panel, EmptyState } from "./shared";
import { cn } from "@/lib/utils";
import { formatEur, formatPct, type CategoryRow, type Dataset } from "@/lib/trade-data";

function VolTag({ row }: { row: CategoryRow }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-1.5 py-0.5 text-[0.7rem] font-medium",
        row.volatilityLabel === "High"
          ? "bg-saffron-soft text-saffron"
          : row.volatilityLabel === "Moderate"
            ? "bg-muted text-navy-soft"
            : "bg-teal-soft text-teal",
      )}
    >
      {row.volatilityLabel} · {(row.volatility * 100).toFixed(0)}%
    </span>
  );
}

export function ExceptionTable({
  data,
  hsLevel,
  onOpen,
}: {
  data: Dataset;
  hsLevel: string;
  onOpen: (id: string) => void;
}) {
  const rows = [...data.categoryRows].sort((a, b) => Math.abs(b.variance) - Math.abs(a.variance));
  return (
    <Panel
      title="Categories needing review"
      subtitle={`Ranked by absolute forecast variance · ${hsLevel} codes`}
      bodyClassName="p-0"
    >
      {rows.length === 0 ? (
        <div className="p-5">
          <EmptyState
            title="No exceptions to review"
            body="This selection contains no monitored categories, so no variance can be computed."
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-hairline text-left text-[0.68rem] uppercase tracking-wide text-slate-muted">
                <th className="px-5 py-2.5 font-medium">HS code</th>
                <th className="px-5 py-2.5 font-medium">Category</th>
                <th className="px-5 py-2.5 text-right font-medium">Latest month</th>
                <th className="px-5 py-2.5 text-right font-medium">Forecast variance</th>
                <th className="px-5 py-2.5 font-medium">Volatility</th>
                <th className="px-5 py-2.5 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {rows.map((r) => (
                <tr key={r.id} className="transition-colors hover:bg-muted/60">
                  <td className="px-5 py-3 font-mono text-xs text-slate-muted">{r.hsCode}</td>
                  <td className="px-5 py-3 font-medium text-navy">{r.label}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-navy">
                    {formatEur(r.latestValue)}
                  </td>
                  <td
                    className={cn(
                      "px-5 py-3 text-right font-medium tabular-nums",
                      r.variance < -3 ? "text-saffron" : r.variance > 3 ? "text-teal" : "text-navy-soft",
                    )}
                  >
                    {formatPct(r.variance)}
                  </td>
                  <td className="px-5 py-3">
                    <VolTag row={r} />
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => onOpen(r.id)}
                      className="rounded-sm border border-hairline bg-background px-2.5 py-1 text-xs font-medium text-navy transition-colors hover:bg-muted"
                    >
                      View detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  );
}
