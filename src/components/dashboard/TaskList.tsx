
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useTask, TaskItem, TaskStatus } from "@/contexts/TaskContext";
import { format } from "date-fns";
import { AlertTriangle, CheckCircle2, Clock, MoreHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface TaskListProps {
  tasks: TaskItem[];
  showAssignee?: boolean;
  showDepartment?: boolean;
  showActions?: boolean;
}

export function TaskList({ tasks, showAssignee = false, showDepartment = true, showActions = false }: TaskListProps) {
  const { users } = useAuth();
  const { updateTask, deleteTask } = useTask();
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

  if (tasks.length === 0) {
    return <div className="text-center p-4">No tasks available</div>;
  }

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "review":
        return <Badge variant="blue">In Review</Badge>;
      case "completed":
        return <Badge variant="green">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Low</Badge>;
      case "medium":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Medium</Badge>;
      case "high":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">High</Badge>;
      case "urgent":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Urgent</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const getAssigneeName = (assignedToId: string) => {
    const assignee = users.find(user => user.id === assignedToId);
    return assignee ? assignee.name : "Unassigned";
  };

  const getDepartmentName = (department: string) => {
    return department
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "MMM d, yyyy");
    } catch (e) {
      return dateStr;
    }
  };

  const handleMarkInProgress = (taskId: string) => {
    updateTask(taskId, { status: "in-progress" });
  };

  const handleMarkCompleted = (taskId: string) => {
    updateTask(taskId, { status: "completed" });
  };

  const handleMarkReview = (taskId: string) => {
    updateTask(taskId, { status: "review" });
  };

  const handleCancel = (taskId: string) => {
    updateTask(taskId, { status: "cancelled" });
  };

  const handleDelete = (taskId: string) => {
    deleteTask(taskId);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due Date</TableHead>
            {showAssignee && <TableHead>Assigned To</TableHead>}
            {showDepartment && <TableHead>Department</TableHead>}
            {showActions && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" onClick={() => setSelectedTask(task)} className="p-0">
                      {task.title}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        {task.title}
                        {task.priority === "urgent" && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                      </DialogTitle>
                      <DialogDescription>
                        {task.status === "completed" ? (
                          <Badge variant="green" className="mb-2">
                            <CheckCircle2 className="mr-1 h-3 w-3" /> Completed
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="mb-2">
                            <Clock className="mr-1 h-3 w-3" /> Due {formatDate(task.dueDate)}
                          </Badge>
                        )}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <h4 className="font-semibold mb-1">Description</h4>
                        <p className="text-sm text-gray-600">{task.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-1">Status</h4>
                          <div>{getStatusBadge(task.status)}</div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Priority</h4>
                          <div>{getPriorityBadge(task.priority)}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-1">Assigned To</h4>
                          <p className="text-sm">{getAssigneeName(task.assignedTo)}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Department</h4>
                          <p className="text-sm">{getDepartmentName(task.department)}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-1">Created</h4>
                          <p className="text-sm">{formatDate(task.createdAt)}</p>
                        </div>
                        {task.status === "completed" && task.completedAt && (
                          <div>
                            <h4 className="font-semibold mb-1">Completed</h4>
                            <p className="text-sm">{formatDate(task.completedAt)}</p>
                          </div>
                        )}
                      </div>
                      {task.tags && task.tags.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-1">Tags</h4>
                          <div className="flex flex-wrap gap-1">
                            {task.tags.map(tag => (
                              <Badge key={tag} variant="outline">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {showActions && (
                      <div className="flex justify-end gap-2 mt-4">
                        {task.status !== "completed" && (
                          <Button size="sm" onClick={() => handleMarkCompleted(task.id)}>
                            Mark Complete
                          </Button>
                        )}
                        {task.status === "pending" && (
                          <Button size="sm" variant="outline" onClick={() => handleMarkInProgress(task.id)}>
                            Start Task
                          </Button>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>{getStatusBadge(task.status)}</TableCell>
              <TableCell>{getPriorityBadge(task.priority)}</TableCell>
              <TableCell>{formatDate(task.dueDate)}</TableCell>
              {showAssignee && <TableCell>{getAssigneeName(task.assignedTo)}</TableCell>}
              {showDepartment && <TableCell>{getDepartmentName(task.department)}</TableCell>}
              {showActions && (
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setSelectedTask(task)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {task.status === "pending" && (
                        <DropdownMenuItem onClick={() => handleMarkInProgress(task.id)}>
                          Mark In Progress
                        </DropdownMenuItem>
                      )}
                      {task.status === "in-progress" && (
                        <DropdownMenuItem onClick={() => handleMarkReview(task.id)}>
                          Submit for Review
                        </DropdownMenuItem>
                      )}
                      {task.status !== "completed" && task.status !== "cancelled" && (
                        <DropdownMenuItem onClick={() => handleMarkCompleted(task.id)}>
                          Mark Completed
                        </DropdownMenuItem>
                      )}
                      {task.status !== "cancelled" && task.status !== "completed" && (
                        <DropdownMenuItem onClick={() => handleCancel(task.id)}>
                          Cancel Task
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDelete(task.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        Delete Task
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
