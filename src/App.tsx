
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Evaluations from "./pages/Evaluations";
import Clients from "./pages/Clients";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import UserManagement from "./pages/UserManagement";
import UserActivityReport from "./pages/UserActivityReport";
import Reports from "./pages/Reports";
import AuditSheetDesigner from "./pages/AuditSheetDesigner";
import Financial from "./pages/Financial";
import AuthenticatedLayout from "./components/layout/AuthenticatedLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import MarketingActionItems from "./pages/MarketingActionItems";
import ProjectManagement from "./pages/ProjectManagement";
import TrainingResources from "./pages/TrainingResources";
import AdminKpiDashboard from "./pages/AdminKpiDashboard";
import ManagerTraining from "./pages/ManagerTraining";
import KpiDashboard from "./pages/KpiDashboard";
import ClientPortalSettings from "./pages/ClientPortalSettings";
import AuditScheduling from "./pages/AuditScheduling";
import Notifications from "./pages/Notifications";
import SystemLogs from "./pages/SystemLogs";

// Import new department dashboards
import OperationsDashboard from "./pages/OperationsDashboard";
import FinancialDashboardPage from "./pages/FinancialDashboardPage";

// Create a new QueryClient instance - using the default configuration
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Login />} />

                {/* Protected routes with auth layout */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<AuthenticatedLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    
                    {/* Routes with specific permissions */}
                    <Route 
                      path="/evaluations" 
                      element={<Evaluations />} 
                    />
                    
                    <Route 
                      path="/clients" 
                      element={<Clients />} 
                    />
                    
                    <Route 
                      path="/reports" 
                      element={<Reports />} 
                    />
                    
                    <Route 
                      path="/audit-sheet-designer" 
                      element={<AuditSheetDesigner />} 
                    />
                    
                    <Route 
                      path="/users" 
                      element={<UserManagement />} 
                    />
                    
                    <Route 
                      path="/user-activity-report" 
                      element={<UserActivityReport />} 
                    />
                    
                    <Route 
                      path="/financial" 
                      element={<Financial />} 
                    />
                    
                    <Route 
                      path="/settings" 
                      element={<Settings />} 
                    />
                    
                    {/* New admin routes */}
                    <Route 
                      path="/marketing-actions" 
                      element={<MarketingActionItems />} 
                    />
                    
                    <Route 
                      path="/project-management" 
                      element={<ProjectManagement />} 
                    />
                    
                    <Route 
                      path="/training-resources" 
                      element={<TrainingResources />} 
                    />
                    
                    <Route 
                      path="/admin-kpi" 
                      element={<AdminKpiDashboard />} 
                    />
                    
                    {/* Manager training route */}
                    <Route 
                      path="/manager-training" 
                      element={<ManagerTraining />} 
                    />
                    
                    {/* Add the new routes for the existing pages */}
                    <Route
                      path="/kpi-dashboard"
                      element={<KpiDashboard />}
                    />
                    
                    <Route
                      path="/client-portal-settings"
                      element={<ClientPortalSettings />}
                    />
                    
                    <Route
                      path="/audit-scheduling"
                      element={<AuditScheduling />}
                    />
                    
                    <Route
                      path="/notifications"
                      element={<Notifications />}
                    />
                    
                    <Route
                      path="/system-logs"
                      element={<SystemLogs />}
                    />

                    {/* New department-specific dashboards */}
                    <Route
                      path="/operations-dashboard"
                      element={<OperationsDashboard />}
                    />

                    <Route
                      path="/financial-dashboard"
                      element={<FinancialDashboardPage />}
                    />
                    
                    {/* Placeholder routes for future implementation */}
                    <Route
                      path="/hr-dashboard"
                      element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">HR Dashboard</h1><p>This dashboard is under development.</p></div>}
                    />
                    
                    <Route
                      path="/marketing-dashboard"
                      element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Marketing Dashboard</h1><p>This dashboard is under development.</p></div>}
                    />
                    
                    <Route
                      path="/sales-dashboard"
                      element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Sales Dashboard</h1><p>This dashboard is under development.</p></div>}
                    />
                    
                    <Route
                      path="/product-dashboard"
                      element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Product Dashboard</h1><p>This dashboard is under development.</p></div>}
                    />
                    
                    <Route
                      path="/it-dashboard"
                      element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">IT Dashboard</h1><p>This dashboard is under development.</p></div>}
                    />
                    
                    <Route
                      path="/support-dashboard"
                      element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Support Dashboard</h1><p>This dashboard is under development.</p></div>}
                    />
                    
                    <Route
                      path="/legal-dashboard"
                      element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Legal Dashboard</h1><p>This dashboard is under development.</p></div>}
                    />
                    
                    <Route
                      path="/facilities-dashboard"
                      element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Facilities Dashboard</h1><p>This dashboard is under development.</p></div>}
                    />
                    
                    <Route
                      path="/recruitment"
                      element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Recruitment</h1><p>This feature is under development.</p></div>}
                    />
                    
                    <Route
                      path="/payroll"
                      element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Payroll Management</h1><p>This feature is under development.</p></div>}
                    />
                    
                    <Route
                      path="/crm"
                      element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Customer Relations Management</h1><p>This feature is under development.</p></div>}
                    />
                    
                    <Route
                      path="/quality-control"
                      element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Quality Control</h1><p>This feature is under development.</p></div>}
                    />
                    
                    <Route
                      path="/system-settings"
                      element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">System Settings</h1><p>This feature is under development.</p></div>}
                    />
                    
                    <Route
                      path="/tickets"
                      element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Support Tickets</h1><p>This feature is under development.</p></div>}
                    />
                    
                    <Route
                      path="/compliance"
                      element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Compliance</h1><p>This feature is under development.</p></div>}
                    />
                    
                    <Route
                      path="/maintenance"
                      element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Maintenance</h1><p>This feature is under development.</p></div>}
                    />
                    
                    <Route
                      path="/financial-reports"
                      element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Financial Reports</h1><p>This feature is under development.</p></div>}
                    />
                  </Route>
                </Route>
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
