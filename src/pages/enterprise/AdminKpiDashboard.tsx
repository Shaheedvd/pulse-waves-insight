import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Plus, Target, TrendingUp, TrendingDown, AlertTriangle, Download, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEnterprise } from "@/contexts/EnterpriseContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { PermissionGate } from "@/components/shared/PermissionGate";
import { KPITarget } from "@/types/enterprise";

const AdminKpiDashboard = () => {
  const { kpiTargets, addKPITarget, updateKPITarget, deleteKPITarget } = useEnterprise();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingKPI, setEditingKPI] = useState<KPITarget | null>(null);
  const [viewingKPI, setViewingKPI] = useState<KPITarget | null>(null);
  const [filterDepartment, setFilterDepartment] = useState("all");

  const isSuperUser = currentUser?.role === "superuser";

  const form = useForm<{
    name: string;
    description: string;
    department: string;
    owner: string;
    period: "monthly" | "quarterly" | "yearly";
    targetValue: number;
    actualValue: number;
    unit: string;
  }>({
    defaultValues: {
      name: "",
      description: "",
      department: "",
      owner: "",
      period: "monthly",
      targetValue: 0,
      actualValue: 0,
      unit: ""
    }
  });

  const departments = ["Sales", "Marketing", "Finance", "HR", "Operations", "IT", "Legal"];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const filteredKPIs = filterDepartment === "all" 
    ? kpiTargets 
    : kpiTargets.filter(kpi => kpi.department === filterDepartment);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "exceeding": return "bg-green-100 text-green-800";
      case "on-track": return "bg-blue-100 text-blue-800";
      case "at-risk": return "bg-yellow-100 text-yellow-800";
      case "behind": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleSubmit = (data: any) => {
    const progress = data.targetValue > 0 ? (data.actualValue / data.targetValue) * 100 : 0;
    let status: "on-track" | "at-risk" | "behind" | "exceeding" = "on-track";
    
    if (progress >= 110) status = "exceeding";
    else if (progress >= 90) status = "on-track";
    else if (progress >= 70) status = "at-risk";
    else status = "behind";

    const kpiData = { ...data, progress, status };

    if (editingKPI) {
      updateKPITarget(editingKPI.id, kpiData);
      toast({ title: "KPI Updated", description: "KPI target has been updated successfully" });
    } else {
      addKPITarget(kpiData);
      toast({ title: "KPI Created", description: "New KPI target has been created successfully" });
    }

    setIsDialogOpen(false);
    setEditingKPI(null);
    form.reset();
  };

  const handleView = (kpi: KPITarget) => {
    setViewingKPI(kpi);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (kpi: KPITarget) => {
    setEditingKPI(kpi);
    form.reset({
      name: kpi.name,
      description: kpi.description,
      department: kpi.department,
      owner: kpi.owner,
      period: kpi.period,
      targetValue: kpi.targetValue,
      actualValue: kpi.actualValue,
      unit: kpi.unit
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!isSuperUser) {
      toast({
        title: "Access Denied",
        description: "Only superusers can delete KPIs",
        variant: "destructive"
      });
      return;
    }
    deleteKPITarget(id);
    toast({ title: "KPI Deleted", description: "KPI has been deleted successfully" });
  };

  const handleExportReport = () => {
    try {
      const csvContent = [
        ["KPI Name", "Department", "Owner", "Period", "Target", "Actual", "Progress", "Status"],
        ...filteredKPIs.map(kpi => [
          kpi.name,
          kpi.department,
          kpi.owner,
          kpi.period,
          `${kpi.targetValue}${kpi.unit}`,
          `${kpi.actualValue}${kpi.unit}`,
          `${Math.round(kpi.progress)}%`,
          kpi.status.replace("-", " ")
        ])
      ].map(row => row.join(",")).join("\n");

      // Generate PDF instead of CSV
      const reportData = {
        title: `KPI Report - ${filterDepartment}`,
        period: new Date().toISOString().split('T')[0],
        results: filteredKPIs.map(kpi => ({
          department: kpi.department,
          name: kpi.name,
          target: `${kpi.targetValue}${kpi.unit}`,
          actual: `${kpi.actualValue}${kpi.unit}`,
          status: kpi.status.replace("-", " ")
        })),
        columns: ["Department", "Metric", "Current Value", "Target", "Status"]
      };
      
      import('../../lib/pdf-utils').then(({ generateCustomReportPdf }) => {
        generateCustomReportPdf(reportData);
      });

      toast({
        title: "Export Successful",
        description: "KPI report has been exported successfully"
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the data",
        variant: "destructive"
      });
    }
  };

  // Calculate department performance data
  const departmentData = departments.map(dept => {
    const deptKPIs = kpiTargets.filter(kpi => kpi.department === dept);
    const avgProgress = deptKPIs.length > 0 
      ? deptKPIs.reduce((sum, kpi) => sum + kpi.progress, 0) / deptKPIs.length 
      : 0;
    return { name: dept, performance: Math.round(avgProgress), count: deptKPIs.length };
  });

  const statusDistribution = [
    { name: "Exceeding", value: kpiTargets.filter(k => k.status === "exceeding").length },
    { name: "On Track", value: kpiTargets.filter(k => k.status === "on-track").length },
    { name: "At Risk", value: kpiTargets.filter(k => k.status === "at-risk").length },
    { name: "Behind", value: kpiTargets.filter(k => k.status === "behind").length },
  ];

  return (
    <PermissionGate module="dashboard" action="read">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin KPI Dashboard</h1>
            <p className="text-muted-foreground">Track and manage department KPIs across the organization</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportReport}>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add KPI
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingKPI ? "Edit KPI" : "Create New KPI"}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>KPI Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Monthly Revenue Growth" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe the KPI..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Department</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {departments.map(dept => (
                                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="period"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Period</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="quarterly">Quarterly</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="owner"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Owner</FormLabel>
                          <FormControl>
                            <Input placeholder="John Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="targetValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="100" {...field} onChange={e => field.onChange(+e.target.value)} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="actualValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Actual</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="85" {...field} onChange={e => field.onChange(+e.target.value)} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="unit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unit</FormLabel>
                            <FormControl>
                              <Input placeholder="%" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingKPI ? "Update" : "Create"} KPI
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total KPIs</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpiTargets.length}</div>
              <p className="text-xs text-muted-foreground">Across all departments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Exceeding Target</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {kpiTargets.filter(k => k.status === "exceeding").length}
              </div>
              <p className="text-xs text-muted-foreground">Outstanding performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">At Risk</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {kpiTargets.filter(k => k.status === "at-risk").length}
              </div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Behind Target</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {kpiTargets.filter(k => k.status === "behind").length}
              </div>
              <p className="text-xs text-muted-foreground">Require action</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Average KPI performance by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="performance" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>KPI Status Distribution</CardTitle>
              <CardDescription>Current status breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KPI Table */}
        <Card>
          <CardHeader>
            <CardTitle>KPI Management</CardTitle>
            <div className="flex items-center space-x-2">
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>KPI Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Actual</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredKPIs.map((kpi) => (
                  <TableRow key={kpi.id}>
                    <TableCell className="font-medium">{kpi.name}</TableCell>
                    <TableCell>{kpi.department}</TableCell>
                    <TableCell>{kpi.owner}</TableCell>
                    <TableCell>{kpi.targetValue}{kpi.unit}</TableCell>
                    <TableCell>{kpi.actualValue}{kpi.unit}</TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <Progress value={kpi.progress} className="w-[60px]" />
                        <span className="text-xs">{Math.round(kpi.progress)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(kpi.status)}>
                        {kpi.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleView(kpi)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(kpi)}>
                          Edit
                        </Button>
                        {isSuperUser && (
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(kpi.id)}>
                            Delete
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* View KPI Details Modal */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>KPI Details</DialogTitle>
            </DialogHeader>
            {viewingKPI && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg">{viewingKPI.name}</h4>
                  <p className="text-muted-foreground">{viewingKPI.department} Department</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <p className="text-sm">{viewingKPI.description}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Owner</label>
                    <p className="text-sm">{viewingKPI.owner}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Target Value</label>
                    <p className="text-lg font-semibold">{viewingKPI.targetValue}{viewingKPI.unit}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Actual Value</label>
                    <p className="text-lg font-semibold">{viewingKPI.actualValue}{viewingKPI.unit}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Progress</label>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(viewingKPI.status)}>
                        {viewingKPI.status.replace("-", " ")}
                      </Badge>
                      <span className="text-sm">({Math.round(viewingKPI.progress)}%)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Period</label>
                  <p className="text-sm capitalize">{viewingKPI.period}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PermissionGate>
  );
};

export default AdminKpiDashboard;
