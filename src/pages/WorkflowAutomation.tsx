
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Play, Pause, Settings, Plus, GitBranch, Clock, CheckCircle, AlertCircle, Zap } from "lucide-react";

const WorkflowAutomation = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);

  const workflows = [
    {
      id: "wf-001",
      name: "New Client Onboarding",
      description: "Automated workflow for setting up new client accounts",
      status: "active",
      triggers: ["New client registration", "Contract signed"],
      actions: 12,
      executions: 45,
      successRate: 98,
      lastRun: "2025-06-08 14:30",
      steps: [
        { id: 1, name: "Create client record", type: "action", status: "completed" },
        { id: 2, name: "Send welcome email", type: "email", status: "completed" },
        { id: 3, name: "Schedule kickoff meeting", type: "calendar", status: "completed" },
        { id: 4, name: "Assign account manager", type: "assignment", status: "completed" },
        { id: 5, name: "Generate initial reports", type: "report", status: "pending" }
      ]
    },
    {
      id: "wf-002",
      name: "Audit Report Processing",
      description: "Automate audit report generation and distribution",
      status: "active",
      triggers: ["Audit completion", "Scheduled report"],
      actions: 8,
      executions: 123,
      successRate: 95,
      lastRun: "2025-06-08 16:15",
      steps: [
        { id: 1, name: "Collect audit data", type: "data", status: "completed" },
        { id: 2, name: "Generate PDF report", type: "report", status: "completed" },
        { id: 3, name: "Send to stakeholders", type: "email", status: "completed" },
        { id: 4, name: "Update client portal", type: "update", status: "completed" }
      ]
    },
    {
      id: "wf-003",
      name: "Employee Performance Review",
      description: "Quarterly performance review automation",
      status: "scheduled",
      triggers: ["Quarterly schedule", "Manager request"],
      actions: 15,
      executions: 28,
      successRate: 92,
      lastRun: "2025-03-15 09:00",
      steps: [
        { id: 1, name: "Collect performance data", type: "data", status: "pending" },
        { id: 2, name: "Generate metrics", type: "calculation", status: "pending" },
        { id: 3, name: "Send review forms", type: "form", status: "pending" },
        { id: 4, name: "Schedule review meetings", type: "calendar", status: "pending" }
      ]
    },
    {
      id: "wf-004",
      name: "Risk Alert System",
      description: "Monitor and alert on risk threshold breaches",
      status: "active",
      triggers: ["Risk threshold breach", "Anomaly detected"],
      actions: 6,
      executions: 67,
      successRate: 100,
      lastRun: "2025-06-08 18:20",
      steps: [
        { id: 1, name: "Monitor risk metrics", type: "monitor", status: "running" },
        { id: 2, name: "Evaluate thresholds", type: "condition", status: "completed" },
        { id: 3, name: "Send alerts", type: "notification", status: "completed" },
        { id: 4, name: "Create incident ticket", type: "ticket", status: "completed" }
      ]
    }
  ];

  const workflowTemplates = [
    {
      name: "Client Feedback Collection",
      description: "Automated survey distribution and follow-up",
      category: "Customer Experience",
      complexity: "Medium"
    },
    {
      name: "Invoice Processing",
      description: "Automated invoice generation and payment tracking",
      category: "Finance",
      complexity: "High"
    },
    {
      name: "Training Reminder System",
      description: "Automated training notifications and compliance tracking",
      category: "HR",
      complexity: "Low"
    },
    {
      name: "Quality Control Checks",
      description: "Automated quality verification workflows",
      category: "Operations",
      complexity: "Medium"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "scheduled": return "bg-blue-500";
      case "paused": return "bg-yellow-500";
      case "error": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case "email": return "📧";
      case "calendar": return "📅";
      case "report": return "📊";
      case "data": return "💾";
      case "monitor": return "👁️";
      case "notification": return "🔔";
      default: return "⚡";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workflow Automation</h1>
          <p className="text-muted-foreground">
            Create and manage automated business processes
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.5%</div>
            <p className="text-xs text-muted-foreground">Average across all workflows</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="workflows" className="space-y-4">
        <TabsList>
          <TabsTrigger value="workflows">Active Workflows</TabsTrigger>
          <TabsTrigger value="builder">Workflow Builder</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-4">
          <div className="grid gap-4">
            {workflows.map((workflow) => (
              <Card key={workflow.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{workflow.name}</CardTitle>
                      <CardDescription>{workflow.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(workflow.status)}`} />
                      <span className="text-sm capitalize">{workflow.status}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3 mb-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Performance</div>
                      <div className="text-xs text-muted-foreground">
                        <div>Executions: {workflow.executions}</div>
                        <div>Success Rate: {workflow.successRate}%</div>
                        <div>Last Run: {workflow.lastRun}</div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Triggers</div>
                      <div className="space-y-1">
                        {workflow.triggers.map((trigger, index) => (
                          <Badge key={index} variant="outline" className="text-xs block w-fit">
                            {trigger}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Workflow Steps</div>
                      <div className="flex flex-wrap gap-1">
                        {workflow.steps.slice(0, 3).map((step) => (
                          <span key={step.id} className="text-lg">
                            {getStepIcon(step.type)}
                          </span>
                        ))}
                        {workflow.steps.length > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{workflow.steps.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Settings className="h-3 w-3 mr-1" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm">
                      <GitBranch className="h-3 w-3 mr-1" />
                      View Flow
                    </Button>
                    {workflow.status === "active" ? (
                      <Button variant="outline" size="sm">
                        <Pause className="h-3 w-3 mr-1" />
                        Pause
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        <Play className="h-3 w-3 mr-1" />
                        Start
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="builder" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Builder</CardTitle>
              <CardDescription>
                Create custom workflows with drag-and-drop interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Workflow Name</label>
                  <Input placeholder="Enter workflow name" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer Experience</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  placeholder="Describe what this workflow does..." 
                  className="mt-1"
                />
              </div>
              <div className="mt-6 p-8 border-2 border-dashed border-muted rounded-lg text-center">
                <GitBranch className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <div className="text-lg font-medium mb-2">Visual Workflow Builder</div>
                <div className="text-muted-foreground mb-4">
                  Drag and drop components to build your workflow
                </div>
                <Button>Start Building</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {workflowTemplates.map((template, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{template.complexity}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{template.category}</Badge>
                    <Button size="sm">Use Template</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Execution Summary</CardTitle>
                <CardDescription>Workflow performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Successful Executions</span>
                    <span className="font-medium">1,203</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Failed Executions</span>
                    <span className="font-medium text-red-500">44</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Duration</span>
                    <span className="font-medium">2.5 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Time Saved</span>
                    <span className="font-medium text-green-500">342 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Workflows</CardTitle>
                <CardDescription>By execution count and success rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workflows.slice(0, 4).map((workflow, index) => (
                    <div key={workflow.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{workflow.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {workflow.executions} executions
                        </div>
                      </div>
                      <Badge variant="outline">{workflow.successRate}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowAutomation;
