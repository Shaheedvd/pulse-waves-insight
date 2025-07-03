
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import FinanceDashboard from "@/components/finance/FinanceDashboard";
import AccountsReceivable from "@/components/finance/AccountsReceivable";
import AccountsPayable from "@/components/finance/AccountsPayable";
import InvoiceManagement from "@/components/financial/InvoiceManagement";
import FinancialReports from "@/components/financial/FinancialReports";
import ExpenseManagement from "@/components/financial/ExpenseManagement";
import KpiDashboard from "@/components/financial/KpiDashboard";

const Financial = () => {
  const { currentUser, hasPermission } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Check if user has permission to access financial page
  const canAccessFinancial = hasPermission("canManageFinancials");

  if (!canAccessFinancial) {
    // Redirect unauthorized users
    React.useEffect(() => {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access financial information",
        variant: "destructive",
      });
      navigate("/dashboard");
    }, [navigate, toast]);
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Finance Management System</h1>
        <p className="text-muted-foreground">
          Complete financial operations management - from invoicing to reporting
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="receivables">A/R</TabsTrigger>
          <TabsTrigger value="payables">A/P</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="kpi">KPI</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <FinanceDashboard />
        </TabsContent>

        <TabsContent value="receivables" className="space-y-4">
          <AccountsReceivable />
        </TabsContent>

        <TabsContent value="payables" className="space-y-4">
          <AccountsPayable />
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <InvoiceManagement />
        </TabsContent>
        
        <TabsContent value="expenses" className="space-y-4">
          <ExpenseManagement />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <FinancialReports />
        </TabsContent>

        <TabsContent value="kpi" className="space-y-4">
          <KpiDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Financial;
