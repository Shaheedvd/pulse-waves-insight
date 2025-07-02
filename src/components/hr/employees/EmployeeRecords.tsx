
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Search, Plus, Eye, Edit, Upload, FileText, Shield } from "lucide-react";
import { PermissionGate } from "@/components/shared/PermissionGate";
import { Employee } from "@/types/hr";

const EmployeeRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Mock employee data
  const mockEmployees: Employee[] = [
    {
      id: "1",
      employeeId: "EMP001",
      personalDetails: {
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@company.com",
        phone: "+1234567890",
        address: "123 Main St, City, State",
        dateOfBirth: "1990-01-15",
        nationalId: "123456789",
        emergencyContact: {
          name: "Jane Smith",
          relationship: "Spouse",
          phone: "+0987654321"
        }
      },
      employmentDetails: {
        position: "Senior Software Engineer",
        department: "Engineering",
        contractType: "permanent",
        startDate: "2022-03-01",
        reportingManager: "Tech Lead",
        workLocation: "Remote",
        employmentStatus: "active"
      },
      payrollInfo: {
        basicSalary: 95000,
        currency: "USD",
        payFrequency: "monthly",
        bankDetails: {
          bankName: "Bank of America",
          accountNumber: "****1234",
          routingNumber: "****5678"
        },
        taxInfo: {
          taxId: "123-45-6789",
          allowances: 2
        }
      },
      documents: [
        {
          id: "1",
          name: "Employment Contract",
          type: "contract",
          url: "/documents/contract_john_smith.pdf",
          uploadedAt: "2022-03-01",
          uploadedBy: "HR Manager"
        },
        {
          id: "2",
          name: "Resume",
          type: "cv",
          url: "/documents/resume_john_smith.pdf",
          uploadedAt: "2022-02-15",
          uploadedBy: "HR Manager"
        }
      ],
      performanceNotes: [
        {
          id: "1",
          date: "2024-01-15",
          type: "review",
          note: "Excellent performance in Q4 2023",
          addedBy: "Manager"
        }
      ],
      createdAt: "2022-03-01",
      updatedAt: "2024-01-15"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "on-leave": return "bg-yellow-100 text-yellow-800";
      case "terminated": return "bg-red-100 text-red-800";
      case "resigned": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredEmployees = mockEmployees.filter(emp => 
    emp.personalDetails.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.personalDetails.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.personalDetails.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Employee Records</h2>
          <p className="text-muted-foreground">
            Centralized digital filing cabinet for all employee information
          </p>
        </div>
        <PermissionGate module="hr" action="create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </PermissionGate>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>Search and manage employee records</CardDescription>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search employees by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.employeeId}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {employee.personalDetails.firstName} {employee.personalDetails.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{employee.personalDetails.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.employmentDetails.department}</TableCell>
                  <TableCell>{employee.employmentDetails.position}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(employee.employmentDetails.employmentStatus)}>
                      {employee.employmentDetails.employmentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(employee.employmentDetails.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedEmployee(employee)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <PermissionGate module="hr" action="update">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </PermissionGate>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Employee Detail Modal/Panel */}
      {selectedEmployee && (
        <Card>
          <CardHeader>
            <CardTitle>
              Employee Details - {selectedEmployee.personalDetails.firstName} {selectedEmployee.personalDetails.lastName}
            </CardTitle>
            <CardDescription>
              Complete employee profile and records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList>
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="employment">Employment</TabsTrigger>
                <TabsTrigger value="payroll">Payroll</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <p>{selectedEmployee.personalDetails.firstName} {selectedEmployee.personalDetails.lastName}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <p>{selectedEmployee.personalDetails.email}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <p>{selectedEmployee.personalDetails.phone}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date of Birth</label>
                    <p>{new Date(selectedEmployee.personalDetails.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Address</label>
                    <p>{selectedEmployee.personalDetails.address}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Emergency Contact</label>
                    <p>{selectedEmployee.personalDetails.emergencyContact.name} ({selectedEmployee.personalDetails.emergencyContact.relationship})</p>
                    <p className="text-sm text-gray-500">{selectedEmployee.personalDetails.emergencyContact.phone}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="employment" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Position</label>
                    <p>{selectedEmployee.employmentDetails.position}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Department</label>
                    <p>{selectedEmployee.employmentDetails.department}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contract Type</label>
                    <p className="capitalize">{selectedEmployee.employmentDetails.contractType}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <p>{new Date(selectedEmployee.employmentDetails.startDate).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Reporting Manager</label>
                    <p>{selectedEmployee.employmentDetails.reportingManager}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Work Location</label>
                    <p>{selectedEmployee.employmentDetails.workLocation}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payroll" className="space-y-4">
                <PermissionGate module="hr" action="read">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Basic Salary</label>
                      <p>{selectedEmployee.payrollInfo.currency} {selectedEmployee.payrollInfo.basicSalary.toLocaleString()}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Pay Frequency</label>
                      <p className="capitalize">{selectedEmployee.payrollInfo.payFrequency}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Bank</label>
                      <p>{selectedEmployee.payrollInfo.bankDetails.bankName}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Account Number</label>
                      <p>{selectedEmployee.payrollInfo.bankDetails.accountNumber}</p>
                    </div>
                  </div>
                </PermissionGate>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Employee Documents</h3>
                  <PermissionGate module="hr" action="create">
                    <Button size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Document
                    </Button>
                  </PermissionGate>
                </div>
                <div className="space-y-2">
                  {selectedEmployee.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">
                            Uploaded {new Date(doc.uploadedAt).toLocaleDateString()} by {doc.uploadedBy}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Performance Notes</h3>
                  <PermissionGate module="hr" action="create">
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Note
                    </Button>
                  </PermissionGate>
                </div>
                <div className="space-y-2">
                  {selectedEmployee.performanceNotes.map((note) => (
                    <div key={note.id} className="p-3 border rounded">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="mb-2">
                          {note.type}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {new Date(note.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p>{note.note}</p>
                      <p className="text-sm text-gray-500 mt-2">Added by {note.addedBy}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployeeRecords;
