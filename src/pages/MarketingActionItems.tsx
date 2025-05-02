
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MarketingTasksTable from "@/components/marketing/MarketingTasksTable";
import MarketingTaskForm from "@/components/marketing/MarketingTaskForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const MarketingActionItems = () => {
  const { currentUser, hasPermission } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("digital");
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  
  // Check if user has permission to access marketing action items
  const canAccessMarketing = hasPermission("canManageMarketing") || 
    currentUser?.role === "manager" || 
    currentUser?.role === "superuser" || 
    currentUser?.role === "admin";

  const canEditTasks = currentUser?.role === "manager" || currentUser?.role === "superuser";

  if (!canAccessMarketing) {
    // Redirect unauthorized users
    React.useEffect(() => {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access marketing action items",
        variant: "destructive",
      });
      navigate("/dashboard");
    }, [navigate, toast]);
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Marketing Action Items</h1>
        <p className="text-muted-foreground">
          Track and manage marketing tasks and activities
        </p>
      </div>

      <div className="flex justify-between items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="digital">Digital Marketing</TabsTrigger>
            <TabsTrigger value="content">Content Marketing</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="sales">Direct Sales</TabsTrigger>
            <TabsTrigger value="tools">Marketing Tools</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2 ml-4">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          {canEditTasks && (
            <Button onClick={() => setIsAddTaskModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <TabsContent value="digital" className="space-y-4">
          <MarketingTasksTable category="Digital Marketing" canEdit={canEditTasks} />
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <MarketingTasksTable category="Content Marketing" canEdit={canEditTasks} />
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4">
          <MarketingTasksTable category="Social Media Marketing" canEdit={canEditTasks} />
        </TabsContent>
        
        <TabsContent value="sales" className="space-y-4">
          <MarketingTasksTable category="Direct Sales & Business Development" canEdit={canEditTasks} />
        </TabsContent>
        
        <TabsContent value="tools" className="space-y-4">
          <MarketingTasksTable category="Marketing Tools & Technology" canEdit={canEditTasks} />
        </TabsContent>
      </div>

      {/* Add Task Modal */}
      <Dialog open={isAddTaskModalOpen} onOpenChange={setIsAddTaskModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Marketing Task</DialogTitle>
          </DialogHeader>
          <MarketingTaskForm 
            onClose={() => setIsAddTaskModalOpen(false)}
            onSuccess={() => {
              setIsAddTaskModalOpen(false);
              toast({
                title: "Task Created",
                description: "Marketing task has been created successfully",
              });
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarketingActionItems;
