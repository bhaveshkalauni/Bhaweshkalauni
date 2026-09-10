import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export type DataStatus = "live" | "stale" | "loading" | "error" | "snapshot";

const BADGE: Record<DataStatus, { label: string; dot: string }> = {
  live: { label: "Live · Eurostat Comext", dot: "bg-teal" },
  snapshot: { label: "Snapshot · Eurostat Comext", dot: "bg-teal" },
  stale: { label: "Stale cache · Eurostat", dot: "bg-saffron" },
  loading: { label: "Loading Comext", dot: "bg-navy-soft" },
  error: { label: "Comext unavailable", dot: "bg-saffron" },
};

export function TopBar({
  status = "live",
  backTo,
}: {
  status?: DataStatus;
  backTo?: ReactNode;
}) {
  const badge = BADGE[status];
  return (
    <header className="sticky top-0 z-30 border-b border-hairline bg-panel/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-baseline gap-3">
          <span className="text-sm font-semibold tracking-tight text-navy">
            TradeFlow Intelligence
          </span>
          <span className="hidden truncate text-xs text-slate-muted sm:inline">
            France → India | Soft-goods imports
          </span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-sm border border-hairline bg-muted px-2 py-1 text-[0.68rem] font-medium uppercase tracking-wide text-navy-soft">
            <span className={`size-1.5 rounded-full ${badge.dot}`} />
            {badge.label}
          </span>
          {backTo ?? (
            <a
              href="/#projects"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-navy-soft transition-colors hover:text-navy"
            >
              <ArrowLeft className="size-3.5" />
              Back to Portfolio
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
