
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  BarChart3, 
  Users, 
  Clock, 
  Activity, 
  Search,
  Calendar, 
  Download,
  FileText,
  Filter
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Sample mock data
const mockEmployees = [
  { id: "e1", name: "John Doe", role: "evaluator", department: "Field Operations", location: "Cape Town" },
  { id: "e2", name: "Jane Smith", role: "evaluator", department: "Customer Service", location: "Johannesburg" },
  { id: "e3", name: "Michael Brown", role: "manager", department: "Field Operations", location: "Durban" },
  { id: "e4", name: "Sarah Wilson", role: "evaluator", department: "Customer Service", location: "Pretoria" },
  { id: "e5", name: "David Johnson", role: "manager", department: "Retail Audits", location: "Cape Town" },
];

const mockActivityData = [
  { 
    employeeId: "e1", 
    evaluationsCompleted: 42,
    avgHandleTime: 45,
    resolutionRate: 87,
    taskCompletionRate: 94,
    qualityScore: 91,
    slaCompliance: 96,
    responseTime: 3.2,
    resolutionTime: 18.5,
    customerSatisfaction: 4.5,
    openCases: 7,
    attendanceRate: 98,
    employeeSatisfaction: 4.2
  },
  { 
    employeeId: "e2", 
    evaluationsCompleted: 38,
    avgHandleTime: 51,
    resolutionRate: 84,
    taskCompletionRate: 91,
    qualityScore: 88,
    slaCompliance: 92,
    responseTime: 3.8,
    resolutionTime: 21.3,
    customerSatisfaction: 4.3,
    openCases: 12,
    attendanceRate: 95,
    employeeSatisfaction: 3.9
  },
  { 
    employeeId: "e3", 
    evaluationsCompleted: 56,
    avgHandleTime: 38,
    resolutionRate: 92,
    taskCompletionRate: 97,
    qualityScore: 95,
    slaCompliance: 98,
    responseTime: 2.4,
    resolutionTime: 14.7,
    customerSatisfaction: 4.8,
    openCases: 3,
    attendanceRate: 99,
    employeeSatisfaction: 4.7
  },
  { 
    employeeId: "e4", 
    evaluationsCompleted: 33,
    avgHandleTime: 47,
    resolutionRate: 83,
    taskCompletionRate: 88,
    qualityScore: 85,
    slaCompliance: 91,
    responseTime: 4.1,
    resolutionTime: 23.6,
    customerSatisfaction: 4.1,
    openCases: 15,
    attendanceRate: 94,
    employeeSatisfaction: 3.8
  },
  { 
    employeeId: "e5", 
    evaluationsCompleted: 48,
    avgHandleTime: 42,
    resolutionRate: 90,
    taskCompletionRate: 95,
    qualityScore: 93,
    slaCompliance: 97,
    responseTime: 2.8,
    resolutionTime: 16.2,
    customerSatisfaction: 4.7,
    openCases: 5,
    attendanceRate: 98,
    employeeSatisfaction: 4.5
  },
];

// Join employee data with activity data
const employeeActivityData = mockEmployees.map(employee => {
  const activity = mockActivityData.find(a => a.employeeId === employee.id);
  return {
    ...employee,
    ...activity
  };
});

interface MetricGroup {
  name: string;
  metrics: { id: string; name: string; description: string }[];
}

