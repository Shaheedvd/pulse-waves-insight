import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";

// Define user roles
export type UserRole = 
  | "superuser"
  | "admin" 
  | "manager" 
  | "power_manager"
  | "team_lead"
  | "member" 
  | "viewer"
  | "lead_admin"
  | "restricted_admin";

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

// Extended user interface for backward compatibility
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
  canManageFinancialDashboard: boolean;
  canGenerateFinancialReports: boolean;
  canManagePayroll: boolean;
  canManageHRDashboard: boolean;
  canManageRecruitment: boolean;
  canManageTraining: boolean;
  canManageMarketingDashboard: boolean;
  canManageCreativeAssets: boolean;
  canManageSalesDashboard: boolean;
  canManageSalesEnablement: boolean;
  canManageClientOnboarding: boolean;
  canManageCustomerService: boolean;
  canManageSystems: boolean;
  canManageProductDevelopment: boolean;
  canManageUXUI: boolean;
  canManageITHelpdesk: boolean;
  canManageTechnicalSupport: boolean;
  canManageLegalContracts: boolean;
  canManageCompliance: boolean;
  canManageFacilities: boolean;
}

// Role-based permission mapping  
const rolePermissions: Record<UserRole, Permissions> = {
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
    canManageFinancialDashboard: false,
    canGenerateFinancialReports: false,
    canManagePayroll: false,
    canManageHRDashboard: false,
    canManageRecruitment: false,
    canManageTraining: false,
    canManageMarketingDashboard: false,
    canManageCreativeAssets: false,
    canManageSalesDashboard: false,
    canManageSalesEnablement: false,
    canManageClientOnboarding: false,
    canManageCustomerService: false,
    canManageSystems: false,
    canManageProductDevelopment: false,
    canManageUXUI: false,
    canManageITHelpdesk: false,
    canManageTechnicalSupport: false,
    canManageLegalContracts: false,
    canManageCompliance: false,
    canManageFacilities: false,
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
    canManageFinancialDashboard: false,
    canGenerateFinancialReports: false,
    canManagePayroll: false,
    canManageHRDashboard: false,
    canManageRecruitment: false,
    canManageTraining: false,
    canManageMarketingDashboard: false,
    canManageCreativeAssets: false,
    canManageSalesDashboard: false,
    canManageSalesEnablement: false,
    canManageClientOnboarding: false,
    canManageCustomerService: false,
    canManageSystems: false,
    canManageProductDevelopment: false,
    canManageUXUI: false,
    canManageITHelpdesk: false,
    canManageTechnicalSupport: false,
    canManageLegalContracts: false,
    canManageCompliance: false,
    canManageFacilities: false,
  },
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
    canManageFinancialDashboard: true,
    canGenerateFinancialReports: true,
    canManagePayroll: true,
    canManageHRDashboard: true,
    canManageRecruitment: true,
    canManageTraining: true,
    canManageMarketingDashboard: true,
    canManageCreativeAssets: true,
    canManageSalesDashboard: true,
    canManageSalesEnablement: true,
    canManageClientOnboarding: true,
    canManageCustomerService: true,
    canManageSystems: true,
    canManageProductDevelopment: true,
    canManageUXUI: true,
    canManageITHelpdesk: true,
    canManageTechnicalSupport: true,
    canManageLegalContracts: true,
    canManageCompliance: true,
    canManageFacilities: true,
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
    canManageFinancialDashboard: true,
    canGenerateFinancialReports: true,
    canManagePayroll: true,
    canManageHRDashboard: true,
    canManageRecruitment: true,
    canManageTraining: true,
    canManageMarketingDashboard: true,
    canManageCreativeAssets: true,
    canManageSalesDashboard: true,
    canManageSalesEnablement: true,
    canManageClientOnboarding: true,
    canManageCustomerService: true,
    canManageSystems: true,
    canManageProductDevelopment: true,
    canManageUXUI: true,
    canManageITHelpdesk: true,
    canManageTechnicalSupport: true,
    canManageLegalContracts: true,
    canManageCompliance: true,
    canManageFacilities: true,
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
    canManageFinancialDashboard: false,
    canGenerateFinancialReports: false,
    canManagePayroll: false,
    canManageHRDashboard: false,
    canManageRecruitment: false,
    canManageTraining: false,
    canManageMarketingDashboard: false,
    canManageCreativeAssets: false,
    canManageSalesDashboard: false,
    canManageSalesEnablement: false,
    canManageClientOnboarding: false,
    canManageCustomerService: false,
    canManageSystems: false,
    canManageProductDevelopment: false,
    canManageUXUI: false,
    canManageITHelpdesk: false,
    canManageTechnicalSupport: false,
    canManageLegalContracts: false,
    canManageCompliance: false,
    canManageFacilities: false,
  },
  team_lead: {
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
    canManageFinancialDashboard: false,
    canGenerateFinancialReports: false,
    canManagePayroll: false,
    canManageHRDashboard: false,
    canManageRecruitment: false,
    canManageTraining: false,
    canManageMarketingDashboard: false,
    canManageCreativeAssets: false,
    canManageSalesDashboard: false,
    canManageSalesEnablement: false,
    canManageClientOnboarding: false,
    canManageCustomerService: false,
    canManageSystems: false,
    canManageProductDevelopment: false,
    canManageUXUI: false,
    canManageITHelpdesk: false,
    canManageTechnicalSupport: false,
    canManageLegalContracts: false,
    canManageCompliance: false,
    canManageFacilities: false,
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
    canManageFinancialDashboard: false,
    canGenerateFinancialReports: false,
    canManagePayroll: false,
    canManageHRDashboard: false,
    canManageRecruitment: false,
    canManageTraining: false,
    canManageMarketingDashboard: false,
    canManageCreativeAssets: false,
    canManageSalesDashboard: false,
    canManageSalesEnablement: false,
    canManageClientOnboarding: false,
    canManageCustomerService: false,
    canManageSystems: false,
    canManageProductDevelopment: false,
    canManageUXUI: false,
    canManageITHelpdesk: false,
    canManageTechnicalSupport: false,
    canManageLegalContracts: false,
    canManageCompliance: false,
    canManageFacilities: false,
  },
  member: {
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
    canManageFinancialDashboard: false,
    canGenerateFinancialReports: false,
    canManagePayroll: false,
    canManageHRDashboard: false,
    canManageRecruitment: false,
    canManageTraining: false,
    canManageMarketingDashboard: false,
    canManageCreativeAssets: false,
    canManageSalesDashboard: false,
    canManageSalesEnablement: false,
    canManageClientOnboarding: false,
    canManageCustomerService: false,
    canManageSystems: false,
    canManageProductDevelopment: false,
    canManageUXUI: false,
    canManageITHelpdesk: false,
    canManageTechnicalSupport: false,
    canManageLegalContracts: false,
    canManageCompliance: false,
    canManageFacilities: false,
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
    canManageFinancialDashboard: false,
    canGenerateFinancialReports: false,
    canManagePayroll: false,
    canManageHRDashboard: false,
    canManageRecruitment: false,
    canManageTraining: false,
    canManageMarketingDashboard: false,
    canManageCreativeAssets: false,
    canManageSalesDashboard: false,
    canManageSalesEnablement: false,
    canManageClientOnboarding: false,
    canManageCustomerService: false,
    canManageSystems: false,
    canManageProductDevelopment: false,
    canManageUXUI: false,
    canManageITHelpdesk: false,
    canManageTechnicalSupport: false,
    canManageLegalContracts: false,
    canManageCompliance: false,
    canManageFacilities: false,
  },
};

