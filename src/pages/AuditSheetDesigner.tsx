
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Save, 
  PlusCircle, 
  ClipboardList, 
  FileDown, 
  Building, 
  LayoutDashboard, 
  UserCheck, 
  FileText, 
  Plus, 
  Trash,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Define form schema using zod
const auditSheetFormSchema = z.object({
  name: z.string().min(3, { message: "Audit sheet name must be at least 3 characters" }),
  type: z.enum(["store", "business", "service", "other"]),
  description: z.string().optional(),
  categories: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      sections: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          items: z.array(
            z.object({
              id: z.string(),
              question: z.string(),
              type: z.enum(["yesno", "scale", "text"]),
              required: z.boolean().default(true),
              helpText: z.string().optional(),
            })
          ).min(1, "At least one question is required"),
        })
      ).min(1, "At least one section is required"),
    })
  ).min(1, "At least one category is required"),
});

type AuditSheetFormValues = z.infer<typeof auditSheetFormSchema>;

// Predefined audit categories and sections based on the provided info
const predefinedCategories = [
  {
    id: "store_design",
    name: "Store/Physical Space Design",
    sections: [
      {
        id: "external_appearance",
        name: "External Appearance & Branding",
        items: [
          { id: "1", question: "Is the storefront signage clearly visible from the street?", type: "yesno", required: true },
          { id: "2", question: "Does the exterior align with the overall brand identity?", type: "yesno", required: true },
          { id: "3", question: "Are window displays engaging and aligned with current promotions?", type: "yesno", required: true },
          { id: "4", question: "Is the entrance easily accessible for all customers?", type: "yesno", required: true },
          { id: "5", question: "Rate the overall maintenance and cleanliness of the exterior", type: "scale", required: true },
        ]
      },
      {
        id: "internal_layout",
        name: "Internal Layout & Flow",
        items: [
          { id: "1", question: "Is the available space used efficiently?", type: "yesno", required: true },
          { id: "2", question: "Is the layout intuitive and easy for customers to navigate?", type: "yesno", required: true },
          { id: "3", question: "Are different product categories or service areas clearly defined?", type: "yesno", required: true },
          { id: "4", question: "Can customers easily see what's available?", type: "yesno", required: true },
          { id: "5", question: "Rate the efficiency and customer-friendliness of the checkout area", type: "scale", required: true },
        ]
      },
      {
        id: "atmosphere",
        name: "Atmosphere & Ambiance",
        items: [
          { id: "1", question: "Is the lighting appropriate for the products/services and desired mood?", type: "yesno", required: true },
          { id: "2", question: "Is the background music suitable for the brand and target audience?", type: "yesno", required: true },
          { id: "3", question: "Does the store have a pleasant and brand-consistent scent?", type: "yesno", required: true },
          { id: "4", question: "Is the environment comfortable for customers and staff?", type: "yesno", required: true },
          { id: "5", question: "Rate the overall aesthetic and design alignment with brand identity", type: "scale", required: true },
        ]
      },
      {
        id: "fixtures",
        name: "Fixtures, Fittings & Merchandising",
        items: [
          { id: "1", question: "Are shelves, displays, and other fixtures in good condition?", type: "yesno", required: true },
          { id: "2", question: "Is the merchandise displayed attractively and logically?", type: "yesno", required: true },
          { id: "3", question: "Is internal signage clear, informative, and easy to understand?", type: "yesno", required: true },
          { id: "4", question: "Is the area around the POS organized and visually appealing?", type: "yesno", required: true },
          { id: "5", question: "Describe the use of visual merchandising techniques", type: "text", required: true },
        ]
      },
      {
        id: "customer_amenities",
        name: "Customer Amenities",
        items: [
          { id: "1", question: "Are there comfortable seating areas for customers (if relevant)?", type: "yesno", required: true },
          { id: "2", question: "Are restrooms clean, well-maintained, and accessible?", type: "yesno", required: true },
          { id: "3", question: "Are fitting rooms (if applicable) clean, well-lit, and adequately sized?", type: "yesno", required: true },
          { id: "4", question: "Is customer Wi-Fi available and easy to access?", type: "yesno", required: true },
          { id: "5", question: "List any other amenities available for customers", type: "text", required: false },
        ]
      }
    ]
  },
  {
    id: "business_operations",
    name: "Business Operations & Processes",
    sections: [
      {
        id: "operational_efficiency",
        name: "Operational Efficiency",
        items: [
          { id: "1", question: "Are internal processes streamlined and efficient?", type: "yesno", required: true },
          { id: "2", question: "Are staff, equipment, and other resources deployed effectively?", type: "yesno", required: true },
          { id: "3", question: "Is the storage and organization of physical inventory efficient?", type: "yesno", required: true },
          { id: "4", question: "Are technology tools being used effectively to support operations?", type: "yesno", required: true },
          { id: "5", question: "Rate how regularly equipment and facilities are maintained", type: "scale", required: true },
        ]
      },
      {
        id: "customer_experience",
        name: "Customer Experience (CX)",
        items: [
          { id: "1", question: "Is the customer journey well-defined and understood?", type: "yesno", required: true },
          { id: "2", question: "Are all customer interaction points positive and consistent with the brand?", type: "yesno", required: true },
          { id: "3", question: "Are clear service standards defined and communicated to staff?", type: "yesno", required: true },
          { id: "4", question: "Are staff members knowledgeable, helpful, and engaging with customers?", type: "yesno", required: true },
          { id: "5", question: "Describe the process for addressing customer complaints", type: "text", required: true },
        ]
      },
      {
        id: "brand_implementation",
        name: "Brand Implementation (Non-Visual)",
        items: [
          { id: "1", question: "Is the brand voice and tone consistent across all customer interactions?", type: "yesno", required: true },
          { id: "2", question: "Does the customer service approach align with overall brand values?", type: "yesno", required: true },
          { id: "3", question: "Do employees understand and embody the brand values and promise?", type: "yesno", required: true },
          { id: "4", question: "Rate the overall brand consistency across all touchpoints", type: "scale", required: true },
          { id: "5", question: "Note any areas where brand implementation could be improved", type: "text", required: false },
        ]
      },
      {
        id: "sustainability",
        name: "Sustainability & Social Responsibility",
        items: [
          { id: "1", question: "Are there effective processes for waste reduction and recycling?", type: "yesno", required: true },
          { id: "2", question: "Are there practices in place to minimize energy consumption?", type: "yesno", required: true },
          { id: "3", question: "Are there processes to ensure ethical sourcing of resources?", type: "yesno", required: true },
          { id: "4", question: "Rate the overall commitment to sustainability practices", type: "scale", required: true },
          { id: "5", question: "Describe any notable sustainability initiatives", type: "text", required: false },
        ]
      },
      {
        id: "employee_experience",
        name: "Employee Experience (EX)",
        items: [
          { id: "1", question: "Is the physical work environment safe and comfortable?", type: "yesno", required: true },
          { id: "2", question: "Is communication within the business clear and effective?", type: "yesno", required: true },
          { id: "3", question: "Do employees have the necessary tools and resources?", type: "yesno", required: true },
          { id: "4", question: "Are employees adequately trained on processes and product knowledge?", type: "yesno", required: true },
          { id: "5", question: "Describe the channels for employees to provide feedback", type: "text", required: true },
        ]
      }
    ]
  }
];

