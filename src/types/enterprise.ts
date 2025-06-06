
// Core enterprise types for all business modules
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

// 1. Admin KPI System
export interface KPITarget extends BaseEntity {
  name: string;
  description: string;
  department: string;
  owner: string;
  period: 'monthly' | 'quarterly' | 'yearly';
  targetValue: number;
  actualValue: number;
  unit: string;
  status: 'on-track' | 'at-risk' | 'behind' | 'exceeding';
  progress: number;
}

// 2. Evaluations System
export interface Evaluation extends BaseEntity {
  clientId: string;
  clientName: string;
  location: string;
  auditorId: string;
  auditorName: string;
  templateId: string;
  templateName: string;
  scheduledDate: string;
  completedDate?: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  overallScore: number;
  categories: EvaluationCategory[];
  notes: string;
  evidence: string[];
}

export interface EvaluationCategory {
  id: string;
  name: string;
  score: number;
  weight: number;
  maxScore: number;
  questions: EvaluationQuestion[];
}

export interface EvaluationQuestion {
  id: string;
  text: string;
  type: 'rating' | 'yes-no' | 'text' | 'multiple-choice';
  score: number;
  maxScore: number;
  answer: string;
  notes?: string;
}

// 3. CX Evaluation Builder
export interface EvaluationTemplate extends BaseEntity {
  name: string;
  description: string;
  version: string;
  isActive: boolean;
  categories: TemplateCategory[];
  totalPossibleScore: number;
}

export interface TemplateCategory {
  id: string;
  name: string;
  weight: number;
  questions: TemplateQuestion[];
}

export interface TemplateQuestion {
  id: string;
  text: string;
  type: 'rating' | 'yes-no' | 'text' | 'multiple-choice';
  maxScore: number;
  weight: number;
  required: boolean;
  options?: string[];
}

// 4. Financial Reports System
export interface FinancialReport extends BaseEntity {
  name: string;
  type: 'monthly' | 'quarterly' | 'yearly' | 'custom';
  period: string;
  department: string;
  status: 'draft' | 'generated' | 'published';
  metrics: FinancialMetric[];
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
}

export interface FinancialMetric {
  id: string;
  category: string;
  name: string;
  value: number;
  variance: number;
  previousPeriod: number;
}

// 5. Finance Analytics
export interface Budget extends BaseEntity {
  department: string;
  category: string;
  period: string;
  budgetAmount: number;
  actualAmount: number;
  variance: number;
  variancePercent: number;
  status: 'under-budget' | 'on-budget' | 'over-budget' | 'critical';
}

// 6. Payroll Management
export interface Employee extends BaseEntity {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  payFrequency: 'weekly' | 'bi-weekly' | 'monthly';
  benefits: EmployeeBenefit[];
  deductions: EmployeeDeduction[];
}

export interface Payslip extends BaseEntity {
  employeeId: string;
  payPeriod: string;
  grossPay: number;
  netPay: number;
  deductions: PayrollDeduction[];
  benefits: PayrollBenefit[];
  taxes: PayrollTax[];
  status: 'draft' | 'processed' | 'paid';
}

export interface EmployeeBenefit {
  id: string;
  type: string;
  amount: number;
  isPercentage: boolean;
}

export interface EmployeeDeduction {
  id: string;
  type: string;
  amount: number;
  isPercentage: boolean;
}

export interface PayrollDeduction {
  type: string;
  amount: number;
}

export interface PayrollBenefit {
  type: string;
  amount: number;
}

export interface PayrollTax {
  type: string;
  amount: number;
  rate: number;
}

// 7. Marketing Dashboard
export interface MarketingCampaign extends BaseEntity {
  name: string;
  type: 'email' | 'sms' | 'social' | 'display' | 'search';
  channel: string;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  reach: number;
  impressions: number;
  clicks: number;
  leads: number;
  conversions: number;
  roi: number;
  targetAudience: string;
}

// 8. Marketing Actions
export interface MarketingAction extends BaseEntity {
  campaignId: string;
  name: string;
  type: 'launch' | 'optimization' | 'analysis' | 'reporting';
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled';
  assignee: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  results: ActionResult[];
}

export interface ActionResult {
  metric: string;
  value: number;
  target: number;
  achieved: boolean;
}

// 9. Sales Dashboard
export interface Deal extends BaseEntity {
  name: string;
  clientName: string;
  product: string;
  value: number;
  stage: 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedCloseDate: string;
  actualCloseDate?: string;
  assignedTo: string;
  source: 'website' | 'referral' | 'marketing' | 'cold-call' | 'social';
  notes: string;
}

