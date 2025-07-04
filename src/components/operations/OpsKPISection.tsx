
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { useTask } from '@/contexts/TaskContext';

const OpsKPISection = () => {
  const { tasks } = useTask();
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "completed").length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

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
  );
};

export default OpsKPISection;