const AuditSheetDesigner = () => {
  const { toast } = useToast();
  const { hasPermission, currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("categories");
  const [showPredefinedOptions, setShowPredefinedOptions] = useState(false);
  const [selectedPredefinedCategories, setSelectedPredefinedCategories] = useState<string[]>([]);

  // Helper function to generate a unique ID
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Initialize form with default values
  const form = useForm<AuditSheetFormValues>({
    resolver: zodResolver(auditSheetFormSchema),
    defaultValues: {
      name: "",
      type: "store",
      description: "",
      categories: [{
        id: generateId(),
        name: "New Category",
        sections: [{
          id: generateId(),
          name: "New Section",
          items: [{
            id: generateId(),
            question: "New Question",
            type: "yesno",
            required: true,
            helpText: "",
          }]
        }]
      }]
    },
  });

  const watchCategories = form.watch("categories");

  const onSubmit = (data: AuditSheetFormValues) => {
    if (!hasPermission("canCreateReports") || currentUser?.role !== "superuser") {
      toast({
        title: "Permission Denied",
        description: "Only superusers can create audit sheets",
        variant: "destructive",
      });
      return;
    }

    console.log("Audit Sheet data:", data);
    
    toast({
      title: "Audit Sheet Created",
      description: `'${data.name}' has been created and is ready to use`,
    });
  };

  const addCategory = () => {
    const newCategory = {
      id: generateId(),
      name: "New Category",
      sections: [{
        id: generateId(),
        name: "New Section",
        items: [{
          id: generateId(),
          question: "New Question",
          type: "yesno",
          required: true,
          helpText: "",
        }]
      }]
    };
    
    const currentCategories = form.getValues("categories");
    form.setValue("categories", [...currentCategories, newCategory]);
  };

  const addSection = (categoryIndex: number) => {
    const newSection = {
      id: generateId(),
      name: "New Section",
      items: [{
        id: generateId(),
        question: "New Question",
        type: "yesno",
        required: true,
        helpText: "",
      }]
    };
    
    const currentCategories = form.getValues("categories");
    const updatedCategories = [...currentCategories];
    updatedCategories[categoryIndex].sections.push(newSection);
    form.setValue("categories", updatedCategories);
  };

  const addItem = (categoryIndex: number, sectionIndex: number) => {
    const newItem = {
      id: generateId(),
      question: "New Question",
      type: "yesno",
      required: true,
      helpText: "",
    };
    
    const currentCategories = form.getValues("categories");
    const updatedCategories = [...currentCategories];
    updatedCategories[categoryIndex].sections[sectionIndex].items.push(newItem);
    form.setValue("categories", updatedCategories);
  };

  const removeCategory = (categoryIndex: number) => {
    const currentCategories = form.getValues("categories");
    const updatedCategories = currentCategories.filter((_, index) => index !== categoryIndex);
    form.setValue("categories", updatedCategories);
  };

  const removeSection = (categoryIndex: number, sectionIndex: number) => {
    const currentCategories = form.getValues("categories");
    const updatedCategories = [...currentCategories];
    updatedCategories[categoryIndex].sections = updatedCategories[categoryIndex].sections.filter((_, index) => index !== sectionIndex);
    form.setValue("categories", updatedCategories);
  };

  const removeItem = (categoryIndex: number, sectionIndex: number, itemIndex: number) => {
    const currentCategories = form.getValues("categories");
    const updatedCategories = [...currentCategories];
    updatedCategories[categoryIndex].sections[sectionIndex].items = 
      updatedCategories[categoryIndex].sections[sectionIndex].items.filter((_, index) => index !== itemIndex);
    form.setValue("categories", updatedCategories);
  };

  const togglePredefinedCategory = (categoryId: string) => {
    setSelectedPredefinedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const addPredefinedCategories = () => {
    if (selectedPredefinedCategories.length === 0) {
      toast({
        title: "No Categories Selected",
        description: "Please select at least one category to add",
        variant: "destructive",
      });
      return;
    }

    const currentCategories = form.getValues("categories");
    const categoriesToAdd = predefinedCategories
      .filter(cat => selectedPredefinedCategories.includes(cat.id))
      .map(cat => ({
        ...cat,
        id: generateId(), // Create new IDs to avoid conflicts
        sections: cat.sections.map(section => ({
          ...section,
          id: generateId(),
          items: section.items.map(item => ({
            ...item,
            id: generateId()
          }))
        }))
      }));

    form.setValue("categories", [...currentCategories, ...categoriesToAdd]);
    setShowPredefinedOptions(false);
    setSelectedPredefinedCategories([]);
    
    toast({
      title: "Categories Added",
      description: `${categoriesToAdd.length} categories have been added to your audit sheet`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Design Audit Sheets</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setShowPredefinedOptions(!showPredefinedOptions)}>
            <FileText className="mr-2 h-4 w-4" />
            {showPredefinedOptions ? "Hide Templates" : "Use Templates"}
          </Button>
          
          <Button variant="outline" onClick={() => window.location.href = "/reports"}>
            <ClipboardList className="mr-2 h-4 w-4" />
            View Reports
          </Button>
        </div>
      </div>

      {showPredefinedOptions && (
        <Card>
          <CardHeader>
            <CardTitle>Predefined Audit Categories</CardTitle>
            <CardDescription>
              Select categories to add to your audit sheet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predefinedCategories.map(category => (
                <div key={category.id} className="flex items-start space-x-3 border p-4 rounded-md">
                  <Checkbox 
                    id={`cat-${category.id}`}
                    checked={selectedPredefinedCategories.includes(category.id)}
                    onCheckedChange={() => togglePredefinedCategory(category.id)}
                  />
                  <div>
                    <Label htmlFor={`cat-${category.id}`} className="text-base font-medium">
                      {category.name}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Contains {category.sections.length} sections with a total of {category.sections.reduce((sum, section) => sum + section.items.length, 0)} questions
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Sections: {category.sections.map(s => s.name).join(", ")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={() => setShowPredefinedOptions(false)}>
              Cancel
            </Button>
            <Button onClick={addPredefinedCategories}>
              Add Selected Categories
            </Button>
          </CardFooter>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Create Audit Sheet</CardTitle>
          <CardDescription>
            Design a new audit sheet with custom categories and questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Basic Details</TabsTrigger>
              <TabsTrigger value="categories">Categories & Questions</TabsTrigger>
            </TabsList>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Audit Sheet Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter audit sheet name" {...field} />
                          </FormControl>
                          <FormDescription>
                            A descriptive name for this audit sheet
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Audit Type</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select audit type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="store">Retail Store</SelectItem>
                              <SelectItem value="business">Business Office</SelectItem>
                              <SelectItem value="service">Service Location</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            The type of location this audit is designed for
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter a description for this audit sheet" 
                            className="min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Provide details about when and how this audit should be conducted
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="categories" className="space-y-6">
                  <div className="flex justify-end">
                    <Button 
                      type="button" 
                      onClick={addCategory}
                      className="flex items-center"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Category
                    </Button>
                  </div>
                  
                  <Accordion type="multiple" defaultValue={["category-0"]} className="w-full space-y-4">
                    {watchCategories.map((category, categoryIndex) => (
                      <AccordionItem 
                        key={category.id} 
                        value={`category-${categoryIndex}`}
                        className="border rounded-md overflow-hidden"
                      >
                        <div className="flex items-center justify-between px-4 py-2 bg-muted">
                          <AccordionTrigger className="hover:no-underline py-0">
                            <div className="flex items-center">
                              <Building className="h-4 w-4 mr-2" />
                              <FormField
                                control={form.control}
                                name={`categories.${categoryIndex}.name`}
                                render={({ field }) => (
                                  <Input
                                    {...field}
                                    className="h-8 max-w-[250px] bg-transparent border-0 focus-visible:ring-0 p-0 text-base font-medium"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                )}
                              />
                            </div>
                          </AccordionTrigger>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCategory(categoryIndex);
                            }}
                            className="h-8 w-8 p-0"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                        <AccordionContent className="pb-2">
                          <div className="pt-4 px-4 space-y-4">
                            <div className="flex justify-end">
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="sm"
                                onClick={() => addSection(categoryIndex)}
                              >
                                <Plus className="mr-2 h-3 w-3" />
                                Add Section
                              </Button>
                            </div>
                            
                            <div className="space-y-6">
                              {category.sections.map((section, sectionIndex) => (
                                <div key={section.id} className="border rounded-md p-4 space-y-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <LayoutDashboard className="h-4 w-4 mr-2" />
                                      <FormField
                                        control={form.control}
                                        name={`categories.${categoryIndex}.sections.${sectionIndex}.name`}
                                        render={({ field }) => (
                                          <Input
                                            {...field}
                                            className="h-8 max-w-[250px] bg-transparent border-0 focus-visible:ring-0 p-0 text-base font-medium"
                                          />
                                        )}
                                      />
                                    </div>
                                    <div className="flex space-x-2">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addItem(categoryIndex, sectionIndex)}
                                      >
                                        <Plus className="mr-2 h-3 w-3" />
                                        Add Question
                                      </Button>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeSection(categoryIndex, sectionIndex)}
                                        className="h-8 w-8 p-0"
                                      >
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-4 pl-6">
                                    {section.items.map((item, itemIndex) => (
                                      <div key={item.id} className="border-l-2 pl-4 py-2 space-y-4">
                                        <div className="flex items-start justify-between">
                                          <FormField
                                            control={form.control}
                                            name={`categories.${categoryIndex}.sections.${sectionIndex}.items.${itemIndex}.question`}
                                            render={({ field }) => (
                                              <FormItem className="flex-1">
                                                <FormLabel>Question</FormLabel>
                                                <FormControl>
                                                  <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeItem(categoryIndex, sectionIndex, itemIndex)}
                                            className="h-8 w-8 p-0 mt-6"
                                          >
                                            <Trash className="h-4 w-4" />
                                          </Button>
                                        </div>
                                        
                                        <div className="grid grid-cols-3 gap-4">
                                          <FormField
                                            control={form.control}
                                            name={`categories.${categoryIndex}.sections.${sectionIndex}.items.${itemIndex}.type`}
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Response Type</FormLabel>
                                                <Select 
                                                  onValueChange={field.onChange} 
                                                  defaultValue={field.value}
                                                >
                                                  <FormControl>
                                                    <SelectTrigger>
                                                      <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                  </FormControl>
                                                  <SelectContent>
                                                    <SelectItem value="yesno">Yes/No</SelectItem>
                                                    <SelectItem value="scale">Rating Scale</SelectItem>
                                                    <SelectItem value="text">Text Entry</SelectItem>
                                                  </SelectContent>
                                                </Select>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                          
                                          <FormField
                                            control={form.control}
                                            name={`categories.${categoryIndex}.sections.${sectionIndex}.items.${itemIndex}.required`}
                                            render={({ field }) => (
                                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-6">
                                                <FormControl>
                                                  <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                  />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                  <FormLabel>Required</FormLabel>
                                                </div>
                                              </FormItem>
                                            )}
                                          />
                                          
                                          <FormField
                                            control={form.control}
                                            name={`categories.${categoryIndex}.sections.${sectionIndex}.items.${itemIndex}.helpText`}
                                            render={({ field }) => (
                                              <FormItem className="col-span-3">
                                                <FormLabel>Help Text (Optional)</FormLabel>
                                                <FormControl>
                                                  <Input 
                                                    {...field} 
                                                    placeholder="Additional information for the auditor"
                                                  />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
                
                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => window.location.href = "/reports"}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Audit Sheet
                  </Button>
                </div>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditSheetDesigner;
