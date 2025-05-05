
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FileText,
  ChartBarIcon,
  PieChart,
  BarChart,
  LineChart,
  Download,
  Calendar,
  Filter,
  CheckSquare,
  Copy,
  PanelTop,
  Share2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { downloadAsPdf } from "@/lib/pdf-utils";

// Sample report data
const recentReports = [
  {
    id: "1",
    name: "Monthly Site Audit Summary",
    date: "2023-04-15",
    type: "Audit Summary",
    status: "complete",
  },
  {
    id: "2",
    name: "Quarterly Performance Report",
    date: "2023-04-01",
    type: "Performance",
    status: "complete",
  },
  {
    id: "3",
    name: "Client Satisfaction Overview",
    date: "2023-03-28",
    type: "Satisfaction",
    status: "complete",
  },
  {
    id: "4",
    name: "Annual Compliance Report",
    date: "2023-03-15",
    type: "Compliance",
    status: "complete",
  },
  {
    id: "5",
    name: "Site Comparison Analysis",
    date: "2023-03-10",
    type: "Analysis",
    status: "draft",
  },
];

const reportTemplates = [
  {
    id: "template-1",
    name: "Site Audit Summary",
    description: "Overview of site audit results with key findings",
    category: "Audit",
    format: "Table + Charts",
    usage: "Most used",
  },
  {
    id: "template-2",
    name: "Client Performance Report",
    description: "Detailed analysis of client performance metrics",
    category: "Performance",
    format: "Charts",
    usage: "Frequently used",
  },
  {
    id: "template-3",
    name: "Compliance Dashboard",
    description: "Compliance status across all evaluation parameters",
    category: "Compliance",
    format: "Dashboard",
    usage: "Regularly used",
  },
  {
    id: "template-4",
    name: "Multi-site Comparison",
    description: "Side-by-side comparison of multiple client sites",
    category: "Analysis",
    format: "Table + Charts",
    usage: "Occasionally used",
  },
  {
    id: "template-5",
    name: "Trend Analysis Report",
    description: "Performance trends over selected time periods",
    category: "Analysis",
    format: "Line Charts",
    usage: "Regularly used",
  },
];

// Sample clients and locations for report generation
const clients = [
  { id: "1", name: "Retail Corp SA" },
  { id: "2", name: "Tech Solutions" },
  { id: "3", name: "EcoFuel" },
  { id: "4", name: "LuxCafé" },
  { id: "5", name: "FreshGrocer" },
];

const locations = [
  { id: "1", name: "Cape Town CBD", clientId: "1" },
  { id: "2", name: "Cape Town Waterfront", clientId: "1" },
  { id: "3", name: "Johannesburg North", clientId: "2" },
  { id: "4", name: "Sandton", clientId: "2" },
  { id: "5", name: "Durban Beachfront", clientId: "3" },
  { id: "6", name: "Pretoria Central", clientId: "4" },
  { id: "7", name: "Bloemfontein", clientId: "5" },
];

