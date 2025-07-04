
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OpsCommandDashboard from "@/components/operations/OpsCommandDashboard";
import OpsKPISection from "@/components/operations/OpsKPISection";
import OpsQuickStats from "@/components/operations/OpsQuickStats";
import OpsTaskManager from "@/components/operations/OpsTaskManager";
import ProjectTracker from "@/components/operations/ProjectTracker";
import RequestsManager from "@/components/operations/RequestsManager";
import IncidentLog from "@/components/operations/IncidentLog";
import OpsAnalytics from "@/components/operations/OpsAnalytics";
import AttendanceShifts from "@/components/operations/AttendanceShifts";

const OperationsDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="dashboard">Command</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="shifts">Shifts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <OpsCommandDashboard />
          <OpsKPISection />
          <OpsQuickStats />
        </TabsContent>

        <TabsContent value="tasks">
          <OpsTaskManager />
        </TabsContent>

        <TabsContent value="projects">
          <ProjectTracker />
        </TabsContent>

        <TabsContent value="requests">
          <RequestsManager />
        </TabsContent>

        <TabsContent value="incidents">
          <IncidentLog />
        </TabsContent>

        <TabsContent value="shifts">
          <AttendanceShifts />
        </TabsContent>

        <TabsContent value="analytics">
          <OpsAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OperationsDashboard;
