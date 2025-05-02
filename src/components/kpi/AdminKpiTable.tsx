
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
import { Edit, Trash, ArrowUp, ArrowDown, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AdminKpi } from "@/types/marketing";
import AdminKpiForm from "./AdminKpiForm";
import { useToast } from "@/hooks/use-toast";

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
  const [kpis, setKpis] = useState<AdminKpi[]>(sampleKpis[category] || []);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentKpi, setCurrentKpi] = useState<AdminKpi | null>(null);

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

  const handleEdit = (kpi: AdminKpi) => {
    setCurrentKpi(kpi);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
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

  return (
    <>
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
            {canEdit && <TableHead className="text-right">Actions</TableHead>}
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
                {canEdit && (
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(kpi)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(kpi.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={canEdit ? 8 : 7} className="h-24 text-center">
                No KPIs found for this category
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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
