
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  Calendar,
  Zap,
  FileText,
  Plus
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export const MaintenanceDashboard = () => {
  // Mock metrics data
  const metrics = {
    totalOpenWorkOrders: 23,
    emergencyRequests: 3,
    pendingApprovals: 7,
    downtimeHours: 12.5,
    monthlyMaintenanceCost: 45680,
    preventiveCompliance: 87,
    technicianUtilization: 76,
    avgResponseTime: 2.3 // hours
  };

  const workOrderTrends = [
    { month: 'Jan', preventive: 45, corrective: 32, emergency: 8 },
    { month: 'Feb', preventive: 52, corrective: 28, emergency: 12 },
    { month: 'Mar', preventive: 48, corrective: 35, emergency: 6 },
    { month: 'Apr', preventive: 61, corrective: 29, emergency: 9 },
    { month: 'May', preventive: 55, corrective: 33, emergency: 11 },
    { month: 'Jun', preventive: 67, corrective: 25, emergency: 7 }
  ];

  const costBreakdown = [
    { name: 'Preventive', value: 45, color: '#10b981' },
    { name: 'Corrective', value: 35, color: '#f59e0b' },
    { name: 'Emergency', value: 15, color: '#ef4444' },
    { name: 'Parts', value: 5, color: '#8b5cf6' }
  ];

  const topProblematicAssets = [
    { name: 'Compressor Unit A1', failures: 8, downtime: 24.5, cost: 12500 },
    { name: 'Conveyor Belt B2', failures: 6, downtime: 18.2, cost: 8900 },
    { name: 'HVAC System C3', failures: 5, downtime: 15.8, cost: 7200 },
    { name: 'Generator D4', failures: 4, downtime: 12.3, cost: 6800 },
    { name: 'Pump Station E5', failures: 3, downtime: 9.7, cost: 4500 }
  ];

  const quickActions = [
    { title: "Create Work Order", icon: Plus, action: "create-wo" },
    { title: "Emergency Request", icon: Zap, action: "emergency" },
    { title: "Assign Technician", icon: Users, action: "assign" },
    { title: "Schedule PM", icon: Calendar, action: "schedule" }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Work Orders</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalOpenWorkOrders}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="mr-1 h-3 w-3 text-green-500" />
              -12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emergency Requests</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{metrics.emergencyRequests}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-red-500" />
              +2 from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{metrics.pendingApprovals}</div>
            <div className="text-xs text-muted-foreground">
              Requires management review
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.monthlyMaintenanceCost.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-orange-500" />
              +8% vs budget
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downtime Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.downtimeHours}h</div>
            <div className="text-xs text-muted-foreground">This month</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PM Compliance</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics.preventiveCompliance}%</div>
            <Progress value={metrics.preventiveCompliance} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Technician Utilization</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.technicianUtilization}%</div>
            <Progress value={metrics.technicianUtilization} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgResponseTime}h</div>
            <div className="text-xs text-muted-foreground">Target: 2h</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common maintenance management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            {quickActions.map((action) => (
              <Button
                key={action.action}
                variant="outline"
                className="h-16 flex-col gap-2"
                onClick={() => console.log(`Action: ${action.action}`)}
              >
                <action.icon className="h-5 w-5" />
                <span className="text-sm">{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Work Order Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Work Order Trends</CardTitle>
            <CardDescription>Monthly breakdown by type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={workOrderTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="preventive" stackId="1" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="corrective" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                <Area type="monotone" dataKey="emergency" stackId="1" stroke="#ef4444" fill="#ef4444" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Cost Breakdown</CardTitle>
            <CardDescription>Current month distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Problematic Assets */}
      <Card>
        <CardHeader>
          <CardTitle>Top Problematic Assets</CardTitle>
          <CardDescription>Assets requiring immediate attention based on failure frequency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProblematicAssets.map((asset, index) => (
              <div key={asset.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded-full text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{asset.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {asset.failures} failures • {asset.downtime}h downtime
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${asset.cost.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total cost</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
