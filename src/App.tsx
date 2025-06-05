
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
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import { GlobalProvider } from './contexts/GlobalContext';
import Recruitment from '@/pages/Recruitment';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <GlobalProvider>
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
        </GlobalProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
