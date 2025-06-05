import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, Download, FileText, TrendingUp, TrendingDown, Users, Building, DollarSign } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useGlobal } from "@/contexts/GlobalContext";
import { useToast } from "@/components/ui/use-toast";
import { downloadAsPdf, generateDashboardPdf } from "@/lib/pdf-utils";
import ViewDetailsModal from "@/components/shared/ViewDetailsModal";
import { PermissionGate } from "@/components/shared/PermissionGate";
import { NotificationCenter } from "@/components/shared/NotificationCenter";

// Updated data for Pulse Point CX
const monthlyScoreData = [
  { month: "Jan", score: 87 },
  { month: "Feb", score: 82 },
  { month: "Mar", score: 85 },
  { month: "Apr", score: 91 },
  { month: "May", score: 88 },
  { month: "Jun", score: 93 },
];

const quarterlyScoreData = [
  { quarter: "Q1", score: 85 },
  { quarter: "Q2", score: 89 },
  { quarter: "Q3", score: 92 },
  { quarter: "Q4", score: 88 },
];

// Updated category score data with CX focused categories
const categoryScoreData = [
  { name: "Customer Service", value: 92 },
  { name: "Staff Appearance", value: 88 },
  { name: "Store Cleanliness", value: 95 },
  { name: "Product Knowledge", value: 82 },
  { name: "Brand Compliance", value: 90 },
];

const upcomingEvaluations = [
  {
    id: "EV-2023-1011",
    client: "Retail Corp SA",
    location: "Cape Town North",
    date: "2023-07-15",
  },
  {
    id: "EV-2023-1012",
    client: "EcoFuel",
    location: "Pretoria East",
    date: "2023-07-18",
  },
  {
    id: "EV-2023-1013",
    client: "LuxCafé",
    location: "Johannesburg Central",
    date: "2023-07-22",
  },
];

