import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
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
  Users,
  Clock,
  Target,
  FileText,
  Settings,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGlobal } from "@/contexts/GlobalContext";

interface FormField {
  id: string;
  type: "rating" | "multiple_choice" | "yes_no" | "comment" | "number" | "date";
  label: string;
  required: boolean;
  options?: string[];
  maxRating?: number;
  placeholder?: string;
  weight?: number;
}

interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  weight?: number;
}

interface EvaluationTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  sections: FormSection[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  assignedClients: string[];
  totalScore: number;
}

interface CXEvaluationBuilderProps {
  open: boolean;
  onClose: () => void;
}

const CXEvaluationBuilder: React.FC<CXEvaluationBuilderProps> = ({ open, onClose }) => {
  const { toast } = useToast();
  const { logAction } = useGlobal();
  const [activeTab, setActiveTab] = useState("builder");
  const [selectedTemplate, setSelectedTemplate] = useState<EvaluationTemplate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isNewTemplateDialogOpen, setIsNewTemplateDialogOpen] = useState(false);

  // Form builder state
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [templateCategory, setTemplateCategory] = useState("");
  const [currentSection, setCurrentSection] = useState<FormSection>({
    id: "",
    title: "",
    description: "",
    fields: [],
    weight: 100
  });
  const [isAddingSectionField, setIsAddingSectionField] = useState(false);
  const [newField, setNewField] = useState<FormField>({
    id: "",
    type: "rating",
    label: "",
    required: true,
    weight: 10
  });

  // Sample templates data
  const [evaluationTemplates] = useState<EvaluationTemplate[]>([
    {
      id: "template-001",
      name: "Retail Store CX Audit",
      description: "Comprehensive customer experience evaluation for retail environments",
      category: "Retail",
      version: "2.1",
      sections: [
        {
          id: "section-1",
          title: "Customer Service Excellence",
          description: "Evaluate staff interaction and service quality",
          weight: 40,
          fields: [
            {
              id: "field-1",
              type: "rating",
              label: "Greeting quality and enthusiasm",
              required: true,
              maxRating: 5,
              weight: 25
            },
            {
              id: "field-2",
              type: "yes_no",
              label: "Staff acknowledged customer within 30 seconds",
              required: true,
              weight: 20
            },
            {
              id: "field-3",
              type: "multiple_choice",
              label: "Staff product knowledge level",
              required: true,
              options: ["Expert", "Good", "Basic", "Poor"],
              weight: 25
            },
            {
              id: "field-4",
              type: "comment",
              label: "Specific service observations",
              required: false,
              weight: 30
            }
          ]
        },
        {
          id: "section-2",
          title: "Store Environment & Cleanliness",
          description: "Assess physical environment and maintenance standards",
          weight: 35,
          fields: [
            {
              id: "field-5",
              type: "rating",
              label: "Overall store cleanliness",
              required: true,
              maxRating: 5,
              weight: 30
            },
            {
              id: "field-6",
              type: "yes_no",
              label: "All lighting fixtures working",
              required: true,
              weight: 20
            },
            {
              id: "field-7",
              type: "multiple_choice",
              label: "Store organization level",
              required: true,
              options: ["Excellent", "Good", "Needs Improvement", "Poor"],
              weight: 25
            }
          ]
        },
        {
          id: "section-3",
          title: "Brand Compliance",
          description: "Check adherence to brand standards and guidelines",
          weight: 25,
          fields: [
            {
              id: "field-8",
              type: "yes_no",
              label: "All signage matches brand guidelines",
              required: true,
              weight: 40
            },
            {
              id: "field-9",
              type: "rating",
              label: "Visual merchandising effectiveness",
              required: true,
              maxRating: 5,
              weight: 35
            }
          ]
        }
      ],
      createdAt: "2023-06-15",
      updatedAt: "2023-06-20",
      isActive: true,
      assignedClients: ["retail-corp", "quickmart"],
      totalScore: 100
    }
  ]);

  const predefinedSections = [
    { id: "customer_service", title: "Customer Service Excellence", icon: <Users className="h-4 w-4" />, description: "Staff interaction and service quality" },
    { id: "store_environment", title: "Store Environment", icon: <Building className="h-4 w-4" />, description: "Cleanliness and physical environment" },
    { id: "brand_compliance", title: "Brand Compliance", icon: <Target className="h-4 w-4" />, description: "Adherence to brand standards" },
    { id: "product_knowledge", title: "Product Knowledge", icon: <Star className="h-4 w-4" />, description: "Staff expertise and product awareness" },
    { id: "speed_efficiency", title: "Speed & Efficiency", icon: <Clock className="h-4 w-4" />, description: "Service speed and operational efficiency" }
  ];

  const fieldTypes = [
    { value: "rating", label: "Star Rating", icon: <Star className="h-4 w-4" />, description: "1-5 star rating scale" },
    { value: "multiple_choice", label: "Multiple Choice", icon: <CheckSquare className="h-4 w-4" />, description: "Select from predefined options" },
    { value: "yes_no", label: "Yes/No", icon: <ToggleLeft className="h-4 w-4" />, description: "Binary choice question" },
    { value: "comment", label: "Comment", icon: <MessageSquare className="h-4 w-4" />, description: "Free text response" },
    { value: "number", label: "Number", icon: <FileText className="h-4 w-4" />, description: "Numeric input" },
    { value: "date", label: "Date", icon: <Calendar className="h-4 w-4" />, description: "Date selection" }
  ];

  const handleCreateTemplate = () => {
    if (!templateName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a template name",
        variant: "destructive",
      });
      return;
    }

    logAction(
      "CREATE_EVALUATION_TEMPLATE",
      "evaluations",
      undefined,
      "template",
      undefined,
      { name: templateName }
    );

    toast({
      title: "Success",
      description: "New evaluation template created successfully",
    });

    setTemplateName("");
    setTemplateDescription("");
    setTemplateCategory("");
    setIsNewTemplateDialogOpen(false);
  };

  const handlePreview = (template: EvaluationTemplate) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
    
    logAction(
      "PREVIEW_EVALUATION_TEMPLATE",
      "evaluations",
      template.id,
      "template",
      undefined,
      { name: template.name }
    );
  };

  const handleAddField = () => {
    if (!newField.label.trim()) {
      toast({
        title: "Error",
        description: "Please enter a field label",
        variant: "destructive",
      });
      return;
    }

    const fieldToAdd: FormField = {
      ...newField,
      id: `field-${Date.now()}`,
    };

    setCurrentSection(prev => ({
      ...prev,
      fields: [...prev.fields, fieldToAdd]
    }));

    setNewField({
      id: "",
      type: "rating",
      label: "",
      required: true,
      weight: 10
    });
    setIsAddingSectionField(false);

    toast({
      title: "Field Added",
      description: "Field added to section successfully",
    });
  };

  const renderFieldIcon = (type: string) => {
    const fieldType = fieldTypes.find(ft => ft.value === type);
    return fieldType?.icon || <Star className="h-4 w-4" />;
  };

  const renderPreviewField = (field: FormField) => {
    switch (field.type) {
      case "rating":
        return (
          <div className="flex gap-1">
            {Array.from({ length: field.maxRating || 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 text-gray-300 hover:text-yellow-400 cursor-pointer" />
            ))}
          </div>
        );
      case "multiple_choice":
        return (
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
        );
      case "yes_no":
        return (
          <div className="flex gap-4">
            <Button variant="outline" size="sm">Yes</Button>
            <Button variant="outline" size="sm">No</Button>
          </div>
        );
      case "comment":
        return <Textarea placeholder={field.placeholder || "Enter your comments here..."} />;
      case "number":
        return <Input type="number" placeholder={field.placeholder || "Enter number"} />;
      case "date":
        return <Input type="date" />;
      default:
        return <Input placeholder="Field preview" />;
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              CX Evaluation Builder
            </DialogTitle>
            <DialogDescription>
              Create and manage custom evaluation forms and templates
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="builder">Form Builder</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="sections">Section Library</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
            </TabsList>

            <TabsContent value="builder" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Design Your Evaluation Form</h3>
                <Button onClick={() => setIsNewTemplateDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> New Template
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Form Structure</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Section Title</Label>
                      <Input
                        value={currentSection.title}
                        onChange={(e) => setCurrentSection(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., Customer Service"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Section Description</Label>
                      <Textarea
                        value={currentSection.description}
                        onChange={(e) => setCurrentSection(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Brief description of what this section evaluates"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Section Weight (%)</Label>
                      <Input
                        type="number"
                        value={currentSection.weight}
                        onChange={(e) => setCurrentSection(prev => ({ ...prev, weight: parseInt(e.target.value) || 0 }))}
                        placeholder="100"
                      />
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Section Fields</Label>
                        <Button size="sm" onClick={() => setIsAddingSectionField(true)}>
                          <Plus className="h-4 w-4 mr-1" /> Add Field
                        </Button>
                      </div>
                      {currentSection.fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2 p-2 border rounded">
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                          {renderFieldIcon(field.type)}
                          <span className="flex-1">{field.label}</span>
                          <Badge variant={field.required ? "default" : "secondary"}>
                            {field.required ? "Required" : "Optional"}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Live Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentSection.title ? (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold">{currentSection.title}</h4>
                          {currentSection.description && (
                            <p className="text-sm text-muted-foreground">{currentSection.description}</p>
                          )}
                        </div>
                        <div className="space-y-3">
                          {currentSection.fields.map((field) => (
                            <div key={field.id} className="space-y-2">
                              <div className="flex items-center gap-2">
                                {renderFieldIcon(field.type)}
                                <Label>{field.label}</Label>
                                {field.required && <span className="text-red-500">*</span>}
                              </div>
                              {renderPreviewField(field)}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="mx-auto h-12 w-12 mb-2" />
                        <p>Start building your section to see the preview</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <div className="grid gap-4">
                {evaluationTemplates.map((template) => (
                  <Card key={template.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{template.name}</h3>
                            <Badge variant="outline">v{template.version}</Badge>
                            <Badge variant={template.isActive ? "default" : "secondary"}>
                              {template.isActive ? "Active" : "Draft"}
                            </Badge>
                            <Badge>{template.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Updated: {template.updatedAt}</span>
                            <span>{template.sections.length} sections</span>
                            <span>{template.assignedClients.length} clients</span>
                            <span>Score: {template.totalScore}pts</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handlePreview(template)}>
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sections" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Predefined Section Templates</CardTitle>
                  <DialogDescription>
                    Quick-start your evaluation with pre-built sections
                  </DialogDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {predefinedSections.map((section) => (
                      <Card key={section.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            {section.icon}
                            <div className="flex-1">
                              <h3 className="font-medium">{section.title}</h3>
                              <p className="text-sm text-muted-foreground">{section.description}</p>
                            </div>
                          </div>
                          <Button className="w-full mt-3" variant="outline" size="sm">
                            Add to Form
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Template Assignments & Scheduling</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Template" />
                        </SelectTrigger>
                        <SelectContent>
                          {evaluationTemplates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Client" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retail-corp">Retail Corp SA</SelectItem>
                          <SelectItem value="quickmart">QuickMart</SelectItem>
                          <SelectItem value="ecofuel">EcoFuel</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button>
                        <Calendar className="mr-2 h-4 w-4" /> Schedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Field Dialog */}
      {isAddingSectionField && (
        <Dialog open={isAddingSectionField} onOpenChange={setIsAddingSectionField}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Field</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Field Type</Label>
                <Select value={newField.type} onValueChange={(value: any) => setNewField(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fieldTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          {type.icon}
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Field Label</Label>
                <Input
                  value={newField.label}
                  onChange={(e) => setNewField(prev => ({ ...prev, label: e.target.value }))}
                  placeholder="e.g., Overall service quality"
                />
              </div>
              {newField.type === "multiple_choice" && (
                <div className="space-y-2">
                  <Label>Options (comma separated)</Label>
                  <Input
                    onChange={(e) => setNewField(prev => ({ ...prev, options: e.target.value.split(',').map(opt => opt.trim()) }))}
                    placeholder="Excellent, Good, Average, Poor"
                  />
                </div>
              )}
              {newField.type === "rating" && (
                <div className="space-y-2">
                  <Label>Maximum Rating</Label>
                  <Select value={newField.maxRating?.toString()} onValueChange={(value) => setNewField(prev => ({ ...prev, maxRating: parseInt(value) }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="5" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="10">10 Point Scale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingSectionField(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddField}>Add Field</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* New Template Dialog */}
      <Dialog open={isNewTemplateDialogOpen} onOpenChange={setIsNewTemplateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Template</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Template Name</Label>
              <Input
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="e.g., Restaurant Service Evaluation"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                placeholder="Brief description of the evaluation purpose"
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={templateCategory} onValueChange={setTemplateCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="automotive">Automotive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewTemplateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTemplate}>Create Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Template Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Template Preview: {selectedTemplate?.name}</DialogTitle>
            <DialogDescription>
              {selectedTemplate?.description}
            </DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-6">
              {selectedTemplate.sections.map((section) => (
                <Card key={section.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        {section.description && (
                          <p className="text-sm text-muted-foreground">{section.description}</p>
                        )}
                      </div>
                      <Badge variant="outline">Weight: {section.weight}%</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {section.fields.map((field) => (
                      <div key={field.id} className="space-y-2">
                        <div className="flex items-center gap-2">
                          {renderFieldIcon(field.type)}
                          <Label>{field.label}</Label>
                          {field.required && <span className="text-red-500">*</span>}
                          {field.weight && (
                            <Badge variant="secondary" className="ml-auto">
                              {field.weight}pts
                            </Badge>
                          )}
                        </div>
                        {renderPreviewField(field)}
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CXEvaluationBuilder;
