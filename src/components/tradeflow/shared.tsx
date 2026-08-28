import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  title,
  subtitle,
  action,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-lg border border-hairline bg-panel shadow-[0_1px_2px_rgba(20,28,48,0.04)]",
        className,
      )}
    >
      {(title || action) && (
        <header className="flex flex-wrap items-start justify-between gap-3 border-b border-hairline px-5 py-4">
          <div>
            {title && (
              <h2 className="text-[0.95rem] font-semibold tracking-tight text-navy">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-0.5 text-xs leading-relaxed text-slate-muted">{subtitle}</p>
            )}
          </div>
          {action}
        </header>
      )}
      <div className={cn("px-5 py-4", bodyClassName)}>{children}</div>
    </section>
  );
}

export function Delta({
  value,
  invert = false,
}: {
  value: number;
  invert?: boolean | undefined;
}) {
  const good = invert ? value < 0 : value > 0;
  const neutral = Math.abs(value) < 0.15;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-1.5 py-0.5 text-[0.7rem] font-medium tabular-nums",
        neutral
          ? "bg-muted text-slate-muted"
          : good
            ? "bg-teal-soft text-teal"
            : "bg-saffron-soft text-saffron",
      )}
    >
      {value > 0 ? "+" : ""}
      {value.toFixed(1)}%
    </span>
  );
}

export function SeverityTag({ severity }: { severity: "High" | "Medium" | "Low" }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-sm border px-1.5 py-0.5 text-[0.68rem] font-medium uppercase tracking-wide",
        severity === "High"
          ? "border-saffron/40 bg-saffron-soft text-saffron"
          : severity === "Medium"
            ? "border-hairline bg-muted text-navy-soft"
            : "border-teal/30 bg-teal-soft text-teal",
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          severity === "High"
            ? "bg-saffron"
            : severity === "Medium"
              ? "bg-navy-soft"
              : "bg-teal",
        )}
      />
      {severity}
    </span>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-hairline bg-background/60 px-6 py-12 text-center">
      <p className="text-sm font-medium text-navy">{title}</p>
      <p className="max-w-sm text-xs leading-relaxed text-slate-muted">{body}</p>
    </div>
  );
}