type UserProfile = {
  id: string;
  email: string;
  name: string;
  department?: string;
  position?: string;
  avatar_url?: string;
};

type AuthContextType = {
  user: UserProfile | null;
  currentUser: User | null; // Backward compatibility
  session: Session | null;
  userRole: UserRole | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (permission: keyof Permissions) => boolean;
  isRole: (role: UserRole | UserRole[]) => boolean;
  users: User[]; // Backward compatibility
  addUser: (user: Omit<User, "id">) => Promise<User>; // Backward compatibility
  updateUser: (id: string, updates: Partial<User>) => Promise<void>; // Backward compatibility
  deleteUser: (id: string) => Promise<void>; // Backward compatibility
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        
        if (currentSession?.user) {
          // Defer database calls to avoid deadlock
          setTimeout(() => {
            // Fetch user profile and role
            supabase
              .from('profiles')
              .select('*')
              .eq('id', currentSession.user.id)
              .single()
              .then(({ data: profile }) => {
                if (profile) {
                  setUser(profile);
                }
              });
            
            // Fetch user role using the security definer function
            supabase
              .rpc('get_user_role', { _user_id: currentSession.user.id })
              .then(({ data: roleData }) => {
                if (roleData) {
                  setUserRole(roleData as UserRole);
                  
                  // Create backward-compatible currentUser object
                  supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', currentSession.user.id)
                    .single()
                    .then(({ data: profile }) => {
                      if (profile) {
                        setCurrentUser({
                          id: profile.id,
                          email: profile.email,
                          name: profile.name,
                          role: roleData as UserRole,
                          permissions: rolePermissions[roleData as UserRole],
                          department: profile.department as Department | undefined,
                          position: profile.position || undefined,
                        });
                      }
                    });
                }
              });
          }, 0);
        } else {
          setUser(null);
          setUserRole(null);
          setCurrentUser(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        supabase
          .from('profiles')
          .select('*')
          .eq('id', currentSession.user.id)
          .single()
          .then(({ data: profile }) => {
            if (profile) setUser(profile);
          });
        
        supabase
          .rpc('get_user_role', { _user_id: currentSession.user.id })
          .then(({ data: roleData }) => {
            if (roleData) setUserRole(roleData as UserRole);
          });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
  };

  const signup = async (email: string, password: string, name: string): Promise<void> => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
        emailRedirectTo: `${window.location.origin}/`,
      },
    });
    
    if (error) throw error;
  };

  const logout = async (): Promise<void> => {
    await supabase.auth.signOut();
  };

  const hasPermission = (permission: keyof Permissions): boolean => {
    if (!userRole) return false;
    const permissions = rolePermissions[userRole];
    return permissions[permission] || false;
  };

  const isRole = (role: UserRole | UserRole[]): boolean => {
    if (!userRole) return false;
    if (Array.isArray(role)) {
      return role.includes(userRole);
    }
    return userRole === role;
  };

  // Backward compatibility stubs (no-op functions)
  const addUser = async (userData: Omit<User, "id">): Promise<User> => {
    console.warn("addUser is deprecated. User management should be done through the backend.");
    return { ...userData, id: "0" };
  };

  const updateUser = async (id: string, updates: Partial<User>): Promise<void> => {
    console.warn("updateUser is deprecated. User management should be done through the backend.");
  };

  const deleteUser = async (id: string): Promise<void> => {
    console.warn("deleteUser is deprecated. User management should be done through the backend.");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentUser, // Backward compatibility
        session,
        userRole,
        isAuthenticated: !!session && !!user,
        login,
        signup,
        logout,
        hasPermission,
        isRole,
        users: [], // Backward compatibility - empty array
        addUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
