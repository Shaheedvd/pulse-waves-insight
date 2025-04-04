import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  ChevronRight, 
  PlusCircle, 
  FileText, 
  Download, 
  Trash2, 
  Filter, 
  BarChart3,
  CalendarRange,
  Users,
  Search,
  Mail,
  Printer
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type ReportType = "monthly" | "quarterly" | "annual" | "performance" | "custom" | "audit";

interface Report {
  id: string;
  name: string;
  type: ReportType;
  createdBy: string;
  dateCreated: string;
  status?: "completed" | "pending" | "scheduled";
  assignedTo?: string;
}

const Reports = () => {
  const navigate = useNavigate();
  const { currentUser, hasPermission } = useAuth();
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      name: "Q1 Performance Report",
      type: "quarterly",
      createdBy: "Shaheed Van Dawson",
      dateCreated: "2023-04-15",
      status: "completed",
      assignedTo: "Eric Evaluator"
    },
    {
      id: "2",
      name: "Annual Review 2023",
      type: "annual",
      createdBy: "Admin User",
      dateCreated: "2023-12-30",
      status: "completed",
      assignedTo: "Sarah Manager"
    },
    {
      id: "3",
      name: "Store Audit Template",
      type: "audit",
      createdBy: "Admin User",
      dateCreated: "2024-05-15", 
      status: "pending",
      assignedTo: "Eric Evaluator"
    },
    {
      id: "4",
      name: "June Performance Review",
      type: "performance",
      createdBy: "Sarah Manager",
      dateCreated: "2024-06-01",
      status: "scheduled",
      assignedTo: "Eric Evaluator"
    }
  ]);
  const [isCreateReportOpen, setIsCreateReportOpen] = useState(false);
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    name: "",
    type: "monthly" as ReportType,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const canCreateReports = hasPermission("canCreateReports");
  const canDeleteReports = hasPermission("canDeleteReports");
  const isSuperuser = currentUser?.role === "superuser";

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          report.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || report.type === filterType;
    const matchesStatus = !filterStatus || report.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const userReports = filteredReports.filter(report => 
    report.assignedTo === currentUser?.name || report.createdBy === currentUser?.name
  );

  const handleCreateReport = () => {
    if (!newReport.name) {
      toast({
        title: "Error",
        description: "Please enter a report name",
        variant: "destructive",
      });
      return;
    }

    const report: Report = {
      id: Date.now().toString(),
      name: newReport.name,
      type: newReport.type,
      createdBy: currentUser?.name || "Unknown User",
      dateCreated: new Date().toISOString().split("T")[0],
      status: "scheduled"
    };

    setReports([...reports, report]);
    toast({
      title: "Report Created",
      description: `${report.name} has been created successfully`,
    });
    setNewReport({ name: "", type: "monthly" });
    setIsCreateReportOpen(false);
  };

  const handleDeleteReport = (id: string, name: string) => {
    setReports(reports.filter((report) => report.id !== id));
    toast({
      title: "Report Deleted",
      description: `${name} has been deleted`,
    });
  };

  const handlePrintReport = (id: string, name: string) => {
    toast({
      title: "Preparing Print",
      description: `${name} is being prepared for printing`,
    });
    
    setTimeout(() => {
      window.print();
    }, 1000);
  };

  const handleEmailReport = (id: string, name: string) => {
    toast({
      title: "Email Sent",
      description: `${name} has been emailed to management`,
    });
  };

  const handleDownloadReport = (id: string, name: string) => {
    toast({
      title: "Generating PDF",
      description: `${name} is being generated as a PDF`,
    });
    
    setTimeout(() => {
      toast({
        title: "Download Ready",
        description: `${name} PDF is ready for download`,
      });
    }, 1500);
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Your custom report has been generated and is ready to download",
    });
    setIsGenerateReportOpen(false);
  };

  const navigateToAuditSheetDesigner = () => {
    navigate("/audit-sheet-designer");
  };

  const reportTypeLabels: Record<ReportType, string> = {
    monthly: "Monthly Report",
    quarterly: "Quarterly Report",
    annual: "Annual Report",
    performance: "Performance Report",
    custom: "Custom Report",
    audit: "Audit Sheet"
  };

  const statusColors = {
    completed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    scheduled: "bg-blue-100 text-blue-800"
  };

  const generateReportPdfContent = (report) => {
    return `
      <h1>${report.name}</h1>
      <div style="margin-bottom: 20px;">
        <p><strong>Report ID:</strong> ${report.id}</p>
        <p><strong>Type:</strong> ${reportTypeLabels[report.type]}</p>
        <p><strong>Created By:</strong> ${report.createdBy}</p>
        <p><strong>Date Created:</strong> ${report.dateCreated}</p>
        ${report.status ? `<p><strong>Status:</strong> ${report.status}</p>` : ''}
        ${report.assignedTo ? `<p><strong>Assigned To:</strong> ${report.assignedTo}</p>` : ''}
      </div>
      
      <h2>Report Summary</h2>
      <p>This is a ${reportTypeLabels[report.type]} created by ${report.createdBy} on ${report.dateCreated}.</p>
      
      <h2>Key Findings</h2>
      <ul>
        <li>Overall score: 85%</li>
        <li>Areas of excellence: Customer Service, Store Cleanliness</li>
        <li>Areas for improvement: Product Knowledge, Staff Training</li>
      </ul>
      
      <h2>Recommendations</h2>
      <ol>
        <li>Implement regular staff training sessions focusing on product knowledge</li>
        <li>Review and update store layout to improve customer flow</li>
        <li>Enhance visual merchandising standards across all locations</li>
      </ol>
    `;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <div className="flex gap-2">
          {canCreateReports && (
            <>
              <Button variant="outline" onClick={() => setIsGenerateReportOpen(true)}>
                <BarChart3 className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
              <Button onClick={navigateToAuditSheetDesigner}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Design Audit Sheet
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Audits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reports.filter(r => r.status === "completed" && (r.assignedTo === currentUser?.name || r.createdBy === currentUser?.name)).length}
            </div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Audits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reports.filter(r => r.status === "pending" && (r.assignedTo === currentUser?.name || r.createdBy === currentUser?.name)).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting your review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Audits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reports.filter(r => r.status === "scheduled" && (r.assignedTo === currentUser?.name || r.createdBy === currentUser?.name)).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Upcoming in next 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-muted-foreground">
              +2% from previous period
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>
            View and manage system reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4 mb-4">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search reports..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={filterType || "all"}
                onValueChange={(value) => setFilterType(value === "all" ? null : value)}
              >
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                  <SelectItem value="audit">Audit</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filterStatus || "all"}
                onValueChange={(value) => setFilterStatus(value === "all" ? null : value)}
              >
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredReports.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <FileText className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">No Reports Found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {canCreateReports
                  ? "Try adjusting your search or create a new report"
                  : "No reports match your search criteria"}
              </p>
              {canCreateReports && (
                <Button
                  className="mt-4"
                  onClick={() => navigate("/audit-sheet-designer")}
                >
                  Design New Report
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Date Created</TableHead>
                  <TableHead className="w-[180px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell>{reportTypeLabels[report.type]}</TableCell>
                    <TableCell>
                      {report.status && (
                        <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${statusColors[report.status]}`}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{report.createdBy}</TableCell>
                    <TableCell>{report.dateCreated}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="end">
                            <div className="flex flex-col">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="justify-start rounded-none"
                                downloadPdf={true}
                                documentTitle={report.name}
                                documentContent={() => generateReportPdfContent(report)}
                              >
                                <Download className="h-4 w-4 mr-2" /> Download PDF
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="justify-start rounded-none"
                                printable={true}
                                documentTitle={report.name}
                                documentContent={() => generateReportPdfContent(report)}
                              >
                                <Printer className="h-4 w-4 mr-2" /> Print
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="justify-start rounded-none"
                                onClick={() => handleEmailReport(report.id, report.name)}
                              >
                                <Mail className="h-4 w-4 mr-2" /> Email
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                        
                        {canDeleteReports && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleDeleteReport(report.id, report.name)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isCreateReportOpen} onOpenChange={setIsCreateReportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Report</DialogTitle>
            <DialogDescription>
              Generate a new report based on evaluation data
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="report-name">Report Name</Label>
              <Input
                id="report-name"
                value={newReport.name}
                onChange={(e) =>
                  setNewReport({ ...newReport, name: e.target.value })
                }
                placeholder="E.g., Monthly Performance Report"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select
                value={newReport.type}
                onValueChange={(value: ReportType) =>
                  setNewReport({ ...newReport, type: value })
                }
              >
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Report</SelectItem>
                  <SelectItem value="quarterly">Quarterly Report</SelectItem>
                  <SelectItem value="annual">Annual Report</SelectItem>
                  <SelectItem value="performance">Performance Report</SelectItem>
                  <SelectItem value="custom">Custom Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateReportOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateReport}>Create Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isGenerateReportOpen} onOpenChange={setIsGenerateReportOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Generate Custom Report</DialogTitle>
            <DialogDescription>
              Select criteria to generate a customized report
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="date-range">
                <AccordionTrigger className="flex items-center">
                  <CalendarRange className="h-4 w-4 mr-2" />
                  Date Range
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input id="start-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input id="end-date" type="date" />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="clients-locations">
                <AccordionTrigger className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Clients & Locations
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-6 pt-2">
                    <div>
                      <Label className="mb-2 block">Clients</Label>
                      <div className="border rounded-md p-3 h-40 overflow-auto space-y-2">
                        {['Retail Corp SA', 'QuickMart', 'EcoFuel', 'LuxCafé', 'FreshGrocer', 'HealthPharm'].map(client => (
                          <div key={client} className="flex items-center space-x-2">
                            <Checkbox id={`client-${client}`} />
                            <Label htmlFor={`client-${client}`} className="text-sm cursor-pointer">
                              {client}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="mb-2 block">Locations</Label>
                      <div className="border rounded-md p-3 h-40 overflow-auto space-y-2">
                        {['Cape Town CBD', 'Johannesburg North', 'Durban Beachfront', 'Pretoria Central', 'Bloemfontein', 'Port Elizabeth', 'Sandton', 'Cape Town Waterfront'].map(location => (
                          <div key={location} className="flex items-center space-x-2">
                            <Checkbox id={`location-${location}`} />
                            <Label htmlFor={`location-${location}`} className="text-sm cursor-pointer">
                              {location}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="metrics">
                <AccordionTrigger className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Metrics
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 grid grid-cols-2 gap-3">
                    {[
                      'Overall Score',
                      'Signage, Lighting & Accessibility',
                      'Building Exterior',
                      'Shop/Forecourt',
                      'Yard Area',
                      'Staff Facilities',
                      'Bakery, Food Preparation',
                      'Store, Fridges, Storage',
                      'Staff',
                      'HSSE General',
                      'Administration & Business',
                      'Action Items'
                    ].map(metric => (
                      <div key={metric} className="flex items-center space-x-2">
                        <Checkbox id={`metric-${metric}`} />
                        <Label htmlFor={`metric-${metric}`} className="text-sm cursor-pointer">
                          {metric}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="format">
                <AccordionTrigger className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Format & Options
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="report-format">Report Format</Label>
                        <Select defaultValue="combined">
                          <SelectTrigger id="report-format">
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="table">Table Only</SelectItem>
                            <SelectItem value="chart">Charts Only</SelectItem>
                            <SelectItem value="combined">Tables & Charts</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="breakdown-by">Break Down By</Label>
                        <Select defaultValue="none">
                          <SelectTrigger id="breakdown-by">
                            <SelectValue placeholder="Select breakdown" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No Breakdown</SelectItem>
                            <SelectItem value="client">By Client</SelectItem>
                            <SelectItem value="location">By Location</SelectItem>
                            <SelectItem value="evaluator">By Evaluator</SelectItem>
                            <SelectItem value="section">By Section</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-action-items" />
                      <Label htmlFor="include-action-items" className="text-sm cursor-pointer">
                        Include action items
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGenerateReportOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleGenerateReport}>Generate Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;
