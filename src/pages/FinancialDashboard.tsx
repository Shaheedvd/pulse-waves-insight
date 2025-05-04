
import React, { useState } from "react";
import { DepartmentDashboard } from "@/components/dashboard/DepartmentDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Calculator, ListTodo } from "lucide-react";
import { TaskItem } from "@/contexts/TaskContext";
import { useAuth } from "@/contexts/AuthContext";

const FinancialDashboard: React.FC = () => {
  const { currentUser, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Custom metrics for Financial Department
  const FinancialMetrics = (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Financial Reporting Status</CardTitle>
          <CardDescription>Current status of financial reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Monthly P&L Report</p>
                <div className="text-xs text-muted-foreground">Due May 15, 2025</div>
              </div>
              <Button size="sm" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                View
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Quarterly Balance Sheet</p>
                <div className="text-xs text-muted-foreground">Due June 10, 2025</div>
              </div>
              <Button size="sm" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                View
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Cash Flow Statement</p>
                <div className="text-xs text-muted-foreground">Due May 30, 2025</div>
              </div>
              <Button size="sm" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payroll Schedule</CardTitle>
          <CardDescription>Upcoming payroll tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Validate Timesheets</p>
                <div className="text-xs text-muted-foreground">Due May 10, 2025</div>
              </div>
              <div className="text-sm font-medium text-green-600">Completed</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Process Payroll</p>
                <div className="text-xs text-muted-foreground">Due May 28, 2025</div>
              </div>
              <Button size="sm" variant="outline">
                <ListTodo className="mr-2 h-4 w-4" />
                Start
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Submit Tax Filings</p>
                <div className="text-xs text-muted-foreground">Due June 2, 2025</div>
              </div>
              <div className="text-sm font-medium text-orange-600">Pending</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  // Custom content for Financial Department
  const FinanceCustomContent = (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Financial Calendar</CardTitle>
          <CardDescription>Upcoming financial events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Monthly P&L Review</p>
                <div className="text-xs text-muted-foreground">May 15, 2025</div>
              </div>
              <Button size="sm" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                View
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Budget Planning Meeting</p>
                <div className="text-xs text-muted-foreground">May 20, 2025</div>
              </div>
              <Button size="sm" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                View
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Quarterly Finance Review</p>
                <div className="text-xs text-muted-foreground">June 10, 2025</div>
              </div>
              <Button size="sm" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Financial Tools</CardTitle>
          <CardDescription>Quick access to financial tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button className="w-full justify-start">
              <Calculator className="mr-2 h-5 w-5" />
              Budget Calculator
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-5 w-5" />
              Financial Reports
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <ListTodo className="mr-2 h-5 w-5" />
              Expense Tracker
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <DepartmentDashboard
      department="finance"
      title="Financial Department Dashboard"
      description="Track financial operations, reports, and payroll management"
      metrics={FinancialMetrics}
      customContent={FinanceCustomContent}
    />
  );
};

export default FinancialDashboard;