const Reports = () => {
  const [activeTab, setActiveTab] = useState("recent");
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false);
  const [reportParams, setReportParams] = useState({
    template: "",
    client: "",
    location: "all",
    dateRange: "last30",
    startDate: "",
    endDate: "",
    format: "pdf",
    metrics: [] as string[],
  });
  const { toast } = useToast();

  const handleGenerateReport = () => {
    if (!reportParams.template || !reportParams.client) {
      toast({
        title: "Missing information",
        description: "Please select a template and client to generate a report",
        variant: "destructive",
      });
      return;
    }

    // Find the template name
    const template = reportTemplates.find(t => t.id === reportParams.template);
    // Find the client name
    const client = clients.find(c => c.id === reportParams.client);
    // Find selected metrics
    const metrics = reportParams.metrics.join(", ");

    // Create PDF content
    const content = `
      <h1>${template?.name || "Custom Report"}</h1>
      <p>Generated on ${new Date().toLocaleDateString()}</p>
      <p><strong>Client:</strong> ${client?.name || "All Clients"}</p>
      <p><strong>Location:</strong> ${reportParams.location === "all" ? "All Locations" : locations.find(l => l.id === reportParams.location)?.name}</p>
      <p><strong>Date Range:</strong> ${reportParams.dateRange === "custom" ? `${reportParams.startDate} to ${reportParams.endDate}` : "Last 30 days"}</p>
      <p><strong>Selected Metrics:</strong> ${metrics || "All metrics"}</p>
      <div style="margin-top: 20px; padding: 20px; background-color: #f3f4f6; border-radius: 5px;">
        <p>This is a sample report generated from your selected parameters. In a real application, this would contain actual data visualizations and tables based on your selection.</p>
      </div>
    `;
    
    // Download the PDF
    downloadAsPdf(content, `${template?.name || "custom-report"}.pdf`);

    toast({
      title: "Report Generated",
      description: "Your report has been generated and downloaded",
    });

    setIsGenerateReportOpen(false);
  };

  const handleReportDownload = (reportId: string) => {
    // Find the report
    const report = recentReports.find(r => r.id === reportId);
    
    // Create PDF content
    const content = `
      <h1>${report?.name || "Report"}</h1>
      <p>Generated on ${report?.date || new Date().toLocaleDateString()}</p>
      <p>Type: ${report?.type || "Unknown"}</p>
      <div style="margin-top: 20px; padding: 20px; background-color: #f3f4f6; border-radius: 5px;">
        <p>This is a sample report download. In a real application, this would contain the actual report data, visualizations, and tables.</p>
      </div>
    `;
    
    // Download the PDF
    downloadAsPdf(content, `${report?.name || "report"}.pdf`);

    toast({
      title: "Report Downloaded",
      description: "Your report has been downloaded successfully",
    });
  };

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case "Audit Summary":
        return <CheckSquare className="h-4 w-4 mr-1" />;
      case "Performance":
        return <BarChart className="h-4 w-4 mr-1" />;
      case "Satisfaction":
        return <PieChart className="h-4 w-4 mr-1" />;
      case "Compliance":
        return <FileText className="h-4 w-4 mr-1" />;
      case "Analysis":
        return <LineChart className="h-4 w-4 mr-1" />;
      default:
        return <FileText className="h-4 w-4 mr-1" />;
    }
  };

  const getTemplateCategoryIcon = (category: string) => {
    switch (category) {
      case "Audit":
        return <CheckSquare className="h-4 w-4 mr-1" />;
      case "Performance":
        return <BarChart className="h-4 w-4 mr-1" />;
      case "Compliance":
        return <FileText className="h-4 w-4 mr-1" />;
      case "Analysis":
        return <LineChart className="h-4 w-4 mr-1" />;
      default:
        return <FileText className="h-4 w-4 mr-1" />;
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "Table + Charts":
        return <PanelTop className="h-4 w-4 mr-1" />;
      case "Charts":
        return <BarChart className="h-4 w-4 mr-1" />;
      case "Dashboard":
        return <ChartBarIcon className="h-4 w-4 mr-1" />;
      case "Line Charts":
        return <LineChart className="h-4 w-4 mr-1" />;
      default:
        return <FileText className="h-4 w-4 mr-1" />;
    }
  };

  const toggleMetric = (metric: string) => {
    if (reportParams.metrics.includes(metric)) {
      setReportParams({
        ...reportParams,
        metrics: reportParams.metrics.filter((m) => m !== metric),
      });
    } else {
      setReportParams({
        ...reportParams,
        metrics: [...reportParams.metrics, metric],
      });
    }
  };

  const selectAllMetrics = () => {
    const allMetrics = [
      "Overall Score",
      "Signage",
      "Lighting",
      "Exterior",
      "Shop",
      "Yard",
      "Staff Facilities",
      "Bakery",
      "Store",
      "Staff",
      "HSSE",
      "Admin",
      "Action Items",
    ];
    setReportParams({
      ...reportParams,
      metrics: allMetrics,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setIsGenerateReportOpen(true)}>
            Generate Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="library">Reports Library</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentReports.map((report) => (
              <Card key={report.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    {getReportTypeIcon(report.type)}
                    {report.name}
                  </CardTitle>
                  <div className="flex justify-between items-center">
                    <CardDescription>
                      {new Date(report.date).toLocaleDateString()}
                    </CardDescription>
                    <Badge
                      variant={report.status === "complete" ? "outline" : "secondary"}
                    >
                      {report.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FileText className="h-4 w-4 mr-1" />
                    <span>{report.type}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-1" /> Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReportDownload(report.id)}
                  >
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reportTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    {getTemplateCategoryIcon(template.category)}
                    {template.name}
                  </CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm">
                      <Badge variant="outline" className="mr-2">
                        {template.category}
                      </Badge>
                      <div className="flex items-center text-muted-foreground">
                        {getFormatIcon(template.format)}
                        {template.format}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {template.usage}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Button variant="ghost" size="sm">
                    <Copy className="h-4 w-4 mr-1" /> Duplicate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setReportParams({
                        ...reportParams,
                        template: template.id,
                      });
                      setIsGenerateReportOpen(true);
                    }}
                  >
                    <FileText className="h-4 w-4 mr-1" /> Use Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="library" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports Library</CardTitle>
              <CardDescription>
                Browse and access all previously generated reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Search reports..."
                      className="pl-8"
                    />
                    <FileText className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Report Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="audit">Audit</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="analysis">Analysis</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="recent">
                    <SelectTrigger className="w-[180px]">
                      <Calendar className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Time Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Recent</SelectItem>
                      <SelectItem value="last-week">Last Week</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="last-quarter">Last Quarter</SelectItem>
                      <SelectItem value="last-year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative overflow-x-auto rounded-md border">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-muted">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Report Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Generated Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentReports.concat(recentReports).map((report, idx) => (
                        <tr
                          key={`${report.id}-${idx}`}
                          className="bg-card border-b last:border-0"
                        >
                          <td className="px-6 py-4 font-medium">
                            {report.name}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {getReportTypeIcon(report.type)}
                              {report.type}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {new Date(report.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <Badge
                              variant={
                                report.status === "complete"
                                  ? "outline"
                                  : "secondary"
                              }
                            >
                              {report.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReportDownload(report.id)}
                            >
                              <Download className="h-4 w-4 mr-1" /> Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Generate Report Dialog */}
      <Dialog
        open={isGenerateReportOpen}
        onOpenChange={setIsGenerateReportOpen}
      >
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Generate Custom Report</DialogTitle>
            <DialogDescription>
              Configure report parameters to generate a customized report.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="template">Report Template</Label>
              <Select
                value={reportParams.template}
                onValueChange={(value) =>
                  setReportParams({ ...reportParams, template: value })
                }
              >
                <SelectTrigger id="template">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {reportTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="client">Client</Label>
                  <Button 
                    variant="link" 
                    className="h-auto p-0 text-xs"
                    onClick={() => setReportParams({ ...reportParams, client: "all" })}
                  >
                    Select All
                  </Button>
                </div>
                <Select
                  value={reportParams.client}
                  onValueChange={(value) =>
                    setReportParams({ ...reportParams, client: value })
                  }
                >
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Clients</SelectItem>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="location">Location</Label>
                  <Button 
                    variant="link" 
                    className="h-auto p-0 text-xs"
                    onClick={() => setReportParams({ ...reportParams, location: "all" })}
                  >
                    Select All
                  </Button>
                </div>
                <Select
                  value={reportParams.location}
                  onValueChange={(value) =>
                    setReportParams({ ...reportParams, location: value })
                  }
                  disabled={!reportParams.client || reportParams.client === "all"}
                >
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {reportParams.client &&
                      reportParams.client !== "all" &&
                      locations
                        .filter((loc) => loc.clientId === reportParams.client)
                        .map((location) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.name}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dateRange">Date Range</Label>
              <Select
                value={reportParams.dateRange}
                onValueChange={(value) =>
                  setReportParams({ ...reportParams, dateRange: value })
                }
              >
                <SelectTrigger id="dateRange">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last30">Last 30 Days</SelectItem>
                  <SelectItem value="last90">Last 90 Days</SelectItem>
                  <SelectItem value="lastQuarter">Last Quarter</SelectItem>
                  <SelectItem value="lastYear">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {reportParams.dateRange === "custom" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    type="date"
                    id="startDate"
                    value={reportParams.startDate}
                    onChange={(e) =>
                      setReportParams({
                        ...reportParams,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    type="date"
                    id="endDate"
                    value={reportParams.endDate}
                    onChange={(e) =>
                      setReportParams({ ...reportParams, endDate: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="metrics">Metrics</Label>
                <Button 
                  variant="link" 
                  className="h-auto p-0 text-xs"
                  onClick={selectAllMetrics}
                >
                  Select All
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2 border rounded-md p-3 max-h-[200px] overflow-y-auto">
                {[
                  "Overall Score",
                  "Signage",
                  "Lighting",
                  "Exterior",
                  "Shop",
                  "Yard",
                  "Staff Facilities",
                  "Bakery",
                  "Store",
                  "Staff",
                  "HSSE",
                  "Admin",
                  "Action Items",
                ].map((metric) => (
                  <div key={metric} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`metric-${metric}`}
                      checked={reportParams.metrics.includes(metric)}
                      onChange={() => toggleMetric(metric)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor={`metric-${metric}`} className="text-sm">
                      {metric}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="format">Output Format</Label>
              <Select
                value={reportParams.format}
                onValueChange={(value) =>
                  setReportParams({ ...reportParams, format: value })
                }
              >
                <SelectTrigger id="format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV File</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsGenerateReportOpen(false)}
            >
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
