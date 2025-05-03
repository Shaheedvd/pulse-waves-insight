
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Project } from "@/types/marketing";

interface ProjectDetailsProps {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ open, onClose, project }) => {
  if (!project) return null;
  
  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "not-started":
        return <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>;
      case "on-hold":
        return <Badge className="bg-yellow-100 text-yellow-800">On Hold</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: Project["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High Priority</Badge>;
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800">Medium Priority</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low Priority</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{project.name}</DialogTitle>
          <DialogDescription className="flex flex-wrap gap-2 mt-2">
            {getStatusBadge(project.status)}
            {getPriorityBadge(project.priority)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium mb-2">Due Date</h3>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{new Date(project.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Created By</h3>
              <div className="flex items-center text-muted-foreground">
                <span>{project.createdBy}</span>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Created On</h3>
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Progress</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{project.completionPercentage}% Complete</span>
              </div>
              <Progress value={project.completionPercentage} className="h-2" />
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Assigned To</h3>
            <div className="flex items-center space-x-2">
              {project.assignedTo.map((person, index) => (
                <div key={index} className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback>
                      {person.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{person}</span>
                </div>
              ))}
            </div>
          </div>

          {project.tasks && project.tasks.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Tasks</h3>
              <div className="space-y-2">
                {project.tasks.map((task, index) => (
                  <div key={index} className="flex items-start p-2 border rounded-md">
                    {task.completed ? 
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" /> :
                      <AlertCircle className="h-5 w-5 mr-2 text-yellow-600" />
                    }
                    <div>
                      <p className={task.completed ? "line-through text-muted-foreground" : ""}>
                        {task.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetails;
