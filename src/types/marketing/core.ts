
export interface MarketingCampaign {
  id: string;
  name: string;
  objective: "awareness" | "lead-gen" | "launch" | "promo";
  channels: string[];
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  targetAudience: string;
  assignedOwner: string;
  status: "draft" | "scheduled" | "live" | "completed" | "analyzed";
  kpis: {
    reach: number;
    clicks: number;
    conversions: number;
    cpl: number;
    revenue: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ContentItem {
  id: string;
  title: string;
  type: "post" | "blog" | "ad" | "email" | "video" | "webinar";
  status: "draft" | "in-review" | "scheduled" | "published";
  scheduledDate?: string;
  publishedDate?: string;
  assignedWriter?: string;
  assignedDesigner?: string;
  channel: string;
  campaignId?: string;
  tags: string[];
  fileUrls: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface MarketingAsset {
  id: string;
  name: string;
  type: "image" | "video" | "template" | "brand-element";
  category: string;
  fileUrl: string;
  fileSize: number;
  usage: "social" | "print" | "web" | "ads" | "all";
  tags: string[];
  version: string;
  uploadedBy: string;
  uploadedAt: string;
  downloadCount: number;
}

export interface MarketingLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  campaignId?: string;
  stage: "new" | "nurturing" | "warm" | "qualified";
  score: number;
  interests: string[];
  assignedSalesRep?: string;
  notes: string;
  createdAt: string;
  lastContact?: string;
}
