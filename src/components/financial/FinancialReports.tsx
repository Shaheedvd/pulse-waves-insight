import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CalendarRange, Download, FileText, Filter, Search, ArrowDown, ArrowUp, Printer } from "lucide-react";

const FinancialReports = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState("this-month");
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false);
  const [reportType, setReportType] = useState("income-statement");
  
  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Your financial report has been generated successfully",
    });
    setIsGenerateReportOpen(false);
  };

  const generateIncomeStatementContent = () => {
    return `
      <h1>Income Statement</h1>
      <h2>May 2023 | Generated on June 1, 2023</h2>
      <hr />
      
      <h3>Revenue</h3>
      <table>
        <tbody>
          <tr>
            <td style="padding-left: 20px;">Restaurant Audits</td>
            <td style="text-align: right;">R 66,000</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">Forecourt & Shop Audits</td>
            <td style="text-align: right;">R 55,000</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">School Audits</td>
            <td style="text-align: right;">R 20,000</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">Hotel Audits</td>
            <td style="text-align: right;">R 16,500</td>
          </tr>
          <tr style="font-weight: bold;">
            <td>Total Revenue</td>
            <td style="text-align: right;">R 157,500</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Expenses</h3>
      <table>
        <tbody>
          <tr>
            <td style="padding-left: 20px;">Evaluator Payments</td>
            <td style="text-align: right;">R 45,000</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">Staff Salaries</td>
            <td style="text-align: right;">R 65,000</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">Office Rent</td>
            <td style="text-align: right;">R 12,000</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">Utilities</td>
            <td style="text-align: right;">R 3,500</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">Marketing</td>
            <td style="text-align: right;">R 5,000</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">Other Expenses</td>
            <td style="text-align: right;">R 4,500</td>
          </tr>
          <tr style="font-weight: bold;">
            <td>Total Expenses</td>
            <td style="text-align: right;">R 135,000</td>
          </tr>
        </tbody>
      </table>
      
      <table>
        <tbody>
          <tr style="font-weight: bold; font-size: 18px;">
            <td>Net Income</td>
            <td style="text-align: right;">R 22,500</td>
          </tr>
        </tbody>
      </table>
      
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <h4 style="margin-top: 0;">Notes:</h4>
        <ul>
          <li>All figures are before tax calculations</li>
          <li>Month-over-month revenue increased by 12%</li>
          <li>Profit margin is currently at 14.3%</li>
        </ul>
      </div>
    `;
  };

  const generateBalanceSheetContent = () => {
    return `
      <h1>Balance Sheet</h1>
      <h2>As of May 31, 2023 | Generated on June 1, 2023</h2>
      <hr />
      
      <h3>Assets</h3>
      <table>
        <tbody>
          <tr>
            <td colspan="2" style="font-weight: medium;">Current Assets</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">Cash and Cash Equivalents</td>
            <td style="text-align: right;">R 185,000</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">Accounts Receivable</td>
            <td style="text-align: right;">R 55,000</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">Prepaid Expenses</td>
            <td style="text-align: right;">R 12,000</td>
          </tr>
          <tr>
            <td colspan="2" style="font-weight: medium;">Fixed Assets</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">Equipment</td>
            <td style="text-align: right;">R 48,000</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">Furniture and Fixtures</td>
            <td style="text-align: right;">R 35,000</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">Accumulated Depreciation</td>
            <td style="text-align: right;">(R 18,000)</td>
          </tr>
          <tr style="font-weight: bold;">
            <td>Total Assets</td>
            <td style="text-align: right;">R 317,000</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Liabilities & Equity</h3>
      <table>
        <tbody>
          <tr>
            <td colspan="2" style="font-weight: medium;">Current Liabilities</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">Accounts Payable</td>
            <td style="text-align: right;">R 28,000</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">Accrued Expenses</td>
            <td style="text-align: right;">R 15,000</td>
          </tr>
          <tr>
            <td colspan="2" style="font-weight: medium;">Long-term Liabilities</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">Business Loan</td>
            <td style="text-align: right;">R 75,000</td>
          </tr>
          <tr>
            <td colspan="2" style="font-weight: medium;">Equity</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">Owner's Capital</td>
            <td style="text-align: right;">R 150,000</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">Retained Earnings</td>
            <td style="text-align: right;">R 49,000</td>
          </tr>
          <tr style="font-weight: bold;">
            <td>Total Liabilities & Equity</td>
            <td style="text-align: right;">R 317,000</td>
          </tr>
        </tbody>
      </table>
    `;
  };

  const generateCashFlowContent = () => {
    return `
      <h1>Cash Flow Statement</h1>
      <h2>May 2023 | Generated on June 1, 2023</h2>
      <hr />
      
      <h3>Operating Activities</h3>
      <table>
        <tbody>
          <tr>
            <td style="padding-left: 20px;">Net Income</td>
            <td style="text-align: right;">R 22,500</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">Depreciation</td>
            <td style="text-align: right;">R 1,500</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">Increase in Accounts Receivable</td>
            <td style="text-align: right;">(R 8,000)</td>
          </tr>
          <tr>
            <td style="padding-left: 20px;">Increase in Accounts Payable</td>
            <td style="text-align: right;">R 5,000</td>
          </tr>
          <tr style="font-weight: medium;">
            <td>Net Cash from Operating Activities</td>
            <td style="text-align: right;">R 21,000</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Investing Activities</h3>
      <table>
        <tbody>
          <tr>
            <td style="padding-left: 20px;">Purchase of Equipment</td>
            <td style="text-align: right;">(R 5,000)</td>
          </tr>
          <tr style="font-weight: medium;">
            <td>Net Cash from Investing Activities</td>
            <td style="text-align: right;">(R 5,000)</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Financing Activities</h3>
      <table>
        <tbody>
          <tr>
            <td style="padding-left: 20px;">Loan Repayment</td>
            <td style="text-align: right;">(R 3,000)</td>
          </tr>
          <tr style="font-weight: medium;">
            <td>Net Cash from Financing Activities</td>
            <td style="text-align: right;">(R 3,000)</td>
          </tr>
        </tbody>
      </table>
      
      <table>
        <tbody>
          <tr style="font-weight: medium;">
            <td>Net Increase in Cash</td>
            <td style="text-align: right;">R 13,000</td>
          </tr>
          <tr>
            <td>Cash at Beginning of Period</td>
            <td style="text-align: right;">R 172,000</td>
          </tr>
          <tr style="font-weight: bold; font-size: 18px;">
            <td>Cash at End of Period</td>
            <td style="text-align: right;">R 185,000</td>
          </tr>
        </tbody>
      </table>
    `;
  };

  const generateReportContent = (reportName) => {
    switch(reportName) {
      case "Income Statement":
        return generateIncomeStatementContent();
      case "Balance Sheet":
        return generateBalanceSheetContent();
      case "Cash Flow Statement":
        return generateCashFlowContent();
      default:
        return `<h1>${reportName}</h1><p>Content for ${reportName}</p>`;
    }
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
        <TabsList>
          <TabsTrigger value="reports-library">Reports Library</TabsTrigger>
          <TabsTrigger value="income-statement">Income Statement</TabsTrigger>
          <TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger>
          <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reports-library" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>
                Access all your financial reports in one place
              </CardDescription>
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
                              printable={true}
                              documentTitle={report.name}
                              documentContent={() => generateReportContent(report.type)}
                            >
                              <Printer className="h-4 w-4" />
                              <span className="sr-only">Print</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              downloadPdf={true}
                              documentTitle={report.name}
                              documentContent={() => generateReportContent(report.type)}
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
                <CardDescription>
                  May 2023 | Generated on June 1, 2023
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  printable={true}
                  documentTitle="Income Statement"
                  documentContent={generateIncomeStatementContent}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  downloadPdf={true}
                  documentTitle="Income Statement"
                  documentContent={generateIncomeStatementContent}
                >
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
                <CardDescription>
                  As of May 31, 2023 | Generated on June 1, 2023
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  printable={true}
                  documentTitle="Balance Sheet"
                  documentContent={generateBalanceSheetContent}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  downloadPdf={true}
                  documentTitle="Balance Sheet"
                  documentContent={generateBalanceSheetContent}
                >
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
                <CardDescription>
                  May 2023 | Generated on June 1, 2023
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  printable={true}
                  documentTitle="Cash Flow Statement"
                  documentContent={generateCashFlowContent}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  downloadPdf={true}
                  documentTitle="Cash Flow Statement"
                  documentContent={generateCashFlowContent}
                >
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
      </Tabs>

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
                  <SelectItem value="budget">Budget Report</SelectItem>
                  <SelectItem value="expense">Expense Report</SelectItem>
                  <SelectItem value="donation">Donation/Sponsorship Report</SelectItem>
                  <SelectItem value="transparency">Transparency Report</SelectItem>
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
            <Button onClick={handleGenerateReport}>
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinancialReports;
