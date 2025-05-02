
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Slider } from "@/components/ui/slider";
import { KpiMetric } from "@/types/kpi";
import { ArrowDown, ArrowUp, ArrowRight, Plus, Edit, Download, BarChart } from "lucide-react";

const initialKpis: KpiMetric[] = [
  {
    id: "1",
    category: "financial",
    name: "Net Income",
    description: "Profit after expenses",
    target: "≥ R20,000/month",
    weighting: 20,
    currentValue: 22500,
    status: "exceeding",
    trend: "up"
  },
  {
    id: "2",
    category: "financial",
    name: "Revenue per Audit",
    description: "Total Revenue ÷ Total Number of Audits",
    target: "≥ R1,000",
    weighting: 10,
    currentValue: 950,
    status: "below",
    trend: "down"
  },
  {
    id: "3",
    category: "financial",
    name: "Operating Cash Flow",
    description: "Cash from operations only",
    target: "≥ R15,000/month",
    weighting: 10,
    currentValue: 16200,
    status: "meeting",
    trend: "stable"
  },
  {
    id: "4",
    category: "operational",
    name: "Audits Completed on Time",
    description: "% of audits submitted by the due date",
    target: "≥ 95%",
    weighting: 15,
    currentValue: 97.5,
    status: "exceeding",
    trend: "up"
  },
  {
    id: "5",
    category: "operational",
    name: "Average Audit Score",
    description: "Average score across all evaluations",
    target: "≥ 85%",
    weighting: 10,
    currentValue: 84.2,
    status: "below",
    trend: "stable"
  },
  {
    id: "6",
    category: "operational",
    name: "Evaluation Error Rate",
    description: "% of audits returned for correction",
    target: "≤ 5%",
    weighting: 5,
    currentValue: 3.8,
    status: "exceeding",
    trend: "down"
  },
  {
    id: "7",
    category: "client",
    name: "Client Satisfaction Score (CSAT)",
    description: "Based on client feedback post-delivery",
    target: "≥ 4.5/5",
    weighting: 10,
    currentValue: 4.7,
    status: "exceeding",
    trend: "up"
  },
  {
    id: "8",
    category: "client",
    name: "Client Retention Rate",
    description: "% of returning clients",
    target: "≥ 80%",
    weighting: 10,
    currentValue: 85,
    status: "meeting",
    trend: "stable"
  },
  {
    id: "9",
    category: "internal",
    name: "Evaluator Performance Rating",
    description: "Based on audit quality, punctuality, etc.",
    target: "≥ 90% average",
    weighting: 5,
    currentValue: 92.3,
    status: "exceeding",
    trend: "stable"
  },
  {
    id: "10",
    category: "internal",
    name: "Training Completion Rate",
    description: "% of evaluators trained on new standards",
    target: "100%",
    weighting: 5,
    currentValue: 94.5,
    status: "below",
    trend: "up"
  }
];

const KpiDashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [kpis, setKpis] = useState<KpiMetric[]>(initialKpis);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentKpi, setCurrentKpi] = useState<KpiMetric | null>(null);
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const isSuperUserOrManager = currentUser?.role === "superuser" || currentUser?.role === "manager";

  // New KPI form state
  const [newKpi, setNewKpi] = useState<Partial<KpiMetric>>({
    category: "financial",
    name: "",
    description: "",
    target: "",
    weighting: 5,
    currentValue: null,
    status: "pending",
    trend: "none"
  });

  const filteredKpis = selectedCategory === "all" 
    ? kpis 
    : kpis.filter(kpi => kpi.category === selectedCategory);

  const getStatusColor = (status: KpiMetric["status"]) => {
    switch (status) {
      case "exceeding": return "bg-green-100 text-green-800";
      case "meeting": return "bg-blue-100 text-blue-800";
      case "below": return "bg-yellow-100 text-yellow-800";
      case "critical": return "bg-red-100 text-red-800";
      case "pending": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: KpiMetric["trend"]) => {
    switch (trend) {
      case "up": return <ArrowUp className="h-4 w-4 text-green-600" />;
      case "down": return <ArrowDown className="h-4 w-4 text-red-600" />;
      case "stable": return <ArrowRight className="h-4 w-4 text-blue-600" />;
      default: return null;
    }
  };

  const handleAddKpi = () => {
    if (!newKpi.name || !newKpi.description || !newKpi.target) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const kpiToAdd: KpiMetric = {
      id: (kpis.length + 1).toString(),
      category: newKpi.category as KpiMetric["category"],
      name: newKpi.name,
      description: newKpi.description,
      target: newKpi.target,
      weighting: newKpi.weighting || 5,
      currentValue: newKpi.currentValue,
      status: newKpi.currentValue !== null ? determineStatus(newKpi) : "pending",
      trend: "none"
    };

    setKpis([...kpis, kpiToAdd]);
    setIsAddModalOpen(false);
    
    toast({
      title: "KPI Added",
      description: `${kpiToAdd.name} has been added to your KPI dashboard`
    });
    
    resetNewKpi();
  };

  const determineStatus = (kpi: Partial<KpiMetric>): KpiMetric["status"] => {
    // This is a simplified implementation
    // In a real app, you'd parse the target and compare it properly
    if (!kpi.currentValue) return "pending";
    
    // Simple logic for demonstration
    if (kpi.target?.includes("≥")) {
      const targetValue = parseFloat(kpi.target.replace(/[^0-9.]/g, ""));
      if (kpi.currentValue >= targetValue * 1.05) return "exceeding";
      if (kpi.currentValue >= targetValue) return "meeting";
      if (kpi.currentValue >= targetValue * 0.9) return "below";
      return "critical";
    } else if (kpi.target?.includes("≤")) {
      const targetValue = parseFloat(kpi.target.replace(/[^0-9.]/g, ""));
      if (kpi.currentValue <= targetValue * 0.9) return "exceeding";
      if (kpi.currentValue <= targetValue) return "meeting";
      if (kpi.currentValue <= targetValue * 1.1) return "below";
      return "critical";
    }
    
    return "pending";
  };

  const resetNewKpi = () => {
    setNewKpi({
      category: "financial",
      name: "",
      description: "",
      target: "",
      weighting: 5,
      currentValue: null,
      status: "pending",
      trend: "none"
    });
  };

  const handleEditKpi = () => {
    if (!currentKpi) return;

    const updatedKpis = kpis.map(kpi => 
      kpi.id === currentKpi.id ? currentKpi : kpi
    );

    setKpis(updatedKpis);
    setIsEditModalOpen(false);
    
    toast({
      title: "KPI Updated",
      description: `${currentKpi.name} has been updated successfully`
    });
  };

  const openEditModal = (kpi: KpiMetric) => {
    setCurrentKpi({...kpi});
    setIsEditModalOpen(true);
  };

  const handleExportKpis = () => {
    toast({
      title: "KPI Data Exported",
      description: "KPI metrics have been exported successfully"
    });
  };

  const calculateCategoryCompletion = (category: string): number => {
    const categoryKpis = kpis.filter(kpi => kpi.category === category);
    const metKpis = categoryKpis.filter(kpi => kpi.status === "meeting" || kpi.status === "exceeding");
    
    return categoryKpis.length > 0 ? (metKpis.length / categoryKpis.length) * 100 : 0;
  };

  const financialCompletion = calculateCategoryCompletion("financial");
  const operationalCompletion = calculateCategoryCompletion("operational");
  const clientCompletion = calculateCategoryCompletion("client");
  const internalCompletion = calculateCategoryCompletion("internal");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">KPI Dashboard</h1>
          <p className="text-muted-foreground">
            Track and manage key performance indicators
          </p>
        </div>
        <div className="flex space-x-2">
          {isSuperUserOrManager && (
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add KPI
            </Button>
          )}
          <Button variant="outline" onClick={handleExportKpis}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Financial KPIs</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{financialCompletion.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              {financialCompletion >= 80 ? "On track" : "Needs attention"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operational KPIs</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{operationalCompletion.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              {operationalCompletion >= 80 ? "On track" : "Needs attention"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Client KPIs</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientCompletion.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              {clientCompletion >= 80 ? "On track" : "Needs attention"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Internal KPIs</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{internalCompletion.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              {internalCompletion >= 80 ? "On track" : "Needs attention"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>KPI Metrics</CardTitle>
              <CardDescription>
                Monitor and track key performance indicators across departments
              </CardDescription>
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="internal">Internal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>KPI Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Current</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Trend</TableHead>
                {isSuperUserOrManager && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKpis.length > 0 ? (
                filteredKpis.map((kpi) => (
                  <TableRow key={kpi.id}>
                    <TableCell className="font-medium capitalize">
                      {kpi.category}
                    </TableCell>
                    <TableCell>{kpi.name}</TableCell>
                    <TableCell>{kpi.description}</TableCell>
                    <TableCell>{kpi.target}</TableCell>
                    <TableCell>
                      {kpi.currentValue !== null ? kpi.currentValue : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(kpi.status)}>
                        {kpi.status.charAt(0).toUpperCase() + kpi.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{kpi.weighting}%</TableCell>
                    <TableCell>{getTrendIcon(kpi.trend)}</TableCell>
                    {isSuperUserOrManager && (
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditModal(kpi)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={isSuperUserOrManager ? 9 : 8} className="h-24 text-center">
                    No KPIs found for the selected category.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add KPI Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New KPI</DialogTitle>
            <DialogDescription>
              Create a new key performance indicator to track
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="kpi-name">KPI Name</Label>
                <Input
                  id="kpi-name"
                  value={newKpi.name}
                  onChange={(e) => setNewKpi({...newKpi, name: e.target.value})}
                  placeholder="Net Income"
                />
              </div>
              <div>
                <Label htmlFor="kpi-category">Category</Label>
                <Select
                  value={newKpi.category}
                  onValueChange={(value: any) => setNewKpi({...newKpi, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="operational">Operational</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="internal">Internal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="kpi-description">Description</Label>
              <Input
                id="kpi-description"
                value={newKpi.description}
                onChange={(e) => setNewKpi({...newKpi, description: e.target.value})}
                placeholder="Profit after expenses"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="kpi-target">Target</Label>
                <Input
                  id="kpi-target"
                  value={newKpi.target}
                  onChange={(e) => setNewKpi({...newKpi, target: e.target.value})}
                  placeholder="≥ R20,000/month"
                />
              </div>
              <div>
                <Label htmlFor="kpi-current">Current Value (Optional)</Label>
                <Input
                  id="kpi-current"
                  type="number"
                  value={newKpi.currentValue !== null ? newKpi.currentValue : ''}
                  onChange={(e) => setNewKpi({...newKpi, currentValue: e.target.value ? Number(e.target.value) : null})}
                  placeholder="22500"
                />
              </div>
            </div>
            <div>
              <Label>Weighting ({newKpi.weighting}%)</Label>
              <Slider
                className="mt-2"
                value={[newKpi.weighting || 5]}
                min={1}
                max={25}
                step={1}
                onValueChange={(values) => setNewKpi({...newKpi, weighting: values[0]})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddKpi}>Add KPI</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit KPI Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit KPI</DialogTitle>
            <DialogDescription>
              Update the details of this key performance indicator
            </DialogDescription>
          </DialogHeader>
          {currentKpi && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-kpi-name">KPI Name</Label>
                  <Input
                    id="edit-kpi-name"
                    value={currentKpi.name}
                    onChange={(e) => setCurrentKpi({...currentKpi, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-kpi-category">Category</Label>
                  <Select
                    value={currentKpi.category}
                    onValueChange={(value: any) => setCurrentKpi({...currentKpi, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="operational">Operational</SelectItem>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="internal">Internal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="edit-kpi-description">Description</Label>
                <Input
                  id="edit-kpi-description"
                  value={currentKpi.description}
                  onChange={(e) => setCurrentKpi({...currentKpi, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-kpi-target">Target</Label>
                  <Input
                    id="edit-kpi-target"
                    value={currentKpi.target}
                    onChange={(e) => setCurrentKpi({...currentKpi, target: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-kpi-current">Current Value</Label>
                  <Input
                    id="edit-kpi-current"
                    type="number"
                    value={currentKpi.currentValue !== null ? currentKpi.currentValue : ''}
                    onChange={(e) => setCurrentKpi({
                      ...currentKpi, 
                      currentValue: e.target.value ? Number(e.target.value) : null
                    })}
                  />
                </div>
              </div>
              <div>
                <Label>Weighting ({currentKpi.weighting}%)</Label>
                <Slider
                  className="mt-2"
                  value={[currentKpi.weighting]}
                  min={1}
                  max={25}
                  step={1}
                  onValueChange={(values) => setCurrentKpi({...currentKpi, weighting: values[0]})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-kpi-status">Status</Label>
                  <Select
                    value={currentKpi.status}
                    onValueChange={(value: any) => setCurrentKpi({...currentKpi, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exceeding">Exceeding</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="below">Below</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-kpi-trend">Trend</Label>
                  <Select
                    value={currentKpi.trend}
                    onValueChange={(value: any) => setCurrentKpi({...currentKpi, trend: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="up">Improving (Up)</SelectItem>
                      <SelectItem value="down">Declining (Down)</SelectItem>
                      <SelectItem value="stable">Stable</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleEditKpi}>Update KPI</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KpiDashboard;
