
export interface Lead {
  id: string;
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    jobTitle: string;
  };
  source: 'referral' | 'advertisement' | 'website' | 'event' | 'cold-call' | 'social-media';
  companySize: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  needsSummary: string;
  status: 'new' | 'contacted' | 'qualified' | 'disqualified' | 'converted';
  assignedTo: string;
  score: number;
  notes: string;
  interactionLog: Interaction[];
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface Deal {
  id: string;
  name: string;
  clientName: string;
  leadId?: string;
  customerId?: string;
  product: string;
  value: number;
  stage: 'prospecting' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedCloseDate: string;
  assignedTo: string;
  source: string;
  competitorInfo?: string;
  activities: Activity[];
  attachments: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface Customer {
  id: string;
  companyInfo: {
    name: string;
    industry: string;
    size: string;
    website: string;
    address: string;
  };
  primaryContact: {
    name: string;
    email: string;
    phone: string;
    jobTitle: string;
  };
  additionalContacts: Contact[];
  deals: string[];
  quotes: string[];
  supportTickets: string[];
  activityHistory: Activity[];
  feedbackRating: number;
  notes: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  clientId: string;
  dealId?: string;
  items: QuoteItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountRate: number;
  discountAmount: number;
  total: number;
  validUntil: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  sentDate?: string;
  acceptedDate?: string;
  terms: string;
  notes: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface QuoteItem {
  id: string;
  productId: string;
  productName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  unitCost: number;
  sellingPrice: number;
  taxRate: number;
  discountPolicy: string;
  marketingAssets: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'quote' | 'task';
  subject: string;
  description: string;
  date: string;
  duration?: number;
  outcome?: string;
  nextAction?: string;
  attachments?: string[];
  createdBy: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'follow-up' | 'send-quote' | 'demo-prep' | 'callback' | 'meeting' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  assignedTo: string;
  dueDate: string;
  relatedTo?: {
    type: 'lead' | 'deal' | 'customer';
    id: string;
    name: string;
  };
  isRecurring: boolean;
  recurringPattern?: string;
  completedDate?: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface SalesTarget {
  id: string;
  period: 'monthly' | 'quarterly' | 'yearly';
  year: number;
  month?: number;
  quarter?: number;
  assignedTo: string;
  targetRevenue: number;
  actualRevenue: number;
  targetDeals: number;
  actualDeals: number;
  progress: number;
  status: 'on-track' | 'at-risk' | 'behind' | 'exceeded';
  createdAt: string;
  updatedAt: string;
}

export interface SalesPerformance {
  repId: string;
  repName: string;
  period: string;
  metrics: {
    totalCalls: number;
    totalEmails: number;
    totalMeetings: number;
    leadsGenerated: number;
    dealsCreated: number;
    dealsClosed: number;
    revenue: number;
    conversionRate: number;
    avgResponseTime: number;
    avgSalesCycle: number;
  };
}

export interface Interaction {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  date: string;
  duration?: number;
  outcome: string;
  nextAction?: string;
  createdBy: string;
}

export interface Contact {
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  isPrimary: boolean;
}

export interface SalesReport {
  id: string;
  name: string;
  type: 'leads' | 'deals' | 'revenue' | 'performance' | 'pipeline' | 'conversion';
  period: {
    start: string;
    end: string;
  };
  filters: any;
  data: any;
  generatedAt: string;
  generatedBy: string;
}
