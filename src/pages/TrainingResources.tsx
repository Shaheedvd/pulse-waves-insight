
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrainingResourcesList from "@/components/training/TrainingResourcesList";
import TrainingResourceForm from "@/components/training/TrainingResourceForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const TrainingResources = () => {
  const { currentUser, hasPermission } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("seo");
  const [isAddResourceModalOpen, setIsAddResourceModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const canAccessTraining = true; // All authenticated users can access training
  const canAddResources = currentUser?.role === "manager" || currentUser?.role === "superuser";

  if (!canAccessTraining) {
    // Redirect unauthorized users
    React.useEffect(() => {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access training resources",
        variant: "destructive",
      });
      navigate("/dashboard");
    }, [navigate, toast]);
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Training Resources</h1>
        <p className="text-muted-foreground">
          Access training materials and resources for professional development
        </p>
      </div>

      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          {canAddResources && (
            <Button onClick={() => setIsAddResourceModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Resource
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="email">Email Marketing</TabsTrigger>
          <TabsTrigger value="collab">Collaboration</TabsTrigger>
          <TabsTrigger value="gamification">Gamification</TabsTrigger>
        </TabsList>
        
        <TabsContent value="seo" className="space-y-4 mt-6">
          <TrainingResourcesList category="SEO" searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4 mt-6">
          <TrainingResourcesList category="Social Media" searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="email" className="space-y-4 mt-6">
          <TrainingResourcesList category="Email Marketing" searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="collab" className="space-y-4 mt-6">
          <TrainingResourcesList category="Collaboration" searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="gamification" className="space-y-4 mt-6">
          <TrainingResourcesList category="Gamification" searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>

      {/* Add Resource Modal */}
      <Dialog open={isAddResourceModalOpen} onOpenChange={setIsAddResourceModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Training Resource</DialogTitle>
          </DialogHeader>
          <TrainingResourceForm 
            onClose={() => setIsAddResourceModalOpen(false)}
            onSuccess={() => {
              setIsAddResourceModalOpen(false);
              toast({
                title: "Resource Added",
                description: "Training resource has been added successfully",
              });
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainingResources;
