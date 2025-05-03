
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Mail, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const Notifications = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("settings");
  
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated"
    });
  };
  
  // Sample notifications
  const sampleNotifications = [
    { id: 1, title: "New Client Report", description: "A new report has been generated for ABC Corp", time: "2 hours ago", read: false },
    { id: 2, title: "Audit Scheduled", description: "An audit has been scheduled for Tech Solutions", time: "1 day ago", read: true },
    { id: 3, title: "System Update", description: "The system will undergo maintenance this weekend", time: "2 days ago", read: true }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Notifications & Alerts</h1>
        <p className="text-muted-foreground">
          Manage your notification preferences and view recent alerts
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>
                Your most recent system notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleNotifications.map(notification => (
                  <div key={notification.id} className={`p-4 border rounded-md ${notification.read ? "" : "bg-muted"}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{notification.title}</h4>
                          {!notification.read && <Badge variant="secondary">New</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.description}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Configure which notifications you receive via email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="new-reports" className="font-normal">New client reports</Label>
                </div>
                <Switch id="new-reports" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="audit-schedules" className="font-normal">Audit schedules</Label>
                </div>
                <Switch id="audit-schedules" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="system-updates" className="font-normal">System updates</Label>
                </div>
                <Switch id="system-updates" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>In-App Notifications</CardTitle>
              <CardDescription>
                Configure which notifications you receive within the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="app-new-reports" className="font-normal">New client reports</Label>
                </div>
                <Switch id="app-new-reports" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="app-audit-schedules" className="font-normal">Audit schedules</Label>
                </div>
                <Switch id="app-audit-schedules" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="app-system-updates" className="font-normal">System updates</Label>
                </div>
                <Switch id="app-system-updates" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;
