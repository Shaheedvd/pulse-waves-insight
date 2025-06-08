
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Repeat, Play, Pause, Settings, Plus, Calendar, Clock, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const TaskAutomation = () => {
  const { currentUser } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const recurringTasks = [
    {
      id: 1,
      name: "Weekly Financial Report",
      department: "finance",
      frequency: "weekly",
      schedule: "Every Monday at 9:00 AM",
      lastRun: "2025-06-02",
      nextRun: "2025-06-09",
      status: "active",
      assignee: "Fiona Finance",
      template: "Generate and distribute weekly financial summary",
      notifications: ["email", "dashboard"]
    },
    {
      id: 2,
      name: "Monthly Payroll Processing",
      department: "finance",
      frequency: "monthly",
      schedule: "Last Friday of each month at 2:00 PM",
      lastRun: "2025-05-31",
      nextRun: "2025-06-28",
      status: "active",
      assignee: "Paula Payroll",
      template: "Process monthly payroll for all employees",
      notifications: ["email", "sms"]
    },
    {
      id: 3,
      name: "HR Compliance Training Reminder",
      department: "hr",
      frequency: "quarterly",
      schedule: "First Monday of each quarter at 10:00 AM",
      lastRun: "2025-04-01",
      nextRun: "2025-07-01",
      status: "active",
      assignee: "Helen HR",
      template: "Send compliance training reminders to all staff",
      notifications: ["email", "dashboard"]
    },
    {
      id: 4,
      name: "IT Security Audit Checklist",
      department: "it",
      frequency: "monthly",
      schedule: "15th of each month at 11:00 AM",
      lastRun: "2025-05-15",
      nextRun: "2025-06-15",
      status: "paused",
      assignee: "Ian IT",
      template: "Complete monthly security audit checklist",
      notifications: ["email"]
    },
    {
      id: 5,
      name: "Marketing Campaign Performance Review",
      department: "marketing",
      frequency: "bi-weekly",
      schedule: "Every other Friday at 3:00 PM",
      lastRun: "2025-05-31",
      nextRun: "2025-06-14",
      status: "active",
      assignee: "Sarah Manager",
      template: "Review and analyze marketing campaign performance",
      notifications: ["email", "dashboard"]
    },
    {
      id: 6,
      name: "Client Satisfaction Survey",
      department: "operations",
      frequency: "monthly",
      schedule: "First Wednesday of each month at 1:00 PM",
      lastRun: "2025-06-05",
      nextRun: "2025-07-03",
      status: "active",
      assignee: "Quality Team",
      template: "Send and collect client satisfaction surveys",
      notifications: ["email", "dashboard"]
    }
  ];

  const taskTemplates = [
    {
      id: 1,
      name: "Financial Report Template",
      department: "finance",
      description: "Standard template for weekly/monthly financial reports",
      checklist: [
        "Review revenue figures",
        "Analyze expense categories",
        "Generate variance report",
        "Prepare executive summary",
        "Distribute to stakeholders"
      ]
    },
    {
      id: 2,
      name: "Payroll Processing Template",
      department: "finance",
      description: "Complete payroll processing workflow",
      checklist: [
        "Verify time sheets",
        "Calculate gross pay",
        "Apply deductions",
        "Generate pay stubs",
        "Process direct deposits",
        "Update payroll records"
      ]
    },
    {
      id: 3,
      name: "Training Reminder Template",
      department: "hr",
      description: "Standard training reminder process",
      checklist: [
        "Identify training requirements",
        "Check completion status",
        "Send reminder notifications",
        "Schedule makeup sessions",
        "Update training records"
      ]
    }
  ];

  const automationStats = {
    totalTasks: recurringTasks.length,
    activeTasks: recurringTasks.filter(task => task.status === 'active').length,
    tasksThisWeek: 12,
    timeSaved: 24.5
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'bg-blue-100 text-blue-800';
      case 'weekly': return 'bg-green-100 text-green-800';
      case 'bi-weekly': return 'bg-purple-100 text-purple-800';
      case 'monthly': return 'bg-orange-100 text-orange-800';
      case 'quarterly': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recurring Task Automator</h1>
          <p className="text-muted-foreground">
            Automate repetitive tasks and workflows across departments
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Automation
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Automations</p>
                <p className="text-2xl font-bold">{automationStats.totalTasks}</p>
              </div>
              <Repeat className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Tasks</p>
                <p className="text-2xl font-bold">{automationStats.activeTasks}</p>
              </div>
              <Play className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tasks This Week</p>
                <p className="text-2xl font-bold">{automationStats.tasksThisWeek}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hours Saved</p>
                <p className="text-2xl font-bold">{automationStats.timeSaved}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Automations</TabsTrigger>
          <TabsTrigger value="templates">Task Templates</TabsTrigger>
          <TabsTrigger value="history">Execution History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {recurringTasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{task.name}</h3>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                        <Badge variant="outline" className={getFrequencyColor(task.frequency)}>
                          {task.frequency}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{task.template}</p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Next: {task.nextRun}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{task.schedule}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{task.assignee}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">Notifications:</span>
                        {task.notifications.map((type) => (
                          <Badge key={type} variant="secondary" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {}}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {}}
                      >
                        {task.status === 'active' ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {taskTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{template.department}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Checklist Items:</p>
                    <ul className="text-sm space-y-1">
                      {template.checklist.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Executions</CardTitle>
              <CardDescription>Task automation execution history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recurringTasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{task.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Executed: {task.lastRun}</span>
                        <Badge variant="outline">{task.department}</Badge>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Completed
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automation Settings</CardTitle>
              <CardDescription>Configure global automation preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Enable Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send email notifications when automated tasks are executed
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Enable Dashboard Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Show automation alerts in the dashboard
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Auto-pause Failed Tasks</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically pause tasks that fail multiple times
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="space-y-2">
                <Label>Default Assignee for New Automations</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select default assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current User</SelectItem>
                    <SelectItem value="manager">Department Manager</SelectItem>
                    <SelectItem value="admin">System Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Automation Modal would be implemented here */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Create New Automation</CardTitle>
              <CardDescription>Set up a recurring task automation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Task Name</Label>
                  <Input placeholder="Enter task name" />
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="it">IT</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Describe what this automation should do" />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Assignee</Label>
                  <Input placeholder="Enter assignee name" />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowCreateForm(false)}>
                  Create Automation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TaskAutomation;
