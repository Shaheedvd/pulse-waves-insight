
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateFinancialPdf } from "@/lib/utils";

const FinancialReports = () => {
  const [activeTab, setActiveTab] = useState("income");
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false);
  const [reportType, setReportType] = useState("income");
  const [reportFormat, setReportFormat] = useState("pdf");
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // First day of current month
    to: new Date(),
  });

  const handleGenerateReport = () => {
    const reportData = {
      period: `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`,
      reportType,
    };
    
    generateFinancialPdf(reportData);
    setIsGenerateReportOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">Financial Reports</h2>
        <Button onClick={() => setIsGenerateReportOpen(true)}>Generate Report</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
        </TabsList>

        <TabsContent value="income" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Income Statement</CardTitle>
              <CardDescription>Revenue and expense summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Revenue</span>
                <span>R 325,000.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Cost of Sales</span>
                <span>R 120,000.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Gross Profit</span>
                <span>R 205,000.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Operating Expenses</span>
                <span>R 95,000.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Net Profit</span>
                <span className="font-bold">R 110,000.00</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Revenue by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Services</span>
                  <span>R 210,000.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Products</span>
                  <span>R 85,000.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Other Income</span>
                  <span>R 30,000.00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Report</CardTitle>
              <CardDescription>Breakdown of all expenses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Salaries</span>
                <span>R 65,000.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Rent</span>
                <span>R 12,000.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Utilities</span>
                <span>R 5,000.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Office Supplies</span>
                <span>R 3,500.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Marketing</span>
                <span>R 8,500.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Other Expenses</span>
                <span>R 1,000.00</span>
              </div>
              <div className="flex justify-between mt-2 pt-2 border-t">
                <span className="font-bold">Total Expenses</span>
                <span className="font-bold">R 95,000.00</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Statement</CardTitle>
              <CardDescription>Cash movement summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Operating Activities</h4>
                <div className="pl-4 space-y-1">
                  <div className="flex justify-between">
                    <span>Net Income</span>
                    <span>R 110,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Depreciation</span>
                    <span>R 8,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Changes in Working Capital</span>
                    <span>R -15,000.00</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Cash from Operating</span>
                    <span>R 103,000.00</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Investing Activities</h4>
                <div className="pl-4 space-y-1">
                  <div className="flex justify-between">
                    <span>Capital Expenditures</span>
                    <span>R -35,000.00</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Cash from Investing</span>
                    <span>R -35,000.00</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Financing Activities</h4>
                <div className="pl-4 space-y-1">
                  <div className="flex justify-between">
                    <span>Loan Repayments</span>
                    <span>R -12,000.00</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Cash from Financing</span>
                    <span>R -12,000.00</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between font-bold">
                  <span>Net Cash Flow</span>
                  <span>R 56,000.00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Balance Sheet</CardTitle>
              <CardDescription>Assets, liabilities, and equity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Assets</h4>
                <div className="pl-4 space-y-1">
                  <div className="flex justify-between">
                    <span>Cash and Cash Equivalents</span>
                    <span>R 185,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accounts Receivable</span>
                    <span>R 95,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Inventory</span>
                    <span>R 45,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fixed Assets</span>
                    <span>R 320,000.00</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total Assets</span>
                    <span>R 645,000.00</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Liabilities</h4>
                <div className="pl-4 space-y-1">
                  <div className="flex justify-between">
                    <span>Accounts Payable</span>
                    <span>R 35,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Short-term Loans</span>
                    <span>R 25,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Long-term Loans</span>
                    <span>R 180,000.00</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total Liabilities</span>
                    <span>R 240,000.00</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Equity</h4>
                <div className="pl-4 space-y-1">
                  <div className="flex justify-between">
                    <span>Share Capital</span>
                    <span>R 250,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Retained Earnings</span>
                    <span>R 155,000.00</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total Equity</span>
                    <span>R 405,000.00</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between font-bold">
                  <span>Total Liabilities and Equity</span>
                  <span>R 645,000.00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Generate Report Dialog */}
      <Dialog open={isGenerateReportOpen} onOpenChange={setIsGenerateReportOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generate Financial Report</DialogTitle>
            <DialogDescription>Select report options</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="report-type" className="text-right">
                Report Type
              </label>
              <Select
                value={reportType}
                onValueChange={(value) => setReportType(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income Statement</SelectItem>
                  <SelectItem value="expenses">Expense Report</SelectItem>
                  <SelectItem value="cashflow">Cash Flow</SelectItem>
                  <SelectItem value="balance">Balance Sheet</SelectItem>
                  <SelectItem value="comprehensive">Comprehensive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="format" className="text-right">
                Format
              </label>
              <Select
                value={reportFormat}
                onValueChange={(value) => setReportFormat(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date-from" className="text-right">
                From
              </label>
              <Input
                id="date-from"
                type="date"
                className="col-span-3"
                value={dateRange.from.toISOString().split('T')[0]}
                onChange={(e) => {
                  const newDate = new Date(e.target.value);
                  setDateRange(prev => ({ ...prev, from: newDate }));
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date-to" className="text-right">
                To
              </label>
              <Input
                id="date-to"
                type="date"
                className="col-span-3" 
                value={dateRange.to.toISOString().split('T')[0]}
                onChange={(e) => {
                  const newDate = new Date(e.target.value);
                  setDateRange(prev => ({ ...prev, to: newDate }));
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleGenerateReport}>
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinancialReports;
