
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Banknote, DollarSign, FileText, Users } from "lucide-react";

// Sample data for the compensation component
const salaryData = [
  { 
    id: "emp1", 
    name: "John Smith", 
    position: "HR Manager", 
    department: "Human Resources", 
    baseSalary: "R45,000", 
    benefits: "R8,500", 
    bonus: "R12,000", 
    totalPackage: "R65,500", 
    lastReview: "2024-02-15" 
  },
  { 
    id: "emp2", 
    name: "Sarah Johnson", 
    position: "Financial Accountant", 
    department: "Finance", 
    baseSalary: "R42,000", 
    benefits: "R7,500", 
    bonus: "R10,000", 
    totalPackage: "R59,500", 
    lastReview: "2024-03-10" 
  },
  { 
    id: "emp3", 
    name: "Michael Brown", 
    position: "Sales Manager", 
    department: "Sales", 
    baseSalary: "R38,000", 
    benefits: "R6,800", 
    bonus: "R15,000", 
    totalPackage: "R59,800", 
    lastReview: "2024-01-20" 
  },
];

const benefitsData = [
  { 
    id: "ben1", 
    name: "Medical Aid", 
    provider: "Discovery Health", 
    monthlyCost: "R3,500", 
    coverage: "Comprehensive", 
    eligibility: "All permanent employees" 
  },
  { 
    id: "ben2", 
    name: "Retirement Fund", 
    provider: "Old Mutual", 
    monthlyCost: "R2,500", 
    coverage: "10% employer contribution", 
    eligibility: "All permanent employees after 3 months" 
  },
  { 
    id: "ben3", 
    name: "Group Life Insurance", 
    provider: "Liberty Life", 
    monthlyCost: "R1,200", 
    coverage: "3x annual salary", 
    eligibility: "All permanent employees" 
  },
];

export const HRCompensation = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Banknote className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Compensation & Benefits</h2>
        </div>
      </div>

      <Tabs defaultValue="salaries" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="salaries">Salaries</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
        </TabsList>

        <TabsContent value="salaries" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <CardTitle>Employee Compensation</CardTitle>
                  <CardDescription>
                    Manage salary structures, reviews, and compensation packages
                  </CardDescription>
                </div>
                <Button className="mt-4 md:mt-0">
                  <DollarSign className="mr-2 h-4 w-4" /> Run Payroll
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Base Salary</TableHead>
                    <TableHead>Benefits</TableHead>
                    <TableHead>Annual Bonus</TableHead>
                    <TableHead>Total Package</TableHead>
                    <TableHead>Last Review</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salaryData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.position}</TableCell>
                      <TableCell>{item.department}</TableCell>
                      <TableCell>{item.baseSalary}</TableCell>
                      <TableCell>{item.benefits}</TableCell>
                      <TableCell>{item.bonus}</TableCell>
                      <TableCell className="font-medium">{item.totalPackage}</TableCell>
                      <TableCell>{item.lastReview}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <CardTitle>Employee Benefits</CardTitle>
                  <CardDescription>
                    Manage employee benefits and related providers
                  </CardDescription>
                </div>
                <Button variant="outline" className="mt-4 md:mt-0">
                  <FileText className="mr-2 h-4 w-4" /> Generate Benefits Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Benefit Name</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Monthly Cost</TableHead>
                    <TableHead>Coverage</TableHead>
                    <TableHead>Eligibility</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {benefitsData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.provider}</TableCell>
                      <TableCell>{item.monthlyCost}</TableCell>
                      <TableCell>{item.coverage}</TableCell>
                      <TableCell>{item.eligibility}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Management</CardTitle>
              <CardDescription>
                Manage payroll processing and view payment history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-48">
                <p className="text-muted-foreground">Payroll content will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRCompensation;
