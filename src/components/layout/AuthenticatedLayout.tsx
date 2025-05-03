
import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  ClipboardList, 
  Users, 
  Settings,
  LogOut,
  User,
  ShieldCheck,
  FileText,
  FileDown,
  Calculator,
  BarChart,
  Bell,
  Server,
  Calendar,
  Briefcase,
  FileUp,
  Folder,
  Activity,
  Building,
  UserRound,
  BadgePercent,
  HeartHandshake,
  Megaphone,
  ShoppingBag,
  Package,
  MonitorSmartphone,
  PhoneCall,
  Scale,
  Hammer,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth, Department } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const AuthenticatedLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, hasPermission } = useAuth();
  const { toast } = useToast();
  const [selectedDepartment, setSelectedDepartment] = useState<Department | "all">("all");

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  // Define role-based access criteria
  const isSuperUser = currentUser?.role === "superuser";
  const isPowerManager = currentUser?.role === "power_manager" || isSuperUser;
  const isManager = currentUser?.role === "manager" || isPowerManager;
  const isLeadAdmin = currentUser?.role === "lead_admin" || isManager;
  const isAdmin = currentUser?.role === "admin" || isLeadAdmin;
  const isRestricted = currentUser?.role === "restricted_admin" || isAdmin;

  // Get user's department (if any)
  const userDepartment = currentUser?.department;

  // Define department-specific icons
  const getDepartmentIcon = (dept: Department) => {
    switch (dept) {
      case "operations": return <Building className="h-5 w-5" />;
      case "finance": return <Calculator className="h-5 w-5" />;
      case "hr": return <UserRound className="h-5 w-5" />;
      case "marketing": return <Megaphone className="h-5 w-5" />;
      case "sales": return <BadgePercent className="h-5 w-5" />;
      case "product": return <Package className="h-5 w-5" />;
      case "it": return <MonitorSmartphone className="h-5 w-5" />;
      case "customer_support": return <HeartHandshake className="h-5 w-5" />;
      case "legal": return <Scale className="h-5 w-5" />;
      case "facilities": return <Hammer className="h-5 w-5" />;
      default: return <Folder className="h-5 w-5" />;
    }
  };

  // Common navigation items - available to all authenticated users
  const commonNavItems = [
    { 
      path: "/dashboard", 
      name: "Dashboard", 
      icon: <Home className="h-5 w-5" />,
      availableTo: "all"
    }
  ];
  
  // Core functionality - available to most roles based on permissions
  const coreNavItems = [
    { 
      path: "/evaluations", 
      name: "Evaluations", 
      icon: <ClipboardList className="h-5 w-5" />,
      permission: "canViewEvaluations" as const,
      availableTo: "restricted"
    },
    { 
      path: "/clients", 
      name: "Clients", 
      icon: <Users className="h-5 w-5" />,
      permission: "canViewClients" as const,
      availableTo: "restricted"
    },
    { 
      path: "/reports", 
      name: "Reports", 
      icon: <FileText className="h-5 w-5" />,
      permission: "canViewReports" as const,
      availableTo: "admin"
    }
  ];

  // Department-specific navigation items
  const departmentNavItems: { [key in Department]?: any[] } = {
    operations: [
      { 
        path: "/operations-dashboard", 
        name: "Operations Dashboard", 
        icon: <LayoutDashboard className="h-5 w-5" />,
        availableTo: "admin"
      },
      { 
        path: "/audit-scheduling", 
        name: "Audit Scheduling", 
        icon: <Calendar className="h-5 w-5" />,
        availableTo: "lead"
      }
    ],
    finance: [
      { 
        path: "/financial", 
        name: "Financial Dashboard", 
        icon: <Calculator className="h-5 w-5" />,
        permission: "canManageFinancials" as const,
        availableTo: "admin"
      },
      { 
        path: "/financial-reports", 
        name: "Financial Reports", 
        icon: <BarChart className="h-5 w-5" />,
        availableTo: "lead"
      },
      { 
        path: "/payroll", 
        name: "Payroll Management", 
        icon: <Calculator className="h-5 w-5" />,
        availableTo: "admin",
        department: "finance"
      }
    ],
    hr: [
      { 
        path: "/hr-dashboard", 
        name: "HR Dashboard", 
        icon: <LayoutDashboard className="h-5 w-5" />,
        availableTo: "admin",
        department: "hr"
      },
      { 
        path: "/recruitment", 
        name: "Recruitment", 
        icon: <UserRound className="h-5 w-5" />,
        availableTo: "lead",
        department: "hr"
      },
      {
        path: "/training-resources", 
        name: "Training Resources", 
        icon: <FileUp className="h-5 w-5" />,
        availableTo: "admin"
      },
    ],
    marketing: [
      { 
        path: "/marketing-actions", 
        name: "Marketing Actions", 
        icon: <Activity className="h-5 w-5" />,
        permission: "canManageMarketing" as const,
        availableTo: "admin"
      },
      {
        path: "/marketing-dashboard", 
        name: "Marketing Dashboard", 
        icon: <LayoutDashboard className="h-5 w-5" />,
        availableTo: "admin",
        department: "marketing"
      }
    ],
    sales: [
      { 
        path: "/sales-dashboard", 
        name: "Sales Dashboard", 
        icon: <BarChart className="h-5 w-5" />,
        availableTo: "admin",
        department: "sales"
      },
      { 
        path: "/crm", 
        name: "Customer Relations", 
        icon: <HeartHandshake className="h-5 w-5" />,
        availableTo: "lead",
        department: "sales"
      }
    ],
    product: [
      { 
        path: "/product-dashboard", 
        name: "Product Dashboard", 
        icon: <Package className="h-5 w-5" />,
        availableTo: "admin",
        department: "product"
      },
      { 
        path: "/quality-control", 
        name: "Quality Control", 
        icon: <ShieldCheck className="h-5 w-5" />,
        availableTo: "restricted",
        department: "product"
      }
    ],
    it: [
      { 
        path: "/it-dashboard", 
        name: "IT Dashboard", 
        icon: <Server className="h-5 w-5" />,
        availableTo: "admin",
        department: "it"
      },
      { 
        path: "/system-logs", 
        name: "System Logs", 
        icon: <Server className="h-5 w-5" />,
        availableTo: "lead",
        department: "it"
      },
      { 
        path: "/system-settings", 
        name: "System Settings", 
        icon: <Settings className="h-5 w-5" />,
        availableTo: "power",
        department: "it"
      }
    ],
    customer_support: [
      { 
        path: "/support-dashboard", 
        name: "Support Dashboard", 
        icon: <PhoneCall className="h-5 w-5" />,
        availableTo: "admin",
        department: "customer_support"
      },
      { 
        path: "/tickets", 
        name: "Support Tickets", 
        icon: <ClipboardList className="h-5 w-5" />,
        availableTo: "restricted",
        department: "customer_support"
      }
    ],
    legal: [
      { 
        path: "/legal-dashboard", 
        name: "Legal Dashboard", 
        icon: <Scale className="h-5 w-5" />,
        availableTo: "admin",
        department: "legal"
      },
      { 
        path: "/compliance", 
        name: "Compliance", 
        icon: <ShieldCheck className="h-5 w-5" />,
        availableTo: "lead",
        department: "legal"
      }
    ],
    facilities: [
      { 
        path: "/facilities-dashboard", 
        name: "Facilities Dashboard", 
        icon: <Building className="h-5 w-5" />,
        availableTo: "admin",
        department: "facilities"
      },
      { 
        path: "/maintenance", 
        name: "Maintenance", 
        icon: <Hammer className="h-5 w-5" />,
        availableTo: "restricted",
        department: "facilities"
      }
    ]
  };

  // Management navigation items
  const managementNavItems = [
    { 
      path: "/kpi-dashboard", 
      name: "KPI Dashboard", 
      icon: <BarChart className="h-5 w-5" />,
      availableTo: "manager"
    },
    { 
      path: "/project-management", 
      name: "Project Management", 
      icon: <Briefcase className="h-5 w-5" />,
      availableTo: "manager"
    },
    { 
      path: "/admin-kpi", 
      name: "Admin KPI Dashboard", 
      icon: <BarChart className="h-5 w-5" />,
      availableTo: "power"
    }
  ];

  // Administrative navigation items
  const adminNavItems = [
    { 
      path: "/users", 
      name: "User Management", 
      icon: <ShieldCheck className="h-5 w-5" />,
      permission: "canManageUsers" as const,
      availableTo: "power"
    },
    { 
      path: "/client-portal-settings", 
      name: "Client Portal Settings", 
      icon: <Settings className="h-5 w-5" />,
      availableTo: "super"
    },
    { 
      path: "/audit-sheet-designer", 
      name: "Design Audit Sheets", 
      icon: <FileDown className="h-5 w-5" />,
      permission: "canCreateAuditSheets" as const,
      availableTo: "manager"
    }
  ];

  // System configuration items - superuser only
  const superUserItems = [
    {
      path: "/notifications", 
      name: "System Notifications", 
      icon: <Bell className="h-5 w-5" />,
    },
    {
      path: "/user-activity-report", 
      name: "User Activity Report", 
      icon: <FileText className="h-5 w-5" />,
    },
    {
      path: "/settings", 
      name: "Global Settings", 
      icon: <Settings className="h-5 w-5" />,
      permission: "canEditSettings" as const
    }
  ];
  
  // Helper function to check if menu item should be visible
  const shouldShowMenuItem = (item: any) => {
    // Check permission-based visibility
    if (item.permission && !hasPermission(item.permission)) {
      return false;
    }
    
    // Check role-based visibility
    if (item.availableTo) {
      switch(item.availableTo) {
        case "super": return isSuperUser;
        case "power": return isPowerManager;
        case "manager": return isManager;
        case "lead": return isLeadAdmin;
        case "admin": return isAdmin;
        case "restricted": return isRestricted;
        case "all": return true;
        default: return true;
      }
    }
    
    // Check department-based visibility
    if (item.department && item.department !== userDepartment && !isSuperUser) {
      return false;
    }
    
    return true;
  };

  // Function to render menu items
  const renderMenuItems = (items: any[]) => {
    return items
      .filter(shouldShowMenuItem)
      .map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Link key={item.path} to={item.path}>
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </Button>
          </Link>
        );
      });
  };

  // Get available departments for the user
  const availableDepartments = Object.keys(departmentNavItems) as Department[];
  
  // Filter department based on user's own department (unless superuser)
  const userVisibleDepartments = isSuperUser || isPowerManager 
    ? availableDepartments 
    : [userDepartment].filter(Boolean) as Department[];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-16 items-center px-4 md:px-6">
          <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
            <span className="text-primary text-xl">Pulse Point CX</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            {(isPowerManager || isSuperUser) && (
              <Badge variant="outline" className="bg-background hidden md:flex">
                Access Level: {currentUser?.role === "superuser" ? "Super User" : 
                               currentUser?.role === "power_manager" ? "Power Manager" : 
                               currentUser?.role === "manager" ? "Manager" : 
                               currentUser?.role === "lead_admin" ? "Lead Admin" : 
                               currentUser?.role === "admin" ? "Admin" : 
                               currentUser?.role === "restricted_admin" ? "Restricted Admin" : "Viewer"}
              </Badge>
            )}
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="text-sm font-medium hidden sm:inline-block">{currentUser?.name}</span>
              <Badge className="hidden sm:flex" variant="secondary">
                {currentUser?.department && currentUser.department.charAt(0).toUpperCase() + currentUser.department.slice(1)}
              </Badge>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        {/* Sidebar Navigation */}
        <aside className="hidden border-r bg-muted/40 md:block">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="grid gap-2 px-2 py-4">
              {/* Common navigation items */}
              {renderMenuItems(commonNavItems)}

              {/* Core functionality items */}
              {coreNavItems.length > 0 && (
                <>
                  <div className="relative my-3">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-muted/40 px-2 text-xs text-muted-foreground">
                        Core Functions
                      </span>
                    </div>
                  </div>
                  {renderMenuItems(coreNavItems)}
                </>
              )}

              {/* Department-specific navigation */}
              {userVisibleDepartments.length > 0 && (
                <>
                  <div className="relative my-3">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-muted/40 px-2 text-xs text-muted-foreground">
                        {isSuperUser || isPowerManager ? "Department Tools" : "Your Department"}
                      </span>
                    </div>
                  </div>
                  
                  {(isSuperUser || isPowerManager) && userVisibleDepartments.length > 1 && (
                    <Tabs 
                      value={selectedDepartment} 
                      onValueChange={(value) => setSelectedDepartment(value as Department | "all")}
                      className="mb-2"
                    >
                      <TabsList className="w-full">
                        <TabsTrigger value="all">All</TabsTrigger>
                        {userVisibleDepartments.map((dept) => (
                          <TabsTrigger key={dept} value={dept} className="flex items-center">
                            {getDepartmentIcon(dept)}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  )}
                  
                  {selectedDepartment === "all" ? (
                    // Show items from all departments
                    userVisibleDepartments.map(dept => {
                      const deptItems = departmentNavItems[dept] || [];
                      if (deptItems.filter(shouldShowMenuItem).length === 0) return null;
                      
                      return (
                        <div key={dept} className="mb-3">
                          <div className="flex items-center mb-1 px-2">
                            {getDepartmentIcon(dept)}
                            <span className="ml-2 text-sm font-medium capitalize">
                              {dept === "it" ? "IT" : dept === "hr" ? "HR" : dept.replace(/_/g, ' ')}
                            </span>
                          </div>
                          {renderMenuItems(deptItems)}
                        </div>
                      );
                    })
                  ) : (
                    // Show items from selected department
                    renderMenuItems(departmentNavItems[selectedDepartment as Department] || [])
                  )}
                </>
              )}

              {/* Management tools */}
              {isManager && (
                <>
                  <div className="relative my-3">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-muted/40 px-2 text-xs text-muted-foreground">
                        Management Tools
                      </span>
                    </div>
                  </div>
                  {renderMenuItems(managementNavItems)}
                </>
              )}

              {/* Administrative tools */}
              {isPowerManager && (
                <>
                  <div className="relative my-3">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-muted/40 px-2 text-xs text-muted-foreground">
                        Administration
                      </span>
                    </div>
                  </div>
                  {renderMenuItems(adminNavItems)}
                </>
              )}

              {/* System configuration */}
              {isSuperUser && (
                <>
                  <div className="relative my-3">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-muted/40 px-2 text-xs text-muted-foreground">
                        System Configuration
                      </span>
                    </div>
                  </div>
                  {renderMenuItems(superUserItems)}
                </>
              )}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container py-6 px-4 md:px-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
