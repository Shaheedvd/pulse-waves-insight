import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scale, Shield, FileText, Calendar, AlertTriangle, CheckCircle, Clock, Upload, Plus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PermissionGate } from "@/components/shared/PermissionGate";
import DocumentManagement from "./DocumentManagement";

const ComplianceManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const mockComplianceData = [
    {
      id: "COMP-001",
      regulation: "GDPR Compliance",
      status: "Compliant",
      lastReview: "2024-01-10",
      nextReview: "2024-04-10",
      responsible: "Legal Team",
      riskLevel: "Low"
    },
    {
      id: "COMP-002",
      regulation: "ISO 27001",
      status: "Under Review",
      lastReview: "2023-12-15",
      nextReview: "2024-03-15",
      responsible: "IT Security",
      riskLevel: "Medium"
    },
    {
      id: "COMP-003",
      regulation: "Industry Standards",
      status: "Non-Compliant",
      lastReview: "2024-01-05",
      nextReview: "2024-01-20",
      responsible: "Quality Team",
      riskLevel: "High"
    }
  ];

  const mockAudits = [
    {
      id: "AUD-001",
      type: "Internal Audit",
      scope: "Data Protection",
      auditor: "Sarah Johnson",
      scheduled: "2024-01-25",
      status: "Scheduled"
    },
    {
      id: "AUD-002",
      type: "External Audit",
      scope: "Security Compliance",
      auditor: "External Firm",
      scheduled: "2024-02-15",
      status: "Pending"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Compliant": return "bg-green-100 text-green-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Non-Compliant": return "bg-red-100 text-red-800";
      case "Scheduled": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Compliance Management</h2>
        </div>
        <PermissionGate module="compliance" action="create">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            New Compliance Check
          </Button>
        </PermissionGate>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Comprehensive compliance management system with document management, regulatory tracking, audit scheduling, and risk assessment.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliant Items</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Out of 24 total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Pending assessment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Audit</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">Jan 25, 2024</div>
            <p className="text-xs text-muted-foreground">Internal audit</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="documents" className="w-full">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="regulations">Regulations</TabsTrigger>
          <TabsTrigger value="audits">Audits</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <PermissionGate module="compliance" action="read">
            <DocumentManagement />
          </PermissionGate>
        </TabsContent>

        <TabsContent value="regulations" className="space-y-4">
          <PermissionGate module="compliance" action="read">
            <Card>
              <CardHeader>
                <CardTitle>Regulatory Compliance</CardTitle>
                <CardDescription>Track compliance status across all regulations</CardDescription>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Search regulations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Regulation</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Responsible</TableHead>
                      <TableHead>Last Review</TableHead>
                      <TableHead>Next Review</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockComplianceData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.regulation}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRiskColor(item.riskLevel)}>
                            {item.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.responsible}</TableCell>
                        <TableCell>{item.lastReview}</TableCell>
                        <TableCell>{item.nextReview}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </PermissionGate>
        </TabsContent>

        <TabsContent value="audits" className="space-y-4">
          <PermissionGate module="compliance" action="read">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Audits</CardTitle>
                <CardDescription>Manage internal and external audit schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Audit ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Scope</TableHead>
                      <TableHead>Auditor</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAudits.map((audit) => (
                      <TableRow key={audit.id}>
                        <TableCell className="font-medium">{audit.id}</TableCell>
                        <TableCell>{audit.type}</TableCell>
                        <TableCell>{audit.scope}</TableCell>
                        <TableCell>{audit.auditor}</TableCell>
                        <TableCell>{audit.scheduled}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(audit.status)}>
                            {audit.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Manage
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </PermissionGate>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <PermissionGate module="compliance" action="read">
            <Card>
              <CardHeader>
                <CardTitle>Company Policies</CardTitle>
                <CardDescription>Manage internal policies and procedures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="mx-auto h-12 w-12 mb-4" />
                  <p>Policy management interface will be available here</p>
                  <p className="text-sm">Including policy versioning, approval workflows, and distribution tracking</p>
                </div>
              </CardContent>
            </Card>
          </PermissionGate>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceManagement;
