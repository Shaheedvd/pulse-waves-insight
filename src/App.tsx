
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
import { TaskProvider } from "./contexts/TaskContext";
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
import FinancialDashboard from "./pages/FinancialDashboard";

// Create a new QueryClient instance - using the default configuration
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TaskProvider>
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
                        element={<FinancialDashboard />}
                      />
                      
                      {/* Department dashboards with special permissions */}
                      <Route
                        path="/hr-dashboard"
                        element={
                          <ProtectedRoute requiredPermission="canManageHRDashboard">
                            <div className="p-6">
                              <DepartmentDashboard 
                                department="hr" 
                                title="HR Department Dashboard"
                                description="Manage recruitment, personnel, and training resources" 
                              />
                            </div>
                          </ProtectedRoute>
                        }
                      />
                      
                      <Route
                        path="/marketing-dashboard"
                        element={
                          <ProtectedRoute requiredPermission="canManageMarketingDashboard">
                            <div className="p-6">
                              <DepartmentDashboard 
                                department="marketing" 
                                title="Marketing Dashboard"
                                description="Campaign tracking, creative assets, and engagement metrics" 
                              />
                            </div>
                          </ProtectedRoute>
                        }
                      />
                      
                      <Route
                        path="/sales-dashboard"
                        element={
                          <ProtectedRoute requiredPermission="canManageSalesDashboard">
                            <div className="p-6">
                              <DepartmentDashboard 
                                department="sales" 
                                title="Sales Dashboard"
                                description="Track revenue, sales metrics, and team performance" 
                              />
                            </div>
                          </ProtectedRoute>
                        }
                      />
                      
                      <Route
                        path="/product-dashboard"
                        element={
                          <ProtectedRoute requiredPermission="canManageProductDevelopment">
                            <div className="p-6">
                              <DepartmentDashboard 
                                department="product" 
                                title="Product Dashboard"
                                description="Product roadmap, development progress, and user feedback" 
                              />
                            </div>
                          </ProtectedRoute>
                        }
                      />
                      
                      <Route
                        path="/it-dashboard"
                        element={
                          <ProtectedRoute requiredPermission="canManageSystems">
                            <div className="p-6">
                              <DepartmentDashboard 
                                department="it" 
                                title="IT Dashboard"
                                description="System performance, security, and infrastructure management" 
                              />
                            </div>
                          </ProtectedRoute>
                        }
                      />
                      
                      <Route
                        path="/support-dashboard"
                        element={
                          <ProtectedRoute requiredPermission="canManageCustomerService">
                            <div className="p-6">
                              <DepartmentDashboard 
                                department="customer_support" 
                                title="Support Dashboard"
                                description="Ticket management, customer satisfaction, and service metrics" 
                              />
                            </div>
                          </ProtectedRoute>
                        }
                      />
                      
                      <Route
                        path="/legal-dashboard"
                        element={
                          <ProtectedRoute requiredPermission="canManageLegalContracts">
                            <div className="p-6">
                              <DepartmentDashboard 
                                department="legal" 
                                title="Legal Dashboard"
                                description="Contract management, compliance, and legal resources" 
                              />
                            </div>
                          </ProtectedRoute>
                        }
                      />
                      
                      <Route
                        path="/facilities-dashboard"
                        element={
                          <ProtectedRoute requiredPermission="canManageFacilities">
                            <div className="p-6">
                              <DepartmentDashboard 
                                department="facilities" 
                                title="Facilities Dashboard"
                                description="Maintenance, office management, and resource allocation" 
                              />
                            </div>
                          </ProtectedRoute>
                        }
                      />
                      
                      {/* Placeholder routes for specific role features */}
                      <Route
                        path="/recruitment"
                        element={
                          <ProtectedRoute requiredPermission="canManageRecruitment">
                            <div className="p-6">
                              <h1 className="text-2xl font-bold mb-4">Recruitment</h1>
                              <p>This feature is under development.</p>
                            </div>
                          </ProtectedRoute>
                        }
                      />
                      
                      <Route
                        path="/payroll"
                        element={
                          <ProtectedRoute requiredPermission="canManagePayroll">
                            <div className="p-6">
                              <h1 className="text-2xl font-bold mb-4">Payroll Management</h1>
                              <p>This feature is under development.</p>
                            </div>
                          </ProtectedRoute>
                        }
                      />
                      
                      <Route
                        path="/crm"
                        element={
                          <ProtectedRoute requiredPermission="canManageClientOnboarding">
                            <div className="p-6">
                              <h1 className="text-2xl font-bold mb-4">Customer Relations Management</h1>
                              <p>This feature is under development.</p>
                            </div>
                          </ProtectedRoute>
                        }
                      />
                      
                      <Route
                        path="/quality-control"
                        element={
                          <ProtectedRoute requiredPermission="canManageUXUI">
                            <div className="p-6">
                              <h1 className="text-2xl font-bold mb-4">Quality Control</h1>
                              <p>This feature is under development.</p>
                            </div>
                          </ProtectedRoute>
                        }
                      />
                      
                      <Route
                        path="/system-settings"
                        element={
                          <ProtectedRoute requiredPermission="canManageSystems">
                            <div className="p-6">
                              <h1 className="text-2xl font-bold mb-4">System Settings</h1>
                              <p>This feature is under development.</p>
                            </div>
                          </ProtectedRoute>
                        }
                      />
                      
                      <Route
                        path="/tickets"
                        element={
                          <ProtectedRoute requiredPermission="canManageTechnicalSupport">
                            <div className="p-6">
                              <h1 className="text-2xl font-bold mb-4">Support Tickets</h1>
                              <p>This feature is under development.</p>
                            </div>
                          </ProtectedRoute>
                        }
                      />
                      
                      <Route
                        path="/compliance"
                        element={
                          <ProtectedRoute requiredPermission="canManageCompliance">
                            <div className="p-6">
                              <h1 className="text-2xl font-bold mb-4">Compliance</h1>
                              <p>This feature is under development.</p>
                            </div>
                          </ProtectedRoute>
                        }
                      />
                      
                      <Route
                        path="/maintenance"
                        element={
                          <ProtectedRoute requiredPermission="canManageFacilities">
                            <div className="p-6">
                              <h1 className="text-2xl font-bold mb-4">Maintenance</h1>
                              <p>This feature is under development.</p>
                            </div>
                          </ProtectedRoute>
                        }
                      />
                      
                      <Route
                        path="/financial-reports"
                        element={
                          <ProtectedRoute requiredPermission="canGenerateFinancialReports">
                            <div className="p-6">
                              <h1 className="text-2xl font-bold mb-4">Financial Reports</h1>
                              <p>This feature is under development.</p>
                            </div>
                          </ProtectedRoute>
                        }
                      />
                    </Route>
                  </Route>
                  
                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </TaskProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
