
export interface ComplianceDocument {
  id: string;
  title: string;
  description: string;
  type: DocumentType;
  category: ComplianceCategory;
  version: string;
  status: DocumentStatus;
  author: string;
  reviewer?: string;
  approver?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  expiryDate?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  tags: string[];
  accessLevel: AccessLevel;
  reviewCycle: number; // months
  nextReviewDate: string;
  relatedRegulations: string[];
}

export type DocumentType = 
  | "policy" 
  | "procedure" 
  | "guideline" 
  | "template" 
  | "regulation" 
  | "certification" 
  | "audit_report" 
  | "training_material";

export type ComplianceCategory = 
  | "data_protection" 
  | "financial" 
  | "health_safety" 
  | "environmental" 
  | "quality" 
  | "security" 
  | "legal" 
  | "hr" 
  | "operational";

export type DocumentStatus = 
  | "draft" 
  | "under_review" 
  | "pending_approval" 
  | "approved" 
  | "published" 
  | "archived" 
  | "expired";

export type AccessLevel = "public" | "internal" | "restricted" | "confidential";

export interface DocumentWorkflow {
  id: string;
  documentId: string;
  step: WorkflowStep;
  assignedTo: string;
  status: "pending" | "completed" | "rejected";
  comments?: string;
  completedAt?: string;
  createdAt: string;
}

export type WorkflowStep = "review" | "approval" | "publish";

export interface ComplianceAudit {
  id: string;
  title: string;
  type: "internal" | "external" | "regulatory";
  scope: string;
  auditor: string;
  startDate: string;
  endDate: string;
  status: "planned" | "in_progress" | "completed" | "cancelled";
  findings: AuditFinding[];
  overallRating: "compliant" | "minor_issues" | "major_issues" | "non_compliant";
  reportUrl?: string;
}

export interface AuditFinding {
  id: string;
  category: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  recommendation: string;
  status: "open" | "in_progress" | "resolved" | "accepted_risk";
  assignedTo?: string;
  dueDate?: string;
}

export interface ComplianceRegulation {
  id: string;
  name: string;
  description: string;
  category: ComplianceCategory;
  jurisdiction: string;
  effectiveDate: string;
  lastUpdated: string;
  status: "active" | "pending" | "superseded";
  requirements: RegulationRequirement[];
  relatedDocuments: string[];
}

export interface RegulationRequirement {
  id: string;
  title: string;
  description: string;
  mandatory: boolean;
  complianceStatus: "compliant" | "partial" | "non_compliant" | "not_assessed";
  evidenceDocuments: string[];
  lastAssessed: string;
  nextAssessment: string;
}
