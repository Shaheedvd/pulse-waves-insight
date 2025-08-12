
import { UserRole } from "@/contexts/AuthContext";

export type TrainingDocumentType = "guide" | "tutorial" | "reference" | "video" | "faq";

export type TrainingAccessLevel = UserRole | "all";

export interface TrainingDocument {
  id: string;
  title: string;
  description: string;
  type: TrainingDocumentType;
  category: string;
  url: string;
  accessLevels: TrainingAccessLevel[];
  createdBy: string;
  createdAt: string;
  tags?: string[];
}
