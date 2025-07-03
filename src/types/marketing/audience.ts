
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
