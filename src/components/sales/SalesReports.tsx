
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { FileText, Download, Calendar, TrendingUp, Users, DollarSign, Target, Percent } from "lucide-react";

export const SalesReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedRep, setSelectedRep] = useState("all");

  // Mock data for reports
  const salesData = [
    { month: "Aug", revenue: 185000, deals: 12, leads: 45 },
    { month: "Sep", revenue: 205000, deals: 15, leads: 52 },
    { month: "Oct", revenue: 175000, deals: 11, leads: 38 },
    { month: "Nov", revenue: 225000, deals: 18, leads: 60 },
    { month: "Dec", revenue: 195000, deals: 14, leads: 41 },
    { month: "Jan", revenue: 243000, deals: 19, deals: 58 }
  ];

  const conversionData = [
    { stage: "Prospects", count: 150, rate: 100 },
    { stage: "Qualified", count: 75, rate: 50 },
    { stage: "Proposal", count: 45, rate: 30 },
    { stage: "Negotiation", count: 30, rate: 20 },
    { stage: "Closed Won", count: 18, rate: 12 }
  ];

  const repPerformance = [
    { name: "John Smith", deals: 19, revenue: 165000, conversionRate: 22 },
    { name: "Sarah Johnson", deals: 15, revenue: 145000, conversionRate: 18 },
    { name: "Mike Wilson", deals: 22, revenue: 185000, conversionRate: 25 },
    { name: "Lisa Chen", deals: 12, revenue: 95000, conversionRate: 15 }
  ];

  const sourcePerformance = [
    { name: "Website", value: 35, color: "#0088FE" },
    { name: "Referrals", value: 25, color: "#00C49F" },
    { name: "Cold Calls", value: 20, color: "#FFBB28" },
    { name: "Events", value: 12, color: "#FF8042" },
    { name: "Social Media", value: 8, color: "#8884D8" }
  ];

  const winLossReasons = {
    won: [
      { reason: "Best Price", count: 8 },
      { reason: "Product Features", count: 6 },
      { reason: "Service Quality", count: 4 },
      { reason: "Existing Relationship", count: 3 }
    ],
    lost: [
      { reason: "Price Too High", count: 5 },
      { reason: "Competitor Chosen", count: 4 },
      { reason: "Budget Constraints", count: 3 },
      { reason: "Timing Issues", count: 2 }
    ]
  };

  const kpiMetrics = {
    totalRevenue: 243000,
    totalDeals: 19,
    avgDealSize: 12789,
    winRate: 73.1,
    avgSalesCycle: 45,
    conversionRate: 12.0,
    leadResponseTime: 2.4,
    customerLifetimeValue: 45000
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Sales Reports & Analytics</h2>
          <p className="text-muted-foreground">Comprehensive sales performance insights</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="sources">Lead Sources</TabsTrigger>
          <TabsTrigger value="winloss">Win/Loss</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* KPI Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${kpiMetrics.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Deals Closed</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpiMetrics.totalDeals}</div>
                <p className="text-xs text-muted-foreground">Successful deals</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${kpiMetrics.avgDealSize.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Per deal</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpiMetrics.winRate}%</div>
                <p className="text-xs text-muted-foreground">Success rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg Sales Cycle</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpiMetrics.avgSalesCycle} days</div>
                <p className="text-xs text-muted-foreground">Lead to close</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpiMetrics.conversionRate}%</div>
                <p className="text-xs text-muted-foreground">Leads to deals</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpiMetrics.leadResponseTime}h</div>
                <p className="text-xs text-muted-foreground">Avg lead response</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Customer LTV</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${kpiMetrics.customerLifetimeValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Lifetime value</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          {/* Sales Rep Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Representative Performance</CardTitle>
              <CardDescription>Individual performance comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={repPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {repPerformance.map((rep, index) => (
                  <div key={rep.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{rep.name}</h4>
                        <p className="text-sm text-muted-foreground">Sales Representative</p>
                      </div>
                    </div>
                    <div className="flex gap-8 text-right">
                      <div>
                        <p className="text-2xl font-bold">{rep.deals}</p>
                        <p className="text-xs text-muted-foreground">Deals</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">${rep.revenue.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Revenue</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{rep.conversionRate}%</p>
                        <p className="text-xs text-muted-foreground">Conversion</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          {/* Sales Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Funnel Analysis</CardTitle>
              <CardDescription>Conversion rates through the sales pipeline</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pipeline Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {conversionData.map((stage, index) => (
              <Card key={stage.stage}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{stage.stage}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stage.count}</div>
                  <p className="text-xs text-muted-foreground">{stage.rate}% of total</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          {/* Lead Sources */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Lead Sources Distribution</CardTitle>
                <CardDescription>Where your leads are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sourcePerformance}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sourcePerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Source Performance</CardTitle>
                <CardDescription>Lead quality by source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sourcePerformance.map((source) => (
                    <div key={source.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: source.color }}
                        />
                        <span className="font-medium">{source.name}</span>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{source.value}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="winloss" className="space-y-4">
          {/* Win/Loss Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Why We Win</CardTitle>
                <CardDescription>Top reasons for successful deals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {winLossReasons.won.map((reason, index) => (
                    <div key={reason.reason} className="flex items-center justify-between">
                      <span className="font-medium">{reason.reason}</span>
                      <Badge className="bg-green-100 text-green-800">
                        {reason.count} deals
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Why We Lose</CardTitle>
                <CardDescription>Top reasons for lost deals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {winLossReasons.lost.map((reason, index) => (
                    <div key={reason.reason} className="flex items-center justify-between">
                      <span className="font-medium">{reason.reason}</span>
                      <Badge className="bg-red-100 text-red-800">
                        {reason.count} deals
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
