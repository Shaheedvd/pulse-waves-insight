
export interface KpiMetric {
  id: string;
  category: "financial" | "operational" | "client" | "internal";
  name: string;
  description: string;
  target: string;
  weighting: number;
  currentValue: number | null;
  status: "exceeding" | "meeting" | "below" | "critical" | "pending";
  trend: "up" | "down" | "stable" | "none";
}

export interface KpiCategory {
  name: string;
  metrics: KpiMetric[];
  totalWeight: number;
}
