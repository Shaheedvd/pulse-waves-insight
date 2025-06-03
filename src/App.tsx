import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import Dashboard from '@/pages/Dashboard';
import Evaluations from '@/pages/Evaluations';
import Clients from '@/pages/Clients';
import Reports from '@/pages/Reports';
import Financial from '@/pages/Financial';
import SettingsPage from '@/pages/Settings';
import CXEvaluationBuilder from '@/pages/CXEvaluationBuilder';
import AuditSheetDesigner from '@/pages/AuditSheetDesigner';
import AuditScheduling from '@/pages/AuditScheduling';
import UserActivityReport from '@/pages/UserActivityReport';
import FinancialReports from '@/pages/FinancialReports';
import OperationsDashboard from '@/pages/OperationsDashboard';
import ProjectManagement from '@/pages/ProjectManagement';
import HRDashboard from '@/pages/HRDashboard';
import Recruitment from '@/pages/Recruitment';
import TrainingResources from '@/pages/TrainingResources';
import ManagerTraining from '@/pages/ManagerTraining';
import MarketingDashboard from '@/pages/MarketingDashboard';
import MarketingActions from '@/pages/MarketingActions';
import SalesDashboard from '@/pages/SalesDashboard';
import LegalDashboard from '@/pages/LegalDashboard';
import SystemLogs from '@/pages/SystemLogs';
import Notifications from '@/pages/Notifications';
import ClientPortalSettings from '@/pages/ClientPortalSettings';
import Payroll from '@/pages/Payroll';
import ITDashboard from '@/pages/ITDashboard';
import SystemSettingsPage from '@/pages/SystemSettings';
import FacilitiesDashboard from '@/pages/FacilitiesDashboard';
import Maintenance from '@/pages/Maintenance';
import Compliance from '@/pages/Compliance';
import QualityControlPage from '@/pages/QualityControl';
import Tickets from '@/pages/Tickets';
import CRM from '@/pages/CRM';
import SupportDashboard from '@/pages/SupportDashboard';
import ProductDashboard from '@/pages/ProductDashboard';
import ComplianceManagement from './components/compliance/ComplianceManagement';
import MaintenanceManagement from './components/maintenance/MaintenanceManagement';
import CustomerRelations from './components/crm/CustomerRelations';
import QualityControl from './components/quality/QualityControl';
import SupportTickets from './components/support/SupportTickets';
import SystemSettings from './components/system/SystemSettings';
import { AuthProvider } from './contexts/AuthContext';
import AdminKPI from './pages/AdminKPI';
import KPIDashboard from './pages/KPIDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<AuthenticatedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/evaluations" element={<Evaluations />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/financial" element={<Financial />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/cx-evaluation-builder" element={<CXEvaluationBuilder />} />
              <Route path="/audit-sheet-designer" element={<AuditSheetDesigner />} />
              <Route path="/audit-scheduling" element={<AuditScheduling />} />
              <Route path="/user-activity-report" element={<UserActivityReport />} />
              <Route path="/financial-reports" element={<FinancialReports />} />
              <Route path="/operations-dashboard" element={<OperationsDashboard />} />
              <Route path="/project-management" element={<ProjectManagement />} />
              <Route path="/hr-dashboard" element={<HRDashboard />} />
              <Route path="/training-resources" element={<TrainingResources />} />
              <Route path="/manager-training" element={<ManagerTraining />} />
              <Route path="/marketing-dashboard" element={<MarketingDashboard />} />
              <Route path="/marketing-actions" element={<MarketingActions />} />
              <Route path="/sales-dashboard" element={<SalesDashboard />} />
              <Route path="/legal-dashboard" element={<LegalDashboard />} />
              <Route path="/system-logs" element={<SystemLogs />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/client-portal-settings" element={<ClientPortalSettings />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/it-dashboard" element={<ITDashboard />} />
              <Route path="/facilities-dashboard" element={<FacilitiesDashboard />} />
              <Route path="/support-dashboard" element={<SupportDashboard />} />
              <Route path="/product-dashboard" element={<ProductDashboard />} />
              <Route path="/admin-kpi" element={<AdminKPI />} />
              <Route path="/kpi-dashboard" element={<KPIDashboard />} />
              
              {/* New routes for stub interfaces */}
              <Route path="/recruitment" element={<Recruitment />} />
              <Route path="/crm" element={<CRM />} />
              <Route path="/quality-control" element={<QualityControlPage />} />
              <Route path="/system-settings" element={<SystemSettingsPage />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/maintenance" element={<Maintenance />} />
            </Route>
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
