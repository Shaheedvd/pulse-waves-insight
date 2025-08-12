
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Activity,
  Building,
  FileText,
  Calendar
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useGlobal } from "@/contexts/GlobalContext";
import AlertReviewModal, { AlertData } from "@/components/dashboard/AlertReviewModal";

const ExecutiveDashboard = () => {
  const { currentUser } = useAuth();
  const { addNotification } = useGlobal();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAlert, setSelectedAlert] = useState<AlertData | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alerts, setAlerts] = useState<AlertData[]>([
    { 
      id: 1, 
      type: "critical", 
      message: "2 projects are overdue", 
      module: "Projects",
      status: "pending",
      priority: "high",
      assignedTo: "sarah.johnson@company.com",
      dueDate: "2024-01-20",
      description: "Two critical projects have exceeded their deadlines and require immediate attention. Budget impact and resource reallocation may be necessary.",
      actionItems: [
        "Contact project managers for status update",
        "Assess budget impact and resource requirements",
        "Develop recovery plan with revised timelines",
        "Communicate status to stakeholders"
      ]
    },
    { 
      id: 2, 
      type: "warning", 
      message: "Q4 budget review pending", 
      module: "Finance",
      status: "pending",
      priority: "medium",
      dueDate: "2024-01-25",
      description: "Quarterly budget review is approaching deadline. Several departments have pending expenditure approvals that need executive review.",
      actionItems: [
        "Schedule budget review meeting",
        "Collect departmental reports",
        "Review pending expenditure requests",
        "Approve or reject budget allocations"
      ]
    },
    { 
      id: 3, 
      type: "info", 
      message: "New compliance audit scheduled", 
      module: "Compliance",
      status: "pending",
      priority: "medium",
      assignedTo: "emily.davis@company.com",
      dueDate: "2024-02-15",
      description: "External compliance audit has been scheduled for ISO 27001 surveillance. Preparation activities need to be coordinated across departments.",
      actionItems: [
        "Prepare documentation for audit review",
        "Schedule staff training sessions",
        "Set up audit workspace and system access",
        "Coordinate with external auditors"
      ]
    }
  ]);

  // Mock executive-level data - in real app, this would come from APIs
  const executiveMetrics = {
    revenue: {
      current: 2450000,
      previous: 2200000,
      target: 3000000,
      growth: 11.4
    },
    employees: {
      total: 247,
      active: 235,
      onLeave: 12,
      newHires: 8
    },
    projects: {
      total: 23,
      completed: 15,
      inProgress: 6,
      overdue: 2
    },
    compliance: {
      score: 94,
      audits: {
        passed: 18,
        failed: 1,
        pending: 3
      }
    },
    kpis: [
      { name: "Customer Satisfaction", value: 87, target: 90, trend: "up" },
      { name: "Employee Retention", value: 92, target: 95, trend: "up" },
      { name: "Operational Efficiency", value: 78, target: 85, trend: "down" },
      { name: "Quality Score", value: 94, target: 95, trend: "up" }
    ]
  };


  useEffect(() => {
    addNotification({
      userId: currentUser?.id || "",
      title: "Executive Dashboard Accessed",
      message: "Executive dashboard was accessed for strategic overview",
      type: "info",
      module: "executive"
    });
  }, [currentUser, addNotification]);

  const handleAlertReview = (alert: AlertData) => {
    setSelectedAlert(alert);
    setIsAlertModalOpen(true);
  };

  const handleUpdateAlert = (alertId: number, updates: Partial<AlertData>) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId ? { ...alert, ...updates } : alert
      )
    );
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "warning": return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <CheckCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
          <p className="text-muted-foreground">
            Strategic overview of organizational performance and key metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-5 w-5" />
          <Badge variant="secondary">C-Suite Access</Badge>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(executiveMetrics.revenue.current)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              +{executiveMetrics.revenue.growth}% from last quarter
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{executiveMetrics.employees.active}</div>
            <p className="text-xs text-muted-foreground">
              {executiveMetrics.employees.newHires} new hires this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{executiveMetrics.projects.inProgress}</div>
            <p className="text-xs text-muted-foreground">
              {executiveMetrics.projects.overdue} overdue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{executiveMetrics.compliance.score}%</div>
            <Progress value={executiveMetrics.compliance.score} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Critical Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Priority Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map(alert => (
              <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getAlertIcon(alert.type)}
                  <div>
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-sm text-muted-foreground">{alert.module}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAlertReview(alert)}
                >
                  Review
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="kpis">KPIs</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current: {formatCurrency(executiveMetrics.revenue.current)}</span>
                    <span>Target: {formatCurrency(executiveMetrics.revenue.target)}</span>
                  </div>
                  <Progress value={(executiveMetrics.revenue.current / executiveMetrics.revenue.target) * 100} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>HR Operations</span>
                    <Badge variant="secondary">Healthy</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Finance</span>
                    <Badge variant="secondary">Review Needed</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Operations</span>
                    <Badge variant="secondary">Excellent</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="kpis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {executiveMetrics.kpis.map((kpi, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{kpi.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">{kpi.value}%</span>
                      <div className="flex items-center gap-1">
                        {kpi.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        <span className="text-sm text-muted-foreground">Target: {kpi.target}%</span>
                      </div>
                    </div>
                    <Progress value={kpi.value} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{executiveMetrics.projects.completed}</div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{executiveMetrics.projects.inProgress}</div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{executiveMetrics.projects.overdue}</div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Overall Compliance Score</span>
                    <span className="font-bold">{executiveMetrics.compliance.score}%</span>
                  </div>
                  <Progress value={executiveMetrics.compliance.score} />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{executiveMetrics.compliance.audits.passed}</div>
                    <p className="text-sm text-muted-foreground">Passed Audits</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{executiveMetrics.compliance.audits.pending}</div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{executiveMetrics.compliance.audits.failed}</div>
                    <p className="text-sm text-muted-foreground">Failed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertReviewModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        alert={selectedAlert}
        onUpdateAlert={handleUpdateAlert}
      />
    </div>
  );
};

export default ExecutiveDashboard;
