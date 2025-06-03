
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  Upload,
  FileText,
  Database,
  Settings,
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExportTask {
  id: string;
  type: "export" | "import";
  dataType: string;
  format?: string;
  status: "pending" | "processing" | "completed" | "failed";
  progress: number;
  fileName?: string;
  createdAt: string;
  completedAt?: string;
  error?: string;
}

interface APIIntegration {
  id: string;
  name: string;
  type: "google_sheets" | "zapier" | "webhook";
  status: "connected" | "disconnected";
  lastSync?: string;
}

const DataExportImport = () => {
  const { toast } = useToast();
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isAPIDialogOpen, setIsAPIDialogOpen] = useState(false);
  const [selectedDataType, setSelectedDataType] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [googleSheetsId, setGoogleSheetsId] = useState("");

  // Sample tasks data
  const [tasks] = useState<ExportTask[]>([
    {
      id: "task-001",
      type: "export",
      dataType: "evaluations",
      format: "csv",
      status: "completed",
      progress: 100,
      fileName: "evaluations_export_2023-06-24.csv",
      createdAt: "2023-06-24 14:30:00",
      completedAt: "2023-06-24 14:31:15",
    },
    {
      id: "task-002",
      type: "import",
      dataType: "clients",
      status: "processing",
      progress: 65,
      fileName: "client_data_import.xlsx",
      createdAt: "2023-06-24 15:00:00",
    },
    {
      id: "task-003",
      type: "export",
      dataType: "financials",
      format: "pdf",
      status: "failed",
      progress: 0,
      fileName: "financial_report_q2.pdf",
      createdAt: "2023-06-24 13:45:00",
      error: "Insufficient permissions to access financial data",
    },
  ]);

  const [apiIntegrations] = useState<APIIntegration[]>([
    {
      id: "integration-001",
      name: "Google Sheets Integration",
      type: "google_sheets",
      status: "connected",
      lastSync: "2023-06-24 14:30:00",
    },
    {
      id: "integration-002",
      name: "Zapier Webhook",
      type: "zapier",
      status: "disconnected",
    },
  ]);

  const dataTypes = [
    { value: "evaluations", label: "Evaluations", icon: <FileText className="h-4 w-4" /> },
    { value: "clients", label: "Clients", icon: <Database className="h-4 w-4" /> },
    { value: "financials", label: "Financial Data", icon: <Database className="h-4 w-4" /> },
    { value: "hr", label: "HR Data", icon: <Database className="h-4 w-4" /> },
    { value: "users", label: "User Data", icon: <Database className="h-4 w-4" /> },
  ];

  const exportFormats = [
    { value: "csv", label: "CSV", extension: ".csv" },
    { value: "excel", label: "Excel", extension: ".xlsx" },
    { value: "pdf", label: "PDF", extension: ".pdf" },
  ];

  const handleExport = () => {
    if (!selectedDataType || !selectedFormat) {
      toast({
        title: "Error",
        description: "Please select both data type and format",
        variant: "destructive",
      });
      return;
    }

    // Simulate export process
    toast({
      title: "Export Started",
      description: `Exporting ${selectedDataType} data as ${selectedFormat.toUpperCase()}`,
    });

    setIsExportDialogOpen(false);
    setSelectedDataType("");
    setSelectedFormat("");
  };

  const handleImport = () => {
    if (!selectedDataType) {
      toast({
        title: "Error",
        description: "Please select data type for import",
        variant: "destructive",
      });
      return;
    }

    // Simulate import process
    toast({
      title: "Import Started",
      description: `Processing ${selectedDataType} data import`,
    });

    setIsImportDialogOpen(false);
    setSelectedDataType("");
  };

  const handleAPISetup = () => {
    toast({
      title: "Success",
      description: "API integration settings saved successfully",
    });
    setIsAPIDialogOpen(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "processing":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Data Export & Import</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsImportDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" /> Import Data
          </Button>
          <Button onClick={() => setIsExportDialogOpen(true)}>
            <Download className="mr-2 h-4 w-4" /> Export Data
          </Button>
          <Button variant="outline" onClick={() => setIsAPIDialogOpen(true)}>
            <Settings className="mr-2 h-4 w-4" /> API Settings
          </Button>
        </div>
      </div>

      {/* Task Status Tracker */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Data Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>File</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {task.type === "export" ? (
                        <Download className="h-4 w-4" />
                      ) : (
                        <Upload className="h-4 w-4" />
                      )}
                      <span className="capitalize">{task.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{task.dataType}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(task.status)}
                      <Badge className={getStatusBadgeColor(task.status)}>
                        {task.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress value={task.progress} className="w-20" />
                      <span className="text-xs text-muted-foreground">
                        {task.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {task.fileName && (
                      <div className="max-w-32 truncate" title={task.fileName}>
                        {task.fileName}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {task.createdAt}
                  </TableCell>
                  <TableCell>
                    {task.status === "completed" && task.type === "export" && (
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    {task.status === "failed" && (
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* API Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>External Platform Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {apiIntegrations.map((integration) => (
              <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h3 className="font-medium">{integration.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge className={integration.status === "connected" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {integration.status}
                    </Badge>
                    {integration.lastSync && (
                      <span className="text-sm text-muted-foreground">
                        Last sync: {integration.lastSync}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Dialog */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Export Data</DialogTitle>
            <DialogDescription>
              Select the data type and format for export
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Data Type</Label>
              <Select value={selectedDataType} onValueChange={setSelectedDataType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select data type" />
                </SelectTrigger>
                <SelectContent>
                  {dataTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        {type.icon}
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Export Format</Label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {exportFormats.map((format) => (
                    <SelectItem key={format.value} value={format.value}>
                      {format.label} ({format.extension})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Import Data</DialogTitle>
            <DialogDescription>
              Upload and import data using predefined templates
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Data Type</Label>
              <Select value={selectedDataType} onValueChange={setSelectedDataType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select data type" />
                </SelectTrigger>
                <SelectContent>
                  {dataTypes.filter(type => ["clients", "hr", "users"].includes(type.value)).map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        {type.icon}
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Upload File</Label>
              <Input type="file" accept=".csv,.xlsx,.xls" />
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download Template
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleImport}>
              <Upload className="mr-2 h-4 w-4" /> Import
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* API Settings Dialog */}
      <Dialog open={isAPIDialogOpen} onOpenChange={setIsAPIDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>API Integration Settings</DialogTitle>
            <DialogDescription>
              Configure external platform integrations
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Zapier Webhook URL</Label>
              <Input
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://hooks.zapier.com/hooks/catch/..."
              />
            </div>
            <div className="space-y-2">
              <Label>Google Sheets ID</Label>
              <Input
                value={googleSheetsId}
                onChange={(e) => setGoogleSheetsId(e.target.value)}
                placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAPIDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAPISetup}>
              <Settings className="mr-2 h-4 w-4" /> Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataExportImport;
