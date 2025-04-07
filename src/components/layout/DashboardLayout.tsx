
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Activity,
  BarChart4,
  ClipboardList,
  LogOut,
  Menu,
  Settings,
  User,
  Users,
  X,
  Calculator,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  const navigationItems = [
    {
      name: "Dashboard",
      icon: <BarChart4 size={20} />,
      path: "/dashboard",
    },
    {
      name: "Evaluations",
      icon: <ClipboardList size={20} />,
      path: "/evaluations",
    },
    {
      name: "Clients",
      icon: <Users size={20} />,
      path: "/clients",
    },
    {
      name: "Reports",
      icon: <Activity size={20} />,
      path: "/reports",
    }
  ];

  // Only show Financial tab to superusers and managers
  if (currentUser?.role === "superuser" || currentUser?.role === "manager") {
    navigationItems.push({
      name: "Financial",
      icon: <Calculator size={20} />,
      path: "/financial",
    });
  }

  // Add Settings as the last item
  navigationItems.push({
    name: "Settings",
    icon: <Settings size={20} />,
    path: "/settings",
  });

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile menu button */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      )}

      {/* Sidebar */}
      <aside
        className={`bg-card fixed inset-y-0 left-0 z-40 flex flex-col border-r transition-all ${
          isCollapsed && !isMobile ? "w-16" : "w-64"
        } ${
          isMobile
            ? isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        }`}
      >
        <div className="flex items-center h-16 px-4 border-b">
          <Activity className="h-6 w-6 text-primary mr-2" />
          {!isCollapsed && (
            <span className="text-lg font-bold text-foreground sidebar-text" style={{visibility: 'visible !important', display: 'inline !important'}}>Pulse Point CX</span>
          )}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <Menu size={16} />
            </Button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Button
                  variant="ghost"
                  className={`w-full justify-${
                    isCollapsed && !isMobile ? "center" : "start"
                  } py-2 sidebar-nav-item font-bold`}
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.icon}
                  {(!isCollapsed || isMobile) && (
                    <span className="ml-3 font-bold sidebar-text" style={{visibility: 'visible !important', display: 'inline !important'}}>{item.name}</span>
                  )}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t p-4">
          <div className="flex items-center">
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">
                {currentUser?.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            {(!isCollapsed || isMobile) && (
              <div className="ml-3">
                <p className="text-sm font-bold sidebar-text" style={{visibility: 'visible !important', display: 'inline-block !important'}}>{currentUser?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground sidebar-text" style={{visibility: 'visible !important', display: 'inline-block !important'}}>
                  {currentUser?.email || 'user@example.com'}
                </p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            className={`w-full justify-${
              isCollapsed && !isMobile ? "center" : "start"
            } mt-4`}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            {(!isCollapsed || isMobile) && <span className="ml-3 font-bold sidebar-text" style={{visibility: 'visible !important', display: 'inline !important'}}>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`flex-1 overflow-auto transition-all ${
          isMobile || isCollapsed ? "ml-0 lg:ml-16" : "ml-0 lg:ml-64"
        }`}
      >
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
