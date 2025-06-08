
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, Target, Users, DollarSign, Calendar, Download, Filter } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

const AdvancedAnalytics = () => {
  const [timeRange, setTimeRange] = useState("6months");
  const [department, setDepartment] = useState("all");

  const predictiveData = [
    { month: 'Jan', actual: 125000, predicted: 128000, trend: 'up' },
    { month: 'Feb', actual: 142000, predicted: 145000, trend: 'up' },
    { month: 'Mar', actual: 158000, predicted: 162000, trend: 'up' },
    { month: 'Apr', actual: 175000, predicted: 180000, trend: 'up' },
    { month: 'May', actual: 168000, predicted: 185000, trend: 'down' },
    { month: 'Jun', actual: 189000, predicted: 195000, trend: 'up' },
    { month: 'Jul', actual: null, predicted: 205000, trend: 'up' },
    { month: 'Aug', actual: null, predicted: 218000, trend: 'up' }
  ];

  const performanceMetrics = [
    { department: 'Sales', efficiency: 94, satisfaction: 97, revenue: 2500000 },
    { department: 'Marketing', efficiency: 87, satisfaction: 93, revenue: 1800000 },
    { department: 'Operations', efficiency: 91, satisfaction: 95, revenue: 1200000 },
    { department: 'Finance', efficiency: 96, satisfaction: 92, revenue: 900000 },
    { department: 'HR', efficiency: 89, satisfaction: 98, revenue: 600000 }
  ];

  const cohortAnalysis = [
    { cohort: 'Q1 2024', month1: 100, month2: 85, month3: 72, month4: 68, month5: 65, month6: 63 },
    { cohort: 'Q2 2024', month1: 100, month2: 88, month3: 76, month4: 71, month5: 69, month6: null },
    { cohort: 'Q3 2024', month1: 100, month2: 92, month3: 81, month4: 77, month5: null, month6: null },
    { cohort: 'Q4 2024', month1: 100, month2: 89, month3: 78, month4: null, month5: null, month6: null }
  ];

  const riskFactors = [
    {
      category: "Financial",
      risk: "Cash Flow Variance",
      probability: 0.25,
      impact: "Medium",
      recommendation: "Implement stricter invoicing protocols"
    },
    {
      category: "Operational",
      risk: "Resource Overallocation",
      probability: 0.35,
      impact: "High",
      recommendation: "Hire additional staff or redistribute workload"
    },
    {
      category: "Market",
      risk: "Competitor Price Pressure",
      probability: 0.15,
      impact: "High",
      recommendation: "Develop value proposition differentiation strategy"
    }
  ];

  const kpiTrends = [
    { name: 'Customer Acquisition Cost', value: 125, change: -8, target: 120, status: 'good' },
    { name: 'Lifetime Value', value: 2450, change: 12, target: 2500, status: 'good' },
    { name: 'Churn Rate', value: 3.2, change: -0.5, target: 3.0, status: 'warning' },
    { name: 'Net Promoter Score', value: 72, change: 5, target: 75, status: 'good' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advanced Analytics</h1>
          <p className="text-muted-foreground">
            Predictive insights and business intelligence dashboard
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
              <SelectItem value="2years">2 Years</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="predictive" className="space-y-4">
        <TabsList>
          <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
          <TabsTrigger value="cohorts">Cohort Analysis</TabsTrigger>
          <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="predictive" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            {kpiTrends.map((kpi, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant={kpi.status === 'good' ? 'default' : 'secondary'}>
                        {kpi.change > 0 ? '+' : ''}{kpi.change}%
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Target: {kpi.target}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Prediction vs Actual</CardTitle>
              <CardDescription>
                AI-powered revenue forecasting with confidence intervals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictiveData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#2563eb" 
                      strokeWidth={2}
                      name="Actual Revenue" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#dc2626" 
                      strokeDasharray="5 5"
                      name="Predicted Revenue" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance Matrix</CardTitle>
              <CardDescription>Efficiency vs satisfaction analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="efficiency" fill="#3b82f6" name="Efficiency %" />
                    <Bar dataKey="satisfaction" fill="#10b981" name="Satisfaction %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cohorts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Retention Cohorts</CardTitle>
              <CardDescription>Retention rates by customer acquisition period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cohortAnalysis.map((cohort, index) => (
                  <div key={index} className="space-y-2">
                    <div className="font-medium text-sm">{cohort.cohort}</div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5, 6].map((month) => {
                        const value = cohort[`month${month}` as keyof typeof cohort] as number | null;
                        return (
                          <div
                            key={month}
                            className="flex-1 h-8 rounded text-xs flex items-center justify-center text-white"
                            style={{
                              backgroundColor: value 
                                ? `rgba(59, 130, 246, ${value / 100})` 
                                : '#f3f4f6'
                            }}
                          >
                            {value ? `${value}%` : '-'}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <div className="grid gap-4">
            {riskFactors.map((risk, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{risk.risk}</CardTitle>
                      <Badge variant="outline">{risk.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={risk.impact === "High" ? "destructive" : "secondary"}>
                        {risk.impact} Impact
                      </Badge>
                      <Badge variant="outline">{Math.round(risk.probability * 100)}% Risk</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Recommendation:</strong> {risk.recommendation}
                  </p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${risk.probability * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalytics;
