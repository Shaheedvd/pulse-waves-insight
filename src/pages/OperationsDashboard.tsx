
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

const OperationsDashboard = () => {
  const { currentUser } = useAuth();
  const isDepartmentHead = currentUser?.role === "power_manager" || currentUser?.role === "superuser";
  
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
      priority: "high"
    },
    {
      id: "2",
      name: "Client Onboarding - ABC Corp",
      assignedTo: "Admin User",
      dueDate: "2025-05-08",
      status: "pending",
      priority: "medium"
    },
    {
      id: "3",
      name: "Service Delivery Review",
      assignedTo: "Sarah Manager",
      dueDate: "2025-05-12",
      status: "in-progress",
      priority: "medium"
    },
    {
      id: "4",
      name: "Team Performance Evaluation",
      assignedTo: "Oliver Operations",
      dueDate: "2025-05-15",
      status: "pending",
      priority: "low"
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
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
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
          <Card className="bg-gradient-to-br from-green-50 to-green-100">
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
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
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
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationsDashboard;
