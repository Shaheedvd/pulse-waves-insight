
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, CheckCircle2, Clock, ListTodo, PieChart, User } from "lucide-react";
import { useAuth, Department } from "@/contexts/AuthContext";
import { useTask, TaskItem, TaskStatus, TaskPriority } from "@/contexts/TaskContext";
import { TaskList } from "@/components/dashboard/TaskList";
import { TaskMetrics } from "@/components/dashboard/TaskMetrics";

interface DepartmentDashboardProps {
  department: Department;
  title: string;
  description: string;
  metrics?: React.ReactNode;
  customContent?: React.ReactNode;
}

export function DepartmentDashboard({ 
  department, 
  title, 
  description,
  metrics,
  customContent 
}: DepartmentDashboardProps) {
  const { currentUser } = useAuth();
  const { tasks, departmentTasks, userTasks } = useTask();
  const [activeTab, setActiveTab] = useState<string>("overview");
  
  // Filter tasks for this specific department
  const departmentalTasks = tasks.filter(task => task.department === department);
  
  // Get counts for different statuses
  const pendingTasks = departmentalTasks.filter(task => task.status === "pending").length;
  const inProgressTasks = departmentalTasks.filter(task => task.status === "in-progress").length;
  const completedTasks = departmentalTasks.filter(task => task.status === "completed").length;
  const urgentTasks = departmentalTasks.filter(task => task.priority === "urgent").length;
  
  // Calculate completion rate
  const completionRate = departmentalTasks.length > 0
    ? Math.round((completedTasks / departmentalTasks.length) * 100)
    : 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex gap-2">
          {currentUser?.department === department && (
            <Badge variant="outline" className="ml-2">Your Department</Badge>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <PieChart className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="tasks">
            <ListTodo className="h-4 w-4 mr-2" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="metrics">
            <BarChart className="h-4 w-4 mr-2" />
            Metrics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingTasks}</div>
                <p className="text-xs text-muted-foreground">
                  {pendingTasks === 1 ? "Task" : "Tasks"} awaiting action
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inProgressTasks}</div>
                <p className="text-xs text-muted-foreground">
                  {inProgressTasks === 1 ? "Task" : "Tasks"} currently active
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completionRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {completedTasks} of {departmentalTasks.length} tasks completed
                </p>
              </CardContent>
            </Card>
            
            <Card className={urgentTasks > 0 ? "border-red-200 bg-red-50" : ""}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${urgentTasks > 0 ? "text-red-600" : ""}`}>
                  Urgent Tasks
                </CardTitle>
                <div className={`h-4 w-4 rounded-full ${urgentTasks > 0 ? "bg-red-500" : "bg-gray-200"}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${urgentTasks > 0 ? "text-red-600" : ""}`}>
                  {urgentTasks}
                </div>
                <p className="text-xs text-muted-foreground">
                  {urgentTasks > 0 
                    ? `${urgentTasks} urgent ${urgentTasks === 1 ? "task" : "tasks"} need attention` 
                    : "No urgent tasks"}
                </p>
              </CardContent>
            </Card>
          </div>
          
          {customContent && (
            <div className="mt-4">
              {customContent}
            </div>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Tasks</CardTitle>
              <CardDescription>
                Most recent tasks in the {department.replace("_", " ")} department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList 
                tasks={departmentalTasks.slice(0, 5)} 
                showAssignee 
                showDepartment={false}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Departmental Tasks</CardTitle>
              <CardDescription>
                Manage and track all tasks for the {department.replace("_", " ")} department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList 
                tasks={departmentalTasks} 
                showAssignee 
                showDepartment={false}
                showActions
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="metrics">
          {metrics ? (
            metrics
          ) : (
            <TaskMetrics tasks={departmentalTasks} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
