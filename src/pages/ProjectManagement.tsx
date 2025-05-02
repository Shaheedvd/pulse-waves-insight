
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Calendar, List, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectGrid from "@/components/projects/ProjectGrid";
import ProjectList from "@/components/projects/ProjectList";
import ProjectForm from "@/components/projects/ProjectForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const ProjectManagement = () => {
  const { currentUser, hasPermission } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("active");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Check if user has permission to access project management
  const canAccessProjects = currentUser?.role === "manager" || currentUser?.role === "superuser";

  if (!canAccessProjects) {
    // Redirect unauthorized users
    React.useEffect(() => {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access project management",
        variant: "destructive",
      });
      navigate("/dashboard");
    }, [navigate, toast]);
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Project Management</h1>
        <p className="text-muted-foreground">
          Create and manage projects across your organization
        </p>
      </div>

      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex ml-4 gap-1">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Calendar className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button onClick={() => setIsAddProjectModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="onhold">On Hold</TabsTrigger>
          <TabsTrigger value="all">All Projects</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4 mt-6">
          {viewMode === "grid" ? (
            <ProjectGrid status={["not-started", "in-progress"]} searchQuery={searchQuery} />
          ) : (
            <ProjectList status={["not-started", "in-progress"]} searchQuery={searchQuery} />
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4 mt-6">
          {viewMode === "grid" ? (
            <ProjectGrid status={["completed"]} searchQuery={searchQuery} />
          ) : (
            <ProjectList status={["completed"]} searchQuery={searchQuery} />
          )}
        </TabsContent>
        
        <TabsContent value="onhold" className="space-y-4 mt-6">
          {viewMode === "grid" ? (
            <ProjectGrid status={["on-hold"]} searchQuery={searchQuery} />
          ) : (
            <ProjectList status={["on-hold"]} searchQuery={searchQuery} />
          )}
        </TabsContent>
        
        <TabsContent value="all" className="space-y-4 mt-6">
          {viewMode === "grid" ? (
            <ProjectGrid status={["not-started", "in-progress", "completed", "on-hold"]} searchQuery={searchQuery} />
          ) : (
            <ProjectList status={["not-started", "in-progress", "completed", "on-hold"]} searchQuery={searchQuery} />
          )}
        </TabsContent>
      </Tabs>

      {/* Add Project Modal */}
      <Dialog open={isAddProjectModalOpen} onOpenChange={setIsAddProjectModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <ProjectForm 
            onClose={() => setIsAddProjectModalOpen(false)}
            onSuccess={() => {
              setIsAddProjectModalOpen(false);
              toast({
                title: "Project Created",
                description: "New project has been created successfully",
              });
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectManagement;
