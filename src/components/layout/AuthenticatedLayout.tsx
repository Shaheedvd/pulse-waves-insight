
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
  ChevronDown,
  ChevronRight,
  Target,
  TrendingUp,
  Database,
  Headphones
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useAuth, Department } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const AuthenticatedLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, hasPermission } = useAuth();
  const { toast } = useToast();
  const [openCategories, setOpenCategories] = useState<string[]>(["dashboard"]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
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

  // Define navigation categories with their items
  const navigationCategories = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
      items: [
        { 
          path: "/dashboard", 
          name: "Main Dashboard", 
          icon: <Home className="h-4 w-4" />,
          availableTo: "all"
        },
        { 
          path: "/kpi-dashboard", 
          name: "KPI Dashboard", 
          icon: <TrendingUp className="h-4 w-4" />,
          availableTo: "manager"
        },
        { 
          path: "/admin-kpi", 
          name: "Admin KPI", 
          icon: <Target className="h-4 w-4" />,
          availableTo: "power"
        }
      ]
    },
    {
      id: "evaluations",
      name: "Evaluations",
      icon: <ClipboardList className="h-4 w-4" />,
      items: [
        { 
          path: "/evaluations", 
          name: "View Evaluations", 
          icon: <ClipboardList className="h-4 w-4" />,
          permission: "canViewEvaluations" as const,
          availableTo: "restricted"
        },
        { 
          path: "/audit-sheet-designer", 
          name: "Design Audit Sheets", 
          icon: <FileDown className="h-4 w-4" />,
          permission: "canCreateAuditSheets" as const,
          availableTo: "manager"
        },
        { 
          path: "/audit-scheduling", 
          name: "Audit Scheduling", 
          icon: <Calendar className="h-4 w-4" />,
          availableTo: "lead"
        }
      ]
    },
    {
      id: "clients",
      name: "Clients",
      icon: <Users className="h-4 w-4" />,
      items: [
        { 
          path: "/clients", 
          name: "Client Management", 
          icon: <Users className="h-4 w-4" />,
          permission: "canViewClients" as const,
          availableTo: "restricted"
        },
        { 
          path: "/crm", 
          name: "Customer Relations", 
          icon: <HeartHandshake className="h-4 w-4" />,
          availableTo: "lead",
          department: "sales"
        },
        { 
          path: "/client-portal-settings", 
          name: "Portal Settings", 
          icon: <Settings className="h-4 w-4" />,
          availableTo: "super"
        }
      ]
    },
    {
      id: "reports",
      name: "Reports",
      icon: <FileText className="h-4 w-4" />,
      items: [
        { 
          path: "/reports", 
          name: "Standard Reports", 
          icon: <FileText className="h-4 w-4" />,
          permission: "canViewReports" as const,
          availableTo: "admin"
        },
        { 
          path: "/user-activity-report", 
          name: "User Activity", 
          icon: <Activity className="h-4 w-4" />,
          availableTo: "super"
        },
        { 
          path: "/financial-reports", 
          name: "Financial Reports", 
          icon: <BarChart className="h-4 w-4" />,
          availableTo: "lead",
          department: "finance"
        }
      ]
    },
    {
      id: "operations",
      name: "Operations",
      icon: <Building className="h-4 w-4" />,
      items: [
        { 
          path: "/operations-dashboard", 
          name: "Operations Dashboard", 
          icon: <LayoutDashboard className="h-4 w-4" />,
          availableTo: "admin",
          department: "operations"
        },
        { 
          path: "/project-management", 
          name: "Project Management", 
          icon: <Briefcase className="h-4 w-4" />,
          availableTo: "manager"
        },
        { 
          path: "/quality-control", 
          name: "Quality Control", 
          icon: <ShieldCheck className="h-4 w-4" />,
          availableTo: "restricted",
          department: "product"
        }
      ]
    },
    {
      id: "finance",
      name: "Finance",
      icon: <Calculator className="h-4 w-4" />,
      items: [
        { 
          path: "/financial", 
          name: "Financial Dashboard", 
          icon: <Calculator className="h-4 w-4" />,
          permission: "canManageFinancials" as const,
          availableTo: "admin"
        },
        { 
          path: "/financial-dashboard", 
          name: "Finance Analytics", 
          icon: <BarChart className="h-4 w-4" />,
          availableTo: "admin",
          department: "finance"
        },
        { 
          path: "/payroll", 
          name: "Payroll Management", 
          icon: <UserRound className="h-4 w-4" />,
          availableTo: "admin",
          department: "finance"
        }
      ]
    },
    {
      id: "hr",
      name: "Human Resources",
      icon: <UserRound className="h-4 w-4" />,
      items: [
        { 
          path: "/hr-dashboard", 
          name: "HR Dashboard", 
          icon: <LayoutDashboard className="h-4 w-4" />,
          availableTo: "admin",
          department: "hr"
        },
        { 
          path: "/recruitment", 
          name: "Recruitment", 
          icon: <User className="h-4 w-4" />,
          availableTo: "lead",
          department: "hr"
        },
        { 
          path: "/training-resources", 
          name: "Training Resources", 
          icon: <FileUp className="h-4 w-4" />,
          availableTo: "admin"
        },
        { 
          path: "/manager-training", 
          name: "Manager Training", 
          icon: <Briefcase className="h-4 w-4" />,
          availableTo: "manager"
        }
      ]
    },
    {
      id: "marketing",
      name: "Marketing",
      icon: <Megaphone className="h-4 w-4" />,
      items: [
        { 
          path: "/marketing-dashboard", 
          name: "Marketing Dashboard", 
          icon: <LayoutDashboard className="h-4 w-4" />,
          availableTo: "admin",
          department: "marketing"
        },
        { 
          path: "/marketing-actions", 
          name: "Marketing Actions", 
          icon: <Activity className="h-4 w-4" />,
          permission: "canManageMarketing" as const,
          availableTo: "admin"
        }
      ]
    },
    {
      id: "sales",
      name: "Sales",
      icon: <BadgePercent className="h-4 w-4" />,
      items: [
        { 
          path: "/sales-dashboard", 
          name: "Sales Dashboard", 
          icon: <BarChart className="h-4 w-4" />,
          availableTo: "admin",
          department: "sales"
        }
      ]
    },
    {
      id: "compliance",
      name: "Compliance",
      icon: <Scale className="h-4 w-4" />,
      items: [
        { 
          path: "/legal-dashboard", 
          name: "Legal Dashboard", 
          icon: <Scale className="h-4 w-4" />,
          availableTo: "admin",
          department: "legal"
        },
        { 
          path: "/compliance", 
          name: "Compliance Management", 
          icon: <ShieldCheck className="h-4 w-4" />,
          availableTo: "lead",
          department: "legal"
        }
      ]
    },
    {
      id: "support",
      name: "Support",
      icon: <Headphones className="h-4 w-4" />,
      items: [
        { 
          path: "/support-dashboard", 
          name: "Support Dashboard", 
          icon: <PhoneCall className="h-4 w-4" />,
          availableTo: "admin",
          department: "customer_support"
        },
        { 
          path: "/tickets", 
          name: "Support Tickets", 
          icon: <ClipboardList className="h-4 w-4" />,
          availableTo: "restricted",
          department: "customer_support"
        },
        { 
          path: "/product-dashboard", 
          name: "Product Dashboard", 
          icon: <Package className="h-4 w-4" />,
          availableTo: "admin",
          department: "product"
        }
      ]
    },
    {
      id: "system",
      name: "System Settings",
      icon: <Server className="h-4 w-4" />,
      items: [
        { 
          path: "/users", 
          name: "User Management", 
          icon: <ShieldCheck className="h-4 w-4" />,
          permission: "canManageUsers" as const,
          availableTo: "power"
        },
        { 
          path: "/it-dashboard", 
          name: "IT Dashboard", 
          icon: <MonitorSmartphone className="h-4 w-4" />,
          availableTo: "admin",
          department: "it"
        },
        { 
          path: "/system-settings", 
          name: "System Configuration", 
          icon: <Settings className="h-4 w-4" />,
          availableTo: "power",
          department: "it"
        },
        { 
          path: "/system-logs", 
          name: "System Logs", 
          icon: <Database className="h-4 w-4" />,
          availableTo: "lead",
          department: "it"
        },
        { 
          path: "/notifications", 
          name: "Notifications", 
          icon: <Bell className="h-4 w-4" />,
          availableTo: "super"
        },
        { 
          path: "/settings", 
          name: "Global Settings", 
          icon: <Settings className="h-4 w-4" />,
          permission: "canEditSettings" as const,
          availableTo: "super"
        },
        { 
          path: "/facilities-dashboard", 
          name: "Facilities", 
          icon: <Building className="h-4 w-4" />,
          availableTo: "admin",
          department: "facilities"
        },
        { 
          path: "/maintenance", 
          name: "Maintenance", 
          icon: <Hammer className="h-4 w-4" />,
          availableTo: "restricted",
          department: "facilities"
        }
      ]
    }
  ];

  // Filter categories to only show those with visible items
  const visibleCategories = navigationCategories
    .map(category => ({
      ...category,
      items: category.items.filter(shouldShowMenuItem)
    }))
    .filter(category => category.items.length > 0);

  // Function to render menu items
  const renderMenuItem = (item: any) => {
    const isActive = location.pathname === item.path;
    
    return (
      <Link key={item.path} to={item.path}>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className="w-full justify-start pl-6 h-8 text-sm"
        >
          {item.icon}
          <span className="ml-2">{item.name}</span>
        </Button>
      </Link>
    );
  };

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

      <div className="grid flex-1 md:grid-cols-[280px_1fr]">
        {/* Sidebar Navigation */}
        <aside className="hidden border-r bg-muted/40 md:block">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="grid gap-1 px-2 py-4">
              {visibleCategories.map((category) => (
                <Collapsible 
                  key={category.id}
                  open={openCategories.includes(category.id)}
                  onOpenChange={() => toggleCategory(category.id)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between h-9 px-2 font-medium text-sm"
                    >
                      <div className="flex items-center">
                        {category.icon}
                        <span className="ml-2">{category.name}</span>
                      </div>
                      {openCategories.includes(category.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1">
                    {category.items.map(renderMenuItem)}
                  </CollapsibleContent>
                </Collapsible>
              ))}
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