const metricGroups: MetricGroup[] = [
  {
    name: "Individual Performance Metrics",
    metrics: [
      { id: "evaluationsCompleted", name: "Evaluations Completed", description: "Total evaluations completed in the period" },
      { id: "avgHandleTime", name: "Average Handle Time (min)", description: "Average time spent on each evaluation" },
      { id: "resolutionRate", name: "Resolution Rate (%)", description: "Percentage of issues resolved on first contact" },
      { id: "taskCompletionRate", name: "Task Completion Rate (%)", description: "Percentage of assigned tasks completed on time" },
      { id: "qualityScore", name: "Quality Score (%)", description: "Score from quality monitoring assessments" },
    ]
  },
  {
    name: "SLA Metrics",
    metrics: [
      { id: "slaCompliance", name: "SLA Compliance (%)", description: "Percentage of interactions meeting SLA targets" },
      { id: "responseTime", name: "Average Response Time (hrs)", description: "Average time to first response" },
      { id: "resolutionTime", name: "Average Resolution Time (hrs)", description: "Average time to completely resolve an issue" },
      { id: "customerSatisfaction", name: "Customer Satisfaction (1-5)", description: "Average CSAT score from customer feedback" },
      { id: "openCases", name: "Open Cases", description: "Number of unresolved cases currently assigned" },
    ]
  },
  {
    name: "Engagement Metrics",
    metrics: [
      { id: "attendanceRate", name: "Attendance Rate (%)", description: "Percentage of scheduled hours attended" },
      { id: "employeeSatisfaction", name: "Employee Satisfaction (1-5)", description: "Score from employee satisfaction surveys" },
    ]
  }
];

