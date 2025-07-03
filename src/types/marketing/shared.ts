
export interface AdminKpi {
  id: string;
  name: string;
  category: "marketing" | "sales" | "operations" | "training" | "finance" | "hr";
  description: string;
  target: string;
  current: number | null;
  unit: string;
  progress: number;
  trend: "up" | "down" | "stable" | "none";
  lastUpdated: string;
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
  tasks: Array<{
    id: string;
    description: string;
    completed: boolean;
  }>;
  createdBy: string;
  createdAt: string;
}

export interface TrainingResource {
  id: string;
  title: string;
  category: "SEO" | "Social Media" | "Email Marketing" | "Collaboration" | "Gamification";
  description: string;
  contentType: "document" | "video" | "quiz" | "interactive";
  url: string;
  createdBy: string;
  createdAt: string;
}
