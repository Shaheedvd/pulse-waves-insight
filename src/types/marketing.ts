
export interface MarketingTask {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  description: string;
  trackingMethod: string;
  assignedTo: string | null;
  dueDate: string | null;
  status: "pending" | "in-progress" | "completed" | "overdue";
  completionDate?: string;
  metrics?: {
    [key: string]: number | string;
  };
}

export interface MarketingCategory {
  name: string;
  subcategories: {
    name: string;
    tasks: MarketingTask[];
  }[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "not-started" | "in-progress" | "on-hold" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  assignedTo: string[];
  completionPercentage: number;
  tasks: ProjectTask[];
  createdBy: string;
  createdAt: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "overdue";
  assignedTo: string | null;
  dueDate: string | null;
  completionDate?: string;
  priority: "low" | "medium" | "high";
  dependsOn?: string[];
}

export interface TrainingResource {
  id: string;
  title: string;
  category: "SEO" | "Social Media" | "Email Marketing" | "Collaboration" | "Gamification";
  description: string;
  contentType: "video" | "document" | "quiz" | "interactive";
  url: string;
  createdBy: string;
  createdAt: string;
}

export interface AdminKpi {
  id: string;
  name: string;
  category: "marketing" | "sales" | "operations" | "training";
  description: string;
  target: string;
  current: number | null;
  unit: string;
  progress: number;
  trend: "up" | "down" | "stable" | "none";
  lastUpdated: string;
}
