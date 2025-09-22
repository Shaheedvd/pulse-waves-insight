
import React from "react";
import { TaskItem, useTask } from "@/contexts/TaskContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertCircle, Plus, MessageSquare } from "lucide-react";
import { useGlobal } from "@/contexts/GlobalContext";
import { useToast } from "@/hooks/use-toast";

interface TaskListProps {
  tasks: TaskItem[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const { updateTask } = useTask();
  const { logAction, addNotification } = useGlobal();
  const { toast } = useToast();

  const handleTaskComplete = (task: TaskItem) => {
    const newStatus = task.status === "completed" ? "in-progress" : "completed";
    updateTask(task.id, { status: newStatus });
    
    logAction(
      newStatus === "completed" ? "Task Completed" : "Task Reopened",
      "tasks",
      task.id,
      "task",
      task,
      { ...task, status: newStatus }
    );

    if (newStatus === "completed") {
      addNotification({
        userId: task.assignedTo,
        title: "Task Completed",
        message: `Task "${task.title}" has been marked as completed`,
        type: "success",
        module: "tasks"
      });
    }

    toast({
      title: newStatus === "completed" ? "Task Completed" : "Task Reopened",
      description: `"${task.title}" has been ${newStatus === "completed" ? "completed" : "reopened"}`,
    });
  };

  const handleAddActivity = (task: TaskItem) => {
    logAction("View Task Activity", "tasks", task.id, "task");
    toast({
      title: "Task Activity",
      description: "Task activity log would open here",
    });
  };
  // Sort tasks by priority (high to low) and due date
  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by completion status first
    if ((!!a.completedAt) !== (!!b.completedAt)) {
      return a.completedAt ? 1 : -1;
    }
    
    // Then by priority
    if (a.priority !== b.priority) {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    // Then by due date
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  const getStatusIcon = (task: TaskItem) => {
    if (task.completedAt) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    
    const due = new Date(task.dueDate);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (due < today) {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
    
    if (due <= tomorrow) {
      return <Clock className="h-4 w-4 text-amber-500" />;
    }
    
    return <Clock className="h-4 w-4 text-blue-500" />;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
      {sortedTasks.length > 0 ? (
        sortedTasks.map((task) => (
          <Card key={task.id} className={`border-l-4 ${task.completedAt ? 'border-l-green-500 bg-green-50' : 'border-l-blue-500'}`}>
            <CardContent className="p-3">
              <div className="flex justify-between items-start gap-2">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(task)}
                    <span className={`font-medium ${task.completedAt ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                  <div className="flex gap-1 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTaskComplete(task)}
                      className="h-6 px-2 text-xs"
                    >
                      {task.status === "completed" ? "Reopen" : "Complete"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleAddActivity(task)}
                      className="h-6 px-2 text-xs"
                    >
                      <MessageSquare className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant="outline" className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {task.assignedTo || "Unassigned"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center p-4 text-muted-foreground">
          No tasks available
        </div>
      )}
    </div>
  );
};

export default TaskList;
