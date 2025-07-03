
export interface MarketingTask {
  id: string;
  title: string;
  description: string;
  type: "copywriting" | "design" | "editing" | "campaign-setup" | "reporting" | "qa-testing";
  assignedTo: string;
  dueDate: string;
  status: "todo" | "in-progress" | "completed" | "blocked" | "pending" | "overdue";
  priority: "low" | "medium" | "high";
  campaignId?: string;
  contentId?: string;
  attachments: string[];
  comments: Array<{
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }>;
  createdAt: string;
  updatedAt: string;
  // Additional fields for marketing-specific tasks
  category?: string;
  subcategory?: string;
  trackingMethod?: string;
  completionDate?: string;
}

export interface MarketingRequest {
  id: string;
  type: "graphic" | "brochure" | "social-post" | "ad-campaign" | "event-branding" | "other";
  title: string;
  description: string;
  requestor: string;
  priority: "low" | "medium" | "high" | "urgent";
  deadline: string;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  assignedTo?: string;
  attachments: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}
