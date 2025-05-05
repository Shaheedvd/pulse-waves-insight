
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TaskList from "@/components/dashboard/TaskList";
import { TaskMetrics } from "@/components/dashboard/TaskMetrics";
import { useTask } from "@/contexts/TaskContext";
import { Department } from "@/contexts/AuthContext";

interface DepartmentDashboardProps {
  department: Department;
  title: string;
  description: string;
}

export function DepartmentDashboard({ department, title, description }: DepartmentDashboardProps) {
  const { filterTasks } = useTask();
  const departmentTasks = filterTasks({ department: [department] });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      </div>
      
      <p className="text-muted-foreground">{description}</p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              5 pending, 7 completed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              3 managers, 5 staff
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              2 active, 2 completed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              +2% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>
              Recent and upcoming tasks for this department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TaskList tasks={departmentTasks.filter(task => task.department === department)} />
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Metrics</CardTitle>
            <CardDescription>
              Performance metrics for this department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TaskMetrics tasks={departmentTasks} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
