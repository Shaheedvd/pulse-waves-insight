
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Search, Plus, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample employee payroll data
const employeePayrollData = [
  { 
    id: "emp1", 
    name: "John Smith", 
    position: "HR Manager", 
    department: "Human Resources", 
    employeeNumber: "EMP-00123", 
    taxNumber: "1234567890", 
    bankName: "Standard Bank", 
    accountNumber: "****5678", 
    basicSalary: "R45,000", 
    costToCompany: "R65,500",
    employmentType: "Permanent",
    taxType: "Standard",
    medicalAid: "Discovery Health",
    pensionFund: "Old Mutual Pension Fund"
  },
  { 
    id: "emp2", 
    name: "Sarah Johnson", 
    position: "Financial Accountant", 
    department: "Finance", 
    employeeNumber: "EMP-00124", 
    taxNumber: "2345678901", 
    bankName: "FNB", 
    accountNumber: "****9012", 
    basicSalary: "R42,000", 
    costToCompany: "R59,500",
    employmentType: "Permanent",
    taxType: "Standard",
    medicalAid: "Bonitas",
    pensionFund: "Sanlam Pension Fund"
  },
  { 
    id: "emp3", 
    name: "Michael Brown", 
    position: "Sales Manager", 
    department: "Sales", 
    employeeNumber: "EMP-00125", 
    taxNumber: "3456789012", 
    bankName: "Nedbank", 
    accountNumber: "****3456", 
    basicSalary: "R38,000", 
    costToCompany: "R59,800",
    employmentType: "Permanent",
    taxType: "Standard with Directives",
    medicalAid: "Momentum Health",
    pensionFund: "Liberty Pension Fund"
  },
];

export const EmployeePayrollData = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [isViewEmployee, setIsViewEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<typeof employeePayrollData[0] | null>(null);

  // Filter employees based on search and department
  const filteredEmployees = employeePayrollData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         employee.employeeNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const handleViewEmployee = (employee: typeof employeePayrollData[0]) => {
    setSelectedEmployee(employee);
    setIsViewEmployee(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <CardTitle>Employee Payroll Data</CardTitle>
              <CardDescription>
                Manage employee payroll information including tax data and banking details
              </CardDescription>
            </div>
            
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto mt-4 md:mt-0">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
              
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Employee #</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Basic Salary</TableHead>
                <TableHead>Cost to Company</TableHead>
                <TableHead>Tax Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.employeeNumber}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.basicSalary}</TableCell>
                  <TableCell>{employee.costToCompany}</TableCell>
                  <TableCell>
                    <Badge className="bg-blue-100 text-blue-800">
                      {employee.taxType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleViewEmployee(employee)}>
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Employee Dialog */}
      <Dialog open={isViewEmployee} onOpenChange={setIsViewEmployee}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Employee Payroll Details</DialogTitle>
            <DialogDescription>
              Comprehensive payroll information for this employee
            </DialogDescription>
          </DialogHeader>
          
          {selectedEmployee && (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="financial">Financial Details</TabsTrigger>
                <TabsTrigger value="tax">Tax & Benefits</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                    <p className="text-base">{selectedEmployee.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Employee Number</h3>
                    <p className="text-base">{selectedEmployee.employeeNumber}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Position</h3>
                    <p className="text-base">{selectedEmployee.position}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
                    <p className="text-base">{selectedEmployee.department}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Employment Type</h3>
                    <p className="text-base">{selectedEmployee.employmentType}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="financial" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Basic Salary</h3>
                    <p className="text-base">{selectedEmployee.basicSalary}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Cost to Company</h3>
                    <p className="text-base">{selectedEmployee.costToCompany}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Bank Name</h3>
                    <p className="text-base">{selectedEmployee.bankName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Account Number</h3>
                    <p className="text-base">{selectedEmployee.accountNumber}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tax" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Tax Number</h3>
                    <p className="text-base">{selectedEmployee.taxNumber}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Tax Type</h3>
                    <p className="text-base">{selectedEmployee.taxType}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Medical Aid</h3>
                    <p className="text-base">{selectedEmployee.medicalAid}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Pension Fund</h3>
                    <p className="text-base">{selectedEmployee.pensionFund}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewEmployee(false)}>Close</Button>
            <Button>Edit Details</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
