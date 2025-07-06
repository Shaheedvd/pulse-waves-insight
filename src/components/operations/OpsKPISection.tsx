
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { useTask } from '@/contexts/TaskContext';
import { useOperationsData } from '@/contexts/OperationsDataContext';

const OpsKPISection = () => {
  const { tasks } = useTask();
  const { opsTasks, projects, requests, incidents } = useOperationsData();
  
  const totalTasks = [...tasks, ...opsTasks].length;
  const completedTasks = [...tasks, ...opsTasks].filter(t => t.status === "completed").length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const activeProjects = projects.filter(p => p.status === 'active').length;
  const totalProjects = projects.length;
  const projectProgress = totalProjects > 0 ? Math.round((activeProjects / totalProjects) * 100) : 0;

  const openRequests = requests.filter(r => ['submitted', 'reviewing'].includes(r.status)).length;
  const totalRequests = requests.length;
  const requestProgress = totalRequests > 0 ? Math.round(((totalRequests - openRequests) / totalRequests) * 100) : 0;

  const openIncidents = incidents.filter(i => ['open', 'investigating'].includes(i.status)).length;
  const criticalIncidents = incidents.filter(i => i.severity === 'critical' && ['open', 'investigating'].includes(i.status)).length;

  const kpiData = [
    {
      title: "Task Completion Rate",
      value: `${completionRate}%`,
      progress: completionRate,
      trend: completionRate >= 85 ? "up" : "down",
      target: 85,
      actual: `${completedTasks}/${totalTasks}`
    },
    {
      title: "Active Projects",
      value: `${activeProjects}`,
      progress: projectProgress,
      trend: activeProjects > 0 ? "up" : "stable",
      target: totalProjects || 1,
      actual: `${activeProjects} active`
    },
    {
      title: "Request Processing",
      value: `${requestProgress}%`,
      progress: requestProgress,
      trend: openRequests < 5 ? "up" : "down",
      target: 90,
      actual: `${openRequests} pending`
    },
    {
      title: "Open Incidents",
      value: `${openIncidents}`,
      progress: openIncidents > 0 ? 25 : 100,
      trend: criticalIncidents > 0 ? "down" : openIncidents === 0 ? "up" : "stable",
      target: 0,
      actual: `${criticalIncidents} critical`
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
                  <div className="text-sm text-muted-foreground">{kpi.actual}</div>
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
