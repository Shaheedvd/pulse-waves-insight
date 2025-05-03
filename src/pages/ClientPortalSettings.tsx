
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const ClientPortalSettings = () => {
  const { toast } = useToast();
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your client portal settings have been updated"
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Client Portal Settings</h1>
        <p className="text-muted-foreground">
          Configure access and appearance settings for the client portal
        </p>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="access">Access Controls</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure the general settings for your client portal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="enable-portal" className="flex flex-col space-y-1">
                  <span>Enable Client Portal</span>
                  <span className="font-normal text-sm text-muted-foreground">Allow clients to access their portal</span>
                </Label>
                <Switch id="enable-portal" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="client-signup" className="flex flex-col space-y-1">
                  <span>Client Self-Registration</span>
                  <span className="font-normal text-sm text-muted-foreground">Allow clients to register their own accounts</span>
                </Label>
                <Switch id="client-signup" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="access" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Controls</CardTitle>
              <CardDescription>
                Manage what information clients can access in their portal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="view-reports" className="flex flex-col space-y-1">
                  <span>View Reports</span>
                  <span className="font-normal text-sm text-muted-foreground">Allow clients to view their reports</span>
                </Label>
                <Switch id="view-reports" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="view-invoices" className="flex flex-col space-y-1">
                  <span>View Invoices</span>
                  <span className="font-normal text-sm text-muted-foreground">Allow clients to view their invoices</span>
                </Label>
                <Switch id="view-invoices" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how the client portal looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="custom-branding" className="flex flex-col space-y-1">
                  <span>Custom Branding</span>
                  <span className="font-normal text-sm text-muted-foreground">Use your company logo and colors</span>
                </Label>
                <Switch id="custom-branding" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
                  <span>Dark Mode Option</span>
                  <span className="font-normal text-sm text-muted-foreground">Allow clients to toggle dark mode</span>
                </Label>
                <Switch id="dark-mode" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientPortalSettings;
