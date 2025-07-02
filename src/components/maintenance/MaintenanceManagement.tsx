
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Hammer, 
  Plus, 
  Wrench, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  User,
  Package,
  Settings,
  FileText,
  BarChart3,
  Zap,
  Shield,
  TrendingUp,
  Activity
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MaintenanceDashboard } from "./MaintenanceDashboard";
import { AssetManagement } from "./AssetManagement";
import { WorkOrderManagement } from "./WorkOrderManagement";
import { PreventiveMaintenanceScheduling } from "./PreventiveMaintenanceScheduling";
import { EmergencyRequestSystem } from "./EmergencyRequestSystem";
import { TechnicianManagement } from "./TechnicianManagement";
import { InventoryControl } from "./InventoryControl";
import { MaintenanceCalendar } from "./MaintenanceCalendar";
import { MaintenanceReports } from "./MaintenanceReports";
import { DocumentLibrary } from "./DocumentLibrary";

const MaintenanceManagement = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Hammer className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Maintenance Management System</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Quick Actions
          </Button>
        </div>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Enterprise CMMS (Computerized Maintenance Management System) - Role-based access, workflow-driven maintenance operations.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-10">
          <TabsTrigger value="dashboard" className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="assets" className="flex items-center gap-1">
            <Package className="h-4 w-4" />
            Assets
          </TabsTrigger>
          <TabsTrigger value="work-orders" className="flex items-center gap-1">
            <Wrench className="h-4 w-4" />
            Work Orders
          </TabsTrigger>
          <TabsTrigger value="preventive" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Preventive
          </TabsTrigger>
          <TabsTrigger value="emergency" className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            Emergency
          </TabsTrigger>
          <TabsTrigger value="technicians" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            Technicians
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-1">
            <Package className="h-4 w-4" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          <MaintenanceDashboard />
        </TabsContent>

        <TabsContent value="assets" className="mt-6">
          <AssetManagement />
        </TabsContent>

        <TabsContent value="work-orders" className="mt-6">
          <WorkOrderManagement />
        </TabsContent>

        <TabsContent value="preventive" className="mt-6">
          <PreventiveMaintenanceScheduling />
        </TabsContent>

        <TabsContent value="emergency" className="mt-6">
          <EmergencyRequestSystem />
        </TabsContent>

        <TabsContent value="technicians" className="mt-6">
          <TechnicianManagement />
        </TabsContent>

        <TabsContent value="inventory" className="mt-6">
          <InventoryControl />
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <MaintenanceCalendar />
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <MaintenanceReports />
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <DocumentLibrary />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaintenanceManagement;
