import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { generateFinancialPdf } from "@/utils/pdf-generation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export const FinancialReports = () => {
  const [activeReport, setActiveReport] = useState("income");
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false);
  const [reportPeriod, setReportPeriod] = useState("monthly");
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
    to: new Date(),
  });
  const [customReport, setCustomReport] = useState({
    title: "",
    description: "",
    metrics: ["revenue", "expenses", "profit_margin"],
  });

  // Sample data for reports
  const monthlyIncomeData = [
    { month: 'Jan', revenue: 145000, expenses: 67000, profit: 78000 },
    { month: 'Feb', revenue: 132000, expenses: 71000, profit: 61000 },
    { month: 'Mar', revenue: 157000, expenses: 70000, profit: 87000 },
    { month: 'Apr', revenue: 169000, expenses: 68000, profit: 101000 },
    { month: 'May', revenue: 187000, expenses: 73000, profit: 114000 },
    { month: 'Jun', revenue: 190000, expenses: 80000, profit: 110000 },
  ];

  const handleGenerateReport = () => {
    // Example of updating the generateFinancialPdf call
    generateFinancialPdf({
      period: `${reportPeriod.charAt(0).toUpperCase() + reportPeriod.slice(1)} Report: ${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`,
      revenue: 245000,
      expenses: 110000,
      profit: 135000
    });
    
    setIsGenerateReportOpen(false);
  };

  const handleExport = (type) => {
    let data;
    let title = "";
    
    switch (activeReport) {
      case "income":
        data = monthlyIncomeData;
        title = "Income Report";
        break;
      case "expense":
        data = monthlyIncomeData;
        title = "Expense Report";
        break;
      default:
        data = monthlyIncomeData;
        title = "Financial Report";
    }

    // Fix the function call to use the correct parameters
    generateFinancialPdf({
      period: title
    });
  };

  // For handling date range picker (this would need a custom implementation or library)
  const handleDateRangeChange = (range) => {
    // In a real implementation, this would update the date range
    console.log("Date range changed:", range);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold">Financial Reports</h2>
        <p className="text-muted-foreground">
          Generate and analyze financial reports
        </p>
      </div>

      <Tabs value={activeReport} onValueChange={setActiveReport} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="income">Income Report</TabsTrigger>
          <TabsTrigger value="expense">Expense Report</TabsTrigger>
          <TabsTrigger value="custom">Custom Report</TabsTrigger>
        </TabsList>

        <TabsContent value="income" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Income Report</CardTitle>
              <CardDescription>Monthly income overview</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyIncomeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="profit" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
              <Button onClick={() => handleExport("income")}>Export</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expense" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Report</CardTitle>
              <CardDescription>Monthly expense breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyIncomeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="expenses" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
              <Button onClick={() => handleExport("expense")}>Export</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report</CardTitle>
              <CardDescription>Create and customize your own report</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setIsGenerateReportOpen(true)}>Generate Report</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Fix the Dialog open state management */}
      <Dialog open={isGenerateReportOpen} onOpenChange={setIsGenerateReportOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generate Report</DialogTitle>
            <DialogDescription>
              Customize the report settings
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="report-period" className="text-right">
                Report Period
              </label>
              <Select value={reportPeriod} onValueChange={(value) => setReportPeriod(value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date-range" className="text-right">
                Date Range
              </label>
              <Input
                id="date-range"
                className="col-span-3"
                value={`${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`}
                onChange={(value: string) => setDateRange(value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleGenerateReport}>Generate Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinancialReports;
