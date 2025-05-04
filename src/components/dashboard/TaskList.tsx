
import React, { useState } from "react";
import { TaskItem, TaskStatus, TaskPriority } from "@/contexts/TaskContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Clock, AlertCircle, MoreHorizontal, Edit, Trash2, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskListProps {
  tasks: TaskItem[];
  showDepartment?: boolean;
  showAssignee?: boolean;
  showActions?: boolean;
}

export function TaskList({ 
  tasks, 
  showDepartment = true, 
  showAssignee = false,
  showActions = false 
}: TaskListProps) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // Function to determine status badge color
  const getStatusBadge = (status: TaskStatus) => {
    switch(status) {
      case "completed":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">Completed</Badge>;
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "review":
        return <Badge variant="purple">In Review</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      case "pending":
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };
  
  // Function to determine priority badge
  const getPriorityBadge = (priority: TaskPriority) => {
    switch(priority) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>;
      case "high":
        return <Badge variant="orange">High</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium</Badge>;
      case "low":
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };
  
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  // Handle empty task list
  if (tasks.length === 0) {
    return (
      <div className="text-center p-6">
        <p className="text-muted-foreground">No tasks found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div 
          key={task.id}
          className="border rounded-lg p-4 bg-card hover:border-primary/50 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{task.title}</h3>
                {getPriorityBadge(task.priority)}
                {getStatusBadge(task.status)}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
              <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground mt-2">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Due: {formatDate(task.dueDate)}
                </div>
                
                {showDepartment && (
                  <Badge variant="outline" className="capitalize">{task.department.replace('_', ' ')}</Badge>
                )}
                
                {showAssignee && (
                  <div>
                    Assigned to: <span className="font-medium">ID: {task.assignedTo}</span>
                  </div>
                )}
                
                {task.tags.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {task.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs h-5">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {showActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" /> Edit Task
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ExternalLink className="mr-2 h-4 w-4" /> View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {task.status !== "completed" ? (
                      <>
                        <Check className="mr-2 h-4 w-4" /> Mark as Complete
                      </>
                    ) : (
                      <>
                        <Clock className="mr-2 h-4 w-4" /> Reopen Task
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Task
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
