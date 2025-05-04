
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TaskItem } from "@/contexts/TaskContext";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface TaskMetricsProps {
  tasks: TaskItem[];
}

export function TaskMetrics({ tasks }: TaskMetricsProps) {
  // Status distribution data
  const statusData = [
    { name: "Pending", value: tasks.filter(task => task.status === "pending").length },
    { name: "In Progress", value: tasks.filter(task => task.status === "in-progress").length },
    { name: "In Review", value: tasks.filter(task => task.status === "review").length },
    { name: "Completed", value: tasks.filter(task => task.status === "completed").length },
    { name: "Cancelled", value: tasks.filter(task => task.status === "cancelled").length },
  ].filter(item => item.value > 0);

  // Priority distribution data
  const priorityData = [
    { name: "Low", value: tasks.filter(task => task.priority === "low").length },
    { name: "Medium", value: tasks.filter(task => task.priority === "medium").length },
    { name: "High", value: tasks.filter(task => task.priority === "high").length },
    { name: "Urgent", value: tasks.filter(task => task.priority === "urgent").length },
  ].filter(item => item.value > 0);

  // Colors for the charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  const PRIORITY_COLORS = {
    Low: '#00C49F',
    Medium: '#0088FE',
    High: '#FFBB28',
    Urgent: '#FF8042'
  };

  // Calculate completion rate trend (dummy data for demonstration)
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentDay = new Date().getDay(); // 0 is Sunday
  
  const completionTrendData = daysOfWeek.map((day, index) => {
    // For past days, generate random but realistic completion percentage
    // For future days, leave as null or projected value
    let completionRate;
    
    // index+1 to change from 0-based to 1-based (Monday is 1, Sunday is 7)
    const dayIndex = index + 1;
    const dayOfWeek = dayIndex === 7 ? 0 : dayIndex; // Convert to JS day format
    
    if (dayOfWeek < currentDay || (dayOfWeek === 0 && currentDay !== 0)) {
      // Past day - generate a percentage between 60-100%
      completionRate = Math.floor(Math.random() * 40) + 60;
    } else if (dayOfWeek === currentDay) {
      // Today - use actual completion rate
      const totalTasksToday = tasks.length;
      const completedTasksToday = tasks.filter(task => task.status === "completed").length;
      completionRate = totalTasksToday > 0
        ? Math.floor((completedTasksToday / totalTasksToday) * 100)
        : 0;
    } else {
      // Future day - use null
      completionRate = null;
    }
    
    return {
      day,
      "Completion Rate": completionRate,
    };
  });

  if (tasks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Task Metrics</CardTitle>
          <CardDescription>No tasks available for metrics display</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <p className="text-muted-foreground">Add some tasks to see metrics</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Task Status Distribution</CardTitle>
          <CardDescription>
            Breakdown of tasks by current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Task Priority Distribution</CardTitle>
          <CardDescription>
            Breakdown of tasks by priority level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {priorityData.map((entry) => (
                    <Cell 
                      key={`cell-${entry.name}`} 
                      fill={PRIORITY_COLORS[entry.name as keyof typeof PRIORITY_COLORS]} 
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Weekly Task Completion Rate</CardTitle>
          <CardDescription>
            Percentage of tasks completed by day
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={completionTrendData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, "Completion Rate"]} />
                <Legend />
                <Bar 
                  dataKey="Completion Rate" 
                  fill="#8884d8" 
                  name="Completion Rate" 
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
