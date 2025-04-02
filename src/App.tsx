
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Evaluations from "./pages/Evaluations";
import Clients from "./pages/Clients";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import UserManagement from "./pages/UserManagement";
import UserActivityReport from "./pages/UserActivityReport";
import Reports from "./pages/Reports";
import ReportDesigner from "./pages/ReportDesigner";
import AuthenticatedLayout from "./components/layout/AuthenticatedLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
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
                    path="/report-designer" 
                    element={<ReportDesigner />} 
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
                    path="/settings" 
                    element={<Settings />} 
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
  );
};

export default App;
