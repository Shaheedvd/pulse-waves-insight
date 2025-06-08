
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, TrendingUp, AlertTriangle, Lightbulb, BarChart3, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const AIInsights = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState("2025-06-08 15:30");

  const generateInsights = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setLastGenerated(new Date().toLocaleString());
    }, 3000);
  };

  const performanceData = [
    { month: 'Jan', revenue: 125000, efficiency: 87, satisfaction: 94 },
    { month: 'Feb', revenue: 142000, efficiency: 91, satisfaction: 96 },
    { month: 'Mar', revenue: 158000, efficiency: 89, satisfaction: 93 },
    { month: 'Apr', revenue: 175000, efficiency: 93, satisfaction: 97 },
    { month: 'May', revenue: 168000, efficiency: 88, satisfaction: 95 },
    { month: 'Jun', revenue: 189000, efficiency: 95, satisfaction: 98 }
  ];

  const departmentData = [
    { name: 'Sales', value: 35, color: '#0088FE' },
    { name: 'Marketing', value: 25, color: '#00C49F' },
    { name: 'Operations', value: 20, color: '#FFBB28' },
    { name: 'HR', value: 12, color: '#FF8042' },
    { name: 'IT', value: 8, color: '#8884d8' }
  ];

  const insights = [
    {
      id: 1,
      type: "performance",
      title: "Revenue Growth Acceleration",
      description: "Q2 revenue shows 24% increase over Q1. Sales team efficiency improved by 8%.",
      confidence: 94,
      impact: "high",
      recommendation: "Increase sales team capacity by 15% to capitalize on current momentum."
    },
    {
      id: 2,
      type: "risk",
      title: "HR Workload Alert",
      description: "HR department showing signs of overload with 23% increase in processing time.",
      confidence: 87,
      impact: "medium",
      recommendation: "Consider automation tools for routine HR processes or temporary staffing."
    },
    {
      id: 3,
      type: "opportunity",
      title: "Cross-Department Collaboration",
      description: "Marketing and Sales alignment could increase lead conversion by 18%.",
      confidence: 79,
      impact: "high",
      recommendation: "Implement weekly alignment meetings and shared KPI dashboards."
    }
  ];

  const predictions = [
    {
      metric: "Monthly Revenue",
      current: "$189,000",
      predicted: "$215,000",
      confidence: "92%",
      trend: "up"
    },
    {
      metric: "Employee Satisfaction",
      current: "98%",
      predicted: "96%",
      confidence: "78%",
      trend: "down"
    },
    {
      metric: "Project Completion Rate",
      current: "87%",
      predicted: "93%",
      confidence: "85%",
      trend: "up"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI-Powered Business Insights</h1>
          <p className="text-muted-foreground">
            Intelligent analysis and predictions from your business data
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Last generated: {lastGenerated}
          </div>
          <Button onClick={generateInsights} disabled={isGenerating}>
            <Brain className="h-4 w-4 mr-2" />
            {isGenerating ? "Generating..." : "Generate New Insights"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4">
            {insights.map((insight) => (
              <Card key={insight.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {insight.type === "performance" && <TrendingUp className="h-5 w-5 text-green-500" />}
                      {insight.type === "risk" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                      {insight.type === "opportunity" && <Lightbulb className="h-5 w-5 text-yellow-500" />}
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={insight.impact === "high" ? "destructive" : "secondary"}>
                        {insight.impact} impact
                      </Badge>
                      <Badge variant="outline">{insight.confidence}% confidence</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{insight.description}</p>
                  <div className="bg-muted p-3 rounded-md">
                    <p className="text-sm font-medium">AI Recommendation:</p>
                    <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {predictions.map((prediction, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{prediction.metric}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current:</span>
                      <span className="font-semibold">{prediction.current}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Predicted:</span>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">{prediction.predicted}</span>
                        {prediction.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                        )}
                      </div>
                    </div>
                    <div className="pt-2">
                      <Badge variant="outline" className="text-xs">
                        {prediction.confidence} confidence
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Monthly performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="efficiency" stroke="#8884d8" name="Efficiency %" />
                      <Line type="monotone" dataKey="satisfaction" stroke="#82ca9d" name="Satisfaction %" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Contribution by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIInsights;
