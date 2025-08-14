import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, User, MessageSquare, Plus } from "lucide-react";
import { useTask, TaskItem } from "@/contexts/TaskContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface TaskActivity {
  id: string;
  taskId: string;
  employeeId: string;
  employeeName: string;
  activity: string;
  notes: string;
  timestamp: string;
  type: "comment" | "status_change" | "assignment" | "priority_change";
}

interface TaskActivityLogProps {
  task: TaskItem;
}

export const TaskActivityLog: React.FC<TaskActivityLogProps> = ({ task }) => {
  const [activities, setActivities] = useState<TaskActivity[]>([
    {
      id: "1",
      taskId: task.id,
      employeeId: "1",
      employeeName: "Shaheed Van Dawson",
      activity: "Task created",
      notes: "Initial task setup and assignment",
      timestamp: task.createdAt,
      type: "assignment"
    },
    {
      id: "2",
      taskId: task.id,
      employeeId: task.assignedTo,
      employeeName: "Current Assignee",
      activity: "Status updated to in-progress",
      notes: "Started working on the task requirements",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      type: "status_change"
    }
  ]);
  
  const [newNote, setNewNote] = useState("");
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const addActivity = () => {
    if (!newNote.trim() || !currentUser) return;

    const activity: TaskActivity = {
      id: Date.now().toString(),
      taskId: task.id,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      activity: "Added comment",
      notes: newNote.trim(),
      timestamp: new Date().toISOString(),
      type: "comment"
    };

    setActivities(prev => [activity, ...prev]);
    setNewNote("");
    
    toast({
      title: "Activity logged",
      description: "Your note has been added to the task activity log.",
    });
  };

  const getActivityIcon = (type: TaskActivity['type']) => {
    switch (type) {
      case "comment":
        return <MessageSquare className="h-4 w-4" />;
      case "status_change":
        return <Clock className="h-4 w-4" />;
      case "assignment":
        return <User className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: TaskActivity['type']) => {
    switch (type) {
      case "comment":
        return "bg-blue-100 text-blue-800";
      case "status_change":
        return "bg-green-100 text-green-800";
      case "assignment":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Activity Log
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add new activity */}
        <div className="space-y-2">
          <Textarea
            placeholder="Add a note about this task..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[80px]"
          />
          <Button 
            onClick={addActivity}
            disabled={!newNote.trim()}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
        </div>

        <Separator />

        {/* Activity timeline */}
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3 p-3 rounded-lg border">
              <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{activity.employeeName}</span>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(activity.timestamp), "MMM dd, yyyy 'at' HH:mm")}
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {activity.activity}
                </Badge>
                <p className="text-sm text-muted-foreground">{activity.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};