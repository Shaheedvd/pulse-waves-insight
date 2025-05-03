
import React, { createContext, useContext, useState, useEffect } from "react";

// Define user roles with their permission levels
export type UserRole = 
  | "superuser" 
  | "power_manager" 
  | "manager" 
  | "lead_admin" 
  | "admin" 
  | "restricted_admin" 
  | "viewer";

// Define permission types
export interface Permissions {
  canViewReports: boolean;
  canCreateReports: boolean;
  canEditReports: boolean;
  canDeleteReports: boolean;
  canManageUsers: boolean;
  canManageSystem: boolean;
  canEditSettings: boolean;
  canViewEvaluations: boolean;
  canCreateEvaluations: boolean;
  canEditEvaluations: boolean;
  canDeleteEvaluations: boolean;
  canViewClients: boolean;
  canEditClients: boolean;
  canCreateAuditSheets: boolean;
  canManageFinancials: boolean;
  canManageMarketing: boolean;
  canApproveRequests: boolean;
  canViewAnalytics: boolean;
  canAccessBackend: boolean;
  canManageDepartment: boolean;
  canViewDashboards: boolean;
  canEditDepartmentalData: boolean;
  canApproveLeaves: boolean;
  canEscalateTickets: boolean;
}

// Define department types
export type Department = 
  | "operations" 
  | "finance" 
  | "hr" 
  | "marketing" 
  | "sales" 
  | "product" 
  | "it" 
  | "customer_support" 
  | "legal" 
  | "facilities";

// Define extended user interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permissions;
  department?: Department;
  position?: string;
  hireDate?: string;
  requiresMFA?: boolean;
}

// Role-based permission mapping
const rolePermissions: Record<UserRole, Permissions> = {
  superuser: {
    canViewReports: true,
    canCreateReports: true,
    canEditReports: true,
    canDeleteReports: true,
    canManageUsers: true,
    canManageSystem: true,
    canEditSettings: true,
    canViewEvaluations: true,
    canCreateEvaluations: true,
    canEditEvaluations: true,
    canDeleteEvaluations: true,
    canViewClients: true,
    canEditClients: true,
    canCreateAuditSheets: true,
    canManageFinancials: true,
    canManageMarketing: true,
    canApproveRequests: true,
    canViewAnalytics: true,
    canAccessBackend: true,
    canManageDepartment: true,
    canViewDashboards: true,
    canEditDepartmentalData: true,
    canApproveLeaves: true,
    canEscalateTickets: true,
  },
  power_manager: {
    canViewReports: true,
    canCreateReports: true,
    canEditReports: true,
    canDeleteReports: false,
    canManageUsers: true,
    canManageSystem: false,
    canEditSettings: true,
    canViewEvaluations: true,
    canCreateEvaluations: true,
    canEditEvaluations: true,
    canDeleteEvaluations: false,
    canViewClients: true,
    canEditClients: true,
    canCreateAuditSheets: true,
    canManageFinancials: true,
    canManageMarketing: true,
    canApproveRequests: true,
    canViewAnalytics: true,
    canAccessBackend: false,
    canManageDepartment: true,
    canViewDashboards: true,
    canEditDepartmentalData: true,
    canApproveLeaves: true,
    canEscalateTickets: true,
  },
  manager: {
    canViewReports: true,
    canCreateReports: true,
    canEditReports: false,
    canDeleteReports: false,
    canManageUsers: false,
    canManageSystem: false,
    canEditSettings: false,
    canViewEvaluations: true,
    canCreateEvaluations: true,
    canEditEvaluations: true,
    canDeleteEvaluations: false,
    canViewClients: true,
    canEditClients: false,
    canCreateAuditSheets: true,
    canManageFinancials: true,
    canManageMarketing: true,
    canApproveRequests: true,
    canViewAnalytics: true,
    canAccessBackend: false,
    canManageDepartment: false,
    canViewDashboards: true,
    canEditDepartmentalData: true,
    canApproveLeaves: true,
    canEscalateTickets: true,
  },
  lead_admin: {
    canViewReports: true,
    canCreateReports: true,
    canEditReports: false,
    canDeleteReports: false,
    canManageUsers: false,
    canManageSystem: false,
    canEditSettings: false,
    canViewEvaluations: true,
    canCreateEvaluations: true,
    canEditEvaluations: false,
    canDeleteEvaluations: false,
    canViewClients: true,
    canEditClients: false,
    canCreateAuditSheets: false,
    canManageFinancials: false,
    canManageMarketing: false,
    canApproveRequests: false,
    canViewAnalytics: true,
    canAccessBackend: false,
    canManageDepartment: false,
    canViewDashboards: true,
    canEditDepartmentalData: true,
    canApproveLeaves: true,
    canEscalateTickets: true,
  },
  admin: {
    canViewReports: true,
    canCreateReports: false,
    canEditReports: false,
    canDeleteReports: false,
    canManageUsers: false,
    canManageSystem: false,
    canEditSettings: false,
    canViewEvaluations: true,
    canCreateEvaluations: false,
    canEditEvaluations: false,
    canDeleteEvaluations: false,
    canViewClients: true,
    canEditClients: false,
    canCreateAuditSheets: false,
    canManageFinancials: false,
    canManageMarketing: false,
    canApproveRequests: false,
    canViewAnalytics: false,
    canAccessBackend: false,
    canManageDepartment: false,
    canViewDashboards: false,
    canEditDepartmentalData: true,
    canApproveLeaves: false,
    canEscalateTickets: false,
  },
  restricted_admin: {
    canViewReports: false,
    canCreateReports: false,
    canEditReports: false,
    canDeleteReports: false,
    canManageUsers: false,
    canManageSystem: false,
    canEditSettings: false,
    canViewEvaluations: true,
    canCreateEvaluations: false,
    canEditEvaluations: false,
    canDeleteEvaluations: false,
    canViewClients: true,
    canEditClients: false,
    canCreateAuditSheets: false,
    canManageFinancials: false,
    canManageMarketing: false,
    canApproveRequests: false,
    canViewAnalytics: false,
    canAccessBackend: false,
    canManageDepartment: false,
    canViewDashboards: false,
    canEditDepartmentalData: false,
    canApproveLeaves: false,
    canEscalateTickets: false,
  },
  viewer: {
    canViewReports: true,
    canCreateReports: false,
    canEditReports: false,
    canDeleteReports: false,
    canManageUsers: false,
    canManageSystem: false,
    canEditSettings: false,
    canViewEvaluations: true,
    canCreateEvaluations: false,
    canEditEvaluations: false,
    canDeleteEvaluations: false,
    canViewClients: true,
    canEditClients: false,
    canCreateAuditSheets: false,
    canManageFinancials: false,
    canManageMarketing: false,
    canApproveRequests: false,
    canViewAnalytics: false,
    canAccessBackend: false,
    canManageDepartment: false,
    canViewDashboards: false,
    canEditDepartmentalData: false,
    canApproveLeaves: false,
    canEscalateTickets: false,
  },
};

