
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import Dashboard from '@/pages/Dashboard';
import KpiDashboard from '@/pages/KpiDashboard';
import Evaluations from '@/pages/Evaluations';
import Clients from '@/pages/Clients';
import Reports from '@/pages/Reports';
import Financial from '@/pages/Financial';
import SettingsPage from '@/pages/Settings';
import AuditSheetDesigner from '@/pages/AuditSheetDesigner';
import AuditScheduling from '@/pages/AuditScheduling';
import UserActivityReport from '@/pages/UserActivityReport';
import OperationsDashboard from '@/pages/OperationsDashboard';
import ProjectManagement from '@/pages/ProjectManagement';
import HRDashboard from '@/pages/HRDashboard';
import TrainingResources from '@/pages/TrainingResources';
import ManagerTraining from '@/pages/ManagerTraining';
import SystemLogs from '@/pages/SystemLogs';
import Notifications from '@/pages/Notifications';
import ClientPortalSettings from '@/pages/ClientPortalSettings';
import SystemSettingsPage from '@/pages/SystemSettings';
import Maintenance from '@/pages/Maintenance';
import Compliance from '@/pages/Compliance';
import QualityControlPage from '@/pages/QualityControl';
import Tickets from '@/pages/Tickets';
import CRM from '@/pages/CRM';
import Recruitment from '@/pages/Recruitment';

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

import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import { GlobalProvider } from './contexts/GlobalContext';
import { EnterpriseProvider } from './contexts/EnterpriseContext';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <GlobalProvider>
          <EnterpriseProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                
                <Route element={<ProtectedRoute />}>
                  <Route element={<AuthenticatedLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/kpi-dashboard" element={<KpiDashboard />} />
                    <Route path="/evaluations" element={<Evaluations />} />
                    <Route path="/clients" element={<Clients />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/financial" element={<Financial />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/audit-sheet-designer" element={<AuditSheetDesigner />} />
                    <Route path="/audit-scheduling" element={<AuditScheduling />} />
                    <Route path="/user-activity-report" element={<UserActivityReport />} />
                    <Route path="/operations-dashboard" element={<OperationsDashboard />} />
                    <Route path="/project-management" element={<ProjectManagement />} />
                    <Route path="/hr-dashboard" element={<HRDashboard />} />
                    <Route path="/training-resources" element={<TrainingResources />} />
                    <Route path="/manager-training" element={<ManagerTraining />} />
                    <Route path="/system-logs" element={<SystemLogs />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/client-portal-settings" element={<ClientPortalSettings />} />
                    
                    {/* Existing stub interfaces */}
                    <Route path="/recruitment" element={<Recruitment />} />
                    <Route path="/crm" element={<CRM />} />
                    <Route path="/quality-control" element={<QualityControlPage />} />
                    <Route path="/system-settings" element={<SystemSettingsPage />} />
                    <Route path="/tickets" element={<Tickets />} />
                    <Route path="/compliance" element={<Compliance />} />
                    <Route path="/maintenance" element={<Maintenance />} />
                    
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
                  </Route>
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </EnterpriseProvider>
        </GlobalProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
