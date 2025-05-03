
import { UserRole } from "@/contexts/AuthContext";

export type TrainingResourceCategory = "SEO" | "Social Media" | "Email Marketing" | "Content Creation" | "Analytics" | "Collaboration" | "Gamification";

export interface TrainingResource {
  id: string;
  title: string;
  category: TrainingResourceCategory;
  description: string;
  contentType: "document" | "video" | "quiz" | "interactive";
  url: string;
  createdBy: string;
  createdAt: string;
}

export type ProjectStatus = "completed" | "in-progress" | "not-started" | "on-hold";
export type ProjectPriority = "high" | "medium" | "low";

export interface ProjectTask {
  id: string;
  description: string;
  completed: boolean;
  assignedTo?: string;
  dueDate?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  dueDate: string;
  assignedTo: string[];
  completionPercentage: number;
  tasks: ProjectTask[];
  createdBy: string;
  createdAt: string;
}

export interface MarketingTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
  dueDate: string;
  status: "pending" | "in-progress" | "completed" | "on-hold";
  priority: "low" | "medium" | "high";
  category: string;
  tags?: string[];
}

export interface TrainingDocument {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  url: string;
  accessLevel: UserRole[];
  createdBy: string;
  createdAt: string;
  tags?: string[];
}
