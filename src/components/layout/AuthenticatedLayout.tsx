
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

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
      path: "/users", 
      name: "User Management", 
      icon: <ShieldCheck className="h-5 w-5" />,
      permission: "canManageUsers" as const
    },
    { 
      path: "/financial", 
      name: "Financial", 
      icon: <Calculator className="h-5 w-5" />,
      permission: "canManageFinancials" as const
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
          <Link to="/dashboard" className="flex items-center gap-2 font-semibold text-foreground">
            <span className="text-primary text-xl">Pulse Point CX</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="text-sm font-medium text-foreground">{currentUser?.name}</span>
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
            {navItems.map((item) => {
              // Skip rendering items that require permissions the user doesn't have
              if (item.permission && !hasPermission(item.permission)) {
                return null;
              }
              
              // Skip rendering items marked as superuser only if user is not superuser
              if (item.superuserOnly && currentUser?.role !== "superuser") {
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
                    <span className="ml-2 text-foreground">{item.name}</span>
                  </Button>
                </Link>
              );
            })}
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
