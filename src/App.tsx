import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { GlobalProvider } from "./contexts/GlobalContext";
import { TaskProvider } from "./contexts/TaskContext";
import { FinanceProvider } from "./contexts/FinanceContext";
import { OperationsProvider } from "./contexts/OperationsContext";
import { MessagingProvider } from "./contexts/MessagingContext";
import { CommunicationProvider } from "./contexts/CommunicationContext";
import { EnterpriseProvider } from "./contexts/EnterpriseContext";
import { EventsProvider } from "./contexts/EventsContext";
import { OperationsDataProvider } from "./contexts/OperationsDataContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthenticatedLayout from "./components/layout/AuthenticatedLayout";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import Clients from "./pages/Clients";
import Evaluations from "./pages/Evaluations";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import KpiDashboard from "./pages/KpiDashboard";
import SmartScheduler from "./pages/SmartScheduler";
import Messages from "./pages/Messages";
import Financial from "./pages/Financial";
import HRDashboard from "./pages/HRDashboard";
import OperationsDashboard from "./pages/OperationsDashboard";
import Maintenance from "./pages/Maintenance";
import CRM from "./pages/CRM";
import QualityControl from "./pages/QualityControl";
import TrainingResources from "./pages/TrainingResources";
import Tickets from "./pages/Tickets";
import UserManagement from "./pages/UserManagement";
import AuditScheduling from "./pages/AuditScheduling";
import AuditTrails from "./pages/AuditTrails";
import AuditSheetDesigner from "./pages/AuditSheetDesigner";
import Compliance from "./pages/Compliance";
import ProjectManagement from "./pages/ProjectManagement";
import Recruitment from "./pages/Recruitment";
import ManagerTraining from "./pages/ManagerTraining";
import Notifications from "./pages/Notifications";
import Gamification from "./pages/Gamification";
import AIInsights from "./pages/AIInsights";
import AdvancedAnalytics from "./pages/AdvancedAnalytics";
import WorkflowAutomation from "./pages/WorkflowAutomation";
import TaskAutomation from "./pages/TaskAutomation";
import ReportDesigner from "./pages/ReportDesigner";
import SystemSettings from "./pages/SystemSettings";
import SystemLogs from "./pages/SystemLogs";
import UserActivityReport from "./pages/UserActivityReport";
import DatabaseManagement from "./pages/DatabaseManagement";
import MultiTenantManagement from "./pages/MultiTenantManagement";
import ClientPortalSettings from "./pages/ClientPortalSettings";
import NotFound from "./pages/NotFound";

