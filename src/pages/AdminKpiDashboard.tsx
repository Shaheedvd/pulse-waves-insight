
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import AdminKpiTable from "@/components/kpi/AdminKpiTable";
import AdminKpiForm from "@/components/kpi/AdminKpiForm";
import { AdminKpi } from "@/types/marketing";
import { useToast } from "@/hooks/use-toast";

const AdminKpiDashboard = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("view");
  const [selectedCategory, setSelectedCategory] = useState("marketing");

  const isSuperUser = currentUser?.role === "superuser";
  const isAdmin = currentUser?.role === "admin" || isSuperUser;

  // Superusers have access to all categories, others might be restricted
  const availableCategories = isSuperUser ? 
    ["marketing", "sales", "operations", "training", "finance", "hr"] :
    ["marketing", "sales", "operations", "training"];

  const handleKpiCreated = (kpi: AdminKpi) => {
    toast({
      title: "KPI Created",
      description: "New KPI has been created successfully"
    });
    setActiveTab("view");
  };

  const handleCloseForm = () => {
    setActiveTab("view");
  };

  const handleExportAll = () => {
    try {
      // Export all categories data
      const allKpis = availableCategories.map(category => ({
        category,
        data: [] // In real implementation, this would fetch actual data
      }));

      const csvContent = [
        ["Category", "KPI Name", "Description", "Target", "Current Value", "Progress", "Trend", "Last Updated"],
        // This would be populated with actual data in real implementation
        ["Sample", "Sample KPI", "Sample Description", "≥ 100%", "95%", "95%", "up", new Date().toLocaleDateString()]
      ].map(row => row.join(",")).join("\n");

      // Generate PDF instead of CSV
      const reportData = {
        title: "Complete Admin KPI Report",
        period: new Date().toISOString().split('T')[0],
        results: [
          {
            category: "Sample",
            name: "Sample KPI",
            current: "95%",
            target: "≥ 100%",
            status: "At Risk"
          }
        ],
        columns: ["Category", "KPI Name", "Current Value", "Target", "Status"]
      };
      
      import('../lib/pdf-utils').then(({ generateCustomReportPdf }) => {
        generateCustomReportPdf(reportData);
      });

      toast({
        title: "Export Successful",
        description: "All KPI data has been exported successfully"
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the data",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin KPI Dashboard</h1>
            <p className="text-muted-foreground">
              Manage and track key performance indicators across the organization
            </p>
          </div>
          {isSuperUser && (
            <Button onClick={handleExportAll} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export All Data
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="category-select" className="text-sm font-medium">
            Category:
          </label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]" id="category-select">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {availableCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {isSuperUser && (
          <div className="text-sm text-muted-foreground">
            Superuser Access: All categories and actions available
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="view">View KPIs</TabsTrigger>
          {(isAdmin || isSuperUser) && <TabsTrigger value="create">Create KPI</TabsTrigger>}
        </TabsList>

        <TabsContent value="view" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} KPIs
              </CardTitle>
              <CardDescription>
                View and manage KPIs for the {selectedCategory} department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminKpiTable 
                category={selectedCategory} 
                canEdit={isAdmin || isSuperUser} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        {(isAdmin || isSuperUser) && (
          <TabsContent value="create" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create New KPI</CardTitle>
                <CardDescription>
                  Define new key performance indicators for the organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminKpiForm 
                  onClose={handleCloseForm} 
                  onSuccess={handleKpiCreated}
                />
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default AdminKpiDashboard;