const UserActivityReport = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("individual");
  const [dateRange, setDateRange] = useState("last30");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "evaluationsCompleted", 
    "resolutionRate", 
    "qualityScore", 
    "slaCompliance", 
    "customerSatisfaction"
  ]);

  // Filter data based on selections
  const filteredData = employeeActivityData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !selectedDepartment || employee.department === selectedDepartment;
    const matchesLocation = !selectedLocation || employee.location === selectedLocation;
    const matchesRole = !selectedRole || employee.role === selectedRole;
    
    return matchesSearch && matchesDepartment && matchesLocation && matchesRole;
  });

  // Get unique departments, locations, and roles for filters
  const departments = [...new Set(employeeActivityData.map(e => e.department))];
  const locations = [...new Set(employeeActivityData.map(e => e.location))];
  const roles = [...new Set(employeeActivityData.map(e => e.role))];

  const handleMetricSelection = (metricId: string) => {
    setSelectedMetrics(prev => {
      if (prev.includes(metricId)) {
        return prev.filter(id => id !== metricId);
      } else {
        return [...prev, metricId];
      }
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "User activity report has been generated successfully",
    });
  };

  const handleExportReport = () => {
    toast({
      title: "Export Started",
      description: "Your report is being exported to CSV",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">User Activity Report</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportReport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Productivity & SLA Report</CardTitle>
          <CardDescription>
            Analyze employee performance, SLA compliance, and engagement metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="individual">
                <Users className="mr-2 h-4 w-4" />
                Individual Performance
              </TabsTrigger>
              <TabsTrigger value="team">
                <Activity className="mr-2 h-4 w-4" />
                Team Performance
              </TabsTrigger>
            </TabsList>

            {/* Filter controls */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search employees..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select
                value={selectedDepartment || ""}
                onValueChange={(value) => setSelectedDepartment(value === "" ? null : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={selectedLocation || ""}
                onValueChange={(value) => setSelectedLocation(value === "" ? null : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  {locations.map(loc => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={selectedRole || ""}
                onValueChange={(value) => setSelectedRole(value === "" ? null : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Roles</SelectItem>
                  {roles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Select
                value={dateRange}
                onValueChange={setDateRange}
              >
                <SelectTrigger>
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="last7">Last 7 Days</SelectItem>
                  <SelectItem value="last30">Last 30 Days</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="lastMonth">Last Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="md:col-span-3">
                <Button variant="outline" onClick={() => {
                  document.getElementById("metrics-accordion")?.scrollIntoView({ behavior: "smooth" });
                }}>
                  <Filter className="mr-2 h-4 w-4" />
                  Select Metrics
                </Button>
              </div>
            </div>

            {/* Metrics selection accordion */}
            <Accordion type="single" collapsible id="metrics-accordion" className="mb-8">
              <AccordionItem value="metrics">
                <AccordionTrigger className="font-medium">
                  <span className="flex items-center">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Selected Metrics ({selectedMetrics.length})
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {metricGroups.map((group) => (
                      <div key={group.name} className="space-y-3">
                        <h3 className="font-medium text-sm">{group.name}</h3>
                        <div className="space-y-2">
                          {group.metrics.map((metric) => (
                            <div key={metric.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`metric-${metric.id}`} 
                                checked={selectedMetrics.includes(metric.id)}
                                onCheckedChange={() => handleMetricSelection(metric.id)}
                              />
                              <div className="grid gap-0.5">
                                <label 
                                  htmlFor={`metric-${metric.id}`}
                                  className="text-sm font-medium cursor-pointer"
                                >
                                  {metric.name}
                                </label>
                                <p className="text-xs text-muted-foreground">{metric.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <TabsContent value="individual">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Location</TableHead>
                      {selectedMetrics.includes("evaluationsCompleted") && (
                        <TableHead className="text-right">Evaluations</TableHead>
                      )}
                      {selectedMetrics.includes("avgHandleTime") && (
                        <TableHead className="text-right">Avg Handle Time</TableHead>
                      )}
                      {selectedMetrics.includes("resolutionRate") && (
                        <TableHead className="text-right">Resolution Rate</TableHead>
                      )}
                      {selectedMetrics.includes("taskCompletionRate") && (
                        <TableHead className="text-right">Task Completion</TableHead>
                      )}
                      {selectedMetrics.includes("qualityScore") && (
                        <TableHead className="text-right">Quality Score</TableHead>
                      )}
                      {selectedMetrics.includes("slaCompliance") && (
                        <TableHead className="text-right">SLA Compliance</TableHead>
                      )}
                      {selectedMetrics.includes("responseTime") && (
                        <TableHead className="text-right">Response Time</TableHead>
                      )}
                      {selectedMetrics.includes("resolutionTime") && (
                        <TableHead className="text-right">Resolution Time</TableHead>
                      )}
                      {selectedMetrics.includes("customerSatisfaction") && (
                        <TableHead className="text-right">CSAT</TableHead>
                      )}
                      {selectedMetrics.includes("openCases") && (
                        <TableHead className="text-right">Open Cases</TableHead>
                      )}
                      {selectedMetrics.includes("attendanceRate") && (
                        <TableHead className="text-right">Attendance</TableHead>
                      )}
                      {selectedMetrics.includes("employeeSatisfaction") && (
                        <TableHead className="text-right">eSAT</TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={12} className="h-24 text-center">
                          No results found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredData.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell className="font-medium">{employee.name}</TableCell>
                          <TableCell>{employee.department}</TableCell>
                          <TableCell>{employee.location}</TableCell>
                          {selectedMetrics.includes("evaluationsCompleted") && (
                            <TableCell className="text-right">{employee.evaluationsCompleted}</TableCell>
                          )}
                          {selectedMetrics.includes("avgHandleTime") && (
                            <TableCell className="text-right">{employee.avgHandleTime} min</TableCell>
                          )}
                          {selectedMetrics.includes("resolutionRate") && (
                            <TableCell className="text-right">{employee.resolutionRate}%</TableCell>
                          )}
                          {selectedMetrics.includes("taskCompletionRate") && (
                            <TableCell className="text-right">{employee.taskCompletionRate}%</TableCell>
                          )}
                          {selectedMetrics.includes("qualityScore") && (
                            <TableCell className="text-right">{employee.qualityScore}%</TableCell>
                          )}
                          {selectedMetrics.includes("slaCompliance") && (
                            <TableCell className="text-right">{employee.slaCompliance}%</TableCell>
                          )}
                          {selectedMetrics.includes("responseTime") && (
                            <TableCell className="text-right">{employee.responseTime} hrs</TableCell>
                          )}
                          {selectedMetrics.includes("resolutionTime") && (
                            <TableCell className="text-right">{employee.resolutionTime} hrs</TableCell>
                          )}
                          {selectedMetrics.includes("customerSatisfaction") && (
                            <TableCell className="text-right">{employee.customerSatisfaction}/5</TableCell>
                          )}
                          {selectedMetrics.includes("openCases") && (
                            <TableCell className="text-right">{employee.openCases}</TableCell>
                          )}
                          {selectedMetrics.includes("attendanceRate") && (
                            <TableCell className="text-right">{employee.attendanceRate}%</TableCell>
                          )}
                          {selectedMetrics.includes("employeeSatisfaction") && (
                            <TableCell className="text-right">{employee.employeeSatisfaction}/5</TableCell>
                          )}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="team">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-right">Employees</TableHead>
                      {selectedMetrics.includes("evaluationsCompleted") && (
                        <TableHead className="text-right">Total Evaluations</TableHead>
                      )}
                      {selectedMetrics.includes("avgHandleTime") && (
                        <TableHead className="text-right">Avg Handle Time</TableHead>
                      )}
                      {selectedMetrics.includes("resolutionRate") && (
                        <TableHead className="text-right">Avg Resolution Rate</TableHead>
                      )}
                      {selectedMetrics.includes("qualityScore") && (
                        <TableHead className="text-right">Avg Quality Score</TableHead>
                      )}
                      {selectedMetrics.includes("slaCompliance") && (
                        <TableHead className="text-right">Avg SLA Compliance</TableHead>
                      )}
                      {selectedMetrics.includes("customerSatisfaction") && (
                        <TableHead className="text-right">Avg CSAT</TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Team aggregated data would go here - for the demo we'll show departments */}
                    {departments.map((dept) => {
                      const deptEmployees = filteredData.filter(e => e.department === dept);
                      if (deptEmployees.length === 0) return null;
                      
                      const totalEvaluations = deptEmployees.reduce((sum, e) => sum + e.evaluationsCompleted, 0);
                      const avgHandleTime = deptEmployees.reduce((sum, e) => sum + e.avgHandleTime, 0) / deptEmployees.length;
                      const avgResolutionRate = deptEmployees.reduce((sum, e) => sum + e.resolutionRate, 0) / deptEmployees.length;
                      const avgQualityScore = deptEmployees.reduce((sum, e) => sum + e.qualityScore, 0) / deptEmployees.length;
                      const avgSlaCompliance = deptEmployees.reduce((sum, e) => sum + e.slaCompliance, 0) / deptEmployees.length;
                      const avgCsat = deptEmployees.reduce((sum, e) => sum + e.customerSatisfaction, 0) / deptEmployees.length;
                      
                      return (
                        <TableRow key={dept}>
                          <TableCell className="font-medium">{dept}</TableCell>
                          <TableCell>All Locations</TableCell>
                          <TableCell className="text-right">{deptEmployees.length}</TableCell>
                          {selectedMetrics.includes("evaluationsCompleted") && (
                            <TableCell className="text-right">{totalEvaluations}</TableCell>
                          )}
                          {selectedMetrics.includes("avgHandleTime") && (
                            <TableCell className="text-right">{avgHandleTime.toFixed(1)} min</TableCell>
                          )}
                          {selectedMetrics.includes("resolutionRate") && (
                            <TableCell className="text-right">{avgResolutionRate.toFixed(1)}%</TableCell>
                          )}
                          {selectedMetrics.includes("qualityScore") && (
                            <TableCell className="text-right">{avgQualityScore.toFixed(1)}%</TableCell>
                          )}
                          {selectedMetrics.includes("slaCompliance") && (
                            <TableCell className="text-right">{avgSlaCompliance.toFixed(1)}%</TableCell>
                          )}
                          {selectedMetrics.includes("customerSatisfaction") && (
                            <TableCell className="text-right">{avgCsat.toFixed(1)}/5</TableCell>
                          )}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Data shown is for {dateRange === "last30" ? "the last 30 days" : "the selected time period"}
          </p>
          <Button onClick={handleGenerateReport}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserActivityReport;
