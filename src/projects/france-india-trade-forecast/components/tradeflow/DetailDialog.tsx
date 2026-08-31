import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/projects/france-india-trade-forecast/components/ui/dialog";
import { TooltipShell } from "./ChartTooltip";
import { Delta } from "./shared";
import { formatEur, formatPct, formatTonnes, type CategoryRow } from "@/src/projects/france-india-trade-forecast/lib/trade-data";

export function DetailDialog({
  row,
  onClose,
}: {
  row: CategoryRow | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!row} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto border-hairline bg-panel sm:max-w-2xl">
        {row && (
          <>
            <DialogHeader>
              <p className="font-mono text-xs text-slate-muted">HS {row.hsCode}</p>
              <DialogTitle className="text-lg font-semibold tracking-tight text-navy">
                {row.label}
              </DialogTitle>
              <DialogDescription className="text-xs leading-relaxed text-slate-muted">
                Last 24 reported months and the three-month projection for this category.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { l: "Latest month", v: formatEur(row.latestValue) },
                { l: "Volume", v: formatTonnes(row.latestVolume) },
                { l: "Unit value", v: `€${row.unitValue.toFixed(2)}/kg` },
                { l: "Volatility", v: `${(row.volatility * 100).toFixed(0)}%` },
              ].map((k) => (
                <div key={k.l} className="rounded-md border border-hairline bg-background px-3 py-2.5">
                  <p className="text-[0.66rem] uppercase tracking-wide text-slate-muted">{k.l}</p>
                  <p className="mt-1 text-sm font-semibold tabular-nums text-navy">{k.v}</p>
                </div>
              ))}
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={row.series.map((p) => ({
                    month: p.month,
                    value: p.forecast ? null : p.value,
                    projected: p.forecast ? p.value : null,
                  }))}
                  margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
                >
                  <CartesianGrid stroke="var(--hairline)" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 10, fill: "var(--slate-muted)" }}
                    tickLine={false}
                    axisLine={{ stroke: "var(--hairline)" }}
                    minTickGap={26}
                    tickFormatter={(v: string) => v.split(" ")[0] ?? ""}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "var(--slate-muted)" }}
                    tickLine={false}
                    axisLine={false}
                    width={46}
                    tickFormatter={(v: number) => `€${Math.round(v)}m`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      const p = payload[0]?.payload as { value: number | null; projected: number | null };
                      const isF = p.value === null;
                      return (
                        <TooltipShell
                          title={String(label)}
                          rows={[
                            {
                              label: isF ? "Forecast" : "Value",
                              value: formatEur(isF ? (p.projected ?? 0) : (p.value ?? 0)),
                            },
                          ]}
                        />
                      );
                    }}
                  />
                  <Area
                isAnimationActive={false}
                    dataKey="value"
                    stroke="var(--navy)"
                    strokeWidth={2}
                    fill="var(--navy)"
                    fillOpacity={0.08}
                    dot={false}
                  />
                  <Area
                isAnimationActive={false}
                    dataKey="projected"
                    stroke="var(--saffron)"
                    strokeWidth={2}
                    strokeDasharray="5 4"
                    fill="var(--saffron)"
                    fillOpacity={0.1}
                    dot={false}
                    connectNulls
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              <div className="rounded-md border border-hairline bg-background px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-muted">
                    What the data shows
                  </p>
                  <Delta value={row.variance} />
                  <span className="text-[0.7rem] text-slate-muted">
                    variance vs. expectation · unit value {formatPct(row.unitValueDelta)} YoY
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-navy-soft">
                  {row.explanation}
                </p>
              </div>
              <div className="rounded-md border border-saffron/30 bg-saffron-soft/50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-saffron">
                  Recommendation
                </p>
                <p className="mt-2 text-sm leading-relaxed text-navy">{row.recommendation}</p>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
