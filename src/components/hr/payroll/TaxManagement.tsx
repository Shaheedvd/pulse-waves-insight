
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calculator, Calendar } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

// Sample SARS filing data
const filingData = [
  { 
    id: "fil1", 
    name: "EMP201 - April 2025", 
    type: "Monthly PAYE/UIF/SDL Return", 
    dueDate: "2025-05-07", 
    submissionDate: "2025-05-05", 
    amount: "R195,800",
    status: "submitted",
    referenceNumber: "EMP2025040123456",
    paymentStatus: "paid"
  },
  { 
    id: "fil2", 
    name: "EMP201 - March 2025", 
    type: "Monthly PAYE/UIF/SDL Return", 
    dueDate: "2025-04-07", 
    submissionDate: "2025-04-04", 
    amount: "R190,500",
    status: "submitted",
    referenceNumber: "EMP2025030123457",
    paymentStatus: "paid"
  },
  { 
    id: "fil3", 
    name: "EMP501 - 2025 Interim", 
    type: "Bi-Annual Employer Reconciliation", 
    dueDate: "2025-10-31", 
    submissionDate: "", 
    amount: "Pending",
    status: "pending",
    referenceNumber: "",
    paymentStatus: "pending"
  },
];

// Sample tax directive data
const taxDirectives = [
  { 
    id: "dir1", 
    employeeName: "Michael Brown", 
    directiveType: "IRP3(a) - Special Rates", 
    applicationDate: "2025-01-15", 
    status: "approved", 
    approvalDate: "2025-01-25",
    directiveNumber: "DIR123456789",
    expiryDate: "2026-02-28"
  },
  { 
    id: "dir2", 
    employeeName: "Patricia Clark", 
    directiveType: "IRP3(s) - Fixed Amount", 
    applicationDate: "2025-02-10", 
    status: "pending", 
    approvalDate: "",
    directiveNumber: "",
    expiryDate: ""
  },
];

export const TaxManagement = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="filing" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="filing">SARS Filing</TabsTrigger>
          <TabsTrigger value="directives">Tax Directives</TabsTrigger>
          <TabsTrigger value="tables">Tax Tables</TabsTrigger>
        </TabsList>

        <TabsContent value="filing" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <CardTitle>SARS Filing Management</CardTitle>
                  <CardDescription>
                    Manage EMP201, EMP501 and other statutory filings
                  </CardDescription>
                </div>
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Prepare New Filing
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <Calendar className="h-4 w-4" />
                <AlertTitle>Next filing due on May 7, 2025</AlertTitle>
                <AlertDescription>
                  EMP201 for April 2025 must be submitted to SARS by May 7. Prepare your submission early to avoid penalties.
                </AlertDescription>
              </Alert>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Filing Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filingData.map((filing) => (
                    <TableRow key={filing.id}>
                      <TableCell className="font-medium">{filing.name}</TableCell>
                      <TableCell>{filing.type}</TableCell>
                      <TableCell>{filing.dueDate}</TableCell>
                      <TableCell>{filing.submissionDate || "Not submitted"}</TableCell>
                      <TableCell>{filing.amount}</TableCell>
                      <TableCell>
                        <Badge className={`
                          ${filing.status === "submitted" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {filing.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`
                          ${filing.paymentStatus === "paid" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {filing.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        {filing.status === "submitted" && (
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Calculator className="h-4 w-4 mr-2 text-primary" />
                  Monthly PAYE Liability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R195,800</div>
                <p className="text-xs text-muted-foreground">+2.8% from previous month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Calculator className="h-4 w-4 mr-2 text-primary" />
                  Monthly UIF Liability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R15,450</div>
                <p className="text-xs text-muted-foreground">+1.9% from previous month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Calculator className="h-4 w-4 mr-2 text-primary" />
                  Monthly SDL Liability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R12,545</div>
                <p className="text-xs text-muted-foreground">+1.9% from previous month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="directives" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <CardTitle>Tax Directives</CardTitle>
                  <CardDescription>
                    Manage SARS tax directives for employees
                  </CardDescription>
                </div>
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Apply for New Directive
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Directive Type</TableHead>
                    <TableHead>Application Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Approval Date</TableHead>
                    <TableHead>Directive Number</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxDirectives.map((directive) => (
                    <TableRow key={directive.id}>
                      <TableCell className="font-medium">{directive.employeeName}</TableCell>
                      <TableCell>{directive.directiveType}</TableCell>
                      <TableCell>{directive.applicationDate}</TableCell>
                      <TableCell>
                        <Badge className={`
                          ${directive.status === "approved" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {directive.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{directive.approvalDate || "Pending"}</TableCell>
                      <TableCell>{directive.directiveNumber || "Pending"}</TableCell>
                      <TableCell>{directive.expiryDate || "N/A"}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tables" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <CardTitle>SARS Tax Tables</CardTitle>
                  <CardDescription>
                    Current tax year tables and rates
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Tax Year: 2025/2026</span>
                  <Badge className="bg-green-100 text-green-800">Current</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-medium mb-4">Income Tax Rates for Individuals</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Taxable Income (R)</TableHead>
                    <TableHead>Rates of Tax (R)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1 - 237,100</TableCell>
                    <TableCell>18% of each R1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>237,101 - 370,500</TableCell>
                    <TableCell>42,678 + 26% of amount above 237,100</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>370,501 - 512,800</TableCell>
                    <TableCell>77,362 + 31% of amount above 370,500</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>512,801 - 673,000</TableCell>
                    <TableCell>121,475 + 36% of amount above 512,800</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>673,001 - 857,900</TableCell>
                    <TableCell>179,147 + 39% of amount above 673,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>857,901 - 1,817,000</TableCell>
                    <TableCell>251,258 + 41% of amount above 857,900</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>1,817,001 and above</TableCell>
                    <TableCell>644,489 + 45% of amount above 1,817,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <h3 className="text-lg font-medium my-4">Monthly Tax Deduction Thresholds</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">UIF Contribution Ceiling</h4>
                  <p className="font-medium">R17,712 per month</p>
                  <p className="text-xs text-muted-foreground">Employee contributes 1%, Employer contributes 1%</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">SDL Rate</h4>
                  <p className="font-medium">1% of payroll</p>
                  <p className="text-xs text-muted-foreground">Applied to employers with annual payroll &gt; R500,000</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Tax Rebates</h4>
                  <p className="font-medium">Primary: R17,235</p>
                  <p className="text-xs">Secondary (65 and older): R9,444</p>
                  <p className="text-xs">Tertiary (75 and older): R3,145</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Tax Thresholds</h4>
                  <p className="font-medium">Below age 65: R95,750</p>
                  <p className="text-xs">Age 65 and older: R148,217</p>
                  <p className="text-xs">Age 75 and older: R165,689</p>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Complete Tax Tables
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxManagement;
