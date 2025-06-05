
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import { KpiMetric } from "@/types/kpi";

interface KpiChartProps {
  data: KpiMetric[];
}

const KpiChart: React.FC<KpiChartProps> = ({ data }) => {
  const chartData = data.map(metric => ({
    name: metric.name.split(' ').slice(0, 2).join(' '), // Shorten names for chart
    value: metric.currentValue || 0,
    target: parseFloat(metric.target.replace(/[^\d.]/g, '')) || 0,
    status: metric.status
  }));

  const getBarColor = (status: string) => {
    switch (status) {
      case "exceeding": return "#10b981";
      case "meeting": return "#3b82f6";
      case "below": return "#f59e0b";
      case "critical": return "#ef4444";
      default: return "#6b7280";
    }
  };

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [`${value}%`, name === 'value' ? 'Current' : 'Target']}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.status)} />
            ))}
          </Bar>
          <Bar dataKey="target" fill="#e5e7eb" radius={[4, 4, 0, 0]} opacity={0.5} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default KpiChart;
