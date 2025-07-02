
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Calendar, FileText, Plus, Clock, User, TrendingUp } from "lucide-react";

export const SalesActivities = () => {
  const [isLogDialogOpen, setIsLogDialogOpen] = useState(false);

  // Mock activities data
  const activities = [
    {
      id: "1",
      type: "call",
      subject: "Discovery Call with TechCorp",
      description: "Discussed their CX management needs and current pain points",
      date: "2024-01-20T10:00:00Z",
      duration: 45,
      outcome: "Positive - interested in demo",
      nextAction: "Schedule product demo",
      relatedTo: { type: "lead", name: "TechCorp Inc" },
      createdBy: "John Smith"
    },
    {
      id: "2",
      type: "email",
      subject: "Follow-up on Proposal",
      description: "Sent follow-up email regarding the submitted proposal",
      date: "2024-01-19T14:30:00Z",
      outcome: "Awaiting response",
      nextAction: "Call if no response in 2 days",
      relatedTo: { type: "deal", name: "RetailChain Consulting" },
      createdBy: "Sarah Johnson"
    },
    {
      id: "3",
      type: "meeting",
      subject: "Product Demo - Startup.io",
      description: "Conducted comprehensive product demonstration",
      date: "2024-01-18T11:00:00Z",
      duration: 60,
      outcome: "Very interested, requesting quote",
      nextAction: "Prepare and send quotation",
      relatedTo: { type: "lead", name: "Startup.io" },
      createdBy: "Mike Wilson"
    },
    {
      id: "4",
      type: "note",
      subject: "Competitor Analysis",
      description: "Client mentioned they're evaluating 3 other solutions including our main competitor",
      date: "2024-01-17T16:00:00Z",
      outcome: "Need to emphasize our unique value proposition",
      nextAction: "Prepare competitive comparison document",
      relatedTo: { type: "deal", name: "Manufacturing Solutions Deal" },
      createdBy: "Lisa Chen"
    }
  ];

  // Performance metrics
  const performanceMetrics = {
    thisWeek: {
      calls: 12,
      emails: 28,
      meetings: 5,
      notes: 15
    },
    lastWeek: {
      calls: 8,
      emails: 22,
      meetings: 3,
      notes: 10
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "call": return <Phone className="h-4 w-4 text-blue-600" />;
      case "email": return <Mail className="h-4 w-4 text-green-600" />;
      case "meeting": return <Calendar className="h-4 w-4 text-purple-600" />;
      case "note": return <FileText className="h-4 w-4 text-orange-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "call": return "bg-blue-100 text-blue-800";
      case "email": return "bg-green-100 text-green-800";
      case "meeting": return "bg-purple-100 text-purple-800";
      case "note": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Sales Activities</h2>
          <p className="text-muted-foreground">Track and log your sales interactions</p>
        </div>
        <Dialog open={isLogDialogOpen} onOpenChange={setIsLogDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Log Activity
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Log Sales Activity</DialogTitle>
              <DialogDescription>
                Record your sales interaction for tracking and follow-up
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="activityType">Activity Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="call">Phone Call</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="note">Note</SelectItem>
                      <SelectItem value="quote">Quote Sent</SelectItem>
                    </SelectContent>
                  </Select>
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
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Brief description of the activity" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Detailed notes about the interaction..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input id="duration" type="number" placeholder="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="outcome">Outcome</Label>
                  <Input id="outcome" placeholder="Result of the interaction" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nextAction">Next Action</Label>
                <Input id="nextAction" placeholder="What's the next step?" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsLogDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsLogDialogOpen(false)}>
                Log Activity
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="activities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activities">Activity Feed</TabsTrigger>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="activities" className="space-y-4">
          {/* Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Latest sales interactions and follow-ups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{activity.subject}</h4>
                          <Badge className={getActivityColor(activity.type)}>
                            {activity.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          {activity.createdBy}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            {new Date(activity.date).toLocaleDateString()} at{" "}
                            {new Date(activity.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          {activity.duration && (
                            <span className="text-muted-foreground">
                              Duration: {activity.duration} min
                            </span>
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {activity.relatedTo.name}
                        </Badge>
                      </div>
                      {activity.outcome && (
                        <div className="text-sm">
                          <span className="font-medium">Outcome:</span> {activity.outcome}
                        </div>
                      )}
                      {activity.nextAction && (
                        <div className="text-sm">
                          <span className="font-medium">Next Action:</span> {activity.nextAction}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Calls This Week</CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.thisWeek.calls}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className={`h-3 w-3 ${calculateGrowth(performanceMetrics.thisWeek.calls, performanceMetrics.lastWeek.calls) >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                  <span className={calculateGrowth(performanceMetrics.thisWeek.calls, performanceMetrics.lastWeek.calls) >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {calculateGrowth(performanceMetrics.thisWeek.calls, performanceMetrics.lastWeek.calls)}%
                  </span>
                  <span>from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Emails This Week</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.thisWeek.emails}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className={`h-3 w-3 ${calculateGrowth(performanceMetrics.thisWeek.emails, performanceMetrics.lastWeek.emails) >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                  <span className={calculateGrowth(performanceMetrics.thisWeek.emails, performanceMetrics.lastWeek.emails) >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {calculateGrowth(performanceMetrics.thisWeek.emails, performanceMetrics.lastWeek.emails)}%
                  </span>
                  <span>from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Meetings This Week</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.thisWeek.meetings}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className={`h-3 w-3 ${calculateGrowth(performanceMetrics.thisWeek.meetings, performanceMetrics.lastWeek.meetings) >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                  <span className={calculateGrowth(performanceMetrics.thisWeek.meetings, performanceMetrics.lastWeek.meetings) >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {calculateGrowth(performanceMetrics.thisWeek.meetings, performanceMetrics.lastWeek.meetings)}%
                  </span>
                  <span>from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Notes This Week</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.thisWeek.notes}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className={`h-3 w-3 ${calculateGrowth(performanceMetrics.thisWeek.notes, performanceMetrics.lastWeek.notes) >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                  <span className={calculateGrowth(performanceMetrics.thisWeek.notes, performanceMetrics.lastWeek.notes) >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {calculateGrowth(performanceMetrics.thisWeek.notes, performanceMetrics.lastWeek.notes)}%
                  </span>
                  <span>from last week</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
