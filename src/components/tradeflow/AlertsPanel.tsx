import { ArrowUpRight } from "lucide-react";
import { Panel, SeverityTag, EmptyState } from "./shared";
import type { Alert } from "@/lib/trade-data";

export function AlertsPanel({
  alerts,
  onOpen,
}: {
  alerts: Alert[];
  onOpen: (categoryId: string) => void;
}) {
  return (
    <Panel
      title="Planner attention"
      subtitle="Ranked by sourcing impact over the next planning cycle."
      bodyClassName="p-0"
    >
      {alerts.length === 0 ? (
        <div className="p-5">
          <EmptyState
            title="Nothing flagged"
            body="No monitored categories fall inside the current filter, so there is nothing for a planner to review."
          />
        </div>
      ) : (
        <ul className="divide-y divide-hairline">
          {alerts.map((a) => (
            <li key={a.id} className="px-5 py-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 font-mono text-xs text-slate-muted">
                  {String(a.rank).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold leading-snug text-navy">{a.title}</h3>
                    <SeverityTag severity={a.severity} />
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-muted">{a.detail}</p>
                  <button
                    type="button"
                    onClick={() => onOpen(a.categoryId)}
                    className="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-navy underline decoration-hairline underline-offset-4 transition-colors hover:decoration-navy"
                  >
                    {a.action}
                    <ArrowUpRight className="size-3.5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
