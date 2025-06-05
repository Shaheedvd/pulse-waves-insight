
export type UserRole = 
  | "super_user" 
  | "power_manager" 
  | "manager" 
  | "admin" 
  | "lead_admin" 
  | "restricted_admin"
  | "employee";

export type Department = 
  | "dashboard"
  | "evaluations" 
  | "clients" 
  | "reports" 
  | "operations" 
  | "finance" 
  | "hr" 
  | "marketing" 
  | "sales" 
  | "compliance" 
  | "support" 
  | "system";

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  entityId?: string;
  entityType?: string;
  oldData?: any;
  newData?: any;
  timestamp: string;
  ipAddress?: string;
}

export interface Permission {
  module: string;
  actions: string[];
}

export interface UserPermissions {
  [key: string]: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    admin: boolean;
  };
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  module: string;
  entityId?: string;
  read: boolean;
  timestamp: string;
  actionUrl?: string;
}

export interface FilterOptions {
  searchTerm?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  status?: string[];
  department?: Department[];
  assignedTo?: string[];
  priority?: string[];
  [key: string]: any;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface SortState {
  field: string;
  direction: "asc" | "desc";
}
