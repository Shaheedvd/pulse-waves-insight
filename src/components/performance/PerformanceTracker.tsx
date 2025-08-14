import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { 
  TrendingUp, TrendingDown, Target, Users, User, 
  Award, Download, Calendar, Clock
} from "lucide-react";
import { useTask, TaskItem } from "@/contexts/TaskContext";
import { useAuth } from "@/contexts/AuthContext";
import { generatePerformancePdf } from "@/lib/pdf-utils";
import { differenceInDays, format, startOfMonth, endOfMonth } from "date-fns";

interface PerformanceMetrics {
  employeeId: string;
  employeeName: string;
  department: string;
  completedTasks: number;
  overdueTasks: number;
  averageCompletionTime: number;
  onTimeCompletionRate: number;
  taskQualityScore: number;
  kpiScore: number;
}

interface TeamMetrics {
  department: string;
  totalTasks: number;
  completedTasks: number;
  averageCompletionRate: number;
  teamProductivity: number;
}

export const PerformanceTracker: React.FC = () => {
  const { tasks } = useTask();
  const { currentUser, users } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("current_month");

  // Calculate individual performance metrics
  const individualMetrics = useMemo((): PerformanceMetrics[] => {
    return users.map(user => {
      const userTasks = tasks.filter(task => task.assignedTo === user.id);
      const completedTasks = userTasks.filter(task => task.status === "completed");
      const overdueTasks = userTasks.filter(task => {
        const dueDate = new Date(task.dueDate);
        return task.status !== "completed" && dueDate < new Date();
      });

      // Calculate average completion time
      const completionTimes = completedTasks
        .filter(task => task.completedAt)
        .map(task => {
          const created = new Date(task.createdAt);
          const completed = new Date(task.completedAt!);
          return differenceInDays(completed, created);
        });

      const averageCompletionTime = completionTimes.length > 0 
        ? completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length 
        : 0;

      // Calculate on-time completion rate
      const onTimeCompleted = completedTasks.filter(task => {
        if (!task.completedAt) return false;
        const dueDate = new Date(task.dueDate);
        const completedDate = new Date(task.completedAt);
        return completedDate <= dueDate;
      });

      const onTimeCompletionRate = completedTasks.length > 0 
        ? (onTimeCompleted.length / completedTasks.length) * 100 
        : 0;

      // Calculate task quality score (based on priority and complexity)
      const qualityScore = completedTasks.reduce((score, task) => {
        const priorityMultiplier = {
          urgent: 4,
          high: 3,
          medium: 2,
          low: 1
        }[task.priority];
        return score + priorityMultiplier;
      }, 0) / Math.max(completedTasks.length, 1);

      // Calculate overall KPI score
      const kpiScore = (
        (onTimeCompletionRate * 0.4) +
        (Math.min(qualityScore * 20, 100) * 0.3) +
        (Math.max(100 - (overdueTasks.length * 10), 0) * 0.3)
      );

      return {
        employeeId: user.id,
        employeeName: user.name,
        department: user.department || "unassigned",
        completedTasks: completedTasks.length,
        overdueTasks: overdueTasks.length,
        averageCompletionTime,
        onTimeCompletionRate,
        taskQualityScore: qualityScore * 20,
        kpiScore: Math.round(kpiScore)
      };
    });
  }, [tasks, users]);

  // Calculate team metrics by department
  const teamMetrics = useMemo((): TeamMetrics[] => {
    const departments = Array.from(new Set(users.map(u => u.department).filter(Boolean)));
    
    return departments.map(dept => {
      const deptTasks = tasks.filter(task => 
        users.find(u => u.id === task.assignedTo)?.department === dept
      );
      const completedTasks = deptTasks.filter(task => task.status === "completed");
      
      return {
        department: dept!,
        totalTasks: deptTasks.length,
        completedTasks: completedTasks.length,
        averageCompletionRate: deptTasks.length > 0 
          ? (completedTasks.length / deptTasks.length) * 100 
          : 0,
        teamProductivity: Math.round(
          individualMetrics
            .filter(m => m.department === dept)
            .reduce((avg, m) => avg + m.kpiScore, 0) / 
          Math.max(individualMetrics.filter(m => m.department === dept).length, 1)
        )
      };
    });
  }, [tasks, users, individualMetrics]);

  // Get current user's metrics
  const currentUserMetrics = currentUser 
    ? individualMetrics.find(m => m.employeeId === currentUser.id)
    : null;

  // Filter data based on user permissions
  const getVisibleMetrics = () => {
    if (!currentUser) return [];
    
    // Entry level employees can only see their own stats
    if (currentUser.role === "viewer" || currentUser.role === "restricted_admin") {
      return currentUserMetrics ? [currentUserMetrics] : [];
    }
    
    // Team leaders can see their team stats
    if (currentUser.role === "lead_admin" || currentUser.role === "admin") {
      return individualMetrics.filter(m => m.department === currentUser.department);
    }
    
    // Managers and above can see their department
    if (currentUser.role === "manager") {
      return individualMetrics.filter(m => m.department === currentUser.department);
    }
    
    // Power managers and superusers can see all
    return individualMetrics;
  };

  const visibleMetrics = getVisibleMetrics();
  const canViewTeamStats = currentUser?.role !== "viewer" && currentUser?.role !== "restricted_admin";
  const canViewAllStats = currentUser?.role === "power_manager" || currentUser?.role === "superuser";

  const downloadPerformancePdf = () => {
    const data = {
      period: selectedPeriod,
      metrics: visibleMetrics,
      teamMetrics: canViewTeamStats ? teamMetrics : [],
      currentUser: currentUser?.name,
      generatedAt: new Date().toISOString()
    };
    generatePerformancePdf(data);
  };

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Performance Dashboard</h2>
          <p className="text-muted-foreground">
            Track task performance and KPIs
          </p>
        </div>
        <Button onClick={downloadPerformancePdf}>
          <Download className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
      </div>

      {/* Current User Overview */}
      {currentUserMetrics && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              My Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {currentUserMetrics.completedTasks}
                </div>
                <div className="text-sm text-muted-foreground">Completed Tasks</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {currentUserMetrics.overdueTasks}
                </div>
                <div className="text-sm text-muted-foreground">Overdue Tasks</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {currentUserMetrics.onTimeCompletionRate.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">On-Time Rate</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {currentUserMetrics.kpiScore}
                </div>
                <div className="text-sm text-muted-foreground">KPI Score</div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Performance</span>
                <span className="text-sm text-muted-foreground">
                  {currentUserMetrics.kpiScore}/100
                </span>
              </div>
              <Progress value={currentUserMetrics.kpiScore} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="individual" className="space-y-4">
        <TabsList>
          <TabsTrigger value="individual">Individual Stats</TabsTrigger>
          {canViewTeamStats && <TabsTrigger value="team">Team Stats</TabsTrigger>}
          {canViewAllStats && <TabsTrigger value="department">Department Stats</TabsTrigger>}
        </TabsList>

        <TabsContent value="individual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Individual Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {visibleMetrics.map((metric) => (
                  <div key={metric.employeeId} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{metric.employeeName}</h4>
                        <p className="text-sm text-muted-foreground capitalize">
                          {metric.department}
                        </p>
                      </div>
                      <Badge 
                        variant={metric.kpiScore >= 80 ? "default" : metric.kpiScore >= 60 ? "secondary" : "destructive"}
                      >
                        KPI: {metric.kpiScore}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Completed:</span>
                        <span className="ml-1 font-medium">{metric.completedTasks}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Overdue:</span>
                        <span className="ml-1 font-medium text-orange-600">{metric.overdueTasks}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">On-Time:</span>
                        <span className="ml-1 font-medium">{metric.onTimeCompletionRate.toFixed(1)}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Quality:</span>
                        <span className="ml-1 font-medium">{metric.taskQualityScore.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {canViewTeamStats && (
          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={teamMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="teamProductivity" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {canViewAllStats && (
          <TabsContent value="department" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Department Completion Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={teamMetrics}
                        dataKey="averageCompletionRate"
                        nameKey="department"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="hsl(var(--primary))"
                        label={({ department, averageCompletionRate }) => 
                          `${department}: ${averageCompletionRate.toFixed(1)}%`
                        }
                      >
                        {teamMetrics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Global Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {Math.round(teamMetrics.reduce((a, b) => a + b.averageCompletionRate, 0) / Math.max(teamMetrics.length, 1))}%
                        </div>
                        <div className="text-sm text-muted-foreground">Global Completion Rate</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {Math.round(individualMetrics.reduce((a, b) => a + b.kpiScore, 0) / Math.max(individualMetrics.length, 1))}
                        </div>
                        <div className="text-sm text-muted-foreground">Average KPI Score</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};