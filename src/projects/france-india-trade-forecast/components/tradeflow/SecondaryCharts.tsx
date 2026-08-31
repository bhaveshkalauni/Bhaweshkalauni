import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Panel, EmptyState } from "./shared";
import { TooltipShell } from "./ChartTooltip";
import { formatEur, type Dataset } from "@/src/projects/france-india-trade-forecast/lib/trade-data";

const axis = { fontSize: 11, fill: "var(--slate-muted)" };

export function VolumeVsUnitValue({ data }: { data: Dataset }) {
  const rows = data.chartData.filter((d) => d.actual !== null);
  return (
    <Panel
      title="Volume vs. unit value"
      subtitle="Bars show net weight; the teal line shows average unit value per kilogram."
    >
      {data.isEmpty ? (
        <EmptyState
          title="No volume series"
          body="Select a covered product category to compare shipped weight against unit value."
        />
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={rows} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid stroke="var(--hairline)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={axis}
                tickLine={false}
                axisLine={{ stroke: "var(--hairline)" }}
                minTickGap={28}
                tickFormatter={(v: string) => v.split(" ")[0] ?? ""}
              />
              <YAxis
                yAxisId="vol"
                tick={axis}
                tickLine={false}
                axisLine={false}
                width={48}
                tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
              />
              <YAxis
                yAxisId="uv"
                orientation="right"
                tick={axis}
                tickLine={false}
                axisLine={false}
                width={44}
                tickFormatter={(v: number) => `€${v.toFixed(0)}`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0]?.payload as Dataset["chartData"][number];
                  return (
                    <TooltipShell
                      title={String(label)}
                      rows={[
                        { label: "Volume", value: `${Math.round(p.volume ?? 0)} t` },
                        { label: "Unit value", value: `€${(p.unitValue ?? 0).toFixed(2)}/kg` },
                      ]}
                    />
                  );
                }}
              />
              <Bar
                yAxisId="vol"
                dataKey="volume"
                fill="var(--navy)"
                fillOpacity={0.22}
                radius={[2, 2, 0, 0]}
                isAnimationActive={false}
              />
              <Line
                isAnimationActive={false}
                yAxisId="uv"
                dataKey="unitValue"
                stroke="var(--teal)"
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </Panel>
  );
}

export function TopCategories({ data }: { data: Dataset }) {
  return (
    <Panel
      title="Top product categories by import value"
      subtitle={`Rolling 12 months to ${data.meta?.latestMonthLabel ?? "latest month"}.`}
    >
      {data.topCategories.length === 0 ? (
        <EmptyState
          title="No categories to rank"
          body="The current product filter resolves to zero categories in the live extract."
        />
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.topCategories}
              layout="vertical"
              margin={{ top: 4, right: 24, bottom: 4, left: 8 }}
            >
              <CartesianGrid stroke="var(--hairline)" horizontal={false} />
              <XAxis
                type="number"
                tick={axis}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => `€${Math.round(v)}m`}
              />
              <YAxis
                type="category"
                dataKey="label"
                tick={{ ...axis, fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={110}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0]?.payload as { label: string; value: number };
                  return (
                    <TooltipShell
                      title={p.label}
                      rows={[{ label: "12-month value", value: formatEur(p.value, 0) }]}
                    />
                  );
                }}
              />
              <Bar dataKey="value" radius={[0, 3, 3, 0]} barSize={18} isAnimationActive={false}>
                {data.topCategories.map((c, i) => (
                  <Cell key={c.label} fill={i === 0 ? "var(--navy)" : "var(--navy-soft)"} fillOpacity={i === 0 ? 1 : 0.55} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Panel>
  );
}