// Pulse Point CX metrics
const pulsePointCXData = {
  clientsScored: 18,
  locationsEvaluated: 42,
  auditsFilled: 156,
  evaluationsCompleted: 132,
  averageScore: 89
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { logAction, addNotification } = useGlobal();
  const { toast } = useToast();
  const [timeFrame, setTimeFrame] = useState("month");
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null);
  const [realTimeData, setRealTimeData] = useState({
    overallScore: 89,
    activeEvaluations: 12,
    pendingActions: 8,
    clientSatisfaction: 92,
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time data updates
      setRealTimeData(prev => ({
        ...prev,
        overallScore: prev.overallScore + (Math.random() - 0.5) * 0.1,
        activeEvaluations: Math.max(0, prev.activeEvaluations + Math.floor((Math.random() - 0.5) * 3)),
        pendingActions: Math.max(0, prev.pendingActions + Math.floor((Math.random() - 0.5) * 2)),
        clientSatisfaction: Math.min(100, Math.max(0, prev.clientSatisfaction + (Math.random() - 0.5) * 0.2)),
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Log dashboard access
  useEffect(() => {
    logAction("Viewed Dashboard", "dashboard");
  }, []);

  const handleDownload = () => {
    logAction("Downloaded Dashboard Report", "dashboard");
    
    const dashboardData = {
      date: new Date().toISOString(),
      overallScore: `${realTimeData.overallScore.toFixed(1)}%`,
      topCategory: 'Store Cleanliness',
      locationsCovered: '42/50',
      improvementArea: 'Product Knowledge',
      monthlyScoreData,
      quarterlyScoreData,
      categoryScoreData,
      upcomingEvaluations,
      metrics: {
        overallScore: {
          value: `${realTimeData.overallScore.toFixed(1)}%`,
          change: '+2.5%',
          trend: 'up'
        },
        locationsEvaluated: {
          value: '42/50',
          coverage: '84%'
        },
        topCategory: {
          name: 'Store Cleanliness',
          score: '95%'
        },
        improvementArea: {
          name: 'Product Knowledge',
          score: '82%'
        }
      },
      pulsePointCX: {
        ...pulsePointCXData,
        overallScore: realTimeData.overallScore.toFixed(1)
      }
    };
    
    generateDashboardPdf(dashboardData);
    
    addNotification({
      userId: currentUser?.id || "",
      title: "Report Downloaded",
      message: "Dashboard report has been downloaded successfully",
      type: "success",
      module: "dashboard",
    });
    
    toast({
      title: "Report Downloaded",
      description: "Dashboard report has been downloaded successfully",
    });
  };

  const handleViewEvaluationDetails = (evaluation: any) => {
    logAction("Viewed Evaluation Details", "evaluations", evaluation.id);
    
    const evaluationDetails = {
      id: evaluation.id,
      client: evaluation.client,
      location: evaluation.location,
      scheduledDate: evaluation.date,
      scheduledTime: "10:00 AM",
      evaluationScope: "Comprehensive Store Evaluation",
      evaluator: "To be assigned",
      status: "Scheduled",
      score: 0
    };
    
    setSelectedEvaluation(evaluationDetails);
    setIsDetailsModalOpen(true);
  };

  return (
    <PermissionGate module="dashboard" action="read">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Pulse Point CX Dashboard</h1>
          <div className="flex items-center gap-2">
            <NotificationCenter />
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download Report
            </Button>
          </div>
        </div>

        {/* Real-time KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Overall CX Score
              </CardTitle>
              <div className="h-4 w-4 rounded-full bg-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{realTimeData.overallScore.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 flex items-center">
                  +2.5% <ArrowUpRight className="h-3 w-3" />
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Evaluations
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{realTimeData.activeEvaluations}</div>
              <p className="text-xs text-muted-foreground">
                Currently in progress
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Actions
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{realTimeData.pendingActions}</div>
              <p className="text-xs text-muted-foreground">
                Require attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Client Satisfaction
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{realTimeData.clientSatisfaction.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+1.2%</span> this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Locations Evaluated
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42/50</div>
              <p className="text-xs text-muted-foreground">
                84% coverage this period
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Charts Section */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader className="flex justify-between">
                  <div>
                    <CardTitle>CX Score Trend Analysis</CardTitle>
                    <CardDescription>Performance over time</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant={timeFrame === "month" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setTimeFrame("month")}
                    >
                      Monthly
                    </Button>
                    <Button 
                      variant={timeFrame === "quarter" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setTimeFrame("quarter")}
                    >
                      Quarterly
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={timeFrame === "month" ? monthlyScoreData : quarterlyScoreData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={timeFrame === "month" ? "month" : "quarter"} />
                        <YAxis domain={[50, 100]} />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Score"]}
                          cursor={{ fillOpacity: 0.1 }}
                        />
                        <Bar
                          dataKey="score"
                          fill="hsl(var(--primary))"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>CX Categories</CardTitle>
                  <CardDescription>Performance by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryScoreData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {categoryScoreData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"][index % 5]}
                            />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Year-over-year comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyScoreData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {categoryScoreData.map((category, index) => (
                <Card key={category.name}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-center">{category.value}%</div>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-primary rounded-full transition-all"
                        style={{ width: `${category.value}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Location Performance</CardTitle>
                <CardDescription>Performance breakdown by location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvaluations.map((evaluation) => (
                    <div
                      key={evaluation.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{evaluation.client}</p>
                        <p className="text-sm text-muted-foreground">{evaluation.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">85%</div>
                        <p className="text-xs text-muted-foreground">Avg. Score</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Upcoming Evaluations */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Evaluations</CardTitle>
            <CardDescription>
              Scheduled evaluations for the next 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {upcomingEvaluations.map((evaluation) => (
                <div
                  key={evaluation.id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{evaluation.client}</p>
                    <p className="text-sm text-muted-foreground">
                      {evaluation.location}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0 flex items-center space-x-2">
                    <div className="text-sm text-muted-foreground">
                      {evaluation.date}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewEvaluationDetails(evaluation)}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <ViewDetailsModal
          open={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          type="evaluation"
          data={selectedEvaluation}
        />
      </div>
    </PermissionGate>
  );
};

export default Dashboard;
