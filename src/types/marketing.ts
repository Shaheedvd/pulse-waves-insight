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

export const MARKETING_STRATEGIES = [
  {
    category: "Digital Marketing",
    subcategories: [
      {
        name: "SEO",
        tasks: [
          {
            title: "Keyword Research",
            description: "Conduct keyword research to identify relevant search terms for our services. Use tools like SEMrush or Ahrefs. Record the list of primary and secondary keywords.",
            trackingMethod: "Document with keyword list and search volume data"
          },
          {
            title: "Content Optimization",
            description: "Optimize existing website pages for target keywords. Track changes made and before/after SEO metrics.",
            trackingMethod: "List of optimized pages, changes made, and any metric changes"
          }
        ]
      },
      {
        name: "PPC",
        tasks: [
          {
            title: "Google Ads Campaign Setup",
            description: "Set up targeted Google Ads campaigns for key services and products.",
            trackingMethod: "Campaign performance metrics and conversion tracking"
          }
        ]
      },
      {
        name: "Email Marketing",
        tasks: [
          {
            title: "Newsletter Creation",
            description: "Design and send monthly newsletters to subscriber base.",
            trackingMethod: "Open rates, click rates, and subscriber engagement"
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
            title: "Blog Post Creation",
            description: "Write a blog post on customer experience improvements. Follow the content calendar and SEO guidelines.",
            trackingMethod: "Link to published blog post, date of publication"
          }
        ]
      },
      {
        name: "Case Studies",
        tasks: [
          {
            title: "Customer Success Stories",
            description: "Document and publish customer success stories and case studies.",
            trackingMethod: "Published case studies and engagement metrics"
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
            title: "LinkedIn Engagement",
            description: "Share relevant industry articles on LinkedIn and engage in discussions. Track the number of interactions.",
            trackingMethod: "List of posts shared, engagement metrics"
          }
        ]
      },
      {
        name: "Content Calendar",
        tasks: [
          {
            title: "Social Media Planning",
            description: "Plan and schedule social media content across all platforms.",
            trackingMethod: "Content calendar completion and engagement rates"
          }
        ]
      }
    ]
  },
  {
    category: "Direct Sales & Business Development",
    subcategories: [
      {
        name: "Targeted Outreach",
        tasks: [
          {
            title: "Prospect List Creation",
            description: "Research and compile a list of potential clients in the retail sector. Include contact information for key decision-makers.",
            trackingMethod: "Document with prospect list"
          }
        ]
      },
      {
        name: "Lead Nurturing",
        tasks: [
          {
            title: "Follow-up Campaigns",
            description: "Create and execute follow-up campaigns for warm leads.",
            trackingMethod: "Lead conversion rates and response metrics"
          }
        ]
      }
    ]
  },
  {
    category: "Marketing Tools & Technology",
    subcategories: [
      {
        name: "CRM Management",
        tasks: [
          {
            title: "CRM Data Entry",
            description: "Update CRM with new leads and client interactions. Ensure data accuracy and completeness.",
            trackingMethod: "Number of records updated/added"
          }
        ]
      },
      {
        name: "Analytics Tools",
        tasks: [
          {
            title: "Performance Tracking",
            description: "Set up and maintain analytics tracking across all marketing channels.",
            trackingMethod: "Analytics setup completion and data accuracy"
          }
        ]
      }
    ]
  }
];

// Update MarketingTask to match the form usage
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
