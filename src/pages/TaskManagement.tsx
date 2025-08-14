import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TaskActivityLog } from "@/components/performance/TaskActivityLog";
import { TaskNotifications } from "@/components/performance/TaskNotifications";
import { PerformanceTracker } from "@/components/performance/PerformanceTracker";
import TaskList from "@/components/dashboard/TaskList";
import { useTask } from "@/contexts/TaskContext";
import { useAuth } from "@/contexts/AuthContext";
import { ClipboardList, Bell, BarChart3, Target } from "lucide-react";

export default function TaskManagement() {
  const { userTasks, departmentTasks, tasks } = useTask();
  const { currentUser } = useAuth();

  // Get a sample task for activity log demo
  const sampleTask = userTasks.length > 0 ? userTasks[0] : (departmentTasks.length > 0 ? departmentTasks[0] : tasks[0]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
          <p className="text-muted-foreground">
            Manage tasks, track performance, and monitor productivity
          </p>
        </div>
      </div>

      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Activity Log
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>My Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskList tasks={userTasks} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Department Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskList tasks={departmentTasks} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <TaskNotifications />
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          {sampleTask ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TaskActivityLog task={sampleTask} />
              <Card>
                <CardHeader>
                  <CardTitle>Activity Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Recent Activities</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Task status updated to in-progress</li>
                        <li>• Comment added by team member</li>
                        <li>• Priority level adjusted</li>
                        <li>• Task assigned to new team member</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Productivity Insights</h4>
                      <p className="text-sm text-muted-foreground">
                        Activity logs help track progress and identify bottlenecks in task completion.
                        Use these insights to improve team productivity and communication.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No tasks available for activity logging.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <PerformanceTracker />
        </TabsContent>
      </Tabs>
    </div>
  );
}