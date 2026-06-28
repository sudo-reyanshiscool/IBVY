"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const IVY = "#092045";
const BRASS = "#9C7A3C";
const SAGE = "#74879C";

/** Supply funnel: teachers in training, certified, placed. */
export function SupplyChart({
  data,
}: {
  data: { stage: string; count: number }[];
}) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
          <XAxis
            dataKey="stage"
            tick={{ fontSize: 12, fill: "#50584f" }}
            axisLine={{ stroke: "#D6D2C4" }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12, fill: "#50584f" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "rgba(126,150,133,0.15)" }}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #D6D2C4",
              background: "#FBFAF5",
              fontSize: 12,
            }}
          />
          <Bar dataKey="count" fill={IVY} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Fee pipeline: pending, invoiced, paid. */
export function FeePipelineChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  const colours = [SAGE, BRASS, IVY];
  const hasData = data.some((d) => d.value > 0);
  if (!hasData) {
    return (
      <div className="flex h-56 items-center justify-center text-sm text-muted-foreground">
        No fees recorded yet.
      </div>
    );
  }
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={45}
            outerRadius={75}
            paddingAngle={2}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={colours[i % colours.length]} />
            ))}
          </Pie>
          <Legend
            iconType="circle"
            formatter={(v) => (
              <span style={{ fontSize: 12, color: "#50584f" }}>{v}</span>
            )}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #D6D2C4",
              background: "#FBFAF5",
              fontSize: 12,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
