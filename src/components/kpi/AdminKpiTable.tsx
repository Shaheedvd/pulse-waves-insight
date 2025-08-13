
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash, ArrowUp, ArrowDown, ArrowRight, Eye, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AdminKpi } from "@/types/marketing";
import AdminKpiForm from "./AdminKpiForm";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Sample KPI data
const sampleKpis: { [key: string]: AdminKpi[] } = {
  "marketing": [
    {
      id: "1",
      name: "Social Media Engagement",
      category: "marketing",
      description: "Measures likes, shares, comments across platforms",
      target: "≥ 15% growth month-over-month",
      current: 17.5,
      unit: "%",
      progress: 117,
      trend: "up",
      lastUpdated: "2025-04-28"
    },
    {
      id: "2",
      name: "Marketing Tasks Completion",
      category: "marketing",
      description: "Percentage of assigned marketing tasks completed on time",
      target: "≥ 90%",
      current: 86,
      unit: "%",
      progress: 95.6,
      trend: "down",
      lastUpdated: "2025-04-28"
    }
  ],
  "sales": [
    {
      id: "3",
      name: "New Client Acquisition",
      category: "sales",
      description: "Number of new clients onboarded per month",
      target: "≥ 4 per month",
      current: 5,
      unit: "clients",
      progress: 125,
      trend: "up",
      lastUpdated: "2025-04-25"
    },
    {
      id: "4",
      name: "Client Retention Rate",
      category: "sales",
      description: "Percentage of clients retained year over year",
      target: "≥ 85%",
      current: 82,
      unit: "%",
      progress: 96.5,
      trend: "stable",
      lastUpdated: "2025-04-20"
    }
  ],
  "operations": [
    {
      id: "5",
      name: "Audits Completed On Time",
      category: "operations",
      description: "Percentage of audits completed by the due date",
      target: "≥ 95%",
      current: 97.5,
      unit: "%",
      progress: 102.6,
      trend: "up",
      lastUpdated: "2025-04-27"
    },
    {
      id: "6",
      name: "Average Audit Turnaround Time",
      category: "operations",
      description: "Average days from assignment to completion",
      target: "≤ 7 days",
      current: 6.2,
      unit: "days",
      progress: 112.9,
      trend: "up",
      lastUpdated: "2025-04-26"
    }
  ],
  "training": [
    {
      id: "7",
      name: "Training Completion Rate",
      category: "training",
      description: "Percentage of employees who have completed required training",
      target: "100%",
      current: 85,
      unit: "%",
      progress: 85,
      trend: "up",
      lastUpdated: "2025-04-24"
    },
    {
      id: "8",
      name: "Skill Assessment Scores",
      category: "training",
      description: "Average score on skill assessments",
      target: "≥ 80%",
      current: 76.5,
      unit: "%",
      progress: 95.6,
      trend: "stable",
      lastUpdated: "2025-04-22"
    }
  ]
};

interface AdminKpiTableProps {
  category: string;
  canEdit: boolean;
}

