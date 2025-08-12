import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Building, 
  DollarSign, 
  FileText,
  User,
  Calendar,
  TrendingUp,
  TrendingDown,
  Activity
} from "lucide-react";
import { useGlobal } from "@/contexts/GlobalContext";
import { useAuth } from "@/contexts/AuthContext";

export interface AlertData {
  id: number;
  type: "critical" | "warning" | "info";
  message: string;
  module: "Projects" | "Finance" | "Compliance" | "HR" | "Marketing" | "Operations";
  status: "pending" | "in_progress" | "resolved" | "dismissed";
  priority: "high" | "medium" | "low";
  assignedTo?: string;
  dueDate?: string;
  description?: string;
  actionItems?: string[];
  relatedData?: any;
}

interface AlertReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  alert: AlertData | null;
  onUpdateAlert: (alertId: number, updates: Partial<AlertData>) => void;
}

const AlertReviewModal: React.FC<AlertReviewModalProps> = ({
  isOpen,
  onClose,
  alert,
  onUpdateAlert
}) => {
  const { addNotification, logAction } = useGlobal();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [localAlert, setLocalAlert] = useState<AlertData | null>(null);

  useEffect(() => {
    setLocalAlert(alert);
    setEditMode(false);
    setActiveTab("overview");
  }, [alert]);

  if (!alert || !localAlert) return null;

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical": return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "warning": return <Clock className="h-5 w-5 text-yellow-500" />;
      default: return <CheckCircle className="h-5 w-5 text-blue-500" />;
    }
  };

  const getModuleIcon = (module: string) => {
    switch (module) {
      case "Projects": return <Building className="h-4 w-4" />;
      case "Finance": return <DollarSign className="h-4 w-4" />;
      case "Compliance": return <FileText className="h-4 w-4" />;
      case "HR": return <User className="h-4 w-4" />;
      case "Marketing": return <TrendingUp className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getRelatedData = () => {
    switch (alert.module) {
      case "Projects":
        return {
          overdueProjects: 2,
          totalProjects: 23,
          projectNames: ["Digital Transformation Initiative", "Customer Portal Upgrade"],
          projectManagers: ["Sarah Johnson", "Mike Chen"],
          budgetImpact: "$125,000",
          delayDays: [12, 8]
        };
      case "Finance":
        return {
          pendingReviews: 3,
          budgetVariance: -8.5,
          quarterlyCost: "$2,450,000",
          departments: ["Marketing", "IT", "Operations"],
          reviewItems: ["Q4 Budget Allocation", "Capital Expenditure Review", "Vendor Contract Analysis"]
        };
      case "Compliance":
        return {
          upcomingAudits: 1,
          complianceScore: 94,
          auditType: "ISO 27001 Surveillance",
          scheduledDate: "2024-02-15",
          auditor: "External Compliance Partners",
          preparationItems: ["Document Review", "Staff Training", "System Access Setup"]
        };
      default:
        return {};
    }
  };

  const handleSave = () => {
    if (!localAlert) return;

    onUpdateAlert(localAlert.id, localAlert);
    
    addNotification({
      userId: currentUser?.id || "",
      title: "Alert Updated",
      message: `Alert "${localAlert.message}" has been updated`,
      type: "success",
      module: "executive"
    });

    logAction("update", "executive", localAlert.id.toString(), "alert", alert, localAlert);
    
    setEditMode(false);
    onClose();
  };

  const handleStatusChange = (status: string) => {
    if (!localAlert) return;
    setLocalAlert({ ...localAlert, status: status as AlertData["status"] });
  };

  const handlePriorityChange = (priority: string) => {
    if (!localAlert) return;
    setLocalAlert({ ...localAlert, priority: priority as AlertData["priority"] });
  };

  const handleAssignChange = (assignedTo: string) => {
    if (!localAlert) return;
    setLocalAlert({ ...localAlert, assignedTo });
  };

  const relatedData = getRelatedData();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {getAlertIcon(localAlert.type)}
            Alert Review - {localAlert.module}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Alert Header */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getModuleIcon(localAlert.module)}
                  <CardTitle className="text-lg">{localAlert.message}</CardTitle>
                </div>
                <div className="flex gap-2">
                  <Badge variant={localAlert.type === "critical" ? "destructive" : localAlert.type === "warning" ? "secondary" : "default"}>
                    {localAlert.type}
                  </Badge>
                  <Badge variant="outline">
                    {localAlert.priority} priority
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <p className="font-medium capitalize">{localAlert.status.replace("_", " ")}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Assigned To:</span>
                  <p className="font-medium">{localAlert.assignedTo || "Unassigned"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Due Date:</span>
                  <p className="font-medium">{localAlert.dueDate || "Not set"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Module:</span>
                  <p className="font-medium">{localAlert.module}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
              <TabsTrigger value="edit">Edit</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Related Information</CardTitle>
                </CardHeader>
                <CardContent>
                  {localAlert.module === "Projects" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Overdue Projects</h4>
                          <ul className="space-y-1 text-sm">
                            {relatedData.projectNames?.map((name: string, index: number) => (
                              <li key={index} className="flex justify-between">
                                <span>{name}</span>
                                <Badge variant="destructive">{relatedData.delayDays[index]} days late</Badge>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Impact Summary</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Budget Impact:</span>
                              <span className="font-medium text-red-600">{relatedData.budgetImpact}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total Projects:</span>
                              <span>{relatedData.totalProjects}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {localAlert.module === "Finance" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Pending Reviews</h4>
                          <ul className="space-y-1 text-sm">
                            {relatedData.reviewItems?.map((item: string, index: number) => (
                              <li key={index} className="flex items-center gap-2">
                                <Clock className="h-3 w-3 text-yellow-500" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Financial Impact</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Quarterly Cost:</span>
                              <span className="font-medium">{relatedData.quarterlyCost}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Budget Variance:</span>
                              <span className="font-medium text-red-600">{relatedData.budgetVariance}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {localAlert.module === "Compliance" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Audit Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Audit Type:</span>
                              <span className="font-medium">{relatedData.auditType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Scheduled Date:</span>
                              <span className="font-medium">{relatedData.scheduledDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Auditor:</span>
                              <span className="font-medium">{relatedData.auditor}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Preparation Status</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Overall Progress</span>
                              <span className="text-sm font-medium">65%</span>
                            </div>
                            <Progress value={65} />
                            <ul className="space-y-1 text-sm mt-2">
                              {relatedData.preparationItems?.map((item: string, index: number) => (
                                <li key={index} className="flex items-center gap-2">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Alert Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {localAlert.description || "No detailed description available for this alert."}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-medium">Recommended Actions:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {localAlert.actionItems?.map((item, index) => (
                        <li key={index}>{item}</li>
                      )) || [
                        "Review the associated module for detailed information",
                        "Assign responsible team member for resolution",
                        "Set appropriate priority and due date",
                        "Monitor progress and update status accordingly"
                      ]}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actions" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Review Meeting
                    </Button>
                    <Button className="w-full" variant="outline">
                      <User className="h-4 w-4 mr-2" />
                      Assign Team Member
                    </Button>
                    <Button className="w-full" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Resolution Options</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full" 
                      variant="default"
                      onClick={() => handleStatusChange("resolved")}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Resolved
                    </Button>
                    <Button 
                      className="w-full" 
                      variant="secondary"
                      onClick={() => handleStatusChange("in_progress")}
                    >
                      <Activity className="h-4 w-4 mr-2" />
                      Set In Progress
                    </Button>
                    <Button 
                      className="w-full" 
                      variant="destructive"
                      onClick={() => handleStatusChange("dismissed")}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Dismiss Alert
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="edit" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Alert Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Status</label>
                      <Select value={localAlert.status} onValueChange={handleStatusChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="dismissed">Dismissed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Priority</label>
                      <Select value={localAlert.priority} onValueChange={handlePriorityChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Assigned To</label>
                    <Select value={localAlert.assignedTo || ""} onValueChange={handleAssignChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarah.johnson@company.com">Sarah Johnson</SelectItem>
                        <SelectItem value="mike.chen@company.com">Mike Chen</SelectItem>
                        <SelectItem value="emily.davis@company.com">Emily Davis</SelectItem>
                        <SelectItem value="alex.smith@company.com">Alex Smith</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Notes</label>
                    <Textarea 
                      placeholder="Add notes or comments about this alert..."
                      value={localAlert.description || ""}
                      onChange={(e) => setLocalAlert({ ...localAlert, description: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertReviewModal;