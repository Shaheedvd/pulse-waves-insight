
// Maintenance Management System Types

export interface Asset {
  id: string;
  name: string;
  type: string;
  model: string;
  serialNumber: string;
  location: string;
  department: string;
  purchaseDate: string;
  warrantyExpiry: string;
  status: 'active' | 'idle' | 'under-repair' | 'retired';
  assignedTechnician: string;
  qrCode: string;
  serviceManuals: AssetDocument[];
  maintenanceHistory: WorkOrder[];
  totalDowntimeHours: number;
  lastServiceDate: string;
  nextScheduledMaintenance: string;
  criticality: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  updatedAt: string;
}

export interface AssetDocument {
  id: string;
  name: string;
  type: 'manual' | 'warranty' | 'certificate' | 'photo' | 'other';
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  version: string;
}

export interface WorkOrder {
  id: string;
  workOrderNumber: string;
  title: string;
  description: string;
  type: 'preventive' | 'corrective' | 'emergency' | 'inspection';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'created' | 'assigned' | 'in-progress' | 'on-hold' | 'completed' | 'verified' | 'cancelled';
  assetId: string;
  assetName: string;
  location: string;
  requestedBy: string;
  assignedTo: string;
  assignedDate: string;
  scheduledDate: string;
  startDate?: string;
  completedDate?: string;
  estimatedHours: number;
  actualHours?: number;
  estimatedCost: number;
  actualCost?: number;
  partsRequired: PartRequirement[];
  instructions: string;
  completionNotes?: string;
  attachments: WorkOrderAttachment[];
  approvalRequired: boolean;
  approvedBy?: string;
  approvedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PartRequirement {
  id: string;
  partId: string;
  partName: string;
  quantityRequired: number;
  quantityUsed?: number;
  unitCost: number;
  totalCost?: number;
  status: 'required' | 'ordered' | 'available' | 'used';
}

export interface WorkOrderAttachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video';
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  category: 'before' | 'during' | 'after' | 'reference';
}

export interface PreventiveMaintenancePlan {
  id: string;
  name: string;
  description: string;
  assetId: string;
  assetName: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
  frequencyValue: number; // e.g., every 2 weeks
  triggerType: 'calendar' | 'usage' | 'condition';
  usageThreshold?: number; // for usage-based maintenance
  tasks: MaintenanceTask[];
  estimatedDuration: number;
  assignedTechnician: string;
  isActive: boolean;
  nextDueDate: string;
  lastCompletedDate?: string;
  totalCompletions: number;
  complianceRate: number;
  createdAt: string;
  updatedAt: string;
}

export interface MaintenanceTask {
  id: string;
  description: string;
  instructions: string;
  estimatedTime: number;
  requiredParts: string[];
  safetyNotes: string;
  isCompleted?: boolean;
  completedBy?: string;
  completedAt?: string;
  notes?: string;
}

export interface EmergencyRequest {
  id: string;
  requestNumber: string;
  title: string;
  description: string;
  assetId?: string;
  assetName?: string;
  location: string;
  severity: 'minor' | 'major' | 'critical' | 'safety';
  impact: 'low' | 'medium' | 'high' | 'business-critical';
  requestedBy: string;
  contactInfo: string;
  status: 'submitted' | 'acknowledged' | 'assigned' | 'in-progress' | 'resolved' | 'closed';
  assignedTo?: string;
  responseTime?: number; // minutes
  resolutionTime?: number; // minutes
  workOrderId?: string;
  attachments: EmergencyAttachment[];
  createdAt: string;
  updatedAt: string;
}

export interface EmergencyAttachment {
  id: string;
  name: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  uploadedAt: string;
}

export interface Technician {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  skills: TechnicianSkill[];
  certifications: Certification[];
  availability: 'available' | 'busy' | 'on-leave' | 'off-shift';
  currentWorkload: number; // number of active work orders
  maxWorkload: number;
  avgCompletionTime: number; // hours
  reworkRate: number; // percentage
  performanceScore: number;
  totalJobsCompleted: number;
  onTimeCompletionRate: number;
  createdAt: string;
  updatedAt: string;
}

