
import React from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const AuthenticatedLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, hasPermission } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  const isSuperUserOrManager = currentUser?.role === "superuser" || currentUser?.role === "manager";
  const isAdmin = currentUser?.role === "admin" || isSuperUserOrManager;

  const navItems = [
    { 
      path: "/dashboard", 
      name: "Dashboard", 
      icon: <Home className="h-5 w-5" /> 
    },
    { 
      path: "/evaluations", 
      name: "Evaluations", 
      icon: <ClipboardList className="h-5 w-5" />,
      permission: "canViewEvaluations" as const
    },
    { 
      path: "/clients", 
      name: "Clients", 
      icon: <Users className="h-5 w-5" />,
      permission: "canViewClients" as const
    },
    { 
      path: "/reports", 
      name: "Reports", 
      icon: <FileText className="h-5 w-5" />,
      permission: "canViewReports" as const
    },
    { 
      path: "/audit-sheet-designer", 
      name: "Design Audit Sheets", 
      icon: <FileDown className="h-5 w-5" />,
      permission: "canCreateAuditSheets" as const,
      superuserOnly: true
    },
    { 
      path: "/financial", 
      name: "Financial", 
      icon: <Calculator className="h-5 w-5" />,
      permission: "canManageFinancials" as const
    },
    { 
      path: "/kpi-dashboard", 
      name: "KPI Dashboard", 
      icon: <BarChart className="h-5 w-5" />,
      superUserOrManager: true
    },
    { 
      path: "/users", 
      name: "User Management", 
      icon: <ShieldCheck className="h-5 w-5" />,
      permission: "canManageUsers" as const
    }
  ];

  // Admin menu items
  const adminItems = [
    { 
      path: "/marketing-actions", 
      name: "Marketing Actions", 
      icon: <Activity className="h-5 w-5" />,
      adminOrHigher: true
    },
    { 
      path: "/project-management", 
      name: "Project Management", 
      icon: <Briefcase className="h-5 w-5" />,
      managerOrHigher: true
    },
    { 
      path: "/training-resources", 
      name: "Training Resources", 
      icon: <FileUp className="h-5 w-5" />,
    },
    { 
      path: "/admin-kpi", 
      name: "Admin KPI Dashboard", 
      icon: <BarChart className="h-5 w-5" />,
      adminOrHigher: true
    },
  ];

  // Additional superuser menu items
  const superUserItems = [
    { 
      path: "/client-portal-settings", 
      name: "Client Portal Settings", 
      icon: <Settings className="h-5 w-5" />,
    },
    { 
      path: "/audit-scheduling", 
      name: "Audit Scheduling", 
      icon: <Calendar className="h-5 w-5" />,
    },
    { 
      path: "/notifications", 
      name: "Notifications & Alerts", 
      icon: <Bell className="h-5 w-5" />,
    },
    { 
      path: "/system-logs", 
      name: "System Logs", 
      icon: <Server className="h-5 w-5" />,
    },
    { 
      path: "/settings", 
      name: "Settings", 
      icon: <Settings className="h-5 w-5" />,
      permission: "canEditSettings" as const
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-16 items-center px-4 md:px-6">
          <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
            <span className="text-primary text-xl">Pulse Point CX</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">{currentUser?.name}</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {currentUser?.role === "superuser" 
                  ? "Superuser" 
                  : currentUser?.role.charAt(0).toUpperCase() + currentUser?.role.slice(1)}
              </span>
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
          <nav className="grid gap-2 p-4">
            {/* Regular navigation items */}
            {navItems.map((item) => {
              // Skip rendering items that require permissions the user doesn't have
              if (item.permission && !hasPermission(item.permission)) {
                return null;
              }
              
              // Skip rendering items marked as superuser only if user is not superuser
              if (item.superuserOnly && currentUser?.role !== "superuser") {
                return null;
              }
              
              // Skip rendering items marked for superusers or managers only if user is not one of them
              if (item.superUserOrManager && !isSuperUserOrManager) {
                return null;
              }
              
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
            })}

            {/* Admin navigation items */}
            {isAdmin && (
              <>
                <div className="relative my-3">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-muted/40 px-2 text-xs text-muted-foreground">
                      Admin Tools
                    </span>
                  </div>
                </div>

                {adminItems.map((item) => {
                  // Skip rendering items marked for admin or higher only if user is not admin or higher
                  if (item.adminOrHigher && !isAdmin) {
                    return null;
                  }
                  
                  // Skip rendering items marked for managers or higher only if user is not manager or higher
                  if (item.managerOrHigher && !isSuperUserOrManager) {
                    return null;
                  }
                  
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
                })}
              </>
            )}

            {/* Superuser additional navigation items */}
            {currentUser?.role === "superuser" && (
              <>
                <div className="relative my-3">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-muted/40 px-2 text-xs text-muted-foreground">
                      Super User Access
                    </span>
                  </div>
                </div>

                {superUserItems.map((item) => {
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
                })}
              </>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
