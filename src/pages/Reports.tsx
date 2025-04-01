
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { PlusCircle, FileText, Download, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

// Example report types
type ReportType = "monthly" | "quarterly" | "annual" | "performance" | "custom";

interface Report {
  id: string;
  name: string;
  type: ReportType;
  createdBy: string;
  dateCreated: string;
}

const Reports = () => {
  const { currentUser, hasPermission } = useAuth();
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      name: "Q1 Performance Report",
      type: "quarterly",
      createdBy: "Shaheed Van Dawson",
      dateCreated: "2023-04-15",
    },
    {
      id: "2",
      name: "Annual Review 2023",
      type: "annual",
      createdBy: "Admin User",
      dateCreated: "2023-12-30",
    },
  ]);
  const [isCreateReportOpen, setIsCreateReportOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    name: "",
    type: "monthly" as ReportType,
  });

  const canCreateReports = hasPermission("canCreateReports");
  const canDeleteReports = hasPermission("canDeleteReports");

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

  const handleDownloadReport = (id: string, name: string) => {
    // In a real app, this would trigger an actual download
    toast({
      title: "Download Started",
      description: `${name} is being downloaded`,
    });
  };

  const reportTypeLabels: Record<ReportType, string> = {
    monthly: "Monthly Report",
    quarterly: "Quarterly Report",
    annual: "Annual Report",
    performance: "Performance Report",
    custom: "Custom Report",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        {canCreateReports && (
          <Button onClick={() => setIsCreateReportOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Report
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>
            View and manage system reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reports.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <FileText className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">No Reports Yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {canCreateReports
                  ? "Create your first report to get started"
                  : "Reports created by administrators will appear here"}
              </p>
              {canCreateReports && (
                <Button
                  className="mt-4"
                  onClick={() => setIsCreateReportOpen(true)}
                >
                  Create Report
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Date Created</TableHead>
                  <TableHead className="w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell>{reportTypeLabels[report.type]}</TableCell>
                    <TableCell>{report.createdBy}</TableCell>
                    <TableCell>{report.dateCreated}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleDownloadReport(report.id, report.name)
                          }
                        >
                          <Download className="h-4 w-4" />
                        </Button>
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

      {/* Create Report Dialog */}
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
    </div>
  );
};

export default Reports;
