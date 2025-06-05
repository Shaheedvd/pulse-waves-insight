import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  Building,
  User,
  FileText,
  Edit,
  Printer,
  Star,
  DollarSign,
  Users,
  TrendingUp,
} from "lucide-react";

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  onEdit?: () => void;
  onPrint?: () => void;
}

interface EvaluationDetailsProps extends BaseModalProps {
  type: "evaluation";
  data: {
    id: string;
    client: string;
    location: string;
    scheduledDate: string;
    scheduledTime: string;
    evaluationScope: string;
    evaluator?: string;
    status: string;
    score?: number;
  } | null;
}

interface ClientDetailsProps extends BaseModalProps {
  type: "client";
  data: {
    id: string;
    name: string;
    industry: string;
    locations: number;
    contactPerson: string;
    email: string;
    phone: string;
    status: string;
    lastEvaluation?: string;
  } | null;
}

interface FinancialDetailsProps extends BaseModalProps {
  type: "financial";
  data: {
    id: string;
    type: "invoice" | "expense" | "revenue";
    amount: number;
    date: string;
    description: string;
    status: string;
    client?: string;
    category?: string;
  } | null;
}

interface TaskDetailsProps extends BaseModalProps {
  type: "task";
  data: {
    id: string;
    title: string;
    description: string;
    assignee: string;
    priority: string;
    status: string;
    dueDate: string;
    project?: string;
  } | null;
}

type ViewDetailsModalProps = EvaluationDetailsProps | ClientDetailsProps | FinancialDetailsProps | TaskDetailsProps;

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({ open, onClose, onEdit, onPrint, type, data }) => {
  // Early return if data is null
  if (!data) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[700px] max-h-[600px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>No Data Available</DialogTitle>
            <DialogDescription>The requested data could not be loaded.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  const renderEvaluationDetails = (evalData: NonNullable<EvaluationDetailsProps['data']>) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Client:</span>
                <span>{evalData.client}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Location:</span>
                <span>{evalData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Date:</span>
                <span>{evalData.scheduledDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Time:</span>
                <span>{evalData.scheduledTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Scope:</span>
                <span>{evalData.evaluationScope}</span>
              </div>
              {evalData.evaluator && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Evaluator:</span>
                  <span>{evalData.evaluator}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                <Badge className={
                  evalData.status === "Completed" ? "bg-green-100 text-green-800" :
                  evalData.status === "Scheduled" ? "bg-blue-100 text-blue-800" :
                  "bg-yellow-100 text-yellow-800"
                }>
                  {evalData.status}
                </Badge>
              </div>
              {evalData.score && (
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Score:</span>
                  <span className="font-semibold">{evalData.score}%</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderClientDetails = (clientData: NonNullable<ClientDetailsProps['data']>) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Company:</span>
                <span>{clientData.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Industry:</span>
                <span>{clientData.industry}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Locations:</span>
                <span>{clientData.locations}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                <Badge className={
                  clientData.status === "Active" ? "bg-green-100 text-green-800" :
                  "bg-red-100 text-red-800"
                }>
                  {clientData.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Contact:</span>
                <span>{clientData.contactPerson}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Email:</span>
                <span>{clientData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Phone:</span>
                <span>{clientData.phone}</span>
              </div>
              {clientData.lastEvaluation && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Last Evaluation:</span>
                  <span>{clientData.lastEvaluation}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderFinancialDetails = (finData: NonNullable<FinancialDetailsProps['data']>) => (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Amount:</span>
                <span className="font-semibold text-lg">R{finData.amount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Type:</span>
                <Badge>{finData.type}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Date:</span>
                <span>{finData.date}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                <Badge className={
                  finData.status === "Paid" ? "bg-green-100 text-green-800" :
                  finData.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                }>
                  {finData.status}
                </Badge>
              </div>
              {finData.client && (
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Client:</span>
                  <span>{finData.client}</span>
                </div>
              )}
              {finData.category && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Category:</span>
                  <span>{finData.category}</span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4">
            <span className="font-medium">Description:</span>
            <p className="mt-1 text-muted-foreground">{finData.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTaskDetails = (taskData: NonNullable<TaskDetailsProps['data']>) => (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-medium">Title:</span>
              <span>{taskData.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Assignee:</span>
              <span>{taskData.assignee}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Priority:</span>
              <Badge className={
                taskData.priority === "High" ? "bg-red-100 text-red-800" :
                taskData.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                "bg-green-100 text-green-800"
              }>
                {taskData.priority}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Status:</span>
              <Badge>{taskData.status}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Due Date:</span>
              <span>{taskData.dueDate}</span>
            </div>
            {taskData.project && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Project:</span>
                <span>{taskData.project}</span>
              </div>
            )}
            <div className="mt-4">
              <span className="font-medium">Description:</span>
              <p className="mt-1 text-muted-foreground">{taskData.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const getTitle = () => {
    switch (type) {
      case "evaluation":
        return "Evaluation Details";
      case "client":
        return "Client Details";
      case "financial":
        return "Financial Details";
      case "task":
        return "Task Details";
      default:
        return "Details";
    }
  };

  const getDescription = () => {
    switch (type) {
      case "evaluation":
        return "View evaluation information and scheduling details";
      case "client":
        return "View client information and contact details";
      case "financial":
        return "View financial transaction details";
      case "task":
        return "View task information and assignment details";
      default:
        return "View detailed information";
    }
  };

  const renderContent = () => {
    switch (type) {
      case "evaluation":
        return renderEvaluationDetails(data as NonNullable<EvaluationDetailsProps['data']>);
      case "client":
        return renderClientDetails(data as NonNullable<ClientDetailsProps['data']>);
      case "financial":
        return renderFinancialDetails(data as NonNullable<FinancialDetailsProps['data']>);
      case "task":
        return renderTaskDetails(data as NonNullable<TaskDetailsProps['data']>);
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>
        
        {renderContent()}
        
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {onPrint && (
            <Button variant="outline" onClick={onPrint}>
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
          )}
          {onEdit && (
            <Button onClick={onEdit}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetailsModal;
