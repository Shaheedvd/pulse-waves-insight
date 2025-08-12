
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building,
  Users,
  ClipboardCheck,
  BarChart,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Download,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { downloadAsPdf } from "@/lib/pdf-utils";

const OperationsDashboard = () => {
  const { currentUser } = useAuth();
  const isDepartmentHead = currentUser?.role === "power_manager" || currentUser?.role === "superuser";
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = React.useState<any | null>(null);
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = React.useState(false);
  
  // Mock data for the operations dashboard
  const operationalKPIs = [
    {
      name: "Service Level Agreement",
      target: "95%",
      current: 92,
      progress: 92,
      trend: "up",
      status: "normal"
    },
    {
      name: "On-time Delivery",
      target: "98%",
      current: 96,
      progress: 96,
      trend: "stable",
      status: "normal"
    },
    {
      name: "Quality Score",
      target: "90%",
      current: 87,
      progress: 87,
      trend: "down",
      status: "warning"
    },
    {
      name: "Customer Satisfaction",
      target: "4.5/5",
      current: 4.3,
      progress: 86,
      trend: "stable",
      status: "normal"
    }
  ];
  
  const pendingTasks = [
    {
      id: "1",
      name: "Weekly Quality Audit",
      assignedTo: "Eric Evaluator",
      dueDate: "2025-05-06",
      status: "in-progress",
      priority: "high",
      description: "Conduct weekly quality audit for ABC Corp's Cape Town branch",
      location: "Cape Town CBD",
      clientName: "ABC Corp",
      contactPerson: "John Smith",
      contactEmail: "john@abccorp.com",
      contactPhone: "+27 21 555 1234",
      notes: "Previous audit noted issues with inventory management"
    },
    {
      id: "2",
      name: "Client Onboarding - ABC Corp",
      assignedTo: "Admin User",
      dueDate: "2025-05-08",
      status: "pending",
      priority: "medium",
      description: "Complete all onboarding documentation for new client ABC Corp",
      location: "Remote",
      clientName: "ABC Corp",
      contactPerson: "Sarah Johnson",
      contactEmail: "sarah@abccorp.com",
      contactPhone: "+27 11 444 5678",
      notes: "Client requires ISO certification documentation"
    },
    {
      id: "3",
      name: "Service Delivery Review",
      assignedTo: "Sarah Manager",
      dueDate: "2025-05-12",
      status: "in-progress",
      priority: "medium",
      description: "Review service delivery metrics for Q1 and prepare report",
      location: "Head Office",
      clientName: "Multiple Clients",
      contactPerson: "N/A",
      contactEmail: "N/A",
      contactPhone: "N/A",
      notes: "Focus on areas showing performance decline"
    },
    {
      id: "4",
      name: "Team Performance Evaluation",
      assignedTo: "Oliver Operations",
      dueDate: "2025-05-15",
      status: "pending",
      priority: "low",
      description: "Conduct quarterly team performance evaluations",
      location: "Head Office",
      clientName: "Internal",
      contactPerson: "HR Department",
      contactEmail: "hr@company.com",
      contactPhone: "+27 11 222 3333",
      notes: "Schedule individual meetings with team members"
    }
  ];
  
  const recentAlerts = [
    {
      id: "1",
      message: "Quality score below target for 2 consecutive weeks",
      timestamp: "2025-05-02 09:15",
      severity: "warning"
    },
    {
      id: "2",
      message: "New client onboarding requires manager approval",
      timestamp: "2025-05-01 14:30",
      severity: "info"
    },
    {
      id: "3",
      message: "Field team capacity at 95% - consider resource allocation",
      timestamp: "2025-04-30 16:45",
      severity: "warning"
    }
  ];

  // Mock data for staff, clients, projects, and quality scores
  const staffData = [
    { id: "1", name: "John Smith", position: "Senior Evaluator", email: "john@company.com", phone: "+27 11 222 3333" },
    { id: "2", name: "Sarah Johnson", position: "Client Manager", email: "sarah@company.com", phone: "+27 11 222 4444" },
    { id: "3", name: "Michael Brown", position: "Field Auditor", email: "michael@company.com", phone: "+27 11 222 5555" },
    { id: "4", name: "Emily Davis", position: "Operations Manager", email: "emily@company.com", phone: "+27 11 222 6666" },
    { id: "5", name: "David Wilson", position: "Quality Assessor", email: "david@company.com", phone: "+27 11 222 7777" }
  ];

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down": return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default: return <TrendingUp className="h-4 w-4 text-orange-500 rotate-90" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case "high": return <Badge variant="destructive">High</Badge>;
      case "medium": return <Badge variant="default">Medium</Badge>;
      case "low": return <Badge variant="outline">Low</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "in-progress": return <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "pending": return <Badge className="bg-orange-100 text-orange-800">Pending</Badge>;
      case "completed": return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const getAlertIcon = (severity: string) => {
    switch(severity) {
      case "warning": return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "critical": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "success": return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default: return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const handleCardClick = (type: string) => {
    switch(type) {
      case "staff":
        navigate("/users");
        break;
      case "clients":
        navigate("/clients");
        break;
      case "projects":
        navigate("/projects");
        break;
      case "quality":
        navigate("/evaluations");
        break;
      default:
        break;
    }
  };

  const handleViewTask = (task: any) => {
    setSelectedTask(task);
    setIsTaskDetailsOpen(true);
  };

  const handleDownloadTask = (task: any) => {
    // Generate PDF with task details
    const content = `
      <h1>${task.name}</h1>
      <p><strong>Due Date:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>
      <p><strong>Assigned To:</strong> ${task.assignedTo}</p>
      <p><strong>Priority:</strong> ${task.priority}</p>
      <p><strong>Status:</strong> ${task.status}</p>
      <p><strong>Description:</strong> ${task.description}</p>
      <p><strong>Location:</strong> ${task.location}</p>
      <p><strong>Client:</strong> ${task.clientName}</p>
      <p><strong>Contact Person:</strong> ${task.contactPerson}</p>
      <p><strong>Contact Email:</strong> ${task.contactEmail}</p>
      <p><strong>Contact Phone:</strong> ${task.contactPhone}</p>
      <p><strong>Notes:</strong> ${task.notes}</p>
    `;
    
    downloadAsPdf(content, `task-${task.id}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Operations Dashboard</h1>
        <Badge variant="outline" className="bg-background">
          Department: Operations
        </Badge>
      </div>

      {isDepartmentHead && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card 
            className="bg-gradient-to-br from-blue-50 to-blue-100 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleCardClick("staff")}
          >
            <CardContent className="flex items-center pt-6">
              <div className="bg-blue-200 p-3 rounded-lg">
                <Users className="h-8 w-8 text-blue-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Staff</p>
                <h3 className="text-2xl font-bold">24</h3>
                <p className="text-xs text-muted-foreground">+2 since last month</p>
              </div>
            </CardContent>
          </Card>
          <Card 
            className="bg-gradient-to-br from-green-50 to-green-100 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleCardClick("clients")}
          >
            <CardContent className="flex items-center pt-6">
              <div className="bg-green-200 p-3 rounded-lg">
                <Building className="h-8 w-8 text-green-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
                <h3 className="text-2xl font-bold">18</h3>
                <p className="text-xs text-muted-foreground">+3 since last month</p>
              </div>
            </CardContent>
          </Card>
          <Card 
            className="bg-gradient-to-br from-purple-50 to-purple-100 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleCardClick("projects")}
          >
            <CardContent className="flex items-center pt-6">
              <div className="bg-purple-200 p-3 rounded-lg">
                <ClipboardCheck className="h-8 w-8 text-purple-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Projects</p>
                <h3 className="text-2xl font-bold">12</h3>
                <p className="text-xs text-muted-foreground">5 in progress</p>
              </div>
            </CardContent>
          </Card>
          <Card 
            className="bg-gradient-to-br from-amber-50 to-amber-100 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleCardClick("quality")}
          >
            <CardContent className="flex items-center pt-6">
              <div className="bg-amber-200 p-3 rounded-lg">
                <BarChart className="h-8 w-8 text-amber-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Avg. Quality Score</p>
                <h3 className="text-2xl font-bold">87%</h3>
                <p className="text-xs text-muted-foreground">-2% from target</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Key Performance Indicators</CardTitle>
            <CardDescription>
              Overview of operational KPIs and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {operationalKPIs.map((kpi, index) => (
                <div key={index} className="grid grid-cols-6 gap-4 items-center">
                  <div className="col-span-2">
                    <div className="flex items-center">
                      {getTrendIcon(kpi.trend)}
                      <span className="ml-2 font-medium">{kpi.name}</span>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <Progress value={kpi.progress} className="h-2" />
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">{kpi.current}%</span>
                    <span className="text-xs text-muted-foreground ml-1">/ {kpi.target}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>
              System alerts requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start">
                  {getAlertIcon(alert.severity)}
                  <div className="ml-3">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Tasks</CardTitle>
          <CardDescription>
            Upcoming and in-progress tasks for the operations team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.name}</TableCell>
                  <TableCell>{task.assignedTo}</TableCell>
                  <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewTask(task)}
                      >
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDownloadTask(task)}
                      >
                        <Download className="h-4 w-4 mr-1" /> Download
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Task Details Dialog */}
      <Dialog open={isTaskDetailsOpen} onOpenChange={setIsTaskDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedTask?.name}</DialogTitle>
            <DialogDescription>
              Task details and information
            </DialogDescription>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Priority</h4>
                  <div className="mt-1">{getPriorityBadge(selectedTask.priority)}</div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                  <div className="mt-1">{getStatusBadge(selectedTask.status)}</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                <p className="mt-1">{selectedTask.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Assigned To</h4>
                  <p className="mt-1">{selectedTask.assignedTo}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Due Date</h4>
                  <p className="mt-1">{new Date(selectedTask.dueDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Client</h4>
                  <p className="mt-1">{selectedTask.clientName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                  <p className="mt-1">{selectedTask.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Contact Person</h4>
                  <p className="mt-1">{selectedTask.contactPerson}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Contact Email</h4>
                  <p className="mt-1">{selectedTask.contactEmail}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Contact Phone</h4>
                <p className="mt-1">{selectedTask.contactPhone}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Notes</h4>
                <p className="mt-1">{selectedTask.notes}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTaskDetailsOpen(false)}>
              Close
            </Button>
            <Button onClick={() => handleDownloadTask(selectedTask)}>
              <Download className="h-4 w-4 mr-2" /> Download Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OperationsDashboard;
