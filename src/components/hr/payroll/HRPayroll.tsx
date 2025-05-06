
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PayrollProcessing } from "./PayrollProcessing";
import { EmployeePayrollData } from "./EmployeePayrollData";
import { TaxManagement } from "./TaxManagement";
import { PayrollReports } from "./PayrollReports";
import { PayrollSettings } from "./PayrollSettings";
import { Calendar, DollarSign, FileText, Settings, Users } from "lucide-react";

export const HRPayroll = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Payroll Management</h2>
        </div>
      </div>

      <Tabs defaultValue="processing" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="processing">Payroll Processing</TabsTrigger>
          <TabsTrigger value="employees">Employee Data</TabsTrigger>
          <TabsTrigger value="tax">Tax Management</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="processing" className="space-y-4">
          <PayrollProcessing />
        </TabsContent>

        <TabsContent value="employees" className="space-y-4">
          <EmployeePayrollData />
        </TabsContent>

        <TabsContent value="tax" className="space-y-4">
          <TaxManagement />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <PayrollReports />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <PayrollSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRPayroll;
