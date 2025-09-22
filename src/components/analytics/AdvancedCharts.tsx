import React, { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
  Treemap,
  FunnelChart,
  Funnel,
  LabelList
} from "recharts";
import { useTask } from "@/contexts/TaskContext";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

export const AdvancedCharts: React.FC = () => {
  const { tasks, userTasks } = useTask();
  const { currentUser, users } = useAuth();

  // Performance radar data
  const performanceData = useMemo(() => {
    const completedTasks = userTasks.filter(task => task.status === "completed");
    const onTimeTasks = completedTasks.filter(task => {
      if (!task.completedAt) return false;
      const dueDate = new Date(task.dueDate);
      const completedDate = new Date(task.completedAt);
      return completedDate <= dueDate;
    });

    const highPriorityCompleted = completedTasks.filter(task => 
      task.priority === "high" || task.priority === "urgent"
    );

    return [
      { metric: "Completion Rate", value: userTasks.length > 0 ? (completedTasks.length / userTasks.length) * 100 : 0 },
      { metric: "On-Time Delivery", value: completedTasks.length > 0 ? (onTimeTasks.length / completedTasks.length) * 100 : 0 },
      { metric: "Priority Focus", value: userTasks.length > 0 ? (highPriorityCompleted.length / userTasks.length) * 100 : 0 },
      { metric: "Task Volume", value: Math.min((userTasks.length / 20) * 100, 100) },
      { metric: "Efficiency", value: Math.random() * 40 + 60 }, // Mock efficiency score
      { metric: "Quality", value: Math.random() * 20 + 75 } // Mock quality score
    ];
  }, [userTasks]);

  // Productivity timeline data
  const timelineData = useMemo(() => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date;
    });

    return last30Days.map(date => {
      const dayTasks = userTasks.filter(task => {
        const taskDate = new Date(task.createdAt);
        return taskDate.toDateString() === date.toDateString();
      });

      const completed = dayTasks.filter(task => task.status === "completed").length;
      const created = dayTasks.length;

      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        completed,
        created,
        efficiency: created > 0 ? (completed / created) * 100 : 0
      };
    });
  }, [userTasks]);

  // Task complexity vs completion scatter data
  const scatterData = useMemo(() => {
    return userTasks.map(task => {
      const complexity = task.priority === "urgent" ? 4 : 
                       task.priority === "high" ? 3 :
                       task.priority === "medium" ? 2 : 1;
      
      const daysSinceCreated = Math.floor(
        (new Date().getTime() - new Date(task.createdAt).getTime()) / (1000 * 3600 * 24)
      );

      return {
        complexity,
        daysToComplete: task.completedAt ? 
          Math.floor((new Date(task.completedAt).getTime() - new Date(task.createdAt).getTime()) / (1000 * 3600 * 24)) :
          daysSinceCreated,
        status: task.status,
        completed: task.status === "completed" ? 1 : 0
      };
    });
  }, [userTasks]);

  // Department performance treemap
  const treemapData = useMemo(() => {
    const deptData = users.reduce((acc, user) => {
      if (!user.department) return acc;
      
      const userTaskCount = tasks.filter(task => task.assignedTo === user.id).length;
      const completedCount = tasks.filter(task => 
        task.assignedTo === user.id && task.status === "completed"
      ).length;

      if (!acc[user.department]) {
        acc[user.department] = {
          name: user.department,
          size: 0,
          completed: 0,
          users: 0
        };
      }

      acc[user.department].size += userTaskCount;
      acc[user.department].completed += completedCount;
      acc[user.department].users += 1;

      return acc;
    }, {} as Record<string, any>);

    return Object.values(deptData).map((dept: any) => ({
      ...dept,
      efficiency: dept.size > 0 ? (dept.completed / dept.size) * 100 : 0
    }));
  }, [users, tasks]);

  // Conversion funnel data
  const funnelData = [
    { name: 'Tasks Created', value: userTasks.length, fill: 'hsl(var(--primary))' },
    { 
      name: 'Tasks Started', 
      value: userTasks.filter(task => task.status !== 'pending').length,
      fill: 'hsl(var(--secondary))' 
    },
    { 
      name: 'Tasks In Progress', 
      value: userTasks.filter(task => task.status === 'in-progress').length,
      fill: 'hsl(var(--accent))' 
    },
    { 
      name: 'Tasks Completed', 
      value: userTasks.filter(task => task.status === 'completed').length,
      fill: 'hsl(var(--muted))' 
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Performance Radar
                  <Badge variant="outline">360° View</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={performanceData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} />
                    <Radar
                      name="Performance"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Task Completion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <FunnelChart>
                    <Tooltip />
                    <Funnel
                      dataKey="value"
                      data={funnelData}
                      isAnimationActive
                    >
                      <LabelList position="center" fill="white" stroke="none" />
                    </Funnel>
                  </FunnelChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>30-Day Productivity Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={timelineData}>
                  <defs>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorCompleted)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="created" 
                    stroke="hsl(var(--secondary))" 
                    fillOpacity={1} 
                    fill="url(#colorCreated)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Task Complexity vs Completion Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={scatterData}>
                  <CartesianGrid />
                  <XAxis 
                    type="number" 
                    dataKey="complexity" 
                    domain={[0, 5]}
                    tickFormatter={(value) => 
                      value === 1 ? 'Low' :
                      value === 2 ? 'Med' :
                      value === 3 ? 'High' :
                      value === 4 ? 'Urgent' : ''
                    }
                  />
                  <YAxis type="number" dataKey="daysToComplete" />
                  <ZAxis type="number" dataKey="completed" range={[50, 400]} />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    formatter={(value, name) => [
                      name === 'daysToComplete' ? `${value} days` : value,
                      name
                    ]}
                  />
                  <Scatter 
                    name="Tasks" 
                    data={scatterData.filter(d => d.status === 'completed')} 
                    fill="hsl(var(--primary))"
                    opacity={0.6}
                  />
                  <Scatter 
                    name="Pending" 
                    data={scatterData.filter(d => d.status !== 'completed')} 
                    fill="hsl(var(--muted))"
                    opacity={0.4}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overview" className="space-y-4">
          {currentUser?.role !== "viewer" && treemapData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Department Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <Treemap
                    data={treemapData}
                    dataKey="size"
                    aspectRatio={4/3}
                    stroke="white"
                  >
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload[0]) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-background border rounded p-2 shadow">
                              <p className="font-medium">{data.name}</p>
                              <p className="text-sm">Tasks: {data.size}</p>
                              <p className="text-sm">Completed: {data.completed}</p>
                              <p className="text-sm">Efficiency: {data.efficiency?.toFixed(1)}%</p>
                              <p className="text-sm">Team Size: {data.users}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </Treemap>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};