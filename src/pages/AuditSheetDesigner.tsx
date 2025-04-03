
import React, { useState, useEffect } from "react";
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
import { Printer, Save, PlusCircle, FileText, ClipboardList, Building, Store, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define audit sheet types
const AUDIT_TYPES = {
  FORECOURT_SHOP: "forecourt-shop",
  SHOP_ONLY: "shop-only",
  BUSINESS: "business",
};

const AuditSheetDesigner = () => {
  const { toast } = useToast();
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState("basics");
  
  // Template settings
  const [templateSettings, setTemplateSettings] = useState({
    name: "Standard Audit Template",
    description: "Comprehensive site evaluation template",
    type: AUDIT_TYPES.FORECOURT_SHOP,
    includePhotos: true,
    includeComments: true,
    requireGPS: true
  });

  // Sample categories for different audit types
  const FORECOURT_SHOP_CATEGORIES = [
    { id: "1", name: "Signage, Lighting & Accessibility", enabled: true },
    { id: "2", name: "Building Exterior", enabled: true },
    { id: "3", name: "Shop/Forecourt", enabled: true },
    { id: "4", name: "Yard Area", enabled: true },
    { id: "5", name: "Staff Facilities", enabled: true },
    { id: "6", name: "Bakery, Food Preparation", enabled: true },
    { id: "7", name: "Store, Fridges, Storage", enabled: true },
    { id: "8", name: "Staff", enabled: true },
    { id: "9", name: "HSSE General", enabled: true },
    { id: "10", name: "Administration & Business", enabled: true },
  ];

  const SHOP_ONLY_CATEGORIES = [
    { id: "1", name: "Signage & Branding", enabled: true },
    { id: "2", name: "Store Layout & Merchandise", enabled: true },
    { id: "3", name: "Cleanliness & Maintenance", enabled: true },
    { id: "4", name: "Customer Service", enabled: true },
    { id: "5", name: "Inventory Management", enabled: true },
    { id: "6", name: "Food Safety & Hygiene", enabled: true },
    { id: "7", name: "Health & Safety", enabled: true },
    { id: "8", name: "Staff Management", enabled: true },
    { id: "9", name: "Cash Handling & POS", enabled: true },
  ];

  const BUSINESS_CATEGORIES = [
    { id: "1", name: "Security (Physical & Information)", enabled: true },
    { id: "2", name: "Health and Safety", enabled: true },
    { id: "3", name: "Employee Morale", enabled: true },
    { id: "4", name: "Business Policy & Structure", enabled: true },
    { id: "5", name: "ISO Alignment", enabled: true },
  ];

  // Business audit subcategories
  const BUSINESS_SUBCATEGORIES = {
    "1": [
      { name: "Physical Security", questions: [
        { text: "Are entry/exit points adequately secured (e.g., key cards, security personnel)?", type: "yesno" },
        { text: "Is visitor access controlled and documented?", type: "yesno" },
        { text: "Are sensitive areas (e.g., server rooms) restricted?", type: "yesno" },
        { text: "Are security systems (alarms, CCTV) functional and regularly maintained?", type: "yesno" },
      ]},
      { name: "Premises Security", questions: [
        { text: "Are windows and doors secure?", type: "yesno" },
        { text: "Is there adequate lighting in and around the premises?", type: "yesno" },
        { text: "Are emergency exits clearly marked and unobstructed?", type: "yesno" },
        { text: "Is there a process for securing the office outside of business hours?", type: "yesno" },
      ]},
      { name: "Clean Desk Policy", questions: [
        { text: "Is there a policy promoting a clean desk environment for sensitive information?", type: "yesno" },
        { text: "Is the clean desk policy observed?", type: "yesno" },
      ]},
      { name: "Information Security", questions: [
        { text: "Are employees aware of basic data protection practices?", type: "yesno" },
        { text: "Are there guidelines on handling confidential information?", type: "yesno" },
        { text: "Are sensitive documents stored securely?", type: "yesno" },
        { text: "Is there a process for the secure disposal of confidential documents?", type: "yesno" },
      ]},
    ],
    "2": [
      { name: "Ergonomics", questions: [
        { text: "Are workstations adjustable to promote good posture?", type: "yesno" },
        { text: "Are employees provided with ergonomic guidance or training?", type: "yesno" },
        { text: "Is there adequate space between workstations?", type: "yesno" },
      ]},
      { name: "General Safety", questions: [
        { text: "Are walkways clear and free from hazards?", type: "yesno" },
        { text: "Are cables and wires managed safely to prevent trips?", type: "yesno" },
        { text: "Is there adequate ventilation and temperature control?", type: "yesno" },
        { text: "Is the office regularly cleaned and maintained?", type: "yesno" },
      ]},
      { name: "Emergency Preparedness", questions: [
        { text: "Are fire extinguishers present, accessible, and regularly inspected?", type: "yesno" },
        { text: "Are fire alarms functional and regularly tested?", type: "yesno" },
        { text: "Are emergency evacuation plans in place and communicated to employees?", type: "yesno" },
        { text: "Are first-aid kits readily available and adequately stocked?", type: "yesno" },
        { text: "Are there trained first-aiders on-site?", type: "yesno" },
      ]},
      { name: "Well-being", questions: [
        { text: "Are there adequate restroom facilities and break areas?", type: "yesno" },
        { text: "Is there a culture that seems to support employee well-being?", type: "observation" },
        { text: "Are employees aware of any available health and well-being resources?", type: "yesno" },
      ]},
    ],
    "3": [
      { name: "Communication & Engagement", questions: [
        { text: "Are there regular opportunities for team communication and feedback?", type: "yesno" },
        { text: "Do employees seem informed about company news and updates?", type: "observation" },
        { text: "Are there channels for employees to voice concerns or suggestions?", type: "yesno" },
      ]},
      { name: "Workplace Culture", questions: [
        { text: "Is there a generally positive and respectful atmosphere observed?", type: "observation" },
        { text: "Is there evidence of teamwork and collaboration?", type: "observation" },
      ]},
      { name: "Recognition & Appreciation", questions: [
        { text: "Are there informal or formal mechanisms for recognizing employee contributions?", type: "yesno" },
      ]},
      { name: "Work-Life Balance", questions: [
        { text: "Are there policies or practices that support work-life balance (e.g., flexible working)?", type: "yesno" },
      ]},
    ],
    "4": [
      { name: "Policy Awareness & Accessibility", questions: [
        { text: "Are key business policies documented and accessible to all employees?", type: "yesno" },
        { text: "Is there evidence that employees are aware of these policies?", type: "yesno" },
      ]},
      { name: "Organizational Structure", questions: [
        { text: "Is the organizational structure clearly defined and communicated?", type: "yesno" },
        { text: "Are reporting lines and responsibilities clear to employees?", type: "yesno" },
      ]},
      { name: "Process Documentation", questions: [
        { text: "Are key operational processes documented at a high level?", type: "yesno" },
        { text: "Is there a system for reviewing and updating policies and procedures?", type: "yesno" },
      ]},
      { name: "Compliance & Ethics", questions: [
        { text: "Is there a stated commitment to ethical conduct and compliance with relevant regulations?", type: "yesno" },
        { text: "Are there mechanisms for reporting unethical behavior or breaches of policy?", type: "yesno" },
      ]},
    ],
    "5": [
      { name: "ISO Alignment", questions: [
        { text: "Is there evidence of documented policies, procedures, and records related to the areas audited?", type: "yesno" },
        { text: "Is there visible support from management for the principles covered in this audit?", type: "observation" },
        { text: "Are there mechanisms in place for identifying and addressing areas for improvement?", type: "yesno" },
        { text: "Do employees seem aware of relevant policies and procedures for their roles?", type: "observation" },
      ]},
    ],
  };

  // State for categories
  const [categories, setCategories] = useState(FORECOURT_SHOP_CATEGORIES);
  
  // Selected category for questions view
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  
  // Questions for the selected category
  const [questions, setQuestions] = useState<any[]>([]);

  // Handler for template type change
  useEffect(() => {
    // Update categories based on template type
    switch (templateSettings.type) {
      case AUDIT_TYPES.FORECOURT_SHOP:
        setCategories(FORECOURT_SHOP_CATEGORIES);
        break;
      case AUDIT_TYPES.SHOP_ONLY:
        setCategories(SHOP_ONLY_CATEGORIES);
        break;
      case AUDIT_TYPES.BUSINESS:
        setCategories(BUSINESS_CATEGORIES);
        break;
      default:
        setCategories(FORECOURT_SHOP_CATEGORIES);
    }
    
    // Reset selected category
    setSelectedCategoryId("");
    setQuestions([]);
  }, [templateSettings.type]);

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

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);

    if (templateSettings.type === AUDIT_TYPES.BUSINESS && BUSINESS_SUBCATEGORIES[categoryId]) {
      setQuestions(BUSINESS_SUBCATEGORIES[categoryId]);
    } else {
      // For other audit types, we'd load questions from an API or predefined set
      setQuestions([]);
    }
  };

  // Function to render the business audit sheet section
  const renderBusinessAuditSection = (categoryId: string) => {
    if (!BUSINESS_SUBCATEGORIES[categoryId]) return null;

    return (
      <div className="space-y-8 mt-4">
        {BUSINESS_SUBCATEGORIES[categoryId].map((subcategory, index) => (
          <div key={index} className="border rounded-md p-4 space-y-4">
            <h3 className="text-lg font-semibold">{subcategory.name}</h3>
            <div className="space-y-4">
              {subcategory.questions.map((question, qIndex) => (
                <div key={qIndex} className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4 items-start border-b pb-4">
                  <div>
                    <p className="mb-2">{question.text}</p>
                    <div className="text-sm text-muted-foreground">
                      {question.type === "observation" ? "Subjective Observation" : "Yes/No Question"}
                    </div>
                  </div>
                  
                  {question.type === "yesno" ? (
                    <RadioGroup defaultValue="no" className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id={`question-${categoryId}-${index}-${qIndex}-yes`} />
                        <Label htmlFor={`question-${categoryId}-${index}-${qIndex}-yes`}>Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id={`question-${categoryId}-${index}-${qIndex}-no`} />
                        <Label htmlFor={`question-${categoryId}-${index}-${qIndex}-no`}>No</Label>
                      </div>
                    </RadioGroup>
                  ) : (
                    <div className="flex flex-col space-y-2 w-full md:w-64">
                      <Label htmlFor={`observation-${categoryId}-${index}-${qIndex}`}>Comments</Label>
                      <Textarea id={`observation-${categoryId}-${index}-${qIndex}`} placeholder="Enter observations..." />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
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
                  <Label htmlFor="template-type">Audit Sheet Type</Label>
                  <Select 
                    value={templateSettings.type}
                    onValueChange={(value) => updateSettings('type', value)}
                  >
                    <SelectTrigger id="template-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={AUDIT_TYPES.FORECOURT_SHOP}>
                        <div className="flex items-center">
                          <Store className="h-4 w-4 mr-2" />
                          <span>Forecourt & Shop Audit</span>
                        </div>
                      </SelectItem>
                      <SelectItem value={AUDIT_TYPES.SHOP_ONLY}>
                        <div className="flex items-center">
                          <Store className="h-4 w-4 mr-2" />
                          <span>Shop Audit Only</span>
                        </div>
                      </SelectItem>
                      <SelectItem value={AUDIT_TYPES.BUSINESS}>
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2" />
                          <span>Business Audit</span>
                        </div>
                      </SelectItem>
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
                  {templateSettings.type !== AUDIT_TYPES.BUSINESS && (
                    <Button variant="outline" size="sm">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Question
                    </Button>
                  )}
                </div>
                
                <div className="grid gap-4">
                  <Select 
                    value={selectedCategoryId} 
                    onValueChange={handleCategorySelect}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(c => c.enabled).map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {selectedCategoryId ? (
                    templateSettings.type === AUDIT_TYPES.BUSINESS ? (
                      <ScrollArea className="h-[60vh]">
                        {renderBusinessAuditSection(selectedCategoryId)}
                      </ScrollArea>
                    ) : (
                      <div className="border rounded-md p-6 text-center">
                        <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground/50" />
                        <h3 className="mt-4 text-lg font-semibold">Standard Questions</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Add custom questions for this category
                        </p>
                        <Button className="mt-4">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Question
                        </Button>
                      </div>
                    )
                  ) : (
                    <div className="border rounded-md p-6 text-center">
                      <FileText className="h-12 w-12 mx-auto text-muted-foreground/50" />
                      <h3 className="mt-4 text-lg font-semibold">Select a Category</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Choose a category to view and edit questions
                      </p>
                    </div>
                  )}
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
