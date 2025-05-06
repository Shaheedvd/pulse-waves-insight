
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Printer, Calendar, DollarSign } from "lucide-react";
import { generateFinancialPdf } from "@/utils/pdf-generation";
import { useToast } from "@/hooks/use-toast";

// Sample payroll reports data
const reportsData = [
  { 
    id: "rep1", 
    name: "Payroll Summary - April 2025", 
    category: "Standard", 
    generatedDate: "2025-05-01", 
    format: "PDF",
    generatedBy: "System",
    size: "245 KB"
  },
  { 
    id: "rep2", 
    name: "Bank Payment File - April 2025", 
    category: "Banking", 
    generatedDate: "2025-04-28", 
    format: "CSV",
    generatedBy: "System",
    size: "120 KB"
  },
  { 
    id: "rep3", 
    name: "Deductions Report - April 2025", 
    category: "Deductions", 
    generatedDate: "2025-05-01", 
    format: "PDF",
    generatedBy: "System",
    size: "180 KB"
  },
  { 
    id: "rep4", 
    name: "Payslips - April 2025", 
    category: "Employee", 
    generatedDate: "2025-04-28", 
    format: "PDF",
    generatedBy: "System",
    size: "2.4 MB"
  },
  { 
    id: "rep5", 
    name: "Tax Reconciliation - April 2025", 
    category: "Tax", 
    generatedDate: "2025-05-02", 
    format: "PDF",
    generatedBy: "Sarah Johnson",
    size: "320 KB"
  },
];

// Sample payroll analysis data
const departmentCosts = [
  { department: "Sales", percentage: 28, cost: "R351,260" },
  { department: "Operations", percentage: 22, cost: "R275,990" },
  { department: "Finance", percentage: 15, cost: "R188,175" },
  { department: "HR", percentage: 12, cost: "R150,540" },
  { department: "IT", percentage: 18, cost: "R225,810" },
  { department: "Marketing", percentage: 5, cost: "R62,725" },
];

export const PayrollReports = () => {
  const [reportCategory, setReportCategory] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("2025-04");
  const { toast } = useToast();

  // Filter reports based on category
  const filteredReports = reportsData.filter(report => {
    return reportCategory === "all" || report.category.toLowerCase() === reportCategory.toLowerCase();
  });

  const handleGenerateReport = (reportType: string) => {
    toast({
      title: "Generating Report",
      description: `Started generating ${reportType} report for ${selectedPeriod}`,
    });
    
    // Simulate report generation
    setTimeout(() => {
      generateFinancialPdf({
        period: "April 2025",
        revenue: 1500000,
        expenses: 1254500,
        profit: 245500,
        outstandingInvoices: 75000,
        reportType: reportType
      });
      
      toast({
        title: "Report Generated",
        description: `Successfully generated ${reportType} report`,
        variant: "success",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="standard" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="standard">Standard Reports</TabsTrigger>
          <TabsTrigger value="statutory">Statutory Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          <TabsTrigger value="analysis">Payroll Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="standard" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <CardTitle>Standard Payroll Reports</CardTitle>
                  <CardDescription>
                    Generate and download standard payroll reports
                  </CardDescription>
                </div>

                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto mt-4 md:mt-0">
                  <Select value={reportCategory} onValueChange={setReportCategory}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="banking">Banking</SelectItem>
                      <SelectItem value="tax">Tax</SelectItem>
                      <SelectItem value="deductions">Deductions</SelectItem>
                      <SelectItem value="employee">Employee</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025-04">April 2025</SelectItem>
                      <SelectItem value="2025-03">March 2025</SelectItem>
                      <SelectItem value="2025-02">February 2025</SelectItem>
                      <SelectItem value="2025-01">January 2025</SelectItem>
                      <SelectItem value="2024-12">December 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Card className="bg-slate-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      Payroll Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Complete summary of payroll transactions for the selected period.</p>
                    <Button className="w-full" onClick={() => handleGenerateReport("Payroll Summary")}>
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-primary" />
                      Bank Payment File
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">CSV file for bank payments compatible with South African banks.</p>
                    <Button className="w-full" onClick={() => handleGenerateReport("Bank Payment File")}>
                      Generate File
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Printer className="h-4 w-4 mr-2 text-primary" />
                      Payslips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Generate employee payslips in PDF format for the selected period.</p>
                    <Button className="w-full" onClick={() => handleGenerateReport("Payslips")}>
                      Generate Payslips
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      Cost Center Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Breakdown of payroll costs by department or cost center.</p>
                    <Button className="w-full" onClick={() => handleGenerateReport("Cost Center Report")}>
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      Deductions Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Detailed breakdown of all employee deductions.</p>
                    <Button className="w-full" onClick={() => handleGenerateReport("Deductions Report")}>
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      Leave Liability Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Overview of leave balances and financial liability.</p>
                    <Button className="w-full" onClick={() => handleGenerateReport("Leave Liability Report")}>
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-lg font-medium mb-4">Recent Reports</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Generated Date</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Generated By</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>
                        <Badge 
                          className={`${
                            report.category === "Tax" ? "bg-blue-100 text-blue-800" :
                            report.category === "Banking" ? "bg-green-100 text-green-800" :
                            "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {report.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.generatedDate}</TableCell>
                      <TableCell>{report.format}</TableCell>
                      <TableCell>{report.generatedBy}</TableCell>
                      <TableCell>{report.size}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statutory" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <CardTitle>Statutory Reports</CardTitle>
                  <CardDescription>
                    Generate SARS and other statutory reports
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Card className="bg-slate-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      EMP201 Monthly Return
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Generate monthly PAYE, UIF, and SDL return for SARS.</p>
                    <Button className="w-full" onClick={() => handleGenerateReport("EMP201")}>
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      EMP501 Reconciliation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Bi-annual employer reconciliation declaration for SARS.</p>
                    <Button className="w-full" onClick={() => handleGenerateReport("EMP501")}>
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      IT3(a) Tax Certificates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Generate employee tax certificates for the tax year.</p>
                    <Button className="w-full" onClick={() => handleGenerateReport("IT3(a)")}>
                      Generate Certificates
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      UIF Declaration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Monthly Unemployment Insurance Fund declaration.</p>
                    <Button className="w-full" onClick={() => handleGenerateReport("UIF Declaration")}>
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      COIDA Return
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Annual return of earnings for the Compensation Fund.</p>
                    <Button className="w-full" onClick={() => handleGenerateReport("COIDA Return")}>
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      Employment Equity Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Annual employment equity report.</p>
                    <Button className="w-full" onClick={() => handleGenerateReport("Employment Equity Report")}>
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <CardDescription>
                Build custom payroll reports based on your specific requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-48">
                <p className="text-muted-foreground">Custom report builder coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Analysis</CardTitle>
              <CardDescription>
                Analytical insights into your payroll data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-medium mb-4">Payroll by Department</h3>
              <div className="space-y-4">
                {departmentCosts.map((dept, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{dept.department}</span>
                      <span className="text-sm">{dept.cost} ({dept.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${dept.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-primary" />
                      Average Salary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R32,450</div>
                    <p className="text-xs text-muted-foreground">+2.1% from previous month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-primary" />
                      Highest Earning Dept
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Finance</div>
                    <p className="text-xs text-muted-foreground">Avg: R42,500 per employee</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-primary" />
                      Payroll Growth YTD
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8.3%</div>
                    <p className="text-xs text-muted-foreground">Annualized projection: 9.8%</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
