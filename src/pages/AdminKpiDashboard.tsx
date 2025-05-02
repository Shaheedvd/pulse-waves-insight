
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Plus, Download, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AdminKpiTable from "@/components/kpi/AdminKpiTable";
import AdminKpiForm from "@/components/kpi/AdminKpiForm";
import { AdminKpi } from "@/types/marketing";
import { Progress } from "@/components/ui/progress";

const AdminKpiDashboard = () => {
  const { currentUser, hasPermission } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("marketing");
  const [isAddKpiModalOpen, setIsAddKpiModalOpen] = useState(false);
  
  // Check if user has permission to access KPI dashboard
  const canAccessKpis = currentUser?.role === "admin" || 
    currentUser?.role === "manager" || 
    currentUser?.role === "superuser";

  const canEditKpis = currentUser?.role === "manager" || currentUser?.role === "superuser";

  if (!canAccessKpis) {
    // Redirect unauthorized users
    React.useEffect(() => {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access admin KPI dashboard",
        variant: "destructive",
      });
      navigate("/dashboard");
    }, [navigate, toast]);
    return null;
  }

  // Mock KPI summary data
  const kpiSummary = {
    marketing: {
      completion: 78,
      trend: "up" as const,
      status: "On Track"
    },
    sales: {
      completion: 65,
      trend: "stable" as const,
      status: "Needs Attention"
    },
    operations: {
      completion: 82,
      trend: "up" as const,
      status: "On Track"
    },
    training: {
      completion: 56,
      trend: "down" as const,
      status: "At Risk"
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin KPI Dashboard</h1>
        <p className="text-muted-foreground">
          Track and manage key performance indicators for administrative staff
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Marketing KPIs</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiSummary.marketing.completion}%</div>
            <Progress value={kpiSummary.marketing.completion} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {kpiSummary.marketing.status}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales KPIs</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiSummary.sales.completion}%</div>
            <Progress value={kpiSummary.sales.completion} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {kpiSummary.sales.status}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operations KPIs</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiSummary.operations.completion}%</div>
            <Progress value={kpiSummary.operations.completion} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {kpiSummary.operations.status}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training KPIs</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiSummary.training.completion}%</div>
            <Progress value={kpiSummary.training.completion} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {kpiSummary.training.status}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2 ml-4">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          {canEditKpis && (
            <Button onClick={() => setIsAddKpiModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add KPI
            </Button>
          )}
        </div>
      </div>

      <TabsContent value="marketing" className="space-y-4">
        <AdminKpiTable category="marketing" canEdit={canEditKpis} />
      </TabsContent>

      <TabsContent value="sales" className="space-y-4">
        <AdminKpiTable category="sales" canEdit={canEditKpis} />
      </TabsContent>
        
      <TabsContent value="operations" className="space-y-4">
        <AdminKpiTable category="operations" canEdit={canEditKpis} />
      </TabsContent>
        
      <TabsContent value="training" className="space-y-4">
        <AdminKpiTable category="training" canEdit={canEditKpis} />
      </TabsContent>

      {/* Add KPI Modal */}
      <Dialog open={isAddKpiModalOpen} onOpenChange={setIsAddKpiModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Admin KPI</DialogTitle>
          </DialogHeader>
          <AdminKpiForm 
            onClose={() => setIsAddKpiModalOpen(false)}
            onSuccess={() => {
              setIsAddKpiModalOpen(false);
              toast({
                title: "KPI Created",
                description: "Admin KPI has been created successfully",
              });
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminKpiDashboard;
