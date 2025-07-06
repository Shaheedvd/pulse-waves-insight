
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import Dashboard from '@/pages/Dashboard';
import KpiDashboard from '@/pages/KpiDashboard';
import ExecutiveDashboard from '@/pages/ExecutiveDashboard';
import Evaluations from '@/pages/Evaluations';
import Clients from '@/pages/Clients';
import Reports from '@/pages/Reports';
import Financial from '@/pages/Financial';

// Phase 2 & 3 imports
import AIInsights from '@/pages/AIInsights';
import SmartScheduler from '@/pages/SmartScheduler';
import Gamification from '@/pages/Gamification';
import TaskAutomation from '@/pages/TaskAutomation';

// Existing stub interfaces
import Recruitment from '@/pages/Recruitment';
import CRM from '@/pages/CRM';
import QualityControlPage from '@/pages/QualityControl';
import SystemSettingsPage from '@/pages/SystemSettings';
import Tickets from '@/pages/Tickets';
import Compliance from '@/pages/Compliance';
import Maintenance from '@/pages/Maintenance';

// HR imports
import HRDashboardPage from '@/pages/HRDashboard';
import TrainingResources from '@/pages/TrainingResources';
import ManagerTraining from '@/pages/ManagerTraining';

// Enterprise modules
import AdminKpiDashboard from '@/pages/enterprise/AdminKpiDashboard';
import EvaluationsSystem from '@/pages/enterprise/EvaluationsSystem';
import CXEvaluationBuilder from '@/pages/enterprise/CXEvaluationBuilder';
import FinancialReportsSystem from '@/pages/enterprise/FinancialReportsSystem';
import FinanceAnalytics from '@/pages/enterprise/FinanceAnalytics';
import PayrollManagement from '@/pages/enterprise/PayrollManagement';
import MarketingDashboardPage from '@/pages/enterprise/MarketingDashboard';
import MarketingActionsPage from '@/pages/enterprise/MarketingActions';
import SalesDashboardPage from '@/pages/enterprise/SalesDashboard';
import LegalDashboardPage from '@/pages/enterprise/LegalDashboard';
import SupportDashboardPage from '@/pages/enterprise/SupportDashboard';
import ProductDashboardPage from '@/pages/enterprise/ProductDashboard';
import UserManagementPage from '@/pages/enterprise/UserManagement';
import ITDashboardPage from '@/pages/enterprise/ITDashboard';
import FacilitiesDashboardPage from '@/pages/enterprise/FacilitiesDashboard';

// Phase 4 - Advanced Enterprise Features
import AdvancedAnalytics from '@/pages/AdvancedAnalytics';
import MultiTenantManagement from '@/pages/MultiTenantManagement';
import WorkflowAutomation from '@/pages/WorkflowAutomation';

// Operations Management System
import OperationsDashboard from '@/pages/OperationsDashboard';

// Missing pages that need to be imported
import Messages from '@/pages/Messages';
import AuditScheduling from '@/pages/AuditScheduling';
import ClientPortalSettings from '@/pages/ClientPortalSettings';
import UserActivityReport from '@/pages/UserActivityReport';
import ProjectManagement from '@/pages/ProjectManagement';
import DatabaseManagement from '@/pages/DatabaseManagement';
import AuditTrails from '@/pages/AuditTrails';
import SystemLogs from '@/pages/SystemLogs';
import Notifications from '@/pages/Notifications';
import Settings from '@/pages/Settings';

