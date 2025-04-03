
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Save, Download, Plus, Trash, ClipboardCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import AuditSheetPreview from "@/components/auditSheets/AuditSheetPreview";
import BusinessAuditSheet from "@/components/auditSheets/BusinessAuditSheet";
import ForecourtShopAuditSheet from "@/components/auditSheets/ForecourtShopAuditSheet";
import ShopAuditSheet from "@/components/auditSheets/ShopAuditSheet";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

// Define form schema using zod
const auditSheetFormSchema = z.object({
  name: z.string().min(3, { message: "Sheet name must be at least 3 characters" }),
  type: z.enum(["forecourt_shop", "shop_only", "business"]),
  description: z.string().optional(),
  sections: z.array(
    z.object({
      title: z.string(),
      items: z.array(
        z.object({
          question: z.string(),
          maxScore: z.number().min(1).max(10),
        })
      ),
    })
  ),
  selectAllEnabled: z.boolean().default(true),
});

type AuditSheetFormValues = z.infer<typeof auditSheetFormSchema>;

// Initial sections for each type of audit sheet
const getInitialSections = (type: string) => {
  switch (type) {
    case "forecourt_shop":
      return [
        {
          title: "Forecourt Appearance",
          items: [
            { question: "Cleanliness of fuel dispensers", maxScore: 5 },
            { question: "Forecourt surface condition", maxScore: 5 },
            { question: "Signage visibility and condition", maxScore: 5 },
          ],
        },
        {
          title: "Shop Interior",
          items: [
            { question: "Shop cleanliness", maxScore: 5 },
            { question: "Product organization", maxScore: 5 },
            { question: "Customer service quality", maxScore: 5 },
          ],
        },
      ];
    case "shop_only":
      return [
        {
          title: "Shop Appearance & Branding",
          items: [
            { question: "Storefront visibility", maxScore: 5 },
            { question: "Interior cleanliness", maxScore: 5 },
            { question: "Merchandising quality", maxScore: 5 },
          ],
        },
        {
          title: "Customer Experience",
          items: [
            { question: "Staff friendliness and knowledge", maxScore: 5 },
            { question: "Checkout efficiency", maxScore: 5 },
            { question: "Product availability", maxScore: 5 },
          ],
        },
      ];
    case "business":
      return [
        {
          title: "Security (Physical & Information)",
          items: [
            { question: "Are entry/exit points adequately secured?", maxScore: 5 },
            { question: "Is visitor access controlled and documented?", maxScore: 5 },
            { question: "Are sensitive areas restricted?", maxScore: 5 },
            { question: "Are security systems functional and maintained?", maxScore: 5 },
            { question: "Are windows and doors secure?", maxScore: 5 },
            { question: "Is there adequate lighting around premises?", maxScore: 5 },
            { question: "Are emergency exits clearly marked and unobstructed?", maxScore: 5 },
            { question: "Is there a process for securing the office outside hours?", maxScore: 5 },
          ],
        },
        {
          title: "Health and Safety",
          items: [
            { question: "Are workstations adjustable to promote good posture?", maxScore: 5 },
            { question: "Are employees provided with ergonomic guidance?", maxScore: 5 },
            { question: "Are walkways clear and free from hazards?", maxScore: 5 },
            { question: "Are cables and wires managed safely?", maxScore: 5 },
            { question: "Is there adequate ventilation and temperature control?", maxScore: 5 },
            { question: "Are fire extinguishers present and inspected?", maxScore: 5 },
            { question: "Are emergency evacuation plans in place?", maxScore: 5 },
            { question: "Are first-aid kits available and stocked?", maxScore: 5 },
          ],
        },
        {
          title: "Employee Morale",
          items: [
            { question: "Are there regular opportunities for team communication?", maxScore: 5 },
            { question: "Do employees seem informed about company updates?", maxScore: 5 },
            { question: "Are there channels for employees to voice concerns?", maxScore: 5 },
            { question: "Is there a generally positive atmosphere observed?", maxScore: 5 },
            { question: "Is there evidence of teamwork and collaboration?", maxScore: 5 },
            { question: "Are there mechanisms for recognizing contributions?", maxScore: 5 },
          ],
        },
        {
          title: "Business Policy & Structure",
          items: [
            { question: "Are key business policies documented and accessible?", maxScore: 5 },
            { question: "Is there evidence that employees are aware of policies?", maxScore: 5 },
            { question: "Is the organizational structure clearly defined?", maxScore: 5 },
            { question: "Are reporting lines and responsibilities clear?", maxScore: 5 },
            { question: "Are key operational processes documented?", maxScore: 5 },
            { question: "Is there a stated commitment to ethical conduct?", maxScore: 5 },
          ],
        },
        {
          title: "ISO Alignment",
          items: [
            { question: "Is there evidence of documented policies and procedures?", maxScore: 5 },
            { question: "Is there visible support from management?", maxScore: 5 },
            { question: "Are there mechanisms for continuous improvement?", maxScore: 5 },
            { question: "Do employees seem aware of relevant procedures?", maxScore: 5 },
          ],
        },
      ];
    default:
      return [
        {
          title: "New Section",
          items: [{ question: "New Question", maxScore: 5 }],
        },
      ];
  }
};