const AdminKpiTable: React.FC<AdminKpiTableProps> = ({ 
  category,
  canEdit
}) => {
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const [kpis, setKpis] = useState<AdminKpi[]>(sampleKpis[category] || []);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentKpi, setCurrentKpi] = useState<AdminKpi | null>(null);

  const isSuperUser = currentUser?.role === "superuser";

  const getTrendIcon = (trend: AdminKpi["trend"]) => {
    switch (trend) {
      case "up": return <ArrowUp className="h-4 w-4 text-green-600" />;
      case "down": return <ArrowDown className="h-4 w-4 text-red-600" />;
      case "stable": return <ArrowRight className="h-4 w-4 text-blue-600" />;
      default: return null;
    }
  };

  const getProgressBadge = (progress: number) => {
    if (progress >= 100) {
      return <Badge className="bg-green-100 text-green-800">Exceeding</Badge>;
    } else if (progress >= 90) {
      return <Badge className="bg-blue-100 text-blue-800">Meeting</Badge>;
    } else if (progress >= 75) {
      return <Badge className="bg-yellow-100 text-yellow-800">Below</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
    }
  };

  const handleView = (kpi: AdminKpi) => {
    setCurrentKpi(kpi);
    setIsViewModalOpen(true);
  };

  const handleEdit = (kpi: AdminKpi) => {
    setCurrentKpi(kpi);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!isSuperUser && !canEdit) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to delete KPIs",
        variant: "destructive"
      });
      return;
    }

    setKpis(kpis.filter(kpi => kpi.id !== id));
    toast({
      title: "KPI Deleted",
      description: "Admin KPI has been deleted successfully"
    });
  };

  const handleKpiUpdate = (updatedKpi: AdminKpi) => {
    setKpis(kpis.map(kpi => kpi.id === updatedKpi.id ? updatedKpi : kpi));
    setIsEditModalOpen(false);
    toast({
      title: "KPI Updated",
      description: "Admin KPI has been updated successfully"
    });
  };

  const handleExport = () => {
    try {
      const csvContent = [
        ["KPI Name", "Category", "Description", "Target", "Current Value", "Progress", "Trend", "Last Updated"],
        ...kpis.map(kpi => [
          kpi.name,
          kpi.category,
          kpi.description,
          kpi.target,
          `${kpi.current}${kpi.unit}`,
          `${kpi.progress}%`,
          kpi.trend,
          new Date(kpi.lastUpdated).toLocaleDateString()
        ])
      ].map(row => row.join(",")).join("\n");

      // Generate PDF instead of CSV
      const reportData = {
        title: `Admin KPI Report - ${category}`,
        period: new Date().toISOString().split('T')[0],
        results: kpis.map(kpi => ({
          name: kpi.name,
          current: `${kpi.current}${kpi.unit}`,
          target: kpi.target,
          progress: `${kpi.progress}%`,
          trend: kpi.trend
        })),
        columns: ["KPI Name", "Current Value", "Target", "Status", "Trend"]
      };
      
      import('../../lib/pdf-utils').then(({ generateCustomReportPdf }) => {
        generateCustomReportPdf(reportData);
      });

      toast({
        title: "Export Successful",
        description: `KPI data exported for ${category} category`
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
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">KPIs for {category}</h3>
        <Button onClick={handleExport} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>KPI Name</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead>Target</TableHead>
            <TableHead>Current</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead className="hidden md:table-cell">Last Updated</TableHead>
            <TableHead>Trend</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kpis.length > 0 ? (
            kpis.map((kpi) => (
              <TableRow key={kpi.id}>
                <TableCell className="font-medium">{kpi.name}</TableCell>
                <TableCell className="hidden md:table-cell max-w-xs truncate">
                  {kpi.description}
                </TableCell>
                <TableCell>{kpi.target}</TableCell>
                <TableCell>
                  {kpi.current !== null ? `${kpi.current}${kpi.unit}` : "N/A"}
                </TableCell>
                <TableCell>
                  {getProgressBadge(kpi.progress)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(kpi.lastUpdated).toLocaleDateString()}
                </TableCell>
                <TableCell>{getTrendIcon(kpi.trend)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleView(kpi)}
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {(isSuperUser || canEdit) && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(kpi)}
                        title="Edit KPI"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {(isSuperUser || canEdit) && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(kpi.id)}
                        title="Delete KPI"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No KPIs found for this category
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* View KPI Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>KPI Details</DialogTitle>
          </DialogHeader>
          {currentKpi && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">{currentKpi.name}</h4>
                <p className="text-muted-foreground">{currentKpi.category}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <p className="text-sm">{currentKpi.description}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Target</label>
                  <p className="text-sm">{currentKpi.target}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Current Value</label>
                  <p className="text-lg font-semibold">
                    {currentKpi.current !== null ? `${currentKpi.current}${currentKpi.unit}` : "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Progress</label>
                  <div className="flex items-center gap-2">
                    {getProgressBadge(currentKpi.progress)}
                    <span className="text-sm">({currentKpi.progress}%)</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Trend</label>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(currentKpi.trend)}
                    <span className="text-sm capitalize">{currentKpi.trend}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Last Updated</label>
                <p className="text-sm">{new Date(currentKpi.lastUpdated).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit KPI Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Admin KPI</DialogTitle>
          </DialogHeader>
          {currentKpi && (
            <AdminKpiForm 
              kpi={currentKpi}
              onClose={() => setIsEditModalOpen(false)}
              onSuccess={handleKpiUpdate}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminKpiTable;