// Initial users with expanded roles
const initialUsers: User[] = [
  {
    id: "1",
    email: "shaheed@pulsepointcx.com",
    name: "Shaheed Van Dawson",
    role: "superuser",
    permissions: rolePermissions.superuser,
    department: "operations",
    position: "CTO",
    hireDate: "2020-01-01",
    requiresMFA: true
  },
  {
    id: "2",
    email: "admin@pulsepointcx.com",
    name: "Admin User",
    role: "admin",
    permissions: rolePermissions.admin,
    department: "operations",
    position: "Admin Staff",
    hireDate: "2020-02-15"
  },
  {
    id: "3",
    email: "manager@pulsepointcx.com",
    name: "Sarah Manager",
    role: "manager",
    permissions: rolePermissions.manager,
    department: "marketing",
    position: "Marketing Manager",
    hireDate: "2020-03-10",
    requiresMFA: true
  },
  {
    id: "4",
    email: "evaluator@pulsepointcx.com",
    name: "Eric Evaluator",
    role: "lead_admin",
    permissions: rolePermissions.lead_admin,
    department: "customer_support",
    position: "Support Analyst",
    hireDate: "2021-01-05"
  },
  {
    id: "5",
    email: "viewer@pulsepointcx.com",
    name: "Victor Viewer",
    role: "viewer",
    permissions: rolePermissions.viewer,
    department: "legal",
    position: "External Auditor",
    hireDate: "2022-05-20"
  },
  // New employees based on defined roles
  {
    id: "6",
    email: "operations@pulsepointcx.com",
    name: "Oliver Operations",
    role: "power_manager",
    permissions: rolePermissions.power_manager,
    department: "operations",
    position: "Operations Manager",
    hireDate: "2020-06-15",
    requiresMFA: true
  },
  {
    id: "7",
    email: "finance@pulsepointcx.com",
    name: "Fiona Finance",
    role: "power_manager",
    permissions: rolePermissions.power_manager,
    department: "finance",
    position: "Finance Manager",
    hireDate: "2020-07-01",
    requiresMFA: true
  },
  {
    id: "8",
    email: "accountant@pulsepointcx.com",
    name: "Andrew Accountant",
    role: "lead_admin",
    permissions: rolePermissions.lead_admin,
    department: "finance",
    position: "Senior Accountant",
    hireDate: "2021-03-15"
  },
  {
    id: "9",
    email: "payroll@pulsepointcx.com",
    name: "Paula Payroll",
    role: "admin",
    permissions: rolePermissions.admin,
    department: "finance",
    position: "Payroll Officer",
    hireDate: "2021-05-10"
  },
  {
    id: "10",
    email: "hr@pulsepointcx.com",
    name: "Helen HR",
    role: "manager",
    permissions: rolePermissions.manager,
    department: "hr",
    position: "HR Manager",
    hireDate: "2020-09-01",
    requiresMFA: true
  },
  {
    id: "11",
    email: "recruit@pulsepointcx.com",
    name: "Rachel Recruiter",
    role: "lead_admin",
    permissions: rolePermissions.lead_admin,
    department: "hr",
    position: "Talent Acquisition",
    hireDate: "2021-02-15"
  },
  {
    id: "12",
    email: "salesmanager@pulsepointcx.com",
    name: "Samuel Sales",
    role: "manager",
    permissions: rolePermissions.manager,
    department: "sales",
    position: "Sales Manager",
    hireDate: "2020-11-01",
    requiresMFA: true
  },
  {
    id: "13",
    email: "salesrep@pulsepointcx.com",
    name: "Sally SalesRep",
    role: "admin",
    permissions: rolePermissions.admin,
    department: "sales",
    position: "Sales Executive",
    hireDate: "2021-07-15"
  },
  {
    id: "14",
    email: "crm@pulsepointcx.com",
    name: "Carlos CRM",
    role: "lead_admin",
    permissions: rolePermissions.lead_admin,
    department: "sales",
    position: "Customer Relationship Manager",
    hireDate: "2021-04-01"
  },
  {
    id: "15",
    email: "teamlead@pulsepointcx.com",
    name: "Teresa TeamLead",
    role: "manager",
    permissions: rolePermissions.manager,
    department: "product",
    position: "Team Supervisor",
    hireDate: "2020-10-15",
    requiresMFA: true
  },
  {
    id: "16",
    email: "qa@pulsepointcx.com",
    name: "Quinn QA",
    role: "restricted_admin",
    permissions: rolePermissions.restricted_admin,
    department: "product",
    position: "Quality Assurance Staff",
    hireDate: "2021-08-01"
  },
  {
    id: "17",
    email: "itmanager@pulsepointcx.com",
    name: "Ian IT",
    role: "power_manager",
    permissions: rolePermissions.power_manager,
    department: "it",
    position: "IT Manager",
    hireDate: "2020-05-15",
    requiresMFA: true
  },
  {
    id: "18",
    email: "sysadmin@pulsepointcx.com",
    name: "Samantha SysAdmin",
    role: "superuser",
    permissions: rolePermissions.superuser,
    department: "it",
    position: "System Administrator",
    hireDate: "2020-06-01",
    requiresMFA: true
  },
  {
    id: "19",
    email: "developer@pulsepointcx.com",
    name: "David Developer",
    role: "lead_admin",
    permissions: rolePermissions.lead_admin,
    department: "it",
    position: "Software Engineer",
    hireDate: "2021-01-15"
  },
  {
    id: "20",
    email: "support@pulsepointcx.com",
    name: "Steve Support",
    role: "restricted_admin",
    permissions: rolePermissions.restricted_admin,
    department: "it",
    position: "Technical Support",
    hireDate: "2021-09-01"
  },
  {
    id: "21",
    email: "customerservice@pulsepointcx.com",
    name: "Catherine CustomerService",
    role: "manager",
    permissions: rolePermissions.manager,
    department: "customer_support",
    position: "Customer Service Manager",
    hireDate: "2020-08-15",
    requiresMFA: true
  },
  {
    id: "22",
    email: "helpdesk@pulsepointcx.com",
    name: "Harry Helpdesk",
    role: "admin",
    permissions: rolePermissions.admin,
    department: "customer_support",
    position: "Helpdesk Agent",
    hireDate: "2021-10-01"
  },
  {
    id: "23",
    email: "legal@pulsepointcx.com",
    name: "Laura Legal",
    role: "manager",
    permissions: rolePermissions.manager,
    department: "legal",
    position: "Legal Counsel",
    hireDate: "2020-12-01",
    requiresMFA: true
  },
  {
    id: "24",
    email: "compliance@pulsepointcx.com",
    name: "Colin Compliance",
    role: "power_manager",
    permissions: rolePermissions.power_manager,
    department: "legal",
    position: "Compliance Officer",
    hireDate: "2021-01-10",
    requiresMFA: true
  },
  {
    id: "25",
    email: "facilities@pulsepointcx.com",
    name: "Frank Facilities",
    role: "restricted_admin",
    permissions: rolePermissions.restricted_admin,
    department: "facilities",
    position: "Facilities Staff",
    hireDate: "2021-11-01"
  }
];

