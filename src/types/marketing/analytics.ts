
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