// Enterprise pages
import AdminKpiDashboard from "./pages/enterprise/AdminKpiDashboard";
import CXEvaluationBuilder from "./pages/enterprise/CXEvaluationBuilder";
import EvaluationsSystem from "./pages/enterprise/EvaluationsSystem";
import FinancialReportsSystem from "./pages/enterprise/FinancialReportsSystem";
import FinanceAnalytics from "./pages/enterprise/FinanceAnalytics";
import PayrollManagement from "./pages/enterprise/PayrollManagement";
import MarketingDashboard from "./pages/enterprise/MarketingDashboard";
import MarketingActions from "./pages/MarketingActions";
import SalesDashboard from "./pages/enterprise/SalesDashboard";
import LegalDashboard from "./pages/enterprise/LegalDashboard";
import SupportDashboard from "./pages/enterprise/SupportDashboard";
import ProductDashboard from "./pages/enterprise/ProductDashboard";
import ITDashboard from "./pages/enterprise/ITDashboard";
import FacilitiesDashboard from "./pages/enterprise/FacilitiesDashboard";
import EnterpriseUserManagement from "./pages/enterprise/UserManagement";
import FinancialDashboardPage from "./pages/FinancialDashboardPage";
import MarketingActionItems from "./pages/MarketingActionItems";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  console.log("AuthenticatedLayout component:", AuthenticatedLayout);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <GlobalProvider>
              <TaskProvider>
                <FinanceProvider>
                  <OperationsProvider>
                    <OperationsDataProvider>
                      <MessagingProvider>
                        <CommunicationProvider>
                          <EnterpriseProvider>
                            <EventsProvider>
                              <Toaster />
                              <Sonner />
                              <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route path="/" element={<Index />} />
                                
                                {/* Test route to see if AuthenticatedLayout works */}
                                <Route
                                  path="/test"
                                  element={
                                    <AuthenticatedLayout>
                                      <div>Test</div>
                                    </AuthenticatedLayout>
                                  }
                                />
                                
                                <Route
                                  path="/dashboard"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <Dashboard />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/executive-dashboard"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <ExecutiveDashboard />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/clients"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <Clients />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/evaluations"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <Evaluations />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/reports"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <Reports />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/settings"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <Settings />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/kpi-dashboard"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <KpiDashboard />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/smart-scheduler"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <SmartScheduler />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/messages"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <Messages />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/financial"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <Financial />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/hr-dashboard"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <HRDashboard />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/operations-dashboard"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <OperationsDashboard />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/maintenance"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <Maintenance />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/crm"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <CRM />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/quality-control"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <QualityControl />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/training-resources"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <TrainingResources />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/tickets"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <Tickets />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/user-management"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <UserManagement />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/audit-scheduling"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <AuditScheduling />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/audit-trails"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <AuditTrails />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/audit-sheet-designer"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <AuditSheetDesigner />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/compliance"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <Compliance />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/project-management"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <ProjectManagement />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/recruitment"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <Recruitment />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/manager-training"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <ManagerTraining />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/notifications"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <Notifications />
                                      AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/gamification"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <Gamification />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/ai-insights"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <AIInsights />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/advanced-analytics"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <AdvancedAnalytics />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/workflow-automation"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <WorkflowAutomation />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/task-automation"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <TaskAutomation />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/report-designer"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <ReportDesigner />
                                      AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/system-settings"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <SystemSettings />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/system-logs"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <SystemLogs />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/user-activity-report"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <UserActivityReport />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/database-management"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <DatabaseManagement />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/multi-tenant-management"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <MultiTenantManagement />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/client-portal-settings"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <ClientPortalSettings />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />

                                {/* Enterprise Routes */}
                                <Route
                                  path="/enterprise/admin-kpi"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <AdminKpiDashboard />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/enterprise/cx-evaluation-builder"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <CXEvaluationBuilder />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/enterprise/evaluations-system"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <EvaluationsSystem />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/enterprise/financial-reports"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <FinancialReportsSystem />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/enterprise/finance-analytics"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <FinanceAnalytics />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/enterprise/payroll-management"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <PayrollManagement />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/enterprise/marketing-dashboard"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <MarketingDashboard />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/enterprise/marketing-actions"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <MarketingActions />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/enterprise/sales-dashboard"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <SalesDashboard />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/enterprise/legal-dashboard"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <LegalDashboard />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/enterprise/support-dashboard"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <SupportDashboard />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/enterprise/product-dashboard"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <ProductDashboard />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/enterprise/it-dashboard"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <ITDashboard />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/enterprise/facilities-dashboard"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <FacilitiesDashboard />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/enterprise/user-management"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <EnterpriseUserManagement />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/financial-dashboard"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <FinancialDashboardPage />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/marketing-action-items"
                                  element={
                                    <ProtectedRoute>
                                      <AuthenticatedLayout>
                                        <MarketingActionItems />
                                      </AuthenticatedLayout>
                                    </ProtectedRoute>
                                  }
                                />
                                <Route path="*" element={<NotFound />} />
                              </Routes>
                            </EventsProvider>
                          </EnterpriseProvider>
                        </CommunicationProvider>
                      </MessagingProvider>
                    </OperationsDataProvider>
                  </OperationsProvider>
                </FinanceProvider>
              </TaskProvider>
            </GlobalProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
