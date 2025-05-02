
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
  Filter,
  Mail,
  MessageSquare,
  UserCheck,
  Award,
  Shield
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { EmployeeProductivityMetric } from "@/types/kpi";

// Sample mock data
const mockEmployees = [
  { id: "e1", name: "John Doe", role: "evaluator", department: "Field Operations", location: "Cape Town" },
  { id: "e2", name: "Jane Smith", role: "evaluator", department: "Customer Service", location: "Johannesburg" },
  { id: "e3", name: "Michael Brown", role: "manager", department: "Field Operations", location: "Durban" },
  { id: "e4", name: "Sarah Wilson", role: "evaluator", department: "Customer Service", location: "Pretoria" },
  { id: "e5", name: "David Johnson", role: "manager", department: "Retail Audits", location: "Cape Town" },
];

// Extended mock activity data with additional metrics
const mockActivityData = [
  { 
    employeeId: "e1", 
    // Individual Performance Metrics
    evaluationsCompleted: 42,
    avgHandleTime: 45,
    resolutionRate: 87,
    taskCompletionRate: 94,
    qualityScore: 91,
    revenueGenerated: 15000,
    goalAchievementRate: 96,
    interactionsHandled: 215,
    efficiencyScore: 88,
    
    // SLA Metrics
    slaCompliance: 96,
    responseTime: 3.2,
    resolutionTime: 18.5,
    slaBreaches: 3,
    openCases: 7,
    avgCaseAge: 2.3,
    
    // Customer Satisfaction
    customerSatisfaction: 4.5,
    customerEffortScore: 1.9,
    
    // Time-Related Metrics
    attendanceRate: 98,
    absenteeismRate: 2,
    idleTime: 8.5,
    
    // Engagement Metrics
    employeeSatisfaction: 4.2,
    employeeNps: 8,
    trainingParticipation: 100
  },
  // ... similar extended data for other employees
  { 
    employeeId: "e2", 
    evaluationsCompleted: 38,
    avgHandleTime: 51,
    resolutionRate: 84,
    taskCompletionRate: 91,
    qualityScore: 88,
    revenueGenerated: 12800,
    goalAchievementRate: 92,
    interactionsHandled: 198,
    efficiencyScore: 85,
    
    slaCompliance: 92,
    responseTime: 3.8,
    resolutionTime: 21.3,
    slaBreaches: 5,
    openCases: 12,
    avgCaseAge: 3.1,
    
    customerSatisfaction: 4.3,
    customerEffortScore: 2.1,
    
    attendanceRate: 95,
    absenteeismRate: 5,
    idleTime: 10.2,
    
    employeeSatisfaction: 3.9,
    employeeNps: 7,
    trainingParticipation: 90
  },
  { 
    employeeId: "e3", 
    evaluationsCompleted: 56,
    avgHandleTime: 38,
    resolutionRate: 92,
    taskCompletionRate: 97,
    qualityScore: 95,
    revenueGenerated: 22000,
    goalAchievementRate: 99,
    interactionsHandled: 245,
    efficiencyScore: 93,
    
    slaCompliance: 98,
    responseTime: 2.4,
    resolutionTime: 14.7,
    slaBreaches: 1,
    openCases: 3,
    avgCaseAge: 1.5,
    
    customerSatisfaction: 4.8,
    customerEffortScore: 1.5,
    
    attendanceRate: 99,
    absenteeismRate: 1,
    idleTime: 5.8,
    
    employeeSatisfaction: 4.7,
    employeeNps: 9,
    trainingParticipation: 100
  },
  { 
    employeeId: "e4", 
    evaluationsCompleted: 33,
    avgHandleTime: 47,
    resolutionRate: 83,
    taskCompletionRate: 88,
    qualityScore: 85,
    revenueGenerated: 9500,
    goalAchievementRate: 90,
    interactionsHandled: 175,
    efficiencyScore: 82,
    
    slaCompliance: 91,
    responseTime: 4.1,
    resolutionTime: 23.6,
    slaBreaches: 7,
    openCases: 15,
    avgCaseAge: 4.2,
    
    customerSatisfaction: 4.1,
    customerEffortScore: 2.4,
    
    attendanceRate: 94,
    absenteeismRate: 6,
    idleTime: 12.5,
    
    employeeSatisfaction: 3.8,
    employeeNps: 6,
    trainingParticipation: 85
  },
  { 
    employeeId: "e5", 
    evaluationsCompleted: 48,
    avgHandleTime: 42,
    resolutionRate: 90,
    taskCompletionRate: 95,
    qualityScore: 93,
    revenueGenerated: 18500,
    goalAchievementRate: 97,
    interactionsHandled: 225,
    efficiencyScore: 90,
    
    slaCompliance: 97,
    responseTime: 2.8,
    resolutionTime: 16.2,
    slaBreaches: 2,
    openCases: 5,
    avgCaseAge: 2.0,
    
    customerSatisfaction: 4.7,
    customerEffortScore: 1.7,
    
    attendanceRate: 98,
    absenteeismRate: 2,
    idleTime: 7.3,
    
    employeeSatisfaction: 4.5,
    employeeNps: 8,
    trainingParticipation: 95
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

// Enhanced metric groups based on your categories
const metricGroups: { name: string; metrics: EmployeeProductivityMetric[] }[] = [
  {
    name: "Individual Performance Metrics",
    metrics: [
      { id: "interactionsHandled", name: "Interactions Handled", description: "Total customer interactions managed", category: "individual" },
      { id: "evaluationsCompleted", name: "Evaluations Completed", description: "Total evaluations completed in the period", category: "individual" },
      { id: "avgHandleTime", name: "Average Handle Time (min)", description: "Average time spent on each interaction", category: "individual" },
      { id: "resolutionRate", name: "Resolution Rate (%)", description: "Percentage of issues resolved on first contact", category: "individual" },
      { id: "taskCompletionRate", name: "Task Completion Rate (%)", description: "Percentage of assigned tasks completed on time", category: "individual" },
      { id: "qualityScore", name: "Quality Score (%)", description: "Score from quality monitoring assessments", category: "individual" },
      { id: "efficiencyScore", name: "Efficiency Score (%)", description: "Overall efficiency rating", category: "individual" },
      { id: "revenueGenerated", name: "Revenue Generated (R)", description: "Revenue directly attributed to employee", category: "individual" },
      { id: "goalAchievementRate", name: "Goal Achievement (%)", description: "Percentage of goals achieved", category: "individual" }
    ]
  },
  {
    name: "SLA Metrics",
    metrics: [
      { id: "slaCompliance", name: "SLA Compliance (%)", description: "Percentage of interactions meeting SLA targets", category: "sla" },
      { id: "responseTime", name: "Average Response Time (hrs)", description: "Average time to first response", category: "sla" },
      { id: "resolutionTime", name: "Average Resolution Time (hrs)", description: "Average time to completely resolve an issue", category: "sla" },
      { id: "slaBreaches", name: "SLA Breaches", description: "Number of SLA violations", category: "sla" },
      { id: "openCases", name: "Open Cases", description: "Number of unresolved cases currently assigned", category: "sla" },
      { id: "avgCaseAge", name: "Average Case Age (days)", description: "Average age of open cases", category: "sla" }
    ]
  },
  {
    name: "Customer Satisfaction Metrics",
    metrics: [
      { id: "customerSatisfaction", name: "Customer Satisfaction (1-5)", description: "Average CSAT score from customer feedback", category: "sla" },
      { id: "customerEffortScore", name: "Customer Effort Score (1-5)", description: "Effort required by customers to get issues resolved", category: "sla" }
    ]
  },
  {
    name: "Time-Related Metrics",
    metrics: [
      { id: "attendanceRate", name: "Attendance Rate (%)", description: "Percentage of scheduled hours attended", category: "time" },
      { id: "absenteeismRate", name: "Absenteeism Rate (%)", description: "Percentage of scheduled hours missed", category: "time" },
      { id: "idleTime", name: "Idle Time (%)", description: "Percentage of time logged but inactive", category: "time" }
    ]
  },
  {
    name: "Engagement Metrics",
    metrics: [
      { id: "employeeSatisfaction", name: "Employee Satisfaction (1-5)", description: "Score from employee satisfaction surveys", category: "engagement" },
      { id: "employeeNps", name: "Employee NPS (0-10)", description: "Employee Net Promoter Score", category: "engagement" },
      { id: "trainingParticipation", name: "Training Participation (%)", description: "Participation in training programs", category: "engagement" }
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
    "interactionsHandled",
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

  // Function to get icon for each metric category
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "Individual Performance Metrics":
        return <UserCheck className="mr-2 h-4 w-4" />;
      case "SLA Metrics":
        return <Shield className="mr-2 h-4 w-4" />;
      case "Customer Satisfaction Metrics":
        return <Award className="mr-2 h-4 w-4" />;
      case "Time-Related Metrics":
        return <Clock className="mr-2 h-4 w-4" />;
      case "Engagement Metrics":
        return <Activity className="mr-2 h-4 w-4" />;
      default:
        return <BarChart3 className="mr-2 h-4 w-4" />;
    }
  };

  const renderMetricCell = (employee: any, metricId: string) => {
    // Handle special formatting for different metric types
    const value = employee[metricId];
    
    if (metricId === 'customerSatisfaction' || metricId === 'employeeSatisfaction') {
      return <TableCell className="text-right">{value}/5</TableCell>;
    }
    if (metricId === 'employeeNps') {
      return <TableCell className="text-right">{value}/10</TableCell>;
    }
    if (metricId === 'avgHandleTime' || metricId === 'idleTime') {
      return <TableCell className="text-right">{value} min</TableCell>;
    }
    if (metricId === 'responseTime' || metricId === 'resolutionTime') {
      return <TableCell className="text-right">{value} hrs</TableCell>;
    }
    if (metricId === 'avgCaseAge') {
      return <TableCell className="text-right">{value} days</TableCell>;
    }
    if (metricId === 'revenueGenerated') {
      return <TableCell className="text-right">R {value.toLocaleString()}</TableCell>;
    }
    if (metricId.includes('Rate') || metricId === 'slaCompliance' || metricId === 'qualityScore' || 
        metricId === 'efficiencyScore' || metricId === 'trainingParticipation') {
      return <TableCell className="text-right">{value}%</TableCell>;
    }
    
    // Default case for metrics without special formatting
    return <TableCell className="text-right">{value}</TableCell>;
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
                        <h3 className="font-medium text-sm flex items-center">
                          {getCategoryIcon(group.name)}
                          {group.name}
                        </h3>
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
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Location</TableHead>
                      {/* Dynamic column headers based on selected metrics */}
                      {selectedMetrics.includes("interactionsHandled") && (
                        <TableHead className="text-right">Interactions</TableHead>
                      )}
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
                      {selectedMetrics.includes("efficiencyScore") && (
                        <TableHead className="text-right">Efficiency</TableHead>
                      )}
                      {selectedMetrics.includes("revenueGenerated") && (
                        <TableHead className="text-right">Revenue</TableHead>
                      )}
                      {selectedMetrics.includes("goalAchievementRate") && (
                        <TableHead className="text-right">Goal Achievement</TableHead>
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
                      {selectedMetrics.includes("slaBreaches") && (
                        <TableHead className="text-right">SLA Breaches</TableHead>
                      )}
                      {selectedMetrics.includes("openCases") && (
                        <TableHead className="text-right">Open Cases</TableHead>
                      )}
                      {selectedMetrics.includes("avgCaseAge") && (
                        <TableHead className="text-right">Avg Case Age</TableHead>
                      )}
                      {selectedMetrics.includes("customerSatisfaction") && (
                        <TableHead className="text-right">CSAT</TableHead>
                      )}
                      {selectedMetrics.includes("customerEffortScore") && (
                        <TableHead className="text-right">CES</TableHead>
                      )}
                      {selectedMetrics.includes("attendanceRate") && (
                        <TableHead className="text-right">Attendance</TableHead>
                      )}
                      {selectedMetrics.includes("absenteeismRate") && (
                        <TableHead className="text-right">Absenteeism</TableHead>
                      )}
                      {selectedMetrics.includes("idleTime") && (
                        <TableHead className="text-right">Idle Time</TableHead>
                      )}
                      {selectedMetrics.includes("employeeSatisfaction") && (
                        <TableHead className="text-right">eSAT</TableHead>
                      )}
                      {selectedMetrics.includes("employeeNps") && (
                        <TableHead className="text-right">eNPS</TableHead>
                      )}
                      {selectedMetrics.includes("trainingParticipation") && (
                        <TableHead className="text-right">Training Part.</TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3 + selectedMetrics.length} className="h-24 text-center">
                          No results found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredData.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell className="font-medium">{employee.name}</TableCell>
                          <TableCell>{employee.department}</TableCell>
                          <TableCell>{employee.location}</TableCell>
                          
                          {/* Dynamic cells based on selected metrics */}
                          {selectedMetrics.includes("interactionsHandled") && renderMetricCell(employee, "interactionsHandled")}
                          {selectedMetrics.includes("evaluationsCompleted") && renderMetricCell(employee, "evaluationsCompleted")}
                          {selectedMetrics.includes("avgHandleTime") && renderMetricCell(employee, "avgHandleTime")}
                          {selectedMetrics.includes("resolutionRate") && renderMetricCell(employee, "resolutionRate")}
                          {selectedMetrics.includes("taskCompletionRate") && renderMetricCell(employee, "taskCompletionRate")}
                          {selectedMetrics.includes("qualityScore") && renderMetricCell(employee, "qualityScore")}
                          {selectedMetrics.includes("efficiencyScore") && renderMetricCell(employee, "efficiencyScore")}
                          {selectedMetrics.includes("revenueGenerated") && renderMetricCell(employee, "revenueGenerated")}
                          {selectedMetrics.includes("goalAchievementRate") && renderMetricCell(employee, "goalAchievementRate")}
                          {selectedMetrics.includes("slaCompliance") && renderMetricCell(employee, "slaCompliance")}
                          {selectedMetrics.includes("responseTime") && renderMetricCell(employee, "responseTime")}
                          {selectedMetrics.includes("resolutionTime") && renderMetricCell(employee, "resolutionTime")}
                          {selectedMetrics.includes("slaBreaches") && renderMetricCell(employee, "slaBreaches")}
                          {selectedMetrics.includes("openCases") && renderMetricCell(employee, "openCases")}
                          {selectedMetrics.includes("avgCaseAge") && renderMetricCell(employee, "avgCaseAge")}
                          {selectedMetrics.includes("customerSatisfaction") && renderMetricCell(employee, "customerSatisfaction")}
                          {selectedMetrics.includes("customerEffortScore") && renderMetricCell(employee, "customerEffortScore")}
                          {selectedMetrics.includes("attendanceRate") && renderMetricCell(employee, "attendanceRate")}
                          {selectedMetrics.includes("absenteeismRate") && renderMetricCell(employee, "absenteeismRate")}
                          {selectedMetrics.includes("idleTime") && renderMetricCell(employee, "idleTime")}
                          {selectedMetrics.includes("employeeSatisfaction") && renderMetricCell(employee, "employeeSatisfaction")}
                          {selectedMetrics.includes("employeeNps") && renderMetricCell(employee, "employeeNps")}
                          {selectedMetrics.includes("trainingParticipation") && renderMetricCell(employee, "trainingParticipation")}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="team">
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-right">Employees</TableHead>
                      {/* Dynamic column headers based on selected metrics - team summary view */}
                      {selectedMetrics.includes("interactionsHandled") && (
                        <TableHead className="text-right">Total Interactions</TableHead>
                      )}
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
                      {selectedMetrics.includes("revenueGenerated") && (
                        <TableHead className="text-right">Total Revenue</TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Team aggregated data - showing departments */}
                    {departments.map((dept) => {
                      const deptEmployees = filteredData.filter(e => e.department === dept);
                      if (deptEmployees.length === 0) return null;
                      
                      const totalInteractions = deptEmployees.reduce((sum, e) => sum + e.interactionsHandled, 0);
                      const totalEvaluations = deptEmployees.reduce((sum, e) => sum + e.evaluationsCompleted, 0);
                      const totalRevenue = deptEmployees.reduce((sum, e) => sum + e.revenueGenerated, 0);
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
                          {selectedMetrics.includes("interactionsHandled") && (
                            <TableCell className="text-right">{totalInteractions}</TableCell>
                          )}
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
                          {selectedMetrics.includes("revenueGenerated") && (
                            <TableCell className="text-right">R {totalRevenue.toLocaleString()}</TableCell>
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

      <Card>
        <CardHeader>
          <CardTitle>Communication Tools</CardTitle>
          <CardDescription>
            Tools to engage with clients and customers
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <div className="flex items-center mb-4">
              <Mail className="h-5 w-5 mr-2" />
              <h3 className="text-lg font-medium">Email Communication</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Send personalized emails to clients to share reports and follow up on evaluations.
            </p>
            <Button variant="outline" className="w-full" disabled>
              Access Email Center
              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Coming Soon</span>
            </Button>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex items-center mb-4">
              <MessageSquare className="h-5 w-5 mr-2" />
              <h3 className="text-lg font-medium">Live Chat Support</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Provide real-time assistance to clients through our integrated chat system.
            </p>
            <Button variant="outline" className="w-full" disabled>
              Open Chat Console
              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Coming Soon</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserActivityReport;
