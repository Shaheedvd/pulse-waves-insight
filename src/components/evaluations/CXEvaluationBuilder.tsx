
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Save,
  Copy,
  Trash2,
  Edit,
  GripVertical,
  Star,
  CheckSquare,
  MessageSquare,
  ToggleLeft,
  Eye,
  Calendar,
  Building,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormField {
  id: string;
  type: "rating" | "multiple_choice" | "yes_no" | "comment";
  label: string;
  required: boolean;
  options?: string[];
  maxRating?: number;
}

interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}

interface EvaluationForm {
  id: string;
  name: string;
  description: string;
  version: string;
  sections: FormSection[];
  createdAt: string;
  updatedAt: string;
  isTemplate: boolean;
  assignedClients: string[];
}

const CXEvaluationBuilder = () => {
  const { toast } = useToast();
  const [selectedForm, setSelectedForm] = useState<EvaluationForm | null>(null);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("builder");
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");

  // Sample forms data
  const [evaluationForms] = useState<EvaluationForm[]>([
    {
      id: "form-001",
      name: "Standard Customer Experience Audit",
      description: "Comprehensive evaluation for retail environments",
      version: "2.1",
      sections: [
        {
          id: "section-1",
          title: "Customer Service",
          description: "Evaluate staff interaction and service quality",
          fields: [
            {
              id: "field-1",
              type: "rating",
              label: "Overall service quality",
              required: true,
              maxRating: 5,
            },
            {
              id: "field-2",
              type: "yes_no",
              label: "Staff greeted customers within 30 seconds",
              required: true,
            },
          ],
        },
        {
          id: "section-2",
          title: "Store Cleanliness",
          description: "Assess cleanliness and maintenance standards",
          fields: [
            {
              id: "field-3",
              type: "multiple_choice",
              label: "Overall cleanliness rating",
              required: true,
              options: ["Excellent", "Good", "Average", "Poor"],
            },
            {
              id: "field-4",
              type: "comment",
              label: "Additional cleanliness observations",
              required: false,
            },
          ],
        },
      ],
      createdAt: "2023-06-15",
      updatedAt: "2023-06-20",
      isTemplate: true,
      assignedClients: ["client-1", "client-2"],
    },
  ]);

  const [newSection, setNewSection] = useState<FormSection>({
    id: "",
    title: "",
    description: "",
    fields: [],
  });

  const predefinedSections = [
    { id: "customer_service", title: "Customer Service", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "staff_appearance", title: "Staff Appearance", icon: <Star className="h-4 w-4" /> },
    { id: "store_cleanliness", title: "Store Cleanliness", icon: <CheckSquare className="h-4 w-4" /> },
    { id: "brand_compliance", title: "Brand Compliance", icon: <Building className="h-4 w-4" /> },
    { id: "product_knowledge", title: "Product Knowledge", icon: <Star className="h-4 w-4" /> },
  ];

  const handleCreateForm = () => {
    if (!formName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a form name",
        variant: "destructive",
      });
      return;
    }

    // Create new form logic here
    toast({
      title: "Success",
      description: "New evaluation form created successfully",
    });

    setFormName("");
    setFormDescription("");
    setIsFormDialogOpen(false);
  };

  const handleSaveForm = () => {
    toast({
      title: "Success",
      description: "Evaluation form saved successfully",
    });
  };

  const handlePreview = (form: EvaluationForm) => {
    setSelectedForm(form);
    setIsPreviewOpen(true);
  };

  const renderFieldIcon = (type: string) => {
    switch (type) {
      case "rating":
        return <Star className="h-4 w-4" />;
      case "multiple_choice":
        return <CheckSquare className="h-4 w-4" />;
      case "yes_no":
        return <ToggleLeft className="h-4 w-4" />;
      case "comment":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">CX Evaluation Builder</h1>
        <Button onClick={() => setIsFormDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create New Form
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="builder">Form Builder</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="assignments">Client Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evaluation Forms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {evaluationForms.map((form) => (
                  <Card key={form.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{form.name}</h3>
                          <Badge variant="outline">v{form.version}</Badge>
                          {form.isTemplate && <Badge>Template</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{form.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Updated: {form.updatedAt}</span>
                          <span>{form.sections.length} sections</span>
                          <span>{form.assignedClients.length} clients assigned</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => handlePreview(form)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Predefined Section Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {predefinedSections.map((section) => (
                  <Card key={section.id} className="p-4 cursor-pointer hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      {section.icon}
                      <h3 className="font-medium">{section.title}</h3>
                    </div>
                    <Button className="w-full mt-3" variant="outline" size="sm">
                      Add to Form
                    </Button>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Assignments & Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Form" />
                    </SelectTrigger>
                    <SelectContent>
                      {evaluationForms.map((form) => (
                        <SelectItem key={form.id} value={form.id}>
                          {form.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client-1">Retail Corp SA</SelectItem>
                      <SelectItem value="client-2">QuickMart</SelectItem>
                      <SelectItem value="client-3">EcoFuel</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Calendar className="mr-2 h-4 w-4" /> Schedule Evaluation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Form Dialog */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create New Evaluation Form</DialogTitle>
            <DialogDescription>
              Design a new customer experience evaluation form
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="form-name">Form Name</Label>
              <Input
                id="form-name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g., Retail Store Evaluation"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="form-description">Description</Label>
              <Textarea
                id="form-description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Brief description of the evaluation purpose"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateForm}>Create Form</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[600px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Form Preview: {selectedForm?.name}</DialogTitle>
            <DialogDescription>
              {selectedForm?.description}
            </DialogDescription>
          </DialogHeader>
          {selectedForm && (
            <div className="space-y-6">
              {selectedForm.sections.map((section) => (
                <Card key={section.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    {section.description && (
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {section.fields.map((field) => (
                      <div key={field.id} className="space-y-2">
                        <div className="flex items-center gap-2">
                          {renderFieldIcon(field.type)}
                          <Label>{field.label}</Label>
                          {field.required && <span className="text-red-500">*</span>}
                        </div>
                        {field.type === "rating" && (
                          <div className="flex gap-1">
                            {Array.from({ length: field.maxRating || 5 }).map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-gray-300" />
                            ))}
                          </div>
                        )}
                        {field.type === "multiple_choice" && (
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        {field.type === "yes_no" && (
                          <div className="flex gap-4">
                            <Button variant="outline" size="sm">Yes</Button>
                            <Button variant="outline" size="sm">No</Button>
                          </div>
                        )}
                        {field.type === "comment" && (
                          <Textarea placeholder="Enter your comments here..." />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              Close
            </Button>
            <Button onClick={handleSaveForm}>
              <Save className="mr-2 h-4 w-4" /> Save Form
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CXEvaluationBuilder;
