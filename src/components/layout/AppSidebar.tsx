import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  Home, 
  ClipboardList, 
  Users, 
  Settings,
  User,
  ShieldCheck,
  FileText,
  Calculator,
  BarChart,
  Bell,
  Server,
  Calendar,
  Briefcase,
  Activity,
  Building,
  UserRound,
  BadgePercent,
  HeartHandshake,
  Megaphone,
  Package,
  PhoneCall,
  Scale,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  Target,
  TrendingUp,
  Database,
  Headphones,
  MessageSquare,
  Brain,
  Trophy,
  Repeat,
  Workflow,
  Building2,
  FileDown,
  FileUp,
  Zap
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NavigationItem {
  path: string;
  name: string;
  icon: React.ReactNode;
  badge?: string;
  availableTo?: string;
  permission?: string;
  department?: string;
}

interface NavigationCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: NavigationItem[];
}

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const { currentUser, hasPermission } = useAuth();
  const [openGroups, setOpenGroups] = useState<string[]>(["dashboard", "evaluations"]);
  
  const collapsed = state === "collapsed";

  // Role-based access checks
  const isSuperUser = currentUser?.role === "superuser";
  const isPowerManager = currentUser?.role === "power_manager" || isSuperUser;
  const isManager = currentUser?.role === "manager" || isPowerManager;
  const isLeadAdmin = currentUser?.role === "lead_admin" || isManager;
  const isAdmin = currentUser?.role === "admin" || isLeadAdmin;
  const isRestricted = currentUser?.role === "restricted_admin" || isAdmin;
  const userDepartment = currentUser?.department;

  const shouldShowMenuItem = (item: NavigationItem) => {
    if (isSuperUser) return true;
    
    if (item.permission && currentUser && !hasPermission(item.permission as any)) return false;
    
    if (item.availableTo) {
      switch(item.availableTo) {
        case "super": return false;
        case "power": return isPowerManager;
        case "manager": return isManager;
        case "lead": return isLeadAdmin;
        case "admin": return isAdmin;
        case "restricted": return isRestricted;
        case "all": return true;
        default: return true;
      }
    }
    
    if (item.department && item.department !== userDepartment) return false;
    
    return true;
  };

  const navigationCategories: NavigationCategory[] = [
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
          path: "/executive-dashboard", 
          name: "Executive Dashboard", 
          icon: <Target className="h-4 w-4" />,
          availableTo: "power"
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
        },
        { 
          path: "/task-management", 
          name: "Task Management", 
          icon: <ClipboardList className="h-4 w-4" />,
          availableTo: "restricted"
        }
      ]
    },
    {
      id: "ai-automation",
      name: "AI & Automation",
      icon: <Brain className="h-4 w-4" />,
      items: [
        { 
          path: "/ai-insights", 
          name: "AI Insights", 
          icon: <Brain className="h-4 w-4" />,
          availableTo: "manager",
          badge: "AI"
        },
        { 
          path: "/smart-scheduler", 
          name: "Smart Scheduler", 
          icon: <Calendar className="h-4 w-4" />,
          availableTo: "admin",
          badge: "New"
        },
        { 
          path: "/task-automation", 
          name: "Task Automation", 
          icon: <Repeat className="h-4 w-4" />,
          availableTo: "manager"
        },
        { 
          path: "/workflow-automation", 
          name: "Workflow Automation", 
          icon: <Workflow className="h-4 w-4" />,
          availableTo: "power"
        }
      ]
    },
    {
      id: "evaluations",
      name: "Evaluations & Quality",
      icon: <ClipboardList className="h-4 w-4" />,
      items: [
        { 
          path: "/evaluations", 
          name: "View Evaluations", 
          icon: <ClipboardList className="h-4 w-4" />,
          permission: "canViewEvaluations",
          availableTo: "restricted"
        },
        { 
          path: "/cx-evaluation-builder", 
          name: "CX Builder", 
          icon: <FileDown className="h-4 w-4" />,
          permission: "canCreateAuditSheets",
          availableTo: "manager"
        },
        { 
          path: "/audit-sheet-designer", 
          name: "Audit Designer", 
          icon: <FileDown className="h-4 w-4" />,
          permission: "canCreateAuditSheets",
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
      id: "clients",
      name: "Clients & CRM",
      icon: <Users className="h-4 w-4" />,
      items: [
        { 
          path: "/clients", 
          name: "Client Management", 
          icon: <Users className="h-4 w-4" />,
          permission: "canViewClients",
          availableTo: "restricted"
        },
        { 
          path: "/crm", 
          name: "Customer Relations", 
          icon: <HeartHandshake className="h-4 w-4" />,
          availableTo: "lead",
          department: "sales"
        }
      ]
    },
    {
      id: "finance",
      name: "Finance & Analytics",
      icon: <Calculator className="h-4 w-4" />,
      items: [
        { 
          path: "/financial", 
          name: "Financial Dashboard", 
          icon: <Calculator className="h-4 w-4" />,
          permission: "canManageFinancials",
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
          path: "/maintenance", 
          name: "Maintenance", 
          icon: <Settings className="h-4 w-4" />,
          availableTo: "restricted"
        }
      ]
    },
    {
      id: "communication",
      name: "Communication",
      icon: <MessageSquare className="h-4 w-4" />,
      items: [
        { 
          path: "/messages", 
          name: "Messages", 
          icon: <MessageSquare className="h-4 w-4" />,
          availableTo: "restricted"
        },
        { 
          path: "/notifications", 
          name: "Notifications", 
          icon: <Bell className="h-4 w-4" />,
          availableTo: "super"
        }
      ]
    },
    {
      id: "reports",
      name: "Reports & Analytics",
      icon: <FileText className="h-4 w-4" />,
      items: [
        { 
          path: "/reports", 
          name: "Standard Reports", 
          icon: <FileText className="h-4 w-4" />,
          permission: "canViewReports",
          availableTo: "admin"
        },
        { 
          path: "/advanced-analytics", 
          name: "Advanced Analytics", 
          icon: <TrendingUp className="h-4 w-4" />,
          availableTo: "power"
        }
      ]
    }
  ];

  const isActive = (path: string) => currentPath === path;
  const isGroupActive = (groupId: string) => {
    const category = navigationCategories.find(cat => cat.id === groupId);
    return category?.items.some(item => shouldShowMenuItem(item) && isActive(item.path)) || false;
  };

  const getNavClassName = (path: string) => {
    const baseClasses = "transition-all duration-200 hover:bg-accent/50";
    const activeClasses = "bg-primary text-primary-foreground font-medium shadow-sm";
    
    return cn(baseClasses, isActive(path) && activeClasses);
  };

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  return (
    <Sidebar className={cn(
      "transition-all duration-300 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      collapsed ? "w-14" : "w-64"
    )} collapsible="icon">
      
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold tracking-tight">Pulse Point CX</h2>
              <p className="text-xs text-muted-foreground">{currentUser?.name}</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {navigationCategories.map((category) => {
          const visibleItems = category.items.filter(shouldShowMenuItem);
          if (visibleItems.length === 0) return null;

          const isOpen = openGroups.includes(category.id);
          const hasActiveItem = isGroupActive(category.id);

          return (
            <SidebarGroup key={category.id} className="py-2">
              <SidebarGroupLabel 
                className={cn(
                  "cursor-pointer flex items-center justify-between px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent/50 rounded-md",
                  hasActiveItem && "text-primary"
                )}
                onClick={() => toggleGroup(category.id)}
              >
                <div className="flex items-center gap-2">
                  {category.icon}
                  {!collapsed && (
                    <span className="animate-fade-in">{category.name}</span>
                  )}
                </div>
                {!collapsed && (
                  <div className="animate-fade-in">
                    {isOpen ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </div>
                )}
              </SidebarGroupLabel>

              <SidebarGroupContent 
                className={cn(
                  "space-y-1 overflow-hidden transition-all duration-200",
                  !collapsed && isOpen ? "max-h-96" : "max-h-0"
                )}
              >
                <SidebarMenu>
                  {visibleItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton 
                        asChild 
                        className={getNavClassName(item.path)}
                      >
                        <NavLink to={item.path} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm">
                          <div className="flex-shrink-0">{item.icon}</div>
                          {!collapsed && (
                            <div className="flex-1 flex items-center justify-between animate-fade-in">
                              <span>{item.name}</span>
                              {item.badge && (
                                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}