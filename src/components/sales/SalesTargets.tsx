
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, TrendingUp, DollarSign, Users, Calendar, Trophy, Plus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export const SalesTargets = () => {
  // Mock targets data
  const salesTargets = [
    {
      id: "1",
      period: "monthly",
      year: 2024,
      month: 1,
      assignedTo: "John Smith",
      targetRevenue: 75000,
      actualRevenue: 62000,
      targetDeals: 8,
      actualDeals: 6,
      progress: 82.7,
      status: "on-track"
    },
    {
      id: "2",
      period: "monthly",
      year: 2024,
      month: 1,
      assignedTo: "Sarah Johnson",
      targetRevenue: 60000,
      actualRevenue: 48000,
      targetDeals: 6,
      actualDeals: 4,
      progress: 80,
      status: "at-risk"
    },
    {
      id: "3",
      period: "monthly",
      year: 2024,
      month: 1,
      assignedTo: "Mike Wilson",
      targetRevenue: 65000,
      actualRevenue: 78000,
      targetDeals: 7,
      actualDeals: 9,
      progress: 120,
      status: "exceeded"
    },
    {
      id: "4",
      period: "monthly",
      year: 2024,
      month: 1,
      assignedTo: "Lisa Chen",
      targetRevenue: 55000,
      actualRevenue: 35000,
      targetDeals: 5,
      actualDeals: 3,
      progress: 63.6,
      status: "behind"
    }
  ];

  const teamPerformance = [
    { month: "Oct", target: 250000, actual: 235000 },
    { month: "Nov", target: 260000, actual: 275000 },
    { month: "Dec", target: 280000, actual: 265000 },
    { month: "Jan", target: 255000, actual: 223000 }
  ];

  const leaderboardData = salesTargets
    .sort((a, b) => b.progress - a.progress)
    .map(target => ({
      name: target.assignedTo,
      progress: target.progress,
      revenue: target.actualRevenue,
      deals: target.actualDeals
    }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "exceeded": return "bg-green-100 text-green-800";
      case "on-track": return "bg-blue-100 text-blue-800";
      case "at-risk": return "bg-yellow-100 text-yellow-800";
      case "behind": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return "bg-green-500";
    if (progress >= 80) return "bg-blue-500";
    if (progress >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const teamTotals = {
    targetRevenue: salesTargets.reduce((sum, t) => sum + t.targetRevenue, 0),
    actualRevenue: salesTargets.reduce((sum, t) => sum + t.actualRevenue, 0),
    targetDeals: salesTargets.reduce((sum, t) => sum + t.targetDeals, 0),
    actualDeals: salesTargets.reduce((sum, t) => sum + t.actualDeals, 0)
  };

  const teamProgress = teamTotals.targetRevenue > 0 ? (teamTotals.actualRevenue / teamTotals.targetRevenue) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Sales Targets & Performance</h2>
          <p className="text-muted-foreground">Track goals and measure performance</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Set Target
        </Button>
      </div>

      <Tabs defaultValue="individual" className="space-y-4">
        <TabsList>
          <TabsTrigger value="individual">Individual Targets</TabsTrigger>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-4">
          {/* Team Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Team Target</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${teamTotals.targetRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Monthly goal</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Team Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${teamTotals.actualRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Current month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Team Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{teamProgress.toFixed(1)}%</div>
                <Progress value={teamProgress} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Deals Target</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{teamTotals.actualDeals}/{teamTotals.targetDeals}</div>
                <p className="text-xs text-muted-foreground">Deals closed</p>
              </CardContent>
            </Card>
          </div>

          {/* Individual Targets */}
          <Card>
            <CardHeader>
              <CardTitle>Individual Sales Targets</CardTitle>
              <CardDescription>
                Track individual performance against monthly targets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {salesTargets.map((target) => (
                  <div key={target.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{target.assignedTo}</h4>
                          <p className="text-sm text-muted-foreground">
                            January 2024 Target
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(target.status)}>
                        {target.status.replace('-', ' ')}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Revenue Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Revenue Progress</span>
                          <span className="font-medium">{target.progress.toFixed(1)}%</span>
                        </div>
                        <div className={`h-2 bg-gray-200 rounded-full overflow-hidden`}>
                          <div 
                            className={`h-full transition-all ${getProgressColor(target.progress)}`}
                            style={{ width: `${Math.min(target.progress, 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>${target.actualRevenue.toLocaleString()} achieved</span>
                          <span>${target.targetRevenue.toLocaleString()} target</span>
                        </div>
                      </div>

                      {/* Deals Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Deals Progress</span>
                          <span className="font-medium">
                            {target.targetDeals > 0 ? ((target.actualDeals / target.targetDeals) * 100).toFixed(1) : 0}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all ${getProgressColor((target.actualDeals / target.targetDeals) * 100)}`}
                            style={{ width: `${Math.min((target.actualDeals / target.targetDeals) * 100, 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{target.actualDeals} deals closed</span>
                          <span>{target.targetDeals} deals target</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          {/* Team Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Team Performance Trend</CardTitle>
              <CardDescription>
                Monthly performance vs targets over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={teamPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                  <Line type="monotone" dataKey="target" stroke="#8884d8" strokeDasharray="5 5" name="Target" />
                  <Line type="monotone" dataKey="actual" stroke="#82ca9d" strokeWidth={2} name="Actual" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Achievement Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(salesTargets.reduce((sum, t) => sum + t.progress, 0) / salesTargets.length).toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">Team average</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {leaderboardData[0]?.name.split(' ')[0]}
                </div>
                <p className="text-xs text-muted-foreground">
                  {leaderboardData[0]?.progress.toFixed(1)}% achievement
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reps On Target</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {salesTargets.filter(t => t.progress >= 80).length}/{salesTargets.length}
                </div>
                <p className="text-xs text-muted-foreground">80%+ achievement</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Sales Leaderboard
              </CardTitle>
              <CardDescription>
                January 2024 performance ranking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboardData.map((rep, index) => (
                  <div key={rep.name} className={`flex items-center gap-4 p-4 rounded-lg border ${index === 0 ? 'bg-yellow-50 border-yellow-200' : index === 1 ? 'bg-gray-50 border-gray-200' : index === 2 ? 'bg-orange-50 border-orange-200' : 'bg-white'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${index === 0 ? 'bg-yellow-500 text-white' : index === 1 ? 'bg-gray-400 text-white' : index === 2 ? 'bg-orange-500 text-white' : 'bg-blue-100 text-blue-600'}`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{rep.name}</h4>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <span className="font-medium">${rep.revenue.toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{rep.deals} deals</p>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-bold ${rep.progress >= 100 ? 'text-green-600' : rep.progress >= 80 ? 'text-blue-600' : 'text-red-600'}`}>
                              {rep.progress.toFixed(1)}%
                            </div>
                            <p className="text-xs text-muted-foreground">achievement</p>
                          </div>
                        </div>
                      </div>
                      <Progress value={Math.min(rep.progress, 100)} className="mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
