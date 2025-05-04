
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
  AlertTriangle,
  FileText,
  Lock
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ResizablePanelGroup, 
  ResizablePanel, 
  ResizableHandle 
} from "@/components/ui/resizable";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Define a type for navigation items
interface NavigationItem {
  name: string;
  icon: React.ReactNode;
  path: string;
  onClick?: () => void;
}

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
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

  const navigationItems: NavigationItem[] = [
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

  // Add Company Rules option (visible to all)
  navigationItems.push({
    name: "Company Rules",
    icon: <AlertTriangle size={20} />,
    path: "#",
    onClick: () => setShowRulesModal(!showRulesModal),
  });

  // Add Settings as the last item
  navigationItems.push({
    name: "Settings",
    icon: <Settings size={20} />,
    path: "/settings",
  });

  const handleNavigation = (path: string, onClick?: () => void) => {
    if (onClick) {
      onClick();
    } else {
      navigate(path);
      if (isMobile) {
        setIsMobileMenuOpen(false);
      }
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

      {/* Main content with resizable panels */}
      {!isMobile ? (
        <ResizablePanelGroup direction="horizontal" className="h-screen w-full">
          {/* Sidebar panel */}
          <ResizablePanel 
            defaultSize={20} 
            minSize={15}
            maxSize={30}
            collapsible={true}
            collapsedSize={5}
            onCollapse={() => setIsCollapsed(true)}
            onExpand={() => setIsCollapsed(false)}
            className={`bg-card border-r ${isCollapsed ? "min-w-[60px]" : "min-w-[200px]"}`}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center h-16 px-4 border-b">
                <Activity className="h-6 w-6 text-primary mr-2" />
                {!isCollapsed && (
                  <span className="text-lg font-semibold">Pulse Point CX</span>
                )}
              </div>

              <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-2">
                  {navigationItems.map((item) => (
                    <li key={item.name}>
                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              className={`w-full justify-${
                                isCollapsed ? "center" : "start"
                              } py-2`}
                              onClick={() => handleNavigation(item.path, item.onClick)}
                            >
                              {item.icon}
                              {!isCollapsed && (
                                <span className="ml-3">{item.name}</span>
                              )}
                            </Button>
                          </TooltipTrigger>
                          {isCollapsed && (
                            <TooltipContent side="right">
                              {item.name}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
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
                  {!isCollapsed && (
                    <div className="ml-3">
                      <p className="text-sm font-medium">{currentUser?.name || 'User'}</p>
                      <p className="text-xs text-muted-foreground">
                        {currentUser?.email || 'user@example.com'}
                      </p>
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  className={`w-full justify-${
                    isCollapsed ? "center" : "start"
                  } mt-4`}
                  onClick={handleLogout}
                >
                  <LogOut size={20} />
                  {!isCollapsed && <span className="ml-3">Logout</span>}
                </Button>
              </div>
            </div>
          </ResizablePanel>

          {/* Resizable handle */}
          <ResizableHandle withHandle />

          {/* Main content panel */}
          <ResizablePanel defaultSize={80} minSize={70}>
            <main className="h-full overflow-auto">
              <div className="p-4 md:p-6">
                <Outlet />
              </div>
            </main>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <>
          {/* Mobile sidebar */}
          <aside
            className={`bg-card fixed inset-y-0 left-0 z-40 flex flex-col border-r transition-all w-64 ${
              isMobileMenuOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }`}
          >
            <div className="flex items-center h-16 px-4 border-b">
              <Activity className="h-6 w-6 text-primary mr-2" />
              <span className="text-lg font-semibold">Pulse Point CX</span>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-1 px-2">
                {navigationItems.map((item) => (
                  <li key={item.name}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start py-2"
                      onClick={() => handleNavigation(item.path, item.onClick)}
                    >
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
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
                <div className="ml-3">
                  <p className="text-sm font-medium">{currentUser?.name || 'User'}</p>
                  <p className="text-xs text-muted-foreground">
                    {currentUser?.email || 'user@example.com'}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start mt-4"
                onClick={handleLogout}
              >
                <LogOut size={20} />
                <span className="ml-3">Logout</span>
              </Button>
            </div>
          </aside>

          {/* Mobile main content */}
          <main
            className="flex-1 overflow-auto transition-all ml-0"
          >
            <div className="p-4 md:p-6 pt-16">
              <Outlet />
            </div>
          </main>
        </>
      )}

      {/* Company Rules Modal */}
      {showRulesModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="sticky top-0 bg-card z-10 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <Lock className="mr-2 h-5 w-5" /> 
                    Company-Wide Rules
                  </CardTitle>
                  <CardDescription>
                    Policy guidelines and access control rules for all employees
                  </CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowRulesModal(false)}
                >
                  <X size={20} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 pb-8">
              <div className="space-y-6">
                {/* Access Control Rules */}
                <div>
                  <div className="flex items-center mb-4">
                    <Badge variant="destructive" className="mr-2">IMPORTANT</Badge>
                    <h2 className="text-xl font-semibold">ACCESS CONTROL RULES</h2>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="rule-1">
                      <AccordionTrigger className="font-medium text-left">
                        1. No Role Shall Exceed Its Access Level
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Each staff member must only operate within their assigned access level (Super User, Power Manager, Manager, Lead Admin, Admin, Restricted Admin).</li>
                          <li>Example: An Admin cannot access financial reports or user permission settings.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="rule-2">
                      <AccordionTrigger className="font-medium text-left">
                        2. Access Level Changes Require Super User Authorisation
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>Only Super Users may promote, demote, or modify another user's access level.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="rule-3">
                      <AccordionTrigger className="font-medium text-left">
                        3. Access Must Match Departmental Function
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Employees cannot hold access to systems outside their department unless explicitly authorised.</li>
                          <li>Example: HR should not have access to Sales CRM.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="rule-4">
                      <AccordionTrigger className="font-medium text-left">
                        4. Restricted Admins Are Read/Task-Only
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>Restricted Admins may not download, delete, edit sensitive data, or approve workflows.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="rule-5">
                      <AccordionTrigger className="font-medium text-left">
                        5. Power Managers Can't Override System-Wide Settings
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>They may manage users and reports within their own department but cannot change application-wide configurations.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                
                {/* Data & Documentation Rules */}
                <div>
                  <div className="flex items-center mb-4">
                    <Badge variant="blue" className="mr-2">COMPLIANCE</Badge>
                    <h2 className="text-xl font-semibold">DATA & DOCUMENTATION RULES</h2>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="rule-6">
                      <AccordionTrigger className="font-medium text-left">
                        6. Data Entry & Edits Must Be Logged
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>All edits to financials, employee records, or client data must be timestamped and attributed to a user account.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="rule-7">
                      <AccordionTrigger className="font-medium text-left">
                        7. Sensitive Data Access Is Role-Limited
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>Payroll, legal, and client contracts are only accessible to Finance Manager, Legal Counsel, or Super Users.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="rule-8">
                      <AccordionTrigger className="font-medium text-left">
                        8. All Departments Must Maintain Centralised Document Storage
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>Use cloud-based repositories (e.g., Google Drive, Dropbox, or SharePoint) with folder-level access control.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                
                {/* Approval Workflow Rules */}
                <div>
                  <div className="flex items-center mb-4">
                    <Badge variant="purple" className="mr-2">PROCESS</Badge>
                    <h2 className="text-xl font-semibold">APPROVAL WORKFLOW RULES</h2>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="rule-9">
                      <AccordionTrigger className="font-medium text-left">
                        9. Only Managers and Above Can Approve Requests
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>Leave approvals, expense claims, and purchase orders must be reviewed by at least a Manager, Lead Admin, or Power Manager (depending on department policy).</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="rule-10">
                      <AccordionTrigger className="font-medium text-left">
                        10. Escalation Paths Must Be Followed
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>If an Admin encounters a task beyond their role, they must escalate it up the chain (Admin → Lead Admin → Manager → Power Manager → Super User).</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                
                {/* System & Security Rules */}
                <div>
                  <div className="flex items-center mb-4">
                    <Badge variant="orange" className="mr-2">SECURITY</Badge>
                    <h2 className="text-xl font-semibold">SYSTEM & SECURITY RULES</h2>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="rule-11">
                      <AccordionTrigger className="font-medium text-left">
                        11. System Access Is User-Specific (No Shared Logins)
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>Every employee must have their own login credentials. Shared logins are strictly prohibited.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="rule-12">
                      <AccordionTrigger className="font-medium text-left">
                        12. Password Policy Must Be Enforced
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>All accounts must use strong passwords, 2FA (if supported), and must be reset every 90 days.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="rule-13">
                      <AccordionTrigger className="font-medium text-left">
                        13. Access Reviews Must Occur Quarterly
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>Super Users will conduct an audit every 3 months to review user access vs. role assignments.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                
                {/* Operations & Accountability Rules */}
                <div>
                  <div className="flex items-center mb-4">
                    <Badge className="mr-2">GOVERNANCE</Badge>
                    <h2 className="text-xl font-semibold">OPERATIONS & ACCOUNTABILITY RULES</h2>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="rule-14">
                      <AccordionTrigger className="font-medium text-left">
                        14. Managers Are Responsible for Their Team's Access Compliance
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>Departmental Managers and Power Managers must ensure their teams do not misuse or overstep system access.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="rule-15">
                      <AccordionTrigger className="font-medium text-left">
                        15. Audit Trails Must Be Enabled for All Critical Systems
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>Actions like payroll changes, hiring, account creation, and contract uploads must have traceable logs.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="rule-16">
                      <AccordionTrigger className="font-medium text-left">
                        16. Data Handling Breaches Lead to Disciplinary Action
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>Unauthorised downloads, prints, or sharing of internal data outside approved channels is a violation.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                
                {/* Best Practice Rules */}
                <div>
                  <div className="flex items-center mb-4">
                    <Badge variant="secondary" className="mr-2">BEST PRACTICES</Badge>
                    <h2 className="text-xl font-semibold">OPTIONAL BEST PRACTICES</h2>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="rule-17">
                      <AccordionTrigger className="font-medium text-left">
                        17. Onboarding & Offboarding Process Must Include Access Reviews
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>Ensure every new employee receives appropriate access, and exiting staff have all access revoked immediately.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="rule-18">
                      <AccordionTrigger className="font-medium text-left">
                        18. Training is Mandatory for Access Use
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>Staff must complete training before being granted access to sensitive or operational systems.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="rule-19">
                      <AccordionTrigger className="font-medium text-left">
                        19. Conflicts of Interest Must Be Declared
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>Staff in financial, procurement, or HR roles must declare any personal ties to suppliers, vendors, or candidates.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