export interface SalesMetric {
  period: string;
  totalRevenue: number;
  numberOfDeals: number;
  averageDealSize: number;
  conversionRate: number;
  salesCycleLength: number;
}

// 10. Legal Dashboard
export interface Contract extends BaseEntity {
  name: string;
  type: 'service' | 'employment' | 'vendor' | 'nda' | 'other';
  clientName: string;
  startDate: string;
  endDate: string;
  value: number;
  status: 'draft' | 'active' | 'expired' | 'terminated' | 'renewal-pending';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  documents: ContractDocument[];
  reminders: ContractReminder[];
}

export interface ContractDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface ContractReminder {
  id: string;
  type: 'renewal' | 'review' | 'expiry';
  date: string;
  sent: boolean;
}

// 11. Support Dashboard
export interface SupportTicket extends BaseEntity {
  ticketNumber: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'waiting' | 'resolved' | 'closed';
  source: 'email' | 'phone' | 'chat' | 'portal' | 'internal';
  category: 'technical' | 'billing' | 'general' | 'feature-request';
  assignee: string;
  requester: string;
  resolutionTime?: number;
  escalated: boolean;
}

// 12. Product Dashboard
export interface Product extends BaseEntity {
  name: string;
  description: string;
  version: string;
  status: 'concept' | 'development' | 'testing' | 'released' | 'deprecated';
  owner: string;
  features: ProductFeature[];
  releaseDate?: string;
  feedback: ProductFeedback[];
}

export interface ProductFeature {
  id: string;
  name: string;
  description: string;
  status: 'planned' | 'in-progress' | 'testing' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee: string;
  estimatedHours: number;
  actualHours: number;
}

export interface ProductFeedback {
  id: string;
  source: 'customer' | 'internal' | 'sales' | 'support';
  type: 'feature-request' | 'bug' | 'improvement' | 'complaint';
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-review' | 'planned' | 'implemented' | 'rejected';
}

// 13. User Management
export interface User extends BaseEntity {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  accessLevel: 'basic' | 'advanced' | 'admin' | 'super-admin';
  isActive: boolean;
  lastLogin?: string;
  permissions: UserPermission[];
}

export interface UserPermission {
  module: string;
  actions: string[];
}

// 14. IT Dashboard
export interface ITSystem extends BaseEntity {
  name: string;
  type: 'server' | 'application' | 'database' | 'network' | 'security';
  status: 'operational' | 'degraded' | 'outage' | 'maintenance';
  uptime: number;
  lastIncident?: string;
  version: string;
  maintainer: string;
}

export interface ITIncident extends BaseEntity {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  systemId: string;
  assignee: string;
  reportedBy: string;
  resolutionTime?: number;
  affectedUsers: number;
}

// 15. Facilities Dashboard
export interface Facility extends BaseEntity {
  name: string;
  type: 'office' | 'warehouse' | 'retail' | 'remote';
  address: string;
  manager: string;
  capacity: number;
  currentOccupancy: number;
  assets: FacilityAsset[];
  issues: FacilityIssue[];
}

export interface FacilityAsset extends BaseEntity {
  name: string;
  type: 'equipment' | 'furniture' | 'vehicle' | 'technology';
  serialNumber: string;
  purchaseDate: string;
  warranty: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor' | 'needs-replacement';
  maintenanceSchedule: MaintenanceRecord[];
}

export interface FacilityIssue extends BaseEntity {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'reported' | 'assigned' | 'in-progress' | 'resolved' | 'closed';
  category: 'maintenance' | 'safety' | 'security' | 'utilities' | 'cleaning';
  assignee: string;
  estimatedCost: number;
  actualCost?: number;
  resolutionDate?: string;
}

export interface MaintenanceRecord {
  id: string;
  date: string;
  type: 'routine' | 'preventive' | 'corrective' | 'emergency';
  description: string;
  cost: number;
  performedBy: string;
}

// Shared types for all modules
export interface DashboardWidget {
  id: string;
  type: 'chart' | 'metric' | 'table' | 'alert';
  title: string;
  size: 'small' | 'medium' | 'large';
  data: any;
  config: any;
}

export interface ActivityLog {
  id: string;
  module: string;
  action: string;
  entityType: string;
  entityId: string;
  userId: string;
  userName: string;
  timestamp: string;
  details: any;
}