import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import { GlobalProvider } from './contexts/GlobalContext';
import { EnterpriseProvider } from './contexts/EnterpriseContext';
import { MessagingProvider } from './contexts/MessagingContext';
import { FinanceProvider } from './contexts/FinanceContext';
import { CommunicationProvider } from './contexts/CommunicationContext';
import { OperationsProvider } from './contexts/OperationsContext';
import TeamsWhatsAppSetupGuide from '@/components/training/TeamsWhatsAppSetupGuide';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <GlobalProvider>
          <EnterpriseProvider>
            <FinanceProvider>
              <MessagingProvider>
                <CommunicationProvider>
                  <OperationsProvider>
                    <BrowserRouter>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/login" element={<Login />} />
                        
                        <Route element={<ProtectedRoute />}>
                          <Route element={<AuthenticatedLayout />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/kpi-dashboard" element={<KpiDashboard />} />
                            <Route path="/executive-dashboard" element={<ExecutiveDashboard />} />
                            <Route path="/evaluations" element={<Evaluations />} />
                            <Route path="/clients" element={<Clients />} />
                            <Route path="/reports" element={<Reports />} />
                            <Route path="/financial" element={<Financial />} />
                            
                            {/* Phase 2 & 3 Routes */}
                            <Route path="/ai-insights" element={<AIInsights />} />
                            <Route path="/smart-scheduler" element={<SmartScheduler />} />
                            <Route path="/gamification" element={<Gamification />} />
                            <Route path="/task-automation" element={<TaskAutomation />} />
                            
                            {/* Existing stub interfaces */}
                            <Route path="/recruitment" element={<Recruitment />} />
                            <Route path="/crm" element={<CRM />} />
                            <Route path="/quality-control" element={<QualityControlPage />} />
                            <Route path="/system-settings" element={<SystemSettingsPage />} />
                            <Route path="/tickets" element={<Tickets />} />
                            <Route path="/compliance" element={<Compliance />} />
                            <Route path="/maintenance" element={<Maintenance />} />
                            
                            {/* Operations Management System */}
                            <Route path="/operations" element={<OperationsDashboard />} />
                            <Route path="/operations-dashboard" element={<OperationsDashboard />} />
                            
                            {/* HR Routes */}
                            <Route path="/hr-dashboard" element={<HRDashboardPage />} />
                            <Route path="/training-resources" element={<TrainingResources />} />
                            <Route path="/manager-training" element={<ManagerTraining />} />
                            
                            {/* Enterprise modules - all routes properly defined */}
                            <Route path="/enterprise/admin-kpi" element={<AdminKpiDashboard />} />
                            <Route path="/admin-kpi" element={<AdminKpiDashboard />} />
                            <Route path="/evaluations-system" element={<EvaluationsSystem />} />
                            <Route path="/cx-evaluation-builder" element={<CXEvaluationBuilder />} />
                            <Route path="/financial-reports" element={<FinancialReportsSystem />} />
                            
                            {/* Finance Analytics routes - multiple aliases */}
                            <Route path="/finance-analytics" element={<FinanceAnalytics />} />
                            <Route path="/financial-dashboard" element={<FinanceAnalytics />} />
                            
                            {/* Payroll Management routes - multiple aliases */}
                            <Route path="/payroll-management" element={<PayrollManagement />} />
                            <Route path="/payroll" element={<PayrollManagement />} />
                            
                            <Route path="/marketing-dashboard" element={<MarketingDashboardPage />} />
                            <Route path="/marketing-actions" element={<MarketingActionsPage />} />
                            <Route path="/sales-dashboard" element={<SalesDashboardPage />} />
                            <Route path="/legal-dashboard" element={<LegalDashboardPage />} />
                            <Route path="/support-dashboard" element={<SupportDashboardPage />} />
                            <Route path="/product-dashboard" element={<ProductDashboardPage />} />
                            
                            {/* User Management routes - multiple aliases */}
                            <Route path="/user-management" element={<UserManagementPage />} />
                            <Route path="/users" element={<UserManagementPage />} />
                            
                            <Route path="/it-dashboard" element={<ITDashboardPage />} />
                            <Route path="/facilities-dashboard" element={<FacilitiesDashboardPage />} />
                            
                            {/* Phase 4 - Advanced Enterprise Features */}
                            <Route path="/advanced-analytics" element={<AdvancedAnalytics />} />
                            <Route path="/multi-tenant-management" element={<MultiTenantManagement />} />
                            <Route path="/workflow-automation" element={<WorkflowAutomation />} />
                            
                            {/* Previously missing routes - now added */}
                            <Route path="/messages" element={<Messages />} />
                            <Route path="/communications" element={<Messages />} />
                            <Route path="/internal-messages" element={<Messages />} />
                            <Route path="/audit-scheduling" element={<AuditScheduling />} />
                            <Route path="/client-portal-settings" element={<ClientPortalSettings />} />
                            <Route path="/user-activity-report" element={<UserActivityReport />} />
                            <Route path="/project-management" element={<ProjectManagement />} />
                            <Route path="/database-management" element={<DatabaseManagement />} />
                            <Route path="/audit-trails" element={<AuditTrails />} />
                            <Route path="/system-logs" element={<SystemLogs />} />
                            <Route path="/notifications" element={<Notifications />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/global-settings" element={<Settings />} />
                            
                            {/* Training Document Routes */}
                            <Route path="/training/teams-whatsapp-setup" element={<TeamsWhatsAppSetupGuide />} />
                          </Route>
                        </Route>
                        
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </BrowserRouter>
                  </OperationsProvider>
                </CommunicationProvider>
              </MessagingProvider>
            </FinanceProvider>
          </EnterpriseProvider>
        </GlobalProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
