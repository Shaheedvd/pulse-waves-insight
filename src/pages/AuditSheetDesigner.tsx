
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Printer, Save, PlusCircle, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const AuditSheetDesigner = () => {
  const { toast } = useToast();
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState("categories");
  
  // Sample categories that would be customizable in a real app
  const [categories, setCategories] = useState([
    { id: "1", name: "Signage, Lighting & Accessibility", enabled: true },
    { id: "2", name: "Building Exterior", enabled: true },
    { id: "3", name: "Shop/Forecourt", enabled: true },
    { id: "4", name: "Yard Area", enabled: false },
    { id: "5", name: "Staff Facilities", enabled: true },
    { id: "6", name: "Bakery, Food Preparation", enabled: true },
    { id: "7", name: "Store, Fridges, Storage", enabled: true },
    { id: "8", name: "Staff", enabled: true },
    { id: "9", name: "HSSE General", enabled: true },
    { id: "10", name: "Administration & Business", enabled: true },
  ]);

  // Template settings
  const [templateSettings, setTemplateSettings] = useState({
    name: "Standard Audit Template",
    description: "Comprehensive site evaluation template",
    type: "retail",
    includePhotos: true,
    includeComments: true,
    requireGPS: true
  });

  const handleSaveTemplate = () => {
    toast({
      title: "Template Saved",
      description: "Audit sheet template has been saved successfully",
    });
  };

  const handlePrintTemplate = () => {
    toast({
      title: "Preparing Print",
      description: "Audit sheet template is being prepared for printing",
    });
    
    // Simulate print preparation delay
    setTimeout(() => {
      window.print();
    }, 1000);
  };

  const toggleCategory = (id: string) => {
    setCategories(
      categories.map(category =>
        category.id === id ? { ...category, enabled: !category.enabled } : category
      )
    );
  };

  const updateSettings = (key: keyof typeof templateSettings, value: any) => {
    setTemplateSettings({
      ...templateSettings,
      [key]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Audit Sheet Designer</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrintTemplate}>
            <Printer className="mr-2 h-4 w-4" />
            Print Template
          </Button>
          <Button onClick={handleSaveTemplate}>
            <Save className="mr-2 h-4 w-4" />
            Save Template
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Design Audit Sheet</CardTitle>
          <CardDescription>
            Customize your evaluation form template
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basics">Basic Settings</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basics" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input 
                    id="template-name" 
                    value={templateSettings.name}
                    onChange={(e) => updateSettings('name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="template-description">Description</Label>
                  <Input 
                    id="template-description" 
                    value={templateSettings.description}
                    onChange={(e) => updateSettings('description', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="template-type">Template Type</Label>
                  <Select 
                    value={templateSettings.type}
                    onValueChange={(value) => updateSettings('type', value)}
                  >
                    <SelectTrigger id="template-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail Store</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="hotel">Hotel</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium">Template Features</h3>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-photos" 
                      checked={templateSettings.includePhotos}
                      onCheckedChange={(checked) => 
                        updateSettings('includePhotos', checked === true)
                      }
                    />
                    <Label htmlFor="include-photos">
                      Include photo uploads
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-comments" 
                      checked={templateSettings.includeComments}
                      onCheckedChange={(checked) => 
                        updateSettings('includeComments', checked === true)
                      }
                    />
                    <Label htmlFor="include-comments">
                      Include comment sections
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="require-gps" 
                      checked={templateSettings.requireGPS}
                      onCheckedChange={(checked) => 
                        updateSettings('requireGPS', checked === true)
                      }
                    />
                    <Label htmlFor="require-gps">
                      Require GPS verification
                    </Label>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="categories" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Audit Categories</h3>
                  <Button variant="outline" size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </div>
                
                <div className="border rounded-md divide-y">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category.id}`}
                          checked={category.enabled}
                          onCheckedChange={() => toggleCategory(category.id)}
                        />
                        <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                          {category.name}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="questions" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Questions Library</h3>
                  <Button variant="outline" size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  <Select defaultValue="signage">
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(c => c.enabled).map((category) => (
                        <SelectItem key={category.id} value={category.id.toLowerCase().replace(/\s+/g, '-')}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="border rounded-md p-6 text-center">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-semibold">Select a Category</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Choose a category to view and edit questions
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditSheetDesigner;
