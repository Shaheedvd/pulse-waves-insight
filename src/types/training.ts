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
  tags?: string[];
  accessLevels: string[];
  createdBy: string;
  createdAt: string;
  isBuiltIn?: boolean;
}
