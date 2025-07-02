
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  Clock, 
  Percent,
  Plus,
  Phone,
  Mail,
  FileText,
  UserPlus
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

export const SalesDashboard = () => {
  // Mock data for dashboard
  const kpiData = {
    totalLeads: 145,
    leadsThisMonth: 32,
    pipelineValue: 450000,
    closedDeals: 28,
    lostDeals: 12,
    monthlyGoal: 350000,
    currentRevenue: 280000,
    avgResponseTime: 2.4,
    conversionRate: 18.5
  };

  const pipelineData = [
    { stage: "Prospecting", value: 120000, count: 15 },
    { stage: "Qualified", value: 85000, count: 12 },
    { stage: "Proposal", value: 95000, count: 8 },
    { stage: "Negotiation", value: 150000, count: 6 },
  ];

  const salesByRep = [
    { name: "John Smith", deals: 12, revenue: 95000 },
    { name: "Sarah Johnson", deals: 8, revenue: 72000 },
    { name: "Mike Wilson", deals: 15, revenue: 113000 },
    { name: "Lisa Chen", deals: 6, revenue: 48000 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 85000, target: 90000 },
    { month: "Feb", revenue: 92000, target: 90000 },
    { month: "Mar", revenue: 78000, target: 90000 },
    { month: "Apr", revenue: 105000, target: 95000 },
    { month: "May", revenue: 118000, target: 100000 },
    { month: "Jun", revenue: 95000, target: 100000 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const goalProgress = (kpiData.currentRevenue / kpiData.monthlyGoal) * 100;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.totalLeads}</div>
            <Badge variant="secondary" className="mt-1">
              +{kpiData.leadsThisMonth} this month
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${kpiData.pipelineValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Active opportunities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">Leads to deals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.avgResponseTime}h</div>
            <p className="text-xs text-muted-foreground">First contact</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Goal Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Monthly Revenue Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress: ${kpiData.currentRevenue.toLocaleString()}</span>
              <span>Goal: ${kpiData.monthlyGoal.toLocaleString()}</span>
            </div>
            <Progress value={goalProgress} className="h-3" />
            <p className="text-xs text-muted-foreground">
              {goalProgress.toFixed(1)}% of monthly goal achieved
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center gap-2">
              <UserPlus className="h-5 w-5" />
              <span className="text-sm">Add Lead</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <Plus className="h-5 w-5" />
              <span className="text-sm">Create Deal</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <FileText className="h-5 w-5" />
              <span className="text-sm">Send Quote</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <Phone className="h-5 w-5" />
              <span className="text-sm">Log Call</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
            <CardDescription>Value by stage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Value']} />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales by Rep */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Representative</CardTitle>
            <CardDescription>Performance comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesByRep}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly performance vs targets</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="target" stroke="#82ca9d" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="h-4 w-4 text-blue-500" />
              <div className="flex-1">
                <p className="font-medium">Call with TechCorp Inc</p>
                <p className="text-sm text-muted-foreground">John Smith • 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-4 w-4 text-green-500" />
              <div className="flex-1">
                <p className="font-medium">Quote sent to RetailChain Ltd</p>
                <p className="text-sm text-muted-foreground">Sarah Johnson • 4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <UserPlus className="h-4 w-4 text-purple-500" />
              <div className="flex-1">
                <p className="font-medium">New lead: Manufacturing Solutions Co</p>
                <p className="text-sm text-muted-foreground">System • 1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
