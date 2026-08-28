import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Panel, EmptyState } from "./shared";
import { TooltipShell } from "./ChartTooltip";
import { formatEur, type Dataset } from "@/lib/trade-data";

const axis = { fontSize: 11, fill: "var(--slate-muted)" };

function LegendRow({ actualTo, forecastWindow }: { actualTo: string; forecastWindow: string }) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-muted">
      <span className="inline-flex items-center gap-1.5">
        <span className="h-0.5 w-5 rounded bg-navy" /> Actual (to {actualTo})
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-0.5 w-5 rounded border-t-2 border-dashed border-saffron" /> Forecast ({forecastWindow})
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-2.5 w-5 rounded-sm bg-saffron-soft" /> Confidence band
      </span>
    </div>
  );
}

export function TradeChart({ data }: { data: Dataset }) {
  return (
    <Panel
      title="Monthly inbound trade value"
      subtitle="Reported monthly value with a three-month projection and confidence band."
      action={
        <LegendRow
          actualTo={data.meta?.latestMonthLabel ?? "latest"}
          forecastWindow={data.meta?.forecastLabel ?? "next 3 months"}
        />
      }
    >
      {data.isEmpty ? (
        <EmptyState
          title="No monthly series for this selection"
          body="Choose a product category with reported France–India flows to restore the trend view."
        />
      ) : (
        <div className="h-[20rem] w-full sm:h-[22rem]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data.chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid stroke="var(--hairline)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={axis}
                tickLine={false}
                axisLine={{ stroke: "var(--hairline)" }}
                interval="preserveStartEnd"
                minTickGap={24}
                tickFormatter={(v: string) => {
                  const [m = "", y = ""] = v.split(" ");
                  return m === "Jan" ? `${m} ${y.slice(2)}` : m;
                }}
              />
              <YAxis
                tick={axis}
                tickLine={false}
                axisLine={false}
                width={54}
                tickFormatter={(v: number) => `€${Math.round(v)}m`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0]?.payload as Dataset["chartData"][number];
                  const isF = p.actual === null;
                  return (
                    <TooltipShell
                      title={String(label)}
                      rows={[
                        {
                          label: isF ? "Forecast value" : "Trade value",
                          value: formatEur(isF ? (p.forecast ?? 0) : (p.actual ?? 0)),
                        },
                        ...(isF
                          ? [
                              {
                                label: "Range",
                                value: `${formatEur(p.lower ?? 0)} – ${formatEur(p.upper ?? 0)}`,
                              },
                            ]
                          : [{ label: "Volume", value: `${Math.round(p.volume ?? 0)} t` }]),
                      ]}
                      note={isF ? "Projected — not reported data" : undefined}
                    />
                  );
                }}
              />
              <Legend content={() => null} />
              <Area
                isAnimationActive={false}
                dataKey="upper"
                stroke="none"
                fill="var(--saffron)"
                fillOpacity={0.14}
                connectNulls
              />
              <Area
                isAnimationActive={false}
                dataKey="lower"
                stroke="none"
                fill="var(--panel)"
                fillOpacity={1}
                connectNulls
              />
              <Area
                isAnimationActive={false}
                dataKey="actual"
                stroke="var(--navy)"
                strokeWidth={2}
                fill="var(--navy)"
                fillOpacity={0.07}
                dot={false}
                activeDot={{ r: 3, fill: "var(--navy)" }}
              />
              <Line
                isAnimationActive={false}
                dataKey="forecast"
                stroke="var(--saffron)"
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={{ r: 2.5, fill: "var(--saffron)", strokeWidth: 0 }}
                connectNulls
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </Panel>
  );
}