// Create a password map (in a real app, these would be hashed)
const passwordMap: Record<string, string> = {
  "shaheed@pulsepointcx.com": "Shaheed1!",
  "admin@pulsepointcx.com": "admin123",
  "manager@pulsepointcx.com": "manager123",
  "evaluator@pulsepointcx.com": "evaluator123",
  "viewer@pulsepointcx.com": "viewer123",
  // New employee passwords
  "operations@pulsepointcx.com": "operations123",
  "finance@pulsepointcx.com": "finance123",
  "accountant@pulsepointcx.com": "accountant123",
  "payroll@pulsepointcx.com": "payroll123",
  "hr@pulsepointcx.com": "hr123",
  "recruit@pulsepointcx.com": "recruit123",
  "salesmanager@pulsepointcx.com": "sales123",
  "salesrep@pulsepointcx.com": "salesrep123",
  "crm@pulsepointcx.com": "crm123",
  "teamlead@pulsepointcx.com": "teamlead123",
  "qa@pulsepointcx.com": "qa123",
  "itmanager@pulsepointcx.com": "it123",
  "sysadmin@pulsepointcx.com": "sysadmin123",
  "developer@pulsepointcx.com": "developer123",
  "support@pulsepointcx.com": "support123",
  "customerservice@pulsepointcx.com": "customer123",
  "helpdesk@pulsepointcx.com": "helpdesk123",
  "legal@pulsepointcx.com": "legal123",
  "compliance@pulsepointcx.com": "compliance123",
  "facilities@pulsepointcx.com": "facilities123"
};

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  addUser: (user: Omit<User, "id" | "permissions">) => void;
  updateUser: (id: string, updates: Partial<Omit<User, "id" | "permissions">>) => void;
  deleteUser: (id: string) => void;
  hasPermission: (permission: keyof Permissions) => boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    // In a real app, this would be a server request with proper authentication
    const correctPassword = passwordMap[email];
    
    if (correctPassword && correctPassword === password) {
      const user = users.find((u) => u.email === email);
      if (user) {
        // Check if user requires MFA (would be implemented with actual MFA in production)
        if (user.requiresMFA) {
          console.log("This user requires MFA authentication");
          // In a real app, we would trigger MFA here
          // For now, we'll just log it and proceed
        }
        
        setCurrentUser(user);
        setIsAuthenticated(true);
        localStorage.setItem("currentUser", JSON.stringify(user));
        return user;
      }
    }
    return null;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("currentUser");
  };

  const addUser = (newUser: Omit<User, "id" | "permissions">) => {
    if (!currentUser?.permissions.canManageUsers) return;
    
    const user: User = {
      ...newUser,
      id: Date.now().toString(),
      permissions: rolePermissions[newUser.role],
    };
    
    setUsers((prevUsers) => [...prevUsers, user]);
    // In a real app, we would also add the user to the passwordMap with a hashed password
  };

  const updateUser = (id: string, updates: Partial<Omit<User, "id" | "permissions">>) => {
    if (!currentUser?.permissions.canManageUsers) return;
    
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === id) {
          const updatedUser = {
            ...user,
            ...updates,
          };
          
          // Update permissions if role changed
          if (updates.role && updates.role !== user.role) {
            updatedUser.permissions = rolePermissions[updates.role];
          }
          
          return updatedUser;
        }
        return user;
      })
    );
  };

  const deleteUser = (id: string) => {
    if (!currentUser?.permissions.canManageUsers) return;
    
    // Prevent deleting yourself
    if (currentUser?.id === id) return;
    
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const hasPermission = (permission: keyof Permissions): boolean => {
    if (!currentUser) return false;
    return currentUser.permissions[permission];
  };

  const value = {
    currentUser,
    users,
    login,
    logout,
    addUser,
    updateUser,
    deleteUser,
    hasPermission,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
