
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

export interface AudienceSegment {
  id: string;
  name: string;
  description: string;
  criteria: {
    industry?: string[];
    location?: string[];
    behavior?: string[];
    demographics?: any;
    leadScore?: { min: number; max: number };
    customerType?: "prospect" | "existing" | "all";
  };
  size: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  segmentIds: string[];
  scheduledDate?: string;
  sentDate?: string;
  status: "draft" | "scheduled" | "sent" | "completed";
  stats: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    unsubscribed: number;
    bounced: number;
  };
  createdAt: string;
}

export interface SEOContent {
  id: string;
  title: string;
  url: string;
  type: "blog" | "landing-page" | "product-page";
  targetKeywords: string[];
  stats: {
    views: number;
    ctr: number;
    bounceRate: number;
    avgTimeOnPage: number;
    socialShares: number;
    backlinks: number;
  };
  lastUpdated: string;
}

export interface AdSpend {
  id: string;
  channel: string;
  campaignName: string;
  budget: number;
  spent: number;
  stats: {
    impressions: number;
    clicks: number;
    conversions: number;
    cpc: number;
    cpm: number;
    ctr: number;
    conversionRate: number;
  };
  roi: number;
  roas: number;
  dateRange: {
    start: string;
    end: string;
  };
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

export interface MarketingTask {
  id: string;
  title: string;
  description: string;
  type: "copywriting" | "design" | "editing" | "campaign-setup" | "reporting" | "qa-testing";
  assignedTo: string;
  dueDate: string;
  status: "todo" | "in-progress" | "completed" | "blocked";
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
}

export interface MarketingReport {
  id: string;
  name: string;
  type: "campaign-performance" | "lead-source" | "funnel-analysis" | "content-performance" | "budget-roi";
  data: any;
  dateRange: {
    start: string;
    end: string;
  };
  generatedAt: string;
  generatedBy: string;
}
