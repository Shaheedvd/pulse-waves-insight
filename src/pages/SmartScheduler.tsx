
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Users, MapPin, AlertCircle, Plus, Filter } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const SmartScheduler = () => {
  const { currentUser } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');

  const events = [
    {
      id: 1,
      title: "Weekly Finance Review",
      type: "meeting",
      start: "09:00",
      end: "10:30",
      date: "2025-06-09",
      attendees: ["Fiona Finance", "Shaheed Van Dawson"],
      location: "Conference Room A",
      priority: "high",
      department: "finance",
      recurring: "weekly"
    },
    {
      id: 2,
      title: "HR Policy Training",
      type: "training",
      start: "14:00",
      end: "16:00",
      date: "2025-06-09",
      attendees: ["All Staff"],
      location: "Training Room",
      priority: "medium",
      department: "hr",
      recurring: "monthly"
    },
    {
      id: 3,
      title: "Client Evaluation - ABC Corp",
      type: "evaluation",
      start: "10:00",
      end: "12:00",
      date: "2025-06-10",
      attendees: ["Quality Team"],
      location: "ABC Corp Site",
      priority: "high",
      department: "quality",
      recurring: null
    },
    {
      id: 4,
      title: "Marketing Campaign Review",
      type: "meeting",
      start: "11:00",
      end: "12:00",
      date: "2025-06-10",
      attendees: ["Marketing Team"],
      location: "Virtual",
      priority: "medium",
      department: "marketing",
      recurring: "bi-weekly"
    },
    {
      id: 5,
      title: "System Maintenance Window",
      type: "maintenance",
      start: "22:00",
      end: "02:00",
      date: "2025-06-11",
      attendees: ["IT Team"],
      location: "Data Center",
      priority: "high",
      department: "it",
      recurring: "monthly"
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Q2 Financial Report",
      dueDate: "2025-06-12",
      priority: "urgent",
      assignee: "Fiona Finance",
      department: "finance"
    },
    {
      id: 2,
      title: "Employee Performance Reviews",
      dueDate: "2025-06-15",
      priority: "high",
      assignee: "Helen HR",
      department: "hr"
    },
    {
      id: 3,
      title: "Website Security Audit",
      dueDate: "2025-06-18",
      priority: "medium",
      assignee: "Ian IT",
      department: "it"
    }
  ];

  const conflicts = [
    {
      id: 1,
      description: "Fiona Finance has overlapping meetings on June 10th",
      severity: "high",
      suggestion: "Reschedule marketing review to afternoon"
    },
    {
      id: 2,
      description: "Training room double-booked for June 12th",
      severity: "medium",
      suggestion: "Move one session to Conference Room B"
    }
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case "meeting": return "bg-blue-100 border-blue-500";
      case "training": return "bg-green-100 border-green-500";
      case "evaluation": return "bg-purple-100 border-purple-500";
      case "maintenance": return "bg-red-100 border-red-500";
      default: return "bg-gray-100 border-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const todayEvents = events.filter(event => event.date === new Date().toISOString().split('T')[0]);
  const thisWeekEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return eventDate >= today && eventDate <= weekFromNow;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smart Scheduler & Calendar</h1>
          <p className="text-muted-foreground">
            Intelligent scheduling with conflict detection and auto-prioritization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="tasks">Task Schedule</TabsTrigger>
          <TabsTrigger value="conflicts">Conflicts</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-auto"
            />
            <div className="flex rounded-md border">
              <Button
                variant={viewMode === 'day' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('day')}
              >
                Day
              </Button>
              <Button
                variant={viewMode === 'week' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('week')}
              >
                Week
              </Button>
              <Button
                variant={viewMode === 'month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('month')}
              >
                Month
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>This Week's Schedule</CardTitle>
                <CardDescription>
                  {thisWeekEvents.length} events scheduled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {thisWeekEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-3 rounded-lg border-l-4 ${getEventColor(event.type)}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {event.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {event.start} - {event.end}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(event.priority)}`} />
                        </div>
                      </div>
                      {event.recurring && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          Recurring: {event.recurring}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Today's Events</CardTitle>
                <CardDescription>
                  {todayEvents.length} events today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {todayEvents.length > 0 ? (
                    todayEvents.map((event) => (
                      <div key={event.id} className="text-sm p-2 bg-muted rounded">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-muted-foreground">
                          {event.start} - {event.end}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No events today</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Task Deadlines</CardTitle>
              <CardDescription>
                Tasks and deadlines across all departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Due: {task.dueDate}</span>
                        <span>Assignee: {task.assignee}</span>
                        <Badge variant="outline">{task.department}</Badge>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conflicts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduling Conflicts</CardTitle>
              <CardDescription>
                AI-detected conflicts and suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {conflicts.map((conflict) => (
                  <div key={conflict.id} className="p-3 border-l-4 border-l-orange-500 bg-orange-50 rounded">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-orange-800">{conflict.description}</p>
                        <p className="text-sm text-orange-600 mt-1">
                          Suggestion: {conflict.suggestion}
                        </p>
                      </div>
                      <Badge variant={conflict.severity === "high" ? "destructive" : "secondary"}>
                        {conflict.severity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Google Calendar</CardTitle>
                <CardDescription>Sync with Google Calendar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status:</span>
                    <Badge variant="outline">Not Connected</Badge>
                  </div>
                  <Button className="w-full">Connect Google Calendar</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Outlook Integration</CardTitle>
                <CardDescription>Sync with Microsoft Outlook</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status:</span>
                    <Badge variant="outline">Not Connected</Badge>
                  </div>
                  <Button className="w-full">Connect Outlook</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartScheduler;
