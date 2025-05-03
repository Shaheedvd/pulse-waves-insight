
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

// Updated MarketingTask interface to include subcategory and trackingMethod
export interface MarketingTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string | null;
  dueDate: string | null;
  status: "pending" | "in-progress" | "completed" | "on-hold" | "overdue";
  priority?: "low" | "medium" | "high";
  category: string;
  subcategory: string;
  trackingMethod: string;
  tags?: string[];
  completionDate?: string;
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

// Add AdminKpi interface
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

// Add ISO audit template reference for AuditSheetDesigner
export const ISO_AUDIT_TEMPLATE = {
  id: "iso-audit",
  name: "ISO 9001 Audit Template",
  description: "Standard audit template for ISO 9001 quality management certification",
  sections: [
    {
      title: "Quality Management System",
      questions: [
        {
          id: "iso-1",
          text: "Has the organization established a documented quality management system?",
          type: "checkbox",
          required: true
        },
        {
          id: "iso-2",
          text: "Are quality objectives established at relevant functions and levels?",
          type: "checkbox",
          required: true
        }
      ]
    },
    {
      title: "Management Responsibility",
      questions: [
        {
          id: "iso-3",
          text: "Is there evidence that top management is committed to the QMS?",
          type: "checkbox",
          required: true
        },
        {
          id: "iso-4",
          text: "Is the quality policy documented and communicated?",
          type: "checkbox",
          required: true
        }
      ]
    }
  ]
};

// Add marketing strategies constant
export const MARKETING_STRATEGIES = [
  {
    category: "Digital Marketing",
    subcategories: [
      {
        name: "SEO",
        tasks: [
          {
            title: "Keyword Research",
            description: "Conduct keyword research to identify relevant search terms for our services.",
            trackingMethod: "Document with keyword list"
          },
          {
            title: "Content Optimization",
            description: "Optimize existing website pages for target keywords.",
            trackingMethod: "List of optimized pages"
          }
        ]
      },
      {
        name: "PPC",
        tasks: [
          {
            title: "Ad Campaign Setup",
            description: "Create targeted PPC campaigns for key services.",
            trackingMethod: "Campaign performance report"
          }
        ]
      }
    ]
  },
  {
    category: "Content Marketing",
    subcategories: [
      {
        name: "Blog Posts",
        tasks: [
          {
            title: "Content Calendar Creation",
            description: "Develop a monthly content calendar aligned with marketing goals.",
            trackingMethod: "Completed calendar document"
          },
          {
            title: "Blog Post Writing",
            description: "Create engaging blog posts based on the content calendar.",
            trackingMethod: "Published posts"
          }
        ]
      }
    ]
  },
  {
    category: "Social Media Marketing",
    subcategories: [
      {
        name: "LinkedIn",
        tasks: [
          {
            title: "Profile Optimization",
            description: "Update company page with current information and branding.",
            trackingMethod: "Before/after screenshot"
          },
          {
            title: "Content Engagement",
            description: "Schedule regular posts and engage with industry content.",
            trackingMethod: "Engagement metrics report"
          }
        ]
      }
    ]
  }
];
