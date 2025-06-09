
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { PermissionGate } from "@/components/shared/PermissionGate";
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp, 
  Plus,
  Eye,
  Edit,
  FileText,
  BarChart3,
  Users,
  Settings,
  Calendar,
  Target,
  Award,
  AlertCircle,
  Activity
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Quality Control Types
interface QualityCheck {
  id: string;
  type: string;
  product: string;
  inspector: string;
  status: 'passed' | 'failed' | 'pending' | 'review';
  date: string;
  score: number;
  defects: number;
  notes: string;
  corrective_action?: string;
}

interface QualityAudit {
  id: string;
  name: string;
  type: 'internal' | 'external' | 'supplier' | 'customer';
  auditor: string;
  department: string;
  scheduled_date: string;
  completion_date?: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'overdue';
  score: number;
  findings: number;
  recommendations: string[];
}

interface CorrectiveAction {
  id: string;
  title: string;
  description: string;
  root_cause: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'completed' | 'verified';
  due_date: string;
  completion_date?: string;
  verification_notes?: string;
}

interface QualityMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  period: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "passed":
    case "completed":
    case "verified": return "bg-green-100 text-green-800";
    case "failed":
    case "overdue":
    case "critical": return "bg-red-100 text-red-800";
    case "pending":
    case "scheduled":
    case "open": return "bg-yellow-100 text-yellow-800";
    case "in-progress":
    case "review": return "bg-blue-100 text-blue-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical": return "bg-red-100 text-red-800";
    case "high": return "bg-orange-100 text-orange-800";
    case "medium": return "bg-yellow-100 text-yellow-800";
    case "low": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const QualityControl = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Mock data for Quality Checks
  const [qualityChecks] = useState<QualityCheck[]>([
    {
      id: "QC-001",
      type: "Incoming Inspection",
      product: "Raw Material A",
      inspector: "John Smith",
      status: "passed",
      date: "2024-01-20",
      score: 95,
      defects: 0,
      notes: "All specifications met"
    },
    {
      id: "QC-002",
      type: "In-Process Check",
      product: "Product B",
      inspector: "Sarah Wilson",
      status: "failed",
      date: "2024-01-19",
      score: 78,
      defects: 3,
      notes: "Dimensional tolerance issues found",
      corrective_action: "Adjust machine calibration"
    },
    {
      id: "QC-003",
      type: "Final Inspection",
      product: "Product C",
      inspector: "Mike Johnson",
      status: "pending",
      date: "2024-01-21",
      score: 0,
      defects: 0,
      notes: "Awaiting inspection"
    }
  ]);

  // Mock data for Quality Audits
  const [qualityAudits] = useState<QualityAudit[]>([
    {
      id: "QA-001",
      name: "ISO 9001 Internal Audit",
      type: "internal",
      auditor: "Lisa Davis",
      department: "Manufacturing",
      scheduled_date: "2024-01-25",
      status: "scheduled",
      score: 0,
      findings: 0,
      recommendations: []
    },
    {
      id: "QA-002",
      name: "Supplier Quality Assessment",
      type: "supplier",
      auditor: "Robert Brown",
      department: "Procurement",
      scheduled_date: "2024-01-15",
      completion_date: "2024-01-18",
      status: "completed",
      score: 88,
      findings: 2,
      recommendations: ["Improve documentation", "Update procedures"]
    }
  ]);

  // Mock data for Corrective Actions
  const [correctiveActions] = useState<CorrectiveAction[]>([
    {
      id: "CA-001",
      title: "Dimensional Tolerance Issue",
      description: "Products failing dimensional checks",
      root_cause: "Machine calibration drift",
      assignee: "Tom Engineering",
      priority: "high",
      status: "in-progress",
      due_date: "2024-01-30"
    },
    {
      id: "CA-002",
      title: "Documentation Update",
      description: "Quality procedures need updating",
      root_cause: "Outdated process documents",
      assignee: "Quality Team",
      priority: "medium",
      status: "open",
      due_date: "2024-02-15"
    }
  ]);

  // Mock data for Quality Metrics
  const [qualityMetrics] = useState<QualityMetric[]>([
    {
      id: "QM-001",
      name: "First Pass Yield",
      value: 94.5,
      target: 95.0,
      unit: "%",
      trend: "up",
      period: "This Month"
    },
    {
      id: "QM-002",
      name: "Customer Complaints",
      value: 3,
      target: 5,
      unit: "count",
      trend: "down",
      period: "This Month"
    },
    {
      id: "QM-003",
      name: "Defect Rate",
      value: 0.8,
      target: 1.0,
      unit: "%",
      trend: "stable",
      period: "This Month"
    }
  ]);

  const isSuperUser = currentUser?.role === "superuser";

  const QualityDashboard = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Checks</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">8 pending review</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.5%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Actions</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">2 overdue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96%</div>
            <p className="text-xs text-muted-foreground">Above target</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quality Metrics Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {qualityMetrics.map((metric) => (
                <div key={metric.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{metric.name}</p>
                    <p className="text-sm text-muted-foreground">{metric.period}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{metric.value}{metric.unit}</p>
                    <p className="text-sm text-muted-foreground">Target: {metric.target}{metric.unit}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Quality Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {qualityChecks.filter(check => check.status === 'failed').map((check) => (
                <div key={check.id} className="border-l-4 border-red-500 pl-4">
                  <p className="font-medium">{check.product}</p>
                  <p className="text-sm text-muted-foreground">{check.notes}</p>
                  <p className="text-xs text-muted-foreground">{check.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const QualityChecksTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search quality checks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <PermissionGate module="quality" action="create" fallback={null}>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Quality Check
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Quality Check</DialogTitle>
                <DialogDescription>Add a new quality control check</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="type">Check Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select check type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="incoming">Incoming Inspection</SelectItem>
                      <SelectItem value="in-process">In-Process Check</SelectItem>
                      <SelectItem value="final">Final Inspection</SelectItem>
                      <SelectItem value="random">Random Sampling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="product">Product/Material</Label>
                  <Input id="product" placeholder="Enter product name" />
                </div>
                <div>
                  <Label htmlFor="inspector">Inspector</Label>
                  <Input id="inspector" placeholder="Enter inspector name" />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Enter inspection notes" />
                </div>
                <Button className="w-full">Create Check</Button>
              </div>
            </DialogContent>
          </Dialog>
        </PermissionGate>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quality Checks</CardTitle>
          <CardDescription>Monitor and track quality control inspections</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Check ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Inspector</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qualityChecks.map((check) => (
                <TableRow key={check.id}>
                  <TableCell className="font-medium">{check.id}</TableCell>
                  <TableCell>{check.type}</TableCell>
                  <TableCell>{check.product}</TableCell>
                  <TableCell>{check.inspector}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(check.status)}>
                      {check.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{check.score}%</TableCell>
                  <TableCell>{check.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const QualityAuditsTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search audits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <PermissionGate module="quality" action="create" fallback={null}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Audit
          </Button>
        </PermissionGate>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quality Audits</CardTitle>
          <CardDescription>Manage internal and external quality audits</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Audit ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Auditor</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qualityAudits.map((audit) => (
                <TableRow key={audit.id}>
                  <TableCell className="font-medium">{audit.id}</TableCell>
                  <TableCell>{audit.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{audit.type}</Badge>
                  </TableCell>
                  <TableCell>{audit.auditor}</TableCell>
                  <TableCell>{audit.department}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(audit.status)}>
                      {audit.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{audit.score > 0 ? `${audit.score}%` : '-'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const CorrectiveActionsTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search corrective actions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <PermissionGate module="quality" action="create" fallback={null}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Action
          </Button>
        </PermissionGate>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Corrective Actions</CardTitle>
          <CardDescription>Track and manage quality improvement actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {correctiveActions.map((action) => (
                <TableRow key={action.id}>
                  <TableCell className="font-medium">{action.id}</TableCell>
                  <TableCell>{action.title}</TableCell>
                  <TableCell>{action.assignee}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(action.priority)}>
                      {action.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(action.status)}>
                      {action.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{action.due_date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const MetricsTab = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {qualityMetrics.map((metric) => (
          <Card key={metric.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}{metric.unit}</div>
              <p className="text-xs text-muted-foreground">
                Target: {metric.target}{metric.unit} | {metric.period}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className={`h-3 w-3 mr-1 ${
                  metric.trend === 'up' ? 'text-green-500' : 
                  metric.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                }`} />
                <span className="text-xs text-muted-foreground">
                  {metric.trend === 'up' ? 'Improving' : 
                   metric.trend === 'down' ? 'Declining' : 'Stable'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Statistical Process Control</CardTitle>
          <CardDescription>Monitor process variation and control limits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">SPC Charts will be displayed here</p>
              <p className="text-sm text-gray-400">Control charts, capability studies, and trend analysis</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (!isSuperUser) {
    return (
      <PermissionGate module="quality" action="view">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Quality Control</h2>
          </div>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Access restricted. Contact your administrator for quality control permissions.
            </AlertDescription>
          </Alert>
        </div>
      </PermissionGate>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Quality Control System</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Reports
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="checks">Quality Checks</TabsTrigger>
          <TabsTrigger value="audits">Audits</TabsTrigger>
          <TabsTrigger value="actions">Corrective Actions</TabsTrigger>
          <TabsTrigger value="metrics">Metrics & SPC</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <QualityDashboard />
        </TabsContent>

        <TabsContent value="checks">
          <QualityChecksTab />
        </TabsContent>

        <TabsContent value="audits">
          <QualityAuditsTab />
        </TabsContent>

        <TabsContent value="actions">
          <CorrectiveActionsTab />
        </TabsContent>

        <TabsContent value="metrics">
          <MetricsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QualityControl;
