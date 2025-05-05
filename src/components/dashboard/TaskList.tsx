
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Clock, FilePlus, FileText } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const taskData = [
  {
    id: "1",
    title: "Weekly Quality Audit - ABC Corp",
    dueDate: "2025-05-06",
    type: "Audit",
    priority: "high",
    description: "Conduct weekly quality audit for ABC Corp's Cape Town branch",
    assignedTo: "Eric Evaluator",
    location: "Cape Town CBD",
    clientContact: "John Smith",
    contactNumber: "+27 21 555 1234",
    notes: "Focus on shop floor layout and stock rotation",
    status: "pending"
  },
  {
    id: "2",
    title: "Client Onboarding - Tech Solutions",
    dueDate: "2025-05-08",
    type: "Admin",
    priority: "medium",
    description: "Complete onboarding documentation for new client Tech Solutions",
    assignedTo: "Admin User",
    location: "Remote",
    clientContact: "Sarah Johnson",
    contactNumber: "+27 11 444 5678",
    notes: "Client requires ISO 9001 compliance documentation",
    status: "in-progress"
  },
  {
    id: "3",
    title: "Monthly Evaluation - EcoFuel Durban",
    dueDate: "2025-05-12",
    type: "Evaluation",
    priority: "medium",
    description: "Perform monthly site evaluation for EcoFuel's Durban location",
    assignedTo: "Sarah Manager",
    location: "Durban Beachfront",
    clientContact: "Michael Brown",
    contactNumber: "+27 31 333 9876",
    notes: "Previous evaluation noted issues with forecourt signage",
    status: "scheduled"
  },
  {
    id: "4",
    title: "Team Performance Review",
    dueDate: "2025-05-15",
    type: "HR",
    priority: "low",
    description: "Conduct quarterly team performance reviews",
    assignedTo: "Oliver Operations",
    location: "Head Office",
    clientContact: "N/A",
    contactNumber: "N/A",
    notes: "Prepare feedback forms and schedule one-on-one meetings",
    status: "pending"
  },
];

const TaskList = () => {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="default">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Audit":
        return <Badge className="bg-blue-100 text-blue-800">Audit</Badge>;
      case "Evaluation":
        return <Badge className="bg-green-100 text-green-800">Evaluation</Badge>;
      case "Admin":
        return <Badge className="bg-orange-100 text-orange-800">Admin</Badge>;
      case "HR":
        return <Badge className="bg-purple-100 text-purple-800">HR</Badge>;
      default:
        return <Badge variant="outline">Other</Badge>;
    }
  };
  
  const downloadTask = (taskId: string) => {
    // In a real app, this would generate and download a PDF
    console.log(`Downloading task ${taskId}`);
    alert("Task details downloaded successfully!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Upcoming Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {taskData.map((task) => (
            <div
              key={task.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4"
            >
              <div className="space-y-1">
                <div className="font-medium">{task.title}</div>
                <div className="flex items-center text-sm text-muted-foreground space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center mt-2 md:mt-0 space-x-2">
                {getTypeBadge(task.type)}
                {getPriorityBadge(task.priority)}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4 mr-1" /> View Details
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[400px] sm:w-[540px]">
                    <SheetHeader>
                      <SheetTitle>{task.title}</SheetTitle>
                      <SheetDescription>Task details and information</SheetDescription>
                    </SheetHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Type</h4>
                          <p>{getTypeBadge(task.type)}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Priority</h4>
                          <p>{getPriorityBadge(task.priority)}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                        <p className="text-sm">{task.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Due Date</h4>
                          <p className="text-sm">{new Date(task.dueDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                          <p className="text-sm capitalize">{task.status}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Assigned To</h4>
                          <p className="text-sm">{task.assignedTo}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                          <p className="text-sm">{task.location}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Client Contact</h4>
                          <p className="text-sm">{task.clientContact}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Contact Number</h4>
                          <p className="text-sm">{task.contactNumber}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Notes</h4>
                        <p className="text-sm">{task.notes}</p>
                      </div>
                      
                      <div className="pt-4">
                        <Button onClick={() => downloadTask(task.id)}>
                          <FilePlus className="h-4 w-4 mr-2" /> Download Task Details
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
