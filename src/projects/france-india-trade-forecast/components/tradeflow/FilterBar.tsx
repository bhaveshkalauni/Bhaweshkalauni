import type { ReactNode } from "react";
import { Download } from "lucide-react";
import { Button } from "@/src/projects/france-india-trade-forecast/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/projects/france-india-trade-forecast/components/ui/select";
import { DATE_RANGES, FLOWS, PRODUCT_GROUPS, type Filters, type HsLevel } from "@/src/projects/france-india-trade-forecast/lib/trade-data";
import { cn } from "@/src/projects/france-india-trade-forecast/lib/utils";

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <span className="text-[0.68rem] font-medium uppercase tracking-wide text-slate-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

export function FilterBar({
  filters,
  onChange,
  onExport,
}: {
  filters: Filters;
  onChange: (next: Partial<Filters>) => void;
  onExport: () => void;
}) {
  return (
    <div className="rounded-lg border border-hairline bg-panel px-4 py-4 sm:px-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:flex lg:flex-nowrap lg:items-end lg:gap-4">
        <Field label="Flow" className="lg:w-[13.5rem] lg:shrink-0">
          <Select value={filters.flow} onValueChange={(v) => onChange({ flow: v as Filters["flow"] })}>
            <SelectTrigger className="border-hairline bg-background text-sm shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-hairline bg-panel">
              {FLOWS.map((f) => (
                <SelectItem key={f.id} value={f.id}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Product category" className="lg:w-[13rem] lg:shrink-0">
          <Select value={filters.group} onValueChange={(v) => onChange({ group: v })}>
            <SelectTrigger className="border-hairline bg-background text-sm shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-hairline bg-panel">
              {PRODUCT_GROUPS.map((g) => (
                <SelectItem key={g.id} value={g.id}>
                  {g.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="HS level" className="lg:shrink-0">
          <div className="inline-flex rounded-md border border-hairline bg-background p-0.5">
            {(["HS2", "HS4"] as HsLevel[]).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => onChange({ hsLevel: lvl })}
                aria-pressed={filters.hsLevel === lvl}
                className={cn(
                  "rounded-[0.3rem] px-3 py-1.5 text-xs font-medium transition-colors",
                  filters.hsLevel === lvl
                    ? "bg-navy text-panel"
                    : "text-slate-muted hover:text-navy",
                )}
              >
                {lvl}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Date range" className="lg:w-[12rem] lg:shrink-0">
          <Select value={filters.range} onValueChange={(v) => onChange({ range: v })}>
            <SelectTrigger className="border-hairline bg-background text-sm shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-hairline bg-panel">
              {DATE_RANGES.map((r) => (
                <SelectItem key={r.id} value={r.id}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Button
          variant="default"
          onClick={onExport}
          className="h-9 gap-2 rounded-md border border-navy bg-navy text-panel shadow-none hover:bg-navy-soft hover:text-panel lg:ml-auto lg:shrink-0"
        >
          <Download className="size-3.5" />
          Export insight
        </Button>
      </div>
    </div>
  );
}
