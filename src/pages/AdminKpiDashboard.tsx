
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminKpiTable from "@/components/kpi/AdminKpiTable";
import AdminKpiForm from "@/components/kpi/AdminKpiForm";

const AdminKpiDashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("view");

  const isAdmin = currentUser?.role === "admin" || currentUser?.role === "superuser";

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin KPI Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and track key performance indicators across the organization
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="view">View KPIs</TabsTrigger>
          {isAdmin && <TabsTrigger value="create">Create KPI</TabsTrigger>}
        </TabsList>

        <TabsContent value="view" className="space-y-4">
          <AdminKpiTable />
        </TabsContent>

        {isAdmin && (
          <TabsContent value="create" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create New KPI</CardTitle>
                <CardDescription>
                  Define new key performance indicators for the organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminKpiForm />
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default AdminKpiDashboard;