export interface TechnicianSkill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  certifiedDate?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuedBy: string;
  issuedDate: string;
  expiryDate: string;
  certificateUrl?: string;
  isActive: boolean;
}

export interface InventoryItem {
  id: string;
  partNumber: string;
  name: string;
  description: string;
  category: string;
  unitOfMeasure: string;
  currentStock: number;
  minThreshold: number;
  maxThreshold: number;
  reorderPoint: number;
  reorderQuantity: number;
  unitCost: number;
  totalValue: number;
  location: string;
  supplier: SupplierInfo;
  lastOrderDate?: string;
  lastUsedDate?: string;
  usageHistory: UsageRecord[];
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'discontinued';
  createdAt: string;
  updatedAt: string;
}

export interface SupplierInfo {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  leadTime: number; // days
  paymentTerms: string;
}

export interface UsageRecord {
  id: string;
  workOrderId: string;
  quantity: number;
  usedDate: string;
  usedBy: string;
  cost: number;
}

export interface MaintenanceCalendarEvent {
  id: string;
  title: string;
  type: 'work-order' | 'preventive' | 'inspection' | 'emergency';
  assetId?: string;
  assetName?: string;
  workOrderId?: string;
  assignedTo: string;
  location: string;
  scheduledStart: string;
  scheduledEnd: string;
  actualStart?: string;
  actualEnd?: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

export interface MaintenanceDocument {
  id: string;
  name: string;
  description: string;
  type: 'manual' | 'sop' | 'warranty' | 'contract' | 'policy' | 'checklist';
  category: string;
  assetId?: string;
  department?: string;
  supplier?: string;
  version: string;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  lastModified: string;
  expiryDate?: string;
  isActive: boolean;
  downloadCount: number;
  tags: string[];
}

export interface MaintenanceMetrics {
  totalAssets: number;
  activeWorkOrders: number;
  emergencyRequests: number;
  overdueWorkOrders: number;
  averageResponseTime: number;
  averageResolutionTime: number;
  totalDowntimeHours: number;
  maintenanceCostMTD: number;
  preventiveComplianceRate: number;
  technicianUtilization: number;
  topProblematicAssets: AssetProblem[];
  workOrderTrends: TrendData[];
  costBreakdown: CostBreakdown[];
}

export interface AssetProblem {
  assetId: string;
  assetName: string;
  failureCount: number;
  downtimeHours: number;
  totalCost: number;
}

export interface TrendData {
  period: string;
  preventive: number;
  corrective: number;
  emergency: number;
  total: number;
}

export interface CostBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

export interface MaintenanceApproval {
  id: string;
  workOrderId: string;
  type: 'cost' | 'emergency' | 'shutdown' | 'safety';
  requestedBy: string;
  approver: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  estimatedCost?: number;
  approvalDate?: string;
  comments?: string;
  createdAt: string;
}

export interface MaintenanceReport {
  id: string;
  name: string;
  type: 'work-order-completion' | 'downtime-analysis' | 'cost-analysis' | 'pms-compliance' | 'inventory-usage';
  dateRange: {
    start: string;
    end: string;
  };
  filters: ReportFilter[];
  data: any[];
  generatedBy: string;
  generatedAt: string;
  format: 'table' | 'chart' | 'pdf' | 'csv';
}

export interface ReportFilter {
  field: string;
  operator: 'equals' | 'contains' | 'greater-than' | 'less-than' | 'between';
  value: any;
}

// User Roles for Maintenance System
export type MaintenanceRole = 
  | 'superuser'
  | 'maintenance-manager'
  | 'technician'
  | 'inventory-clerk'
  | 'auditor'
  | 'requester';

export interface MaintenancePermissions {
  canCreateWorkOrder: boolean;
  canAssignWorkOrder: boolean;
  canApproveWorkOrder: boolean;
  canViewAllWorkOrders: boolean;
  canManageAssets: boolean;
  canManageInventory: boolean;
  canViewReports: boolean;
  canManageUsers: boolean;
  canConfigureSystem: boolean;
}
