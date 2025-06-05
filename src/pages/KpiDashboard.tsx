
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, TrendingUp, TrendingDown, ArrowRight, BarChart3, Target, AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useGlobal } from "@/contexts/GlobalContext";
import { PermissionGate } from "@/components/shared/PermissionGate";
import { KpiMetric, KpiCategory } from "@/types/kpi";
import KpiMetricCard from "@/components/kpi/KpiMetricCard";
import KpiChart from "@/components/kpi/KpiChart";
import KpiForm from "@/components/kpi/KpiForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const mockKpiData: KpiCategory[] = [
  {
    name: "Financial",
    totalWeight: 100,
    metrics: [
      {
        id: "f1",
        category: "financial",
        name: "Monthly Revenue Growth",
        description: "Month-over-month revenue increase percentage",
        target: "≥ 15%",
        weighting: 30,
        currentValue: 18.5,
        status: "exceeding",
        trend: "up"
      },
      {
        id: "f2",
        category: "financial",
        name: "Cost Reduction",
        description: "Operational cost reduction vs previous quarter",
        target: "≥ 10%",
        weighting: 25,
        currentValue: 7.2,
        status: "below",
        trend: "down"
      }
    ]
  },
  {
    name: "Operational",
    totalWeight: 100,
    metrics: [
      {
        id: "o1",
        category: "operational",
        name: "Audit Completion Rate",
        description: "Percentage of audits completed on time",
        target: "≥ 95%",
        weighting: 35,
        currentValue: 97.8,
        status: "exceeding",
        trend: "up"
      },
      {
        id: "o2",
        category: "operational",
        name: "Average Response Time",
        description: "Average response time to client requests (hours)",
        target: "≤ 4 hours",
        weighting: 30,
        currentValue: 2.1,
        status: "exceeding",
        trend: "up"
      }
    ]
  },
  {
    name: "Client",
    totalWeight: 100,
    metrics: [
      {
        id: "c1",
        category: "client",
        name: "Client Satisfaction Score",
        description: "Average client satisfaction rating",
        target: "≥ 4.5/5",
        weighting: 40,
        currentValue: 4.7,
        status: "exceeding",
        trend: "up"
      },
      {
        id: "c2",
        category: "client",
        name: "Client Retention Rate",
        description: "Percentage of clients retained year-over-year",
        target: "≥ 90%",
        weighting: 35,
        currentValue: 85.2,
        status: "below",
        trend: "stable"
      }
    ]
  }
];

const KpiDashboard = () => {
  const { currentUser } = useAuth();
  const { logAction, addNotification, hasPermission } = useGlobal();
  const [selectedCategory, setSelectedCategory] = useState("financial");
  const [kpiData, setKpiData] = useState<KpiCategory[]>(mockKpiData);
  const [isAddKpiOpen, setIsAddKpiOpen] = useState(false);

  const getStatusColor = (status: KpiMetric["status"]) => {
    switch (status) {
      case "exceeding": return "bg-green-100 text-green-800";
      case "meeting": return "bg-blue-100 text-blue-800";
      case "below": return "bg-yellow-100 text-yellow-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: KpiMetric["trend"]) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down": return <TrendingDown className="h-4 w-4 text-red-600" />;
      case "stable": return <ArrowRight className="h-4 w-4 text-blue-600" />;
      default: return null;
    }
  };

  const calculateCategoryScore = (category: KpiCategory) => {
    const totalScore = category.metrics.reduce((sum, metric) => {
      if (metric.currentValue === null) return sum;
      const achievement = metric.status === "exceeding" ? 1.1 : 
                         metric.status === "meeting" ? 1.0 : 
                         metric.status === "below" ? 0.7 : 0.3;
      return sum + (achievement * metric.weighting);
    }, 0);
    return Math.round(totalScore);
  };

  const handleAddKpi = (newKpi: Omit<KpiMetric, "id">) => {
    const kpi: KpiMetric = {
      ...newKpi,
      id: Date.now().toString()
    };

    setKpiData(prev => prev.map(category => {
      if (category.name.toLowerCase() === newKpi.category) {
        return {
          ...category,
          metrics: [...category.metrics, kpi]
        };
      }
      return category;
    }));

    logAction("Created KPI", "kpi", kpi.id, "kpi");
    addNotification({
      userId: currentUser?.id || "",
      title: "KPI Created",
      message: `New KPI "${kpi.name}" has been created`,
      type: "success",
      module: "kpi"
    });

    setIsAddKpiOpen(false);
  };

  React.useEffect(() => {
    logAction("Viewed KPI Dashboard", "kpi");
  }, []);

  return (
    <PermissionGate module="dashboard" action="read">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">KPI Dashboard</h1>
            <p className="text-muted-foreground">
              Track and manage key performance indicators across departments
            </p>
          </div>
          <PermissionGate module="dashboard" action="create">
            <Dialog open={isAddKpiOpen} onOpenChange={setIsAddKpiOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add KPI
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New KPI</DialogTitle>
                </DialogHeader>
                <KpiForm onSubmit={handleAddKpi} onCancel={() => setIsAddKpiOpen(false)} />
              </DialogContent>
            </Dialog>
          </PermissionGate>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((category) => (
            <Card key={category.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{category.name}</CardTitle>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {category.name === "Financial" && <BarChart3 className="h-4 w-4" />}
                  {category.name === "Operational" && <Target className="h-4 w-4" />}
                  {category.name === "Client" && <TrendingUp className="h-4 w-4" />}
                  {category.name === "Internal" && <AlertTriangle className="h-4 w-4" />}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{calculateCategoryScore(category)}%</div>
                <p className="text-xs text-muted-foreground">
                  {category.metrics.length} metrics tracked
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed KPI Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="operational">Operational</TabsTrigger>
            <TabsTrigger value="client">Client</TabsTrigger>
            <TabsTrigger value="internal">Internal</TabsTrigger>
          </TabsList>

          {kpiData.map((category) => (
            <TabsContent key={category.name} value={category.name.toLowerCase()} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>{category.name} KPIs</CardTitle>
                    <CardDescription>
                      Performance metrics for {category.name.toLowerCase()} operations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.metrics.map((metric) => (
                      <div key={metric.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{metric.name}</h4>
                            {getTrendIcon(metric.trend)}
                          </div>
                          <p className="text-sm text-muted-foreground">{metric.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Target: {metric.target}</span>
                            <Badge className={getStatusColor(metric.status)}>{metric.status}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {metric.currentValue !== null ? `${metric.currentValue}${metric.name.includes('Rate') || metric.name.includes('Growth') ? '%' : ''}` : 'N/A'}
                          </div>
                          <p className="text-xs text-muted-foreground">Weight: {metric.weighting}%</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Chart</CardTitle>
                    <CardDescription>
                      Visual representation of {category.name.toLowerCase()} KPI trends
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <KpiChart data={category.metrics} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PermissionGate>
  );
};

export default KpiDashboard;
