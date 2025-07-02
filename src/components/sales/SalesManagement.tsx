
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalesDashboard } from "./SalesDashboard";
import { LeadsManagement } from "./LeadsManagement";
import { DealsManagement } from "./DealsManagement";
import { CustomerAccounts } from "./CustomerAccounts";
import { QuotationsManagement } from "./QuotationsManagement";
import { SalesActivities } from "./SalesActivities";
import { TasksReminders } from "./TasksReminders";
import { SalesTargets } from "./SalesTargets";
import { ProductPricing } from "./ProductPricing";
import { SalesReports } from "./SalesReports";
import { SalesDocuments } from "./SalesDocuments";

export const SalesManagement = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "Dashboard", component: SalesDashboard },
    { id: "leads", label: "Leads", component: LeadsManagement },
    { id: "deals", label: "Deals", component: DealsManagement },
    { id: "customers", label: "Customers", component: CustomerAccounts },
    { id: "quotes", label: "Quotes", component: QuotationsManagement },
    { id: "activities", label: "Activities", component: SalesActivities },
    { id: "tasks", label: "Tasks", component: TasksReminders },
    { id: "targets", label: "Targets", component: SalesTargets },
    { id: "products", label: "Products", component: ProductPricing },
    { id: "reports", label: "Reports", component: SalesReports },
    { id: "documents", label: "Documents", component: SalesDocuments },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Sales Management System</h1>
        <p className="text-muted-foreground">
          Complete CRM and sales operations management platform
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6 lg:grid-cols-11">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="text-xs">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="space-y-4">
            <tab.component />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
