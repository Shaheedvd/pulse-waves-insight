
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

export interface EmployeeProductivityMetric {
  id: string;
  name: string;
  description: string;
  category: "individual" | "team" | "time" | "engagement" | "sla";
  unit?: string;
  target?: number;
}

export interface EmployeeProductivityData {
  employeeId: string;
  employeeName: string;
  department: string;
  role: string;
  location: string;
  metrics: Record<string, number | string>;
  period: string;
}
