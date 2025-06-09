
export interface QualityCheck {
  id: string;
  type: 'incoming' | 'in-process' | 'final' | 'random';
  product: string;
  inspector: string;
  status: 'passed' | 'failed' | 'pending' | 'review';
  date: string;
  score: number;
  defects: number;
  notes: string;
  corrective_action?: string;
  batch_number?: string;
  inspection_criteria: QualityCheckCriteria[];
  attachments?: string[];
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface QualityCheckCriteria {
  id: string;
  parameter: string;
  specification: string;
  measurement: string;
  result: 'pass' | 'fail';
  notes?: string;
}

export interface QualityAudit {
  id: string;
  name: string;
  type: 'internal' | 'external' | 'supplier' | 'customer';
  auditor: string;
  department: string;
  scheduled_date: string;
  completion_date?: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'overdue';
  score: number;
  findings: number;
  recommendations: string[];
  checklist_items: AuditChecklistItem[];
  non_conformances: NonConformance[];
  audit_plan?: string;
  audit_report?: string;
}

export interface AuditChecklistItem {
  id: string;
  category: string;
  item: string;
  requirement: string;
  status: 'compliant' | 'non-compliant' | 'observation' | 'not-applicable';
  evidence?: string;
  notes?: string;
}

export interface NonConformance {
  id: string;
  category: string;
  description: string;
  severity: 'minor' | 'major' | 'critical';
  root_cause?: string;
  corrective_action_id?: string;
  status: 'open' | 'closed' | 'verified';
}

export interface CorrectiveAction {
  id: string;
  title: string;
  description: string;
  root_cause: string;
  immediate_action: string;
  corrective_action: string;
  preventive_action: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'completed' | 'verified' | 'closed';
  due_date: string;
  completion_date?: string;
  verification_date?: string;
  verification_notes?: string;
  effectiveness_review?: string;
  cost_impact?: number;
  related_documents?: string[];
}

export interface QualityMetric {
  id: string;
  name: string;
  description: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  period: string;
  category: 'efficiency' | 'effectiveness' | 'compliance' | 'customer';
  calculation_method: string;
  data_source: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  owner: string;
}

export interface QualityDocument {
  id: string;
  name: string;
  type: 'procedure' | 'work-instruction' | 'form' | 'specification' | 'record';
  version: string;
  status: 'draft' | 'active' | 'obsolete' | 'under-review';
  department: string;
  owner: string;
  approval_date?: string;
  review_date?: string;
  next_review_date: string;
  file_path: string;
  distribution_list: string[];
}

export interface QualityTraining {
  id: string;
  title: string;
  description: string;
  type: 'orientation' | 'skill-building' | 'compliance' | 'certification';
  duration_hours: number;
  instructor: string;
  max_participants: number;
  scheduled_date: string;
  completion_rate: number;
  pass_rate: number;
  required_for_roles: string[];
  materials: string[];
}

export interface QualitySupplier {
  id: string;
  name: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  rating: number;
  status: 'approved' | 'conditional' | 'rejected' | 'under-evaluation';
  certification_status: string[];
  last_audit_date?: string;
  next_audit_date?: string;
  performance_metrics: SupplierMetric[];
  products_supplied: string[];
}

export interface SupplierMetric {
  metric: string;
  value: number;
  target: number;
  unit: string;
  period: string;
}

export interface QualityCost {
  id: string;
  category: 'prevention' | 'appraisal' | 'internal-failure' | 'external-failure';
  description: string;
  amount: number;
  currency: string;
  date: string;
  department: string;
  related_to?: string;
  cost_driver: string;
}

export interface QualityControlPlan {
  id: string;
  product: string;
  process: string;
  version: string;
  status: 'active' | 'draft' | 'obsolete';
  control_characteristics: ControlCharacteristic[];
  inspection_points: InspectionPoint[];
  created_by: string;
  approved_by?: string;
  effective_date: string;
}

export interface ControlCharacteristic {
  id: string;
  characteristic: string;
  specification: string;
  tolerance: string;
  measurement_method: string;
  frequency: string;
  sample_size: number;
  control_method: 'SPC' | 'inspection' | 'test';
  reaction_plan: string;
}

export interface InspectionPoint {
  id: string;
  process_step: string;
  characteristics_to_check: string[];
  inspection_method: string;
  frequency: string;
  responsible_person: string;
  documentation_required: boolean;
}

export interface StatisticalProcessControl {
  id: string;
  characteristic: string;
  process: string;
  chart_type: 'x-bar' | 'r-chart' | 'p-chart' | 'c-chart' | 'individuals';
  control_limits: {
    ucl: number;
    lcl: number;
    center_line: number;
  };
  data_points: SPCDataPoint[];
  out_of_control_points: string[];
  capability_indices: {
    cp: number;
    cpk: number;
    pp: number;
    ppk: number;
  };
}

export interface SPCDataPoint {
  id: string;
  timestamp: string;
  value: number;
  sample_size?: number;
  operator: string;
  notes?: string;
}

export interface QualityAlert {
  id: string;
  type: 'non-conformance' | 'trend' | 'target-miss' | 'audit-finding' | 'document-review';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  affected_area: string;
  triggered_by: string;
  trigger_date: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  assigned_to?: string;
  resolution_notes?: string;
  escalation_level: number;
}

export interface QualityDashboardConfig {
  user_id: string;
  widgets: QualityWidget[];
  layout: 'grid' | 'list';
  refresh_interval: number;
  filters: QualityFilter[];
}

export interface QualityWidget {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'alert' | 'progress';
  title: string;
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
  config: any;
}

export interface QualityFilter {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between';
  value: any;
  active: boolean;
}
