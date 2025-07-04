
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useTask } from "@/contexts/TaskContext";
import { useCommunication } from "@/contexts/CommunicationContext";
import { 
  ClipboardCheck, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  MessageSquare, 
  Video, 
  Wrench,
  BarChart3,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import OpsTaskManager from "@/components/operations/OpsTaskManager";
import ProjectTracker from "@/components/operations/ProjectTracker";
import RequestsManager from "@/components/operations/RequestsManager";
import IncidentLog from "@/components/operations/IncidentLog";
import OpsAnalytics from "@/components/operations/OpsAnalytics";
import AttendanceShifts from "@/components/operations/AttendanceShifts";

const OperationsDashboard = () => {
  const { currentUser } = useAuth();
  const { tasks, departmentTasks } = useTask();
  const { teamsCalls, whatsappMessages } = useCommunication();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Calculate KPIs
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "completed").length;
  const overdueTasks = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== "completed").length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const todaysCalls = teamsCalls.filter(call => 
    new Date(call.createdAt).toDateString() === new Date().toDateString()
  ).length;

  const todaysMessages = whatsappMessages.filter(msg => 
    new Date(msg.createdAt).toDateString() === new Date().toDateString()
  ).length;

  const kpiData = [
    {
      title: "Task Completion Rate",
      value: `${completionRate}%`,
      progress: completionRate,
      trend: "up",
      target: 85
    },
    {
      title: "SLA Compliance",
      value: "92%", 
      progress: 92,
      trend: "stable",
      target: 95
    },
    {
      title: "Active Projects",
      value: "8",
      progress: 67,
      trend: "up",
      target: 12
    },
    {
      title: "Open Maintenance Jobs",
      value: "12",
      progress: 75,
      trend: "down", 
      target: 16
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down": return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default: return <TrendingUp className="h-4 w-4 text-orange-500 rotate-90" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Operations Management System</h1>
          <p className="text-muted-foreground">Central command for operational visibility and coordination</p>
        </div>
        <Badge variant="outline" className="bg-background">
          {currentUser?.role === "superuser" ? "System Administrator" : "Operations Dashboard"}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="dashboard">Command</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="shifts">Shifts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Operations Command Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="flex items-center pt-6">
                <div className="bg-blue-200 p-3 rounded-lg">
                  <ClipboardCheck className="h-8 w-8 text-blue-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Active Tasks</p>
                  <h3 className="text-2xl font-bold">{totalTasks}</h3>
                  <p className="text-xs text-muted-foreground">{overdueTasks} overdue</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="flex items-center pt-6">
                <div className="bg-green-200 p-3 rounded-lg">
                  <Users className="h-8 w-8 text-green-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Teams Calls</p>
                  <h3 className="text-2xl font-bold">{todaysCalls}</h3>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="flex items-center pt-6">
                <div className="bg-purple-200 p-3 rounded-lg">
                  <MessageSquare className="h-8 w-8 text-purple-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">WhatsApp</p>
                  <h3 className="text-2xl font-bold">{todaysMessages}</h3>
                  <p className="text-xs text-muted-foreground">Messages sent</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
              <CardContent className="flex items-center pt-6">
                <div className="bg-amber-200 p-3 rounded-lg">
                  {overdueTasks > 0 ? (
                    <AlertTriangle className="h-8 w-8 text-amber-700" />
                  ) : (
                    <CheckCircle2 className="h-8 w-8 text-amber-700" />
                  )}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Alerts</p>
                  <h3 className="text-2xl font-bold">{overdueTasks}</h3>
                  <p className="text-xs text-muted-foreground">Items need attention</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live KPIs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Operations KPIs
              </CardTitle>
              <CardDescription>Real-time operational performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {kpiData.map((kpi, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getTrendIcon(kpi.trend)}
                        <span className="font-medium">{kpi.title}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold">{kpi.value}</span>
                        <span className="text-sm text-muted-foreground ml-2">/ {kpi.target}% target</span>
                      </div>
                    </div>
                    <Progress value={kpi.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Today's Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Tasks Completed</span>
                    <Badge variant="secondary">{completedTasks}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Teams Meetings</span>
                    <Badge variant="secondary">{todaysCalls}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">WhatsApp Messages</span>
                    <Badge variant="secondary">{todaysMessages}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Department Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">HR Operations</span>
                    <Badge className="bg-green-100 text-green-800">On Track</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Maintenance</span>
                    <Badge className="bg-orange-100 text-orange-800">Attention</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Finance Ops</span>
                    <Badge className="bg-green-100 text-green-800">On Track</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Teams Integration</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">WhatsApp API</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Data Sync</span>
                    <Badge className="bg-green-100 text-green-800">Current</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks">
          <OpsTaskManager />
        </TabsContent>

        <TabsContent value="projects">
          <ProjectTracker />
        </TabsContent>

        <TabsContent value="requests">
          <RequestsManager />
        </TabsContent>

        <TabsContent value="incidents">
          <IncidentLog />
        </TabsContent>

        <TabsContent value="shifts">
          <AttendanceShifts />
        </TabsContent>

        <TabsContent value="analytics">
          <OpsAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OperationsDashboard;
