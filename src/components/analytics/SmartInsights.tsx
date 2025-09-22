import React, { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Brain,
  Target,
  Calendar,
  Users
} from "lucide-react";
import { useTask } from "@/contexts/TaskContext";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";

interface Insight {
  id: string;
  type: "trend" | "alert" | "recommendation" | "achievement";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  actionable: boolean;
  metric?: number;
  change?: number;
}

export const SmartInsights: React.FC = () => {
  const { tasks, userTasks } = useTask();
  const { currentUser, users } = useAuth();

  const insights = useMemo((): Insight[] => {
    const generatedInsights: Insight[] = [];
    
    // Task completion rate analysis
    const completedTasks = userTasks.filter(task => task.status === "completed");
    const completionRate = userTasks.length > 0 ? (completedTasks.length / userTasks.length) * 100 : 0;
    
    if (completionRate < 60) {
      generatedInsights.push({
        id: "low-completion",
        type: "alert",
        title: "Low Task Completion Rate",
        description: `Your task completion rate is ${completionRate.toFixed(1)}%. Consider reviewing your workload or priorities.`,
        priority: "high",
        actionable: true,
        metric: completionRate,
        change: -15
      });
    } else if (completionRate > 85) {
      generatedInsights.push({
        id: "high-completion",
        type: "achievement",
        title: "Excellent Task Performance",
        description: `Outstanding! You've achieved a ${completionRate.toFixed(1)}% completion rate.`,
        priority: "low",
        actionable: false,
        metric: completionRate,
        change: 12
      });
    }

    // Overdue tasks analysis
    const overdueTasks = userTasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      return task.status !== "completed" && dueDate < new Date();
    });

    if (overdueTasks.length > 0) {
      generatedInsights.push({
        id: "overdue-tasks",
        type: "alert",
        title: `${overdueTasks.length} Overdue Tasks`,
        description: "Focus on completing overdue tasks to improve your performance metrics.",
        priority: "high",
        actionable: true,
        metric: overdueTasks.length
      });
    }

    // Productivity trends
    const thisWeekTasks = userTasks.filter(task => {
      const taskDate = new Date(task.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return taskDate >= weekAgo;
    });

    const lastWeekTasks = userTasks.filter(task => {
      const taskDate = new Date(task.createdAt);
      const twoWeeksAgo = new Date();
      const oneWeekAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return taskDate >= twoWeeksAgo && taskDate < oneWeekAgo;
    });

    const productivityChange = thisWeekTasks.length - lastWeekTasks.length;
    
    if (productivityChange > 2) {
      generatedInsights.push({
        id: "productivity-up",
        type: "trend",
        title: "Productivity Trending Up",
        description: `You've taken on ${productivityChange} more tasks this week compared to last week.`,
        priority: "medium",
        actionable: false,
        change: productivityChange
      });
    } else if (productivityChange < -2) {
      generatedInsights.push({
        id: "productivity-down",
        type: "recommendation",
        title: "Consider Increasing Activity",
        description: `Your task activity has decreased by ${Math.abs(productivityChange)} tasks this week.`,
        priority: "medium",
        actionable: true,
        change: productivityChange
      });
    }

    // Priority distribution analysis
    const highPriorityTasks = userTasks.filter(task => task.priority === "high" || task.priority === "urgent");
    const lowPriorityTasks = userTasks.filter(task => task.priority === "low");
    
    if (highPriorityTasks.length > lowPriorityTasks.length * 2) {
      generatedInsights.push({
        id: "priority-imbalance",
        type: "recommendation",
        title: "High Priority Task Overload",
        description: "Consider delegating some high-priority tasks or breaking them into smaller chunks.",
        priority: "medium",
        actionable: true,
        metric: (highPriorityTasks.length / userTasks.length) * 100
      });
    }

    // Team comparison (if user can view team data)
    if (currentUser?.role !== "viewer" && users.length > 1) {
      const teamAverage = tasks.length / users.length;
      const userTaskCount = userTasks.length;
      
      if (userTaskCount > teamAverage * 1.5) {
        generatedInsights.push({
          id: "above-average",
          type: "achievement",
          title: "Above Team Average",
          description: `You're handling ${(userTaskCount - teamAverage).toFixed(0)} more tasks than the team average.`,
          priority: "low",
          actionable: false,
          metric: userTaskCount,
          change: userTaskCount - teamAverage
        });
      }
    }

    return generatedInsights;
  }, [userTasks, tasks, currentUser, users]);

  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case "trend":
        return <TrendingUp className="h-4 w-4" />;
      case "alert":
        return <AlertTriangle className="h-4 w-4" />;
      case "recommendation":
        return <Brain className="h-4 w-4" />;
      case "achievement":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const getInsightColor = (type: Insight['type'], priority: Insight['priority']) => {
    if (type === "alert" && priority === "high") return "text-red-500 bg-red-50";
    if (type === "achievement") return "text-green-500 bg-green-50";
    if (type === "trend") return "text-blue-500 bg-blue-50";
    if (type === "recommendation") return "text-purple-500 bg-purple-50";
    return "text-gray-500 bg-gray-50";
  };

  const getBadgeVariant = (priority: Insight['priority']) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  if (insights.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Smart Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8 text-muted-foreground">
            <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-lg font-medium mb-2">All systems optimal</p>
            <p className="text-sm">No insights or recommendations at this time.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Smart Insights
          </div>
          <Badge variant="secondary" className="text-xs">
            {insights.length} insight{insights.length !== 1 ? 's' : ''}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div 
              key={insight.id} 
              className="p-4 border rounded-lg hover:bg-accent/50 transition-colors animate-fade-in"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${getInsightColor(insight.type, insight.priority)}`}>
                  {getInsightIcon(insight.type)}
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{insight.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant={getBadgeVariant(insight.priority)}>
                        {insight.priority}
                      </Badge>
                      {insight.change && (
                        <div className={`flex items-center gap-1 text-sm ${
                          insight.change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {insight.change > 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {Math.abs(insight.change).toFixed(0)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {insight.description}
                  </p>
                  
                  {insight.metric && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current Level</span>
                        <span className="font-medium">{insight.metric.toFixed(1)}%</span>
                      </div>
                      <Progress 
                        value={Math.min(insight.metric, 100)} 
                        className="h-2"
                      />
                    </div>
                  )}
                  
                  {insight.actionable && (
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        Take Action
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};