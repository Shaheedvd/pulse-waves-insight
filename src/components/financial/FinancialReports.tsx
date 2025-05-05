import React, { useState } from "react";
import { Card, CardContent, CardDesc, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CalendarRange, Download, FileText, Filter, Search, ArrowDown, ArrowUp, Printer, DollarSign, ChartBarIcon, ChartPieIcon, TrendingUp } from "lucide-react";
import { downloadAsPdf, generateFinancialPdf } from "@/lib/pdf-utils";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

export const FinancialReports = () => {
  const { toast } = useToast();
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ 
    from: new Date(), 
    to: new Date() 
  });
  const [reportType, setReportType] = useState("income");
  
  const handleGenerateReport = () => {
    // Sample financial report data
    const reportData = {
      period: `${format(dateRange.from, "yyyy-MM-dd")} to ${format(dateRange.to, "yyyy-MM-dd")}`,
      revenue: 157500,
      expenses: 89200,
      profit: 68300,
      outstandingInvoices: 42500,
      revenueBreakdown: [
        { category: "Restaurant Audits", amount: 65000, percentage: 41 },
        { category: "Forecourt & Shop Audits", amount: 48000, percentage: 30 },
        { category: "School Audits", amount: 24500, percentage: 16 },
        { category: "Hotel Audits", amount: 20000, percentage: 13 }
      ],
      expenseBreakdown: [
        { category: "Staff Salaries", amount: 45000, percentage: 50 },
        { category: "Evaluator Payments", amount: 25000, percentage: 28 },
        { category: "Office Rent", amount: 12000, percentage: 13 },
        { category: "Marketing", amount: 7200, percentage: 9 }
      ]
    };

    generateFinancialPdf(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`, reportData);
    
    toast({
      title: "Financial Report Generated",
      description: `The ${reportType} report has been generated and downloaded.`,
    });
  };

  const handleDownloadReport = (reportName) => {
    downloadAsPdf(reportName);
    toast({
      title: "Report Downloaded",
      description: `${reportName} has been downloaded as PDF`,
    });
  };

  const handlePrintReport = (reportName) => {
    toast({
      title: "Printing Report",
      description: `Preparing ${reportName} for printing`,
    });
    // In a real app, this would trigger print functionality
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const generateReport = (reportType) => {
    switch(reportType) {
      case 'income':
        generateFinancialPdf({
          period: `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`,
          // Add other fields needed for income report
        });
        break;
      case 'expense':
        generateFinancialPdf({
          period: `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`,
          // Add other fields needed for expense report
        });
        break;
      // ... handle other report types
      default:
        break;
    }
    setIsGenerateReportOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Financial Reports</h2>
        <Button onClick={() => setIsGenerateReportOpen(true)}>
          <FileText className="mr-2 h-4 w-4" />
          Generate New Report
        </Button>
      </div>

      <Tabs defaultValue="reports-library" className="space-y-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="reports-library">Reports Library</TabsTrigger>
          <TabsTrigger value="income-statement">Income Statement</TabsTrigger>
          <TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger>
          <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
          <TabsTrigger value="equity-changes">Changes in Equity</TabsTrigger>
          <TabsTrigger value="management-reports">Management Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reports-library" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDesc>
                Access all your financial reports in one place
              </CardDesc>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search reports..."
                    className="pl-8"
                  />
                </div>
                <Select defaultValue={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <CalendarRange className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Date range" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="this-quarter">This Quarter</SelectItem>
                    <SelectItem value="this-year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Generated Date</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { 
                        name: "Monthly Income Statement", 
                        type: "Income Statement", 
                        date: "2023-06-01", 
                        period: "May 2023" 
                      },
                      { 
                        name: "Q1 Financial Report", 
                        type: "Comprehensive", 
                        date: "2023-04-05", 
                        period: "Jan-Mar 2023" 
                      },
                      { 
                        name: "Client Revenue Analysis", 
                        type: "Revenue Report", 
                        date: "2023-05-15", 
                        period: "2023 YTD" 
                      },
                      { 
                        name: "Evaluator Expenses", 
                        type: "Expense Report", 
                        date: "2023-06-10", 
                        period: "May 2023" 
                      },
                      { 
                        name: "Cash Flow Statement", 
                        type: "Cash Flow", 
                        date: "2023-06-02", 
                        period: "May 2023" 
                      },
                      { 
                        name: "Balance Sheet - June 2023", 
                        type: "Balance Sheet", 
                        date: "2023-07-01", 
                        period: "As of June 30, 2023" 
                      },
                      { 
                        name: "Statement of Changes in Equity", 
                        type: "Equity Changes", 
                        date: "2023-07-01", 
                        period: "Jan-June 2023" 
                      },
                      { 
                        name: "Budget Variance Report", 
                        type: "Management", 
                        date: "2023-07-02", 
                        period: "June 2023" 
                      },
                      { 
                        name: "Aged Receivables Report", 
                        type: "Specific Purpose", 
                        date: "2023-07-03", 
                        period: "As of July 1, 2023" 
                      },
                      { 
                        name: "Financial Forecast", 
                        type: "Strategic", 
                        date: "2023-07-05", 
                        period: "Q3-Q4 2023" 
                      },
                    ].map((report, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{report.period}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePrintReport(report.name)}
                            >
                              <Printer className="h-4 w-4" />
                              <span className="sr-only">Print</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadReport(report.name)}
                            >
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="income-statement" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Income Statement</CardTitle>
                <CardDesc>
                  May 2023 | Generated on June 1, 2023
                </CardDesc>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handlePrintReport("Income Statement")}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDownloadReport("Income Statement")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Revenue</h3>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="pl-10">Restaurant Audits</TableCell>
                        <TableCell className="text-right">R 66,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Forecourt & Shop Audits</TableCell>
                        <TableCell className="text-right">R 55,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">School Audits</TableCell>
                        <TableCell className="text-right">R 20,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Hotel Audits</TableCell>
                        <TableCell className="text-right">R 16,500</TableCell>
                      </TableRow>
                      <TableRow className="font-medium">
                        <TableCell>Total Revenue</TableCell>
                        <TableCell className="text-right">R 157,500</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Expenses</h3>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="pl-10">Evaluator Payments</TableCell>
                        <TableCell className="text-right">R 45,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Staff Salaries</TableCell>
                        <TableCell className="text-right">R 65,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Office Rent</TableCell>
                        <TableCell className="text-right">R 12,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Utilities</TableCell>
                        <TableCell className="text-right">R 3,500</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Marketing</TableCell>
                        <TableCell className="text-right">R 5,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Other Expenses</TableCell>
                        <TableCell className="text-right">R 4,500</TableCell>
                      </TableRow>
                      <TableRow className="font-medium">
                        <TableCell>Total Expenses</TableCell>
                        <TableCell className="text-right">R 135,000</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <Table>
                  <TableBody>
                    <TableRow className="font-bold text-lg">
                      <TableCell>Net Income</TableCell>
                      <TableCell className="text-right">R 22,500</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Notes:</h4>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>All figures are before tax calculations</li>
                    <li>Month-over-month revenue increased by 12%</li>
                    <li>Profit margin is currently at 14.3%</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="balance-sheet" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Balance Sheet</CardTitle>
                <CardDesc>
                  As of May 31, 2023 | Generated on June 1, 2023
                </CardDesc>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handlePrintReport("Balance Sheet")}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDownloadReport("Balance Sheet")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Assets</h3>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={2} className="font-medium">Current Assets</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Cash and Cash Equivalents</TableCell>
                        <TableCell className="text-right">R 185,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Accounts Receivable</TableCell>
                        <TableCell className="text-right">R 55,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Prepaid Expenses</TableCell>
                        <TableCell className="text-right">R 12,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} className="font-medium">Fixed Assets</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Equipment</TableCell>
                        <TableCell className="text-right">R 48,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Furniture and Fixtures</TableCell>
                        <TableCell className="text-right">R 35,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Accumulated Depreciation</TableCell>
                        <TableCell className="text-right">(R 18,000)</TableCell>
                      </TableRow>
                      <TableRow className="font-bold">
                        <TableCell>Total Assets</TableCell>
                        <TableCell className="text-right">R 317,000</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Liabilities & Equity</h3>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={2} className="font-medium">Current Liabilities</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Accounts Payable</TableCell>
                        <TableCell className="text-right">R 28,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Accrued Expenses</TableCell>
                        <TableCell className="text-right">R 15,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} className="font-medium">Long-term Liabilities</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Business Loan</TableCell>
                        <TableCell className="text-right">R 75,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} className="font-medium">Equity</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Owner's Capital</TableCell>
                        <TableCell className="text-right">R 150,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Retained Earnings</TableCell>
                        <TableCell className="text-right">R 49,000</TableCell>
                      </TableRow>
                      <TableRow className="font-bold">
                        <TableCell>Total Liabilities & Equity</TableCell>
                        <TableCell className="text-right">R 317,000</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cash-flow" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Cash Flow Statement</CardTitle>
                <CardDesc>
                  May 2023 | Generated on June 1, 2023
                </CardDesc>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handlePrintReport("Cash Flow Statement")}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDownloadReport("Cash Flow Statement")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Operating Activities</h3>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="pl-10">Net Income</TableCell>
                        <TableCell className="text-right">R 22,500</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Depreciation</TableCell>
                        <TableCell className="text-right">R 1,500</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Increase in Accounts Receivable</TableCell>
                        <TableCell className="text-right">(R 8,000)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Increase in Accounts Payable</TableCell>
                        <TableCell className="text-right">R 5,000</TableCell>
                      </TableRow>
                      <TableRow className="font-medium">
                        <TableCell>Net Cash from Operating Activities</TableCell>
                        <TableCell className="text-right">R 21,000</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Investing Activities</h3>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="pl-10">Purchase of Equipment</TableCell>
                        <TableCell className="text-right">(R 5,000)</TableCell>
                      </TableRow>
                      <TableRow className="font-medium">
                        <TableCell>Net Cash from Investing Activities</TableCell>
                        <TableCell className="text-right">(R 5,000)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Financing Activities</h3>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="pl-10">Loan Repayment</TableCell>
                        <TableCell className="text-right">(R 3,000)</TableCell>
                      </TableRow>
                      <TableRow className="font-medium">
                        <TableCell>Net Cash from Financing Activities</TableCell>
                        <TableCell className="text-right">(R 3,000)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <Table>
                  <TableBody>
                    <TableRow className="font-medium">
                      <TableCell>Net Increase in Cash</TableCell>
                      <TableCell className="text-right">R 13,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cash at Beginning of Period</TableCell>
                      <TableCell className="text-right">R 172,000</TableCell>
                    </TableRow>
                    <TableRow className="font-bold text-lg">
                      <TableCell>Cash at End of Period</TableCell>
                      <TableCell className="text-right">R 185,000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="equity-changes" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Statement of Changes in Equity</CardTitle>
                <CardDesc>
                  For the period Jan 1, 2023 - May 31, 2023
                </CardDesc>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handlePrintReport("Statement of Changes in Equity")}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDownloadReport("Statement of Changes in Equity")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Particulars</TableHead>
                      <TableHead>Owner's Capital</TableHead>
                      <TableHead>Retained Earnings</TableHead>
                      <TableHead>Total Equity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Balance at January 1, 2023</TableCell>
                      <TableCell>R 150,000</TableCell>
                      <TableCell>R 28,500</TableCell>
                      <TableCell>R 178,500</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-10">Net Income for the period</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>R 86,500</TableCell>
                      <TableCell>R 86,500</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-10">Dividends paid</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>(R 66,000)</TableCell>
                      <TableCell>(R 66,000)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-10">Additional capital invested</TableCell>
                      <TableCell>R 0</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>R 0</TableCell>
                    </TableRow>
                    <TableRow className="font-bold">
                      <TableCell>Balance at May 31, 2023</TableCell>
                      <TableCell>R 150,000</TableCell>
                      <TableCell>R 49,000</TableCell>
                      <TableCell>R 199,000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Notes:</h4>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Quarterly dividend of R 33,000 was paid in March 2023</li>
                    <li>Additional dividend of R 33,000 was paid in May 2023</li>
                    <li>No additional capital was invested during this period</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="management-reports" className="space-y-4">
          <Tabs defaultValue="budget-variance">
            <TabsList className="mb-4">
              <TabsTrigger value="budget-variance">Budget Variance</TabsTrigger>
              <TabsTrigger value="department-performance">Department Performance</TabsTrigger>
              <TabsTrigger value="cost-analysis">Cost Analysis</TabsTrigger>
              <TabsTrigger value="aged-receivables">Aged Receivables</TabsTrigger>
              <TabsTrigger value="forecasting">Financial Forecasting</TabsTrigger>
            </TabsList>
            
            <TabsContent value="budget-variance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Budget Variance Report
                  </CardTitle>
                  <CardDesc>
                    Actual performance compared to budget for May 2023
                  </CardDesc>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Budgeted</TableHead>
                        <TableHead>Actual</TableHead>
                        <TableHead>Variance</TableHead>
                        <TableHead>Variance %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={5} className="font-medium">Revenue</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Restaurant Audits</TableCell>
                        <TableCell>R 70,000</TableCell>
                        <TableCell>R 66,000</TableCell>
                        <TableCell className="text-red-600">-R 4,000</TableCell>
                        <TableCell className="text-red-600">-5.7%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Forecourt & Shop Audits</TableCell>
                        <TableCell>R 50,000</TableCell>
                        <TableCell>R 55,000</TableCell>
                        <TableCell className="text-green-600">+R 5,000</TableCell>
                        <TableCell className="text-green-600">+10%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">School Audits</TableCell>
                        <TableCell>R 25,000</TableCell>
                        <TableCell>R 20,000</TableCell>
                        <TableCell className="text-red-600">-R 5,000</TableCell>
                        <TableCell className="text-red-600">-20%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Hotel Audits</TableCell>
                        <TableCell>R 15,000</TableCell>
                        <TableCell>R 16,500</TableCell>
                        <TableCell className="text-green-600">+R 1,500</TableCell>
                        <TableCell className="text-green-600">+10%</TableCell>
                      </TableRow>
                      <TableRow className="font-medium bg-muted/50">
                        <TableCell>Total Revenue</TableCell>
                        <TableCell>R 160,000</TableCell>
                        <TableCell>R 157,500</TableCell>
                        <TableCell className="text-red-600">-R 2,500</TableCell>
                        <TableCell className="text-red-600">-1.6%</TableCell>
                      </TableRow>
                      
                      <TableRow>
                        <TableCell colSpan={5} className="font-medium">Expenses</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Evaluator Payments</TableCell>
                        <TableCell>R 48,000</TableCell>
                        <TableCell>R 45,000</TableCell>
                        <TableCell className="text-green-600">+R 3,000</TableCell>
                        <TableCell className="text-green-600">+6.3%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Staff Salaries</TableCell>
                        <TableCell>R 65,000</TableCell>
                        <TableCell>R 65,000</TableCell>
                        <TableCell>R 0</TableCell>
                        <TableCell>0%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Marketing</TableCell>
                        <TableCell>R 8,000</TableCell>
                        <TableCell>R 5,000</TableCell>
                        <TableCell className="text-green-600">+R 3,000</TableCell>
                        <TableCell className="text-green-600">+37.5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-10">Other Expenses</TableCell>
                        <TableCell>R 22,000</TableCell>
                        <TableCell>R 20,000</TableCell>
                        <TableCell className="text-green-600">+R 2,000</TableCell>
                        <TableCell className="text-green-600">+9.1%</TableCell>
                      </TableRow>
                      <TableRow className="font-medium bg-muted/50">
                        <TableCell>Total Expenses</TableCell>
                        <TableCell>R 143,000</TableCell>
                        <TableCell>R 135,000</TableCell>
                        <TableCell className="text-green-600">+R 8,000</TableCell>
                        <TableCell className="text-green-600">+5.6%</TableCell>
                      </TableRow>
                      
                      <TableRow className="font-bold text-lg">
                        <TableCell>Net Income</TableCell>
                        <TableCell>R 17,000</TableCell>
                        <TableCell>R 22,500</TableCell>
                        <TableCell className="text-green-600">+R 5,500</TableCell>
                        <TableCell className="text-green-600">+32.4%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <div className="mt-6 p-4 bg-muted rounded-md">
                    <h4 className="font-medium mb-2">Analysis & Action Items:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <span className="font-medium">Restaurant Audits:</span> Revenue below budget by 5.7%. 
                        <span className="text-muted-foreground block ml-5 mt-1">
                          Action: Follow up with account managers to understand reasons for the shortfall.
                        </span>
                      </li>
                      <li>
                        <span className="font-medium">School Audits:</span> Significant revenue shortfall of 20%.
                        <span className="text-muted-foreground block ml-5 mt-1">
                          Action: Review pricing strategy and marketing efforts for school segment.
                        </span>
                      </li>
                      <li>
                        <span className="font-medium">Marketing:</span> Spent R3,000 less than budgeted.
                        <span className="text-muted-foreground block ml-5 mt-1">
                          Action: Evaluate if additional marketing would improve school audit numbers.
                        </span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="department-performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ChartBarIcon className="h-5 w-5 mr-2" />
                    Department Performance Report
                  </CardTitle>
                  <CardDesc>
                    Key performance indicators by department for May 2023
                  </CardDesc>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Expenses</TableHead>
                        <TableHead>Contribution</TableHead>
                        <TableHead>Margin</TableHead>
                        <TableHead>YoY Growth</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Restaurant Division</TableCell>
                        <TableCell>R 66,000</TableCell>
                        <TableCell>R 42,000</TableCell>
                        <TableCell>R 24,000</TableCell>
                        <TableCell>36.4%</TableCell>
                        <TableCell>+8.2%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Forecourt Division</TableCell>
                        <TableCell>R 55,000</TableCell>
                        <TableCell>R 38,000</TableCell>
                        <TableCell>R 17,000</TableCell>
                        <TableCell>30.9%</TableCell>
                        <TableCell>+15.8%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Education Division</TableCell>
                        <TableCell>R 20,000</TableCell>
                        <TableCell>R 15,000</TableCell>
                        <TableCell>R 5,000</TableCell>
                        <TableCell>25.0%</TableCell>
                        <TableCell>-12.5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Hospitality Division</TableCell>
                        <TableCell>R 16,500</TableCell>
                        <TableCell>R 12,000</TableCell>
                        <TableCell>R 4,500</TableCell>
                        <TableCell>27.3%</TableCell>
                        <TableCell>+22.0%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Corporate Overhead</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>R 28,000</TableCell>
                        <TableCell>-R 28,000</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-5.1%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-muted rounded-md">
                      <h4 className="font-medium mb-2">Key Insights:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Forecourt Division showing strongest YoY growth at 15.8%</li>
                        <li>Education Division facing challenges with -12.5% decline</li>
                        <li>Corporate overhead costs reduced by 5.1% from previous year</li>
                        <li>Hospitality Division has potential for expansion given its 22% growth</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-muted rounded-md">
                      <h4 className="font-medium mb-2">Action Items:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Investigate Education Division decline and develop recovery plan</li>
                        <li>Explore expansion opportunities in Hospitality sector</li>
                        <li>Share Forecourt Division best practices with other units</li>
                        <li>Review resource allocation based on departmental performance</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="cost-analysis">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ChartPieIcon className="h-5 w-5 mr-2" />
                    Cost Analysis Report
                  </CardTitle>
                  <CardDesc>
                    Detailed breakdown of costs by category and analysis
                  </CardDesc>
                </CardHeader>
                <CardContent>
                  {/* Cost Analysis content would go here */}
                  <div className="text-center py-12 text-muted-foreground">
                    Select a specific cost analysis report type to view
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="aged-receivables">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Aged Receivables Report
                  </CardTitle>
                  <CardDesc>
                    Outstanding customer payments as of May 31, 2023
                  </CardDesc>
                </CardHeader>
                <CardContent>
                  {/* Aged Receivables content would go here */}
                  <div className="text-center py-12 text-muted-foreground">
                    Detailed aged receivables data not available in this view
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="forecasting">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Financial Forecasting
                  </CardTitle>
                  <CardDesc>
                    Projected financial performance for upcoming periods
                  </CardDesc>
                </CardHeader>
                <CardContent>
                  {/* Forecasting content would go here */}
                  <div className="text-center py-12 text-muted-foreground">
                    Select a specific forecasting report to view
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>

      {/* Generate Report Dialog */}
      <Dialog open={isGenerateReportOpen} onOpenChange={setIsGenerateReportOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Generate Financial Report</DialogTitle>
            <DialogDescription>
              Create a new financial report based on your specifications
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select 
                value={reportType} 
                onValueChange={setReportType}
              >
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income-statement">Income Statement</SelectItem>
                  <SelectItem value="balance-sheet">Balance Sheet</SelectItem>
                  <SelectItem value="cash-flow">Cash Flow Statement</SelectItem>
                  <SelectItem value="equity-changes">Statement of Changes in Equity</SelectItem>
                  <SelectItem value="budget">Budget Report</SelectItem>
                  <SelectItem value="expense">Expense Report</SelectItem>
                  <SelectItem value="aged-receivables">Aged Receivables Report</SelectItem>
                  <SelectItem value="performance">Department Performance</SelectItem>
                  <SelectItem value="cost-analysis">Cost Analysis</SelectItem>
                  <SelectItem value="variance-analysis">Budget Variance Analysis</SelectItem>
                  <SelectItem value="tax">Tax Report</SelectItem>
                  <SelectItem value="forecasting">Financial Forecast</SelectItem>
                  <SelectItem value="ratio-analysis">Financial Ratios Analysis</SelectItem>
                  <SelectItem value="annual">Annual Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="report-period">Report Period</Label>
              <Select defaultValue="current-month">
                <SelectTrigger id="report-period">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-month">Current Month</SelectItem>
                  <SelectItem value="previous-month">Previous Month</SelectItem>
                  <SelectItem value="current-quarter">Current Quarter</SelectItem>
                  <SelectItem value="year-to-date">Year to Date</SelectItem>
                  <SelectItem value="custom">Custom Period</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="report-format">Report Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger id="report-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="online">Online View Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGenerateReportOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => generateReport(reportType)}>
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinancialReports;