const AuditSheetDesigner = () => {
  const { toast } = useToast();
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState("sections");
  const [showPreview, setShowPreview] = useState(false);

  // Initialize form with default values
  const form = useForm<AuditSheetFormValues>({
    resolver: zodResolver(auditSheetFormSchema),
    defaultValues: {
      name: "",
      type: "forecourt_shop",
      description: "",
      sections: getInitialSections("forecourt_shop"),
      selectAllEnabled: true,
    },
  });

  const watchType = form.watch("type");
  const watchSections = form.watch("sections");

  // Update sections when type changes
  React.useEffect(() => {
    form.setValue("sections", getInitialSections(watchType));
  }, [watchType, form]);

  const addSection = () => {
    const currentSections = form.getValues("sections");
    form.setValue("sections", [
      ...currentSections,
      {
        title: `New Section ${currentSections.length + 1}`,
        items: [{ question: "New Question", maxScore: 5 }],
      },
    ]);
  };

  const removeSection = (index: number) => {
    const currentSections = form.getValues("sections");
    form.setValue(
      "sections",
      currentSections.filter((_, i) => i !== index)
    );
  };

  const addQuestion = (sectionIndex: number) => {
    const currentSections = form.getValues("sections");
    const updatedSections = [...currentSections];
    updatedSections[sectionIndex].items.push({
      question: "New Question",
      maxScore: 5,
    });
    form.setValue("sections", updatedSections);
  };

  const removeQuestion = (sectionIndex: number, questionIndex: number) => {
    const currentSections = form.getValues("sections");
    const updatedSections = [...currentSections];
    updatedSections[sectionIndex].items = updatedSections[
      sectionIndex
    ].items.filter((_, i) => i !== questionIndex);
    form.setValue("sections", updatedSections);
  };

  const onSubmit = (data: AuditSheetFormValues) => {
    if (!hasPermission("canCreateAuditSheets")) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to create audit sheets",
        variant: "destructive",
      });
      return;
    }

    console.log("Audit sheet data:", data);
    
    // In a real app, this would save to a database
    toast({
      title: "Audit Sheet Created",
      description: `'${data.name}' has been created and is ready to use`,
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "Exporting PDF",
      description: "Your audit sheet has been exported as PDF",
    });
  };

  const renderAuditSheetPreview = () => {
    const formData = form.getValues();
    
    switch(formData.type) {
      case "business":
        return <BusinessAuditSheet data={formData} />;
      case "forecourt_shop":
        return <ForecourtShopAuditSheet data={formData} />;
      case "shop_only":
        return <ShopAuditSheet data={formData} />;
      default:
        return <div>Select an audit sheet type to preview</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Audit Sheet Designer</h1>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? "Edit Sheet" : "Preview"}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleExportPDF}
          >
            <Download className="mr-2 h-4 w-4" /> Export as PDF
          </Button>
        </div>
      </div>

      {showPreview ? (
        <Card>
          <CardHeader>
            <CardTitle>Audit Sheet Preview</CardTitle>
            <CardDescription>
              Preview how your audit sheet will look when printed or exported
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderAuditSheetPreview()}
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={() => setShowPreview(false)}
                variant="outline" 
                className="mr-2"
              >
                Back to Editor
              </Button>
              <Button onClick={handleExportPDF}>
                <Download className="mr-2 h-4 w-4" /> Export as PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Create Audit Sheet</CardTitle>
            <CardDescription>
              Design a new audit sheet with your desired sections and questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Audit Sheet Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter sheet name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Audit Sheet Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select sheet type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="forecourt_shop">Forecourt and Shop Audit</SelectItem>
                            <SelectItem value="shop_only">Shop Audit</SelectItem>
                            <SelectItem value="business">Business Audit</SelectItem>
                          </SelectContent>
                        </Select>
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
                          placeholder="Audit sheet description (optional)" 
                          rows={3}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="selectAllEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Enable "Select All" Option</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Add a "Select All" option to make selection easier for users
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Sections & Questions</h3>
                    <Button type="button" onClick={addSection} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add Section
                    </Button>
                  </div>
                  
                  <Accordion type="multiple" className="space-y-4">
                    {watchSections.map((section, sectionIndex) => (
                      <AccordionItem 
                        value={`section-${sectionIndex}`} 
                        key={sectionIndex}
                        className="border rounded-lg overflow-hidden"
                      >
                        <div className="flex items-center justify-between px-4 py-2 bg-muted/50">
                          <div className="flex-1">
                            <Input
                              value={section.title}
                              onChange={(e) => {
                                const updatedSections = [...watchSections];
                                updatedSections[sectionIndex].title = e.target.value;
                                form.setValue("sections", updatedSections);
                              }}
                              className="font-medium border-0 bg-transparent focus-visible:ring-0 p-0 h-auto"
                            />
                          </div>
                          <div className="flex items-center">
                            <AccordionTrigger className="h-4 w-4 p-0 hover:no-underline">
                              <span className="sr-only">Toggle section</span>
                            </AccordionTrigger>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSection(sectionIndex)}
                              className="h-8 w-8 p-0 ml-2"
                            >
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Remove section</span>
                            </Button>
                          </div>
                        </div>
                        
                        <AccordionContent className="px-4 pt-2 pb-3">
                          <div className="space-y-3">
                            {section.items.map((item, questionIndex) => (
                              <div 
                                key={questionIndex} 
                                className="grid grid-cols-12 gap-2 items-center"
                              >
                                <div className="col-span-9">
                                  <Label className="sr-only">Question</Label>
                                  <Input
                                    value={item.question}
                                    onChange={(e) => {
                                      const updatedSections = [...watchSections];
                                      updatedSections[sectionIndex].items[questionIndex].question = e.target.value;
                                      form.setValue("sections", updatedSections);
                                    }}
                                    placeholder="Enter question text"
                                  />
                                </div>
                                <div className="col-span-2">
                                  <Label className="sr-only">Max Score</Label>
                                  <Select
                                    value={item.maxScore.toString()}
                                    onValueChange={(value) => {
                                      const updatedSections = [...watchSections];
                                      updatedSections[sectionIndex].items[questionIndex].maxScore = parseInt(value);
                                      form.setValue("sections", updatedSections);
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Score" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {[1, 2, 3, 4, 5, 10].map((score) => (
                                        <SelectItem key={score} value={score.toString()}>
                                          {score} {score === 1 ? "point" : "points"}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="col-span-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeQuestion(sectionIndex, questionIndex)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Trash className="h-4 w-4" />
                                    <span className="sr-only">Remove question</span>
                                  </Button>
                                </div>
                              </div>
                            ))}
                            
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addQuestion(sectionIndex)}
                              className="mt-2"
                            >
                              <Plus className="h-4 w-4 mr-1" /> Add Question
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  
                  {watchSections.length === 0 && (
                    <div className="text-center py-8 border rounded-md bg-muted/20">
                      <p className="text-muted-foreground mb-4">No sections added yet</p>
                      <Button type="button" onClick={addSection} variant="outline">
                        <Plus className="h-4 w-4 mr-1" /> Add Section
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Audit Sheet
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AuditSheetDesigner;
