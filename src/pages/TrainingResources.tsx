
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, BookOpen, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrainingResourcesList from "@/components/training/TrainingResourcesList";
import TrainingDocumentList from "@/components/training/TrainingDocumentList";
import TrainingResourceForm from "@/components/training/TrainingResourceForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { getTrainingDocuments, getTrainingCategories } from "@/services/trainingService";

const TrainingResources = () => {
  const { currentUser, hasPermission } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("resources");
  const [isAddResourceModalOpen, setIsAddResourceModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  
  const canAccessTraining = true; // All authenticated users can access training
  const canAddResources = currentUser?.role === "manager" || currentUser?.role === "superuser";

  useEffect(() => {
    if (currentUser) {
      // Load categories based on user role
      const availableCategories = getTrainingCategories(currentUser.role);
      setCategories(availableCategories);
      
      // Load initial documents
      const docs = getTrainingDocuments(
        currentUser.role, 
        selectedCategory !== "All" ? selectedCategory : undefined,
        searchQuery || undefined
      );
      setFilteredDocuments(docs);
    }
  }, [currentUser, selectedCategory, searchQuery]);

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Training Resources</h1>
        <p className="text-muted-foreground">
          Access training materials, resources, and documentation for professional development
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="resources">
            <FileText className="mr-2 h-4 w-4" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="documentation">
            <BookOpen className="mr-2 h-4 w-4" />
            Documentation
          </TabsTrigger>
        </TabsList>
        
        {/* Resources Tab Content */}
        <TabsContent value="resources" className="space-y-4">
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

          <Tabs defaultValue="seo" className="w-full">
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
        </TabsContent>
        
        {/* Documentation Tab Content */}
        <TabsContent value="documentation" className="space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4 flex-1 flex-wrap">
              <div className="relative max-w-md flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documentation..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              
              <div className="min-w-[180px]">
                <Select
                  value={selectedCategory}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {currentUser?.role === "admin" || currentUser?.role === "superuser" ? (
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Documentation
              </Button>
            ) : null}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Training Documentation</CardTitle>
              <CardDescription>
                How-to guides and reference materials for using the platform
                {currentUser && (
                  <span className="ml-2 text-primary">
                    (Showing content for {currentUser.role} access level)
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TrainingDocumentList documents={filteredDocuments} />
            </CardContent>
          </Card>
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
