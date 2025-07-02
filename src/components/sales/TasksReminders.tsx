
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Calendar, Clock, User, CheckCircle, AlertCircle } from "lucide-react";

export const TasksReminders = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock tasks data
  const tasks = [
    {
      id: "1",
      title: "Follow up with TechCorp",
      description: "Call to discuss demo feedback and next steps",
      type: "follow-up",
      priority: "high",
      status: "pending",
      assignedTo: "John Smith",
      dueDate: "2024-01-22T10:00:00Z",
      relatedTo: { type: "lead", name: "TechCorp Inc", id: "lead-1" },
      createdAt: "2024-01-20T10:00:00Z"
    },
    {
      id: "2",
      title: "Send quote to RetailChain",
      description: "Prepare and send consulting services quotation",
      type: "send-quote",
      priority: "medium",
      status: "in-progress",
      assignedTo: "Sarah Johnson",
      dueDate: "2024-01-21T15:00:00Z",
      relatedTo: { type: "deal", name: "RetailChain Consulting", id: "deal-2" },
      createdAt: "2024-01-19T14:30:00Z"
    },
    {
      id: "3",
      title: "Prepare demo for Startup.io",
      description: "Set up demo environment and prepare presentation materials",
      type: "demo-prep",
      priority: "high",
      status: "completed",
      assignedTo: "Mike Wilson",
      dueDate: "2024-01-20T11:00:00Z",
      completedDate: "2024-01-20T10:30:00Z",
      relatedTo: { type: "lead", name: "Startup.io", id: "lead-3" },
      createdAt: "2024-01-18T09:15:00Z"
    },
    {
      id: "4",
      title: "Schedule callback with Manufacturing Solutions",
      description: "They requested a callback to discuss pricing options",
      type: "callback",
      priority: "medium",
      status: "pending",
      assignedTo: "Lisa Chen",
      dueDate: "2024-01-23T14:00:00Z",
      relatedTo: { type: "lead", name: "Manufacturing Solutions", id: "lead-4" },
      createdAt: "2024-01-21T16:00:00Z"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-blue-100 text-blue-800";
      case "in-progress": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "follow-up": return "📞";
      case "send-quote": return "💰";
      case "demo-prep": return "🎯";
      case "callback": return "📲";
      case "meeting": return "🤝";
      default: return "📋";
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && tasks.find(t => t.dueDate === dueDate)?.status !== "completed";
  };

  const filteredTasks = tasks.filter(task => {
    if (filterStatus === "all") return true;
    if (filterStatus === "overdue") return isOverdue(task.dueDate);
    return task.status === filterStatus;
  });

  const taskCounts = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === "pending").length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    completed: tasks.filter(t => t.status === "completed").length,
    overdue: tasks.filter(t => isOverdue(t.dueDate)).length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Tasks & Reminders</h2>
          <p className="text-muted-foreground">Manage your sales tasks and follow-ups</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Add a new task or reminder for your sales activities
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="taskTitle">Task Title</Label>
                <Input id="taskTitle" placeholder="What needs to be done?" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="taskDescription">Description</Label>
                <Textarea id="taskDescription" placeholder="Provide more details about this task..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taskType">Task Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="send-quote">Send Quote</SelectItem>
                      <SelectItem value="demo-prep">Demo Preparation</SelectItem>
                      <SelectItem value="callback">Callback</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taskPriority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="datetime-local" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relatedTo">Related To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lead/deal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lead-1">TechCorp Inc (Lead)</SelectItem>
                      <SelectItem value="deal-1">RetailChain Deal</SelectItem>
                      <SelectItem value="lead-2">Startup.io (Lead)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="recurring" />
                <Label htmlFor="recurring">Recurring task</Label>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>
                Create Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Task Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskCounts.total}</div>
            <p className="text-xs text-muted-foreground">All tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{taskCounts.pending}</div>
            <p className="text-xs text-muted-foreground">Not started</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{taskCounts.inProgress}</div>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{taskCounts.completed}</div>
            <p className="text-xs text-muted-foreground">Finished</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{taskCounts.overdue}</div>
            <p className="text-xs text-muted-foreground">Past due</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        {[
          { key: "all", label: "All Tasks" },
          { key: "pending", label: "Pending" },
          { key: "in-progress", label: "In Progress" },
          { key: "completed", label: "Completed" },
          { key: "overdue", label: "Overdue" }
        ].map((filter) => (
          <Button
            key={filter.key}
            variant={filterStatus === filter.key ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus(filter.key)}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>Task List</CardTitle>
          <CardDescription>
            Track and manage your sales tasks and reminders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className={`flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 ${isOverdue(task.dueDate) ? 'border-red-200 bg-red-50' : ''}`}>
                <div className="flex items-center gap-3">
                  <Checkbox 
                    checked={task.status === "completed"}
                    className="mt-1"
                  />
                  <div className="text-2xl">{getTypeIcon(task.type)}</div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
                      {task.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status.replace('-', ' ')}
                      </Badge>
                      {isOverdue(task.dueDate) && (
                        <Badge className="bg-red-100 text-red-800">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Overdue
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className={isOverdue(task.dueDate) ? "text-red-600 font-medium" : ""}>
                          Due: {new Date(task.dueDate).toLocaleDateString()} at{" "}
                          {new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {task.assignedTo}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {task.relatedTo.name}
                    </Badge>
                  </div>
                  {task.status === "completed" && task.completedDate && (
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      Completed on {new Date(task.completedDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  {task.status !== "completed" && (
                    <Button variant="outline" size="sm">
                      Mark Done
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
