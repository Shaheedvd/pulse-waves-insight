
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
import { Save, Download, Plus, Trash, ClipboardCheck, Search } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

// Define the predefined question categories and their questions
const predefinedQuestions = {
  "General Operations & Management": [
    "Is there a documented organizational structure and are roles and responsibilities clearly defined?",
    "Are there established strategic goals and are they communicated effectively to employees?",
    "Is there a formal process for setting and reviewing operational objectives?",
    "Are key performance indicators (KPIs) defined, measured, and monitored?",
    "Is there a system for regular management review of performance against KPIs?",
    "Are there documented policies and procedures for key operational processes?",
    "Are these policies and procedures readily accessible to relevant staff?",
    "Is there a process for updating and approving changes to policies and procedures?",
    "Is there a system for internal communication across different departments?",
    "Are staff meetings held regularly and are minutes documented?",
    "Is there a formal risk management process in place (identification, assessment, mitigation)?",
    "Are business continuity plans documented and regularly tested?",
    "Is there a process for managing and tracking projects?",
    "Are project timelines and budgets adhered to?",
    "Is there a system for managing and protecting intellectual property?",
    "Are data backup and recovery procedures in place and tested?",
    "Is there a policy on data privacy and security that complies with relevant regulations?",
    "Are employee training and development needs assessed and addressed?",
    "Is there a performance appraisal system in place for employees?",
    "Are employee records maintained accurately and securely?",
    "Is there a documented code of conduct for employees?",
    "Is there a process for handling ethical concerns or violations?",
    "Are supplier relationships formally managed (contracts, performance reviews)?",
    "Is there a process for evaluating and selecting new suppliers?",
    "Is there a system for managing contracts and ensuring compliance?",
    "Are legal and regulatory requirements identified and complied with?",
    "Is there a process for monitoring changes in relevant legislation?",
    "Is there a system for managing insurance coverage?",
    "Are assets (physical and intangible) properly recorded and managed?",
    "Is there a process for regular asset verification or inventory?",
    "Is energy consumption monitored and are there initiatives for efficiency?",
    "Is waste managed responsibly and are there recycling programs?",
    "Is the physical work environment safe and conducive to productivity?",
    "Are ergonomic considerations addressed in the workplace?",
    "Is there a process for handling and learning from operational incidents?",
    "Is customer feedback actively collected and analyzed?",
    "Is there a process for responding to customer complaints and feedback?",
    "Are customer service standards defined and monitored?",
    "Is there a system for measuring customer satisfaction?",
    "Are there processes in place for continuous improvement of operations?",
  ],
  "Information Technology": [
    "Is there an IT governance framework in place?",
    "Are IT policies and procedures documented and communicated?",
    "Is there a defined process for managing IT infrastructure and hardware?",
    "Are regular maintenance and updates performed on IT systems?",
    "Is network security adequately addressed (firewalls, intrusion detection)?",
    "Are access controls in place to restrict unauthorized access to systems and data?",
    "Are password policies enforced?",
    "Is there a process for managing user accounts and permissions?",
    "Is software licensing managed effectively to ensure compliance?",
    "Is there a process for evaluating and implementing new IT systems?",
    "Is system performance monitored and optimized?",
    "Is there a help desk or IT support function for employees?",
    "Are IT service level agreements (SLAs) defined and met?",
    "Is there a process for managing and resolving IT incidents and problems?",
    "Is change management for IT systems formally controlled?",
    "Are development and testing environments segregated from production?",
    "Are secure coding practices followed in software development?",
    "Are vulnerability assessments and penetration testing conducted regularly?",
    "Is the disposal of IT equipment handled securely to prevent data breaches?",
    "Is there an IT asset inventory?",
    "Is the use of personal devices for work purposes (BYOD) governed by a policy?",
    "Are cloud services used securely and in compliance with policies?",
    "Is there a disaster recovery plan for IT systems and data?",
    "Is the disaster recovery plan regularly tested?",
    "Are data retention policies defined and implemented?",
    "Is there a process for managing and auditing user access logs?",
    "Is the IT department adequately staffed and skilled?",
    "Is there a process for IT vendor management?",
    "Are IT project costs tracked and managed?",
    "Is there a process for ensuring business requirements are met by IT solutions?",
  ],
  "Human Resources": [
    "Are recruitment and selection processes fair and compliant with legislation?",
    "Are job descriptions up-to-date and accurate?",
    "Are background checks conducted for new hires where appropriate?",
    "Is there a formal on boarding process for new employees?",
    "Are employee contracts in place and compliant with labour laws?",
    "Are employee compensation and benefits administered accurately and on time?",
    "Is there a documented payroll process with appropriate controls?",
    "Are employee timekeeping and attendance records accurate?",
    "Is there a policy on employee leave (vacation, sick leave, etc.)?",
    "Are employee grievances handled fairly and consistently?",
    "Is there a policy on workplace harassment and discrimination?",
    "Are investigations into harassment or discrimination allegations conducted thoroughly?",
    "Is there a process for managing employee discipline?",
    "Are termination processes compliant with legal requirements?",
    "Is there an exit interview process for departing employees?",
    "Are employee health and safety programs in place?",
    "Are workplace safety inspections conducted regularly?",
    "Is personal protective equipment (PPE) provided and used where necessary?",
    "Are records of workplace accidents and incidents maintained?",
    "Is there a process for managing employee health and well-being?",
    "Are employee training records maintained?",
    "Is there a succession planning process for key roles?",
    "Are employee morale and engagement levels monitored?",
    "Are employee surveys conducted and the results acted upon?",
    "Is there a policy on remote work or flexible working arrangements?",
    "Are employee travel and expense policies clearly defined and adhered to?",
    "Is there a policy on the use of company assets (e.g., vehicles, laptops)?",
    "Are employee communication channels effective?",
    "Is there a process for managing employee relations?",
    "Is HR data maintained securely and in compliance with privacy regulations?",
  ],
  "Sales & Marketing": [
    "Are sales targets clearly defined and communicated?",
    "Is there a documented sales process?",
    "Are sales activities tracked and reported?",
    "Is there a customer relationship management (CRM) system in place and used effectively?",
    "Is sales forecasting accurate and regularly reviewed?",
    "Are sales territories and responsibilities clearly defined?",
    "Is there a process for managing sales leads and opportunities?",
    "Are sales contracts reviewed and approved appropriately?",
    "Are pricing strategies documented and consistently applied?",
    "Is there a process for managing discounts and promotions?",
    "Are marketing strategies aligned with overall business goals?",
    "Is there a documented marketing plan?",
    "Are marketing activities tracked and their effectiveness measured?",
    "Is there a process for managing marketing budgets?",
    "Is the company brand consistently represented in all marketing materials?",
    "Is there a process for managing online presence (website, social media)?",
    "Is customer data used for marketing purposes in compliance with privacy regulations?",
    "Are marketing campaigns evaluated for their return on investment (ROI)?",
    "Is there a process for gathering and analyzing market research?",
    "Are competitor activities monitored?",
    "Is there a process for managing public relations and media inquiries?",
    "Are sales and marketing activities compliant with advertising regulations?",
    "Is there a process for managing and evaluating marketing vendors?",
    "Are sales commission structures clearly defined and administered accurately?",
    "Is there a process for handling customer complaints related to sales or marketing?",
    "Are sales and marketing training programs in place for staff?",
    "Is there a process for managing trade shows and events?",
    "Are marketing materials reviewed and approved before dissemination?",
    "Is there a policy on gifts and entertainment for clients?",
    "Are sales and marketing goals regularly reviewed and adjusted?",
  ],
  "Retail Operations": [
    "Is there a documented process for receiving and inspecting goods?",
    "Are stock levels monitored to prevent overstocking or shortages?",
    "Are pricing and labelling accurate and consistent?",
    "Is there a process for managing returns and exchanges?",
    "Are point-of-sale (POS) systems operating accurately and securely?",
    "Is cash handling procedures secure and reconciled daily?",
    "Are store opening and closing procedures followed consistently?",
    "Is the store layout optimized for customer flow and product visibility?",
    "Are regular inventory counts performed?",
    "Is there a process for managing and disposing of damaged or expired goods?",
  ],
  "Food Service Operations": [
    "Are food safety procedures documented and followed by all staff?",
    "Are temperature controls for food storage and preparation monitored and recorded?",
    "Is there a system for managing food allergens and communicating them to customers?",
    "Are cleaning schedules in place and followed for food preparation areas?",
    "Are delivery processes efficient and ensure food safety?",
    "Are online ordering systems secure and accurate?",
    "Is there a process for handling food waste?",
    "Are packaging materials appropriate for food safety and quality?",
    "Are table management and reservation systems efficient?",
    "Are order taking and processing procedures accurate and timely?",
    "Is there clear communication between kitchen and serving staff?",
    "Are food preparation standards consistently maintained?",
    "Are dishwashing procedures effective in ensuring hygiene?",
    "Is alcohol service compliant with licensing regulations?",
    "Are customer feedback mechanisms in place (e.g., comment cards, online reviews)?",
    "Is there a process for handling customer complaints about food or service?",
  ],
  "Accommodation Operations": [
    "Is there a documented cleaning and maintenance schedule between guests?",
    "Are safety features (smoke detectors, fire extinguishers) regularly checked?",
    "Are check-in and check-out procedures clearly communicated to guests?",
    "Is there a process for handling guest inquiries and issues remotely?",
    "Are key and access management procedures secure?",
    "Are property damage procedures in place?",
    "Are guest reviews monitored and acted upon?",
    "Is compliance with local regulations (e.g., licensing, taxes) ensured?",
    "Are room cleaning and servicing standards defined and monitored?",
    "Are front desk operations efficient for check-in and check-out?",
    "Are guest amenity supplies managed effectively?",
    "Are security procedures in place for guest safety and property security?",
    "Are maintenance requests handled promptly?",
    "Are fire safety procedures clearly documented and communicated to guests?",
    "Is guest data handled in compliance with privacy regulations?",
    "Are lost and found procedures in place?",
  ],
  "Forecourt Operations": [
    "Are fuel dispensing systems regularly inspected and maintained?",
    "Are emergency shutdown procedures clearly documented and accessible?",
    "Is there a process for handling fuel spills safely?",
    "Are security measures in place to prevent theft of fuel and goods?",
    "Are age-restricted product sales procedures strictly followed?",
    "Is cash handling at the till secure and reconciled regularly?",
    "Are environmental compliance measures in place for fuel storage and handling?",
    "Are site safety inspections conducted regularly?",
  ],
  "Educational Operations": [
    "Are student attendance records accurately maintained?",
    "Are safeguarding policies and procedures documented and communicated to staff?",
    "Are emergency response plans in place and regularly practiced?",
    "Are student behaviour management policies consistently applied?",
    "Are school facilities (classrooms, playgrounds) regularly inspected for safety?",
    "Are visitor access procedures controlled?",
    "Are student data privacy and security measures in place?",
    "Are curriculum delivery and assessment processes regularly reviewed?",
  ],
  "Environment, Health & Safety": [
    "Is there a documented EHS policy?",
    "Are EHS responsibilities clearly assigned?",
    "Are risk assessments conducted for workplace hazards?",
    "Are control measures implemented to mitigate identified hazards?",
    "Is safety training provided to all employees?",
    "Are records of safety training maintained?",
    "Are regular safety inspections conducted and documented?",
    "Are near misses and incidents reported and investigated?",
    "Are corrective and preventive actions implemented following incidents?",
    "Is there a process for managing hazardous materials?",
    "Is there a system for monitoring and controlling emissions to air and water?",
    "Is noise pollution controlled within acceptable limits?",
  ]
};

const AuditSheetDesigner = () => {
  const { toast } = useToast();
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState("sections");
  const [showPreview, setShowPreview] = useState(false);
  const [showQuestionLibrary, setShowQuestionLibrary] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
    const newSection = {
      title: `New Section ${currentSections.length + 1}`,
      items: [{ question: "New Question", maxScore: 5 }],
    };
    form.setValue("sections", [...currentSections, newSection]);
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

  const addQuestionFromLibrary = (question: string, sectionIndex: number) => {
    const currentSections = form.getValues("sections");
    const updatedSections = [...currentSections];
    updatedSections[sectionIndex].items.push({
      question,
      maxScore: 5,
    });
    form.setValue("sections", updatedSections);
    
    toast({
      title: "Question Added",
      description: "The question has been added to your audit sheet.",
    });
  };

  const addSectionWithQuestions = (title: string, questions: string[]) => {
    const currentSections = form.getValues("sections");
    const newSection = {
      title,
      items: questions.map(question => ({ question, maxScore: 5 })),
    };
    form.setValue("sections", [...currentSections, newSection]);
    setShowQuestionLibrary(false);
    
    toast({
      title: "Section Added",
      description: `"${title}" section with ${questions.length} questions has been added to your audit sheet.`,
    });
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

  const filteredQuestions = React.useMemo(() => {
    if (!selectedCategory && !searchQuery) return [];
    
    if (selectedCategory && !searchQuery) {
      return predefinedQuestions[selectedCategory as keyof typeof predefinedQuestions] || [];
    }
    
    const lowerSearchQuery = searchQuery.toLowerCase();
    let results: Array<{category: string; question: string}> = [];
    
    Object.entries(predefinedQuestions).forEach(([category, questions]) => {
      if (selectedCategory && selectedCategory !== category) return;
      
      questions.forEach(question => {
        if (question.toLowerCase().includes(lowerSearchQuery)) {
          results.push({ category, question });
        }
      });
    });
    
    return results;
  }, [selectedCategory, searchQuery]);

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
                    <div className="space-x-2">
                      <Dialog open={showQuestionLibrary} onOpenChange={setShowQuestionLibrary}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <ClipboardCheck className="h-4 w-4 mr-1" /> Question Library
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Question Library</DialogTitle>
                            <DialogDescription>
                              Browse and add pre-defined questions to your audit sheet
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="mt-4 space-y-4">
                            <div className="flex items-center space-x-2">
                              <div className="relative flex-1">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="Search questions..."
                                  className="pl-8"
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                />
                              </div>
                              <Select
                                value={selectedCategory || "all"}
                                onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)}
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Categories</SelectItem>
                                  {Object.keys(predefinedQuestions).map((category) => (
                                    <SelectItem key={category} value={category}>
                                      {category}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {selectedCategory && !searchQuery && (
                              <div className="flex justify-end">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button size="sm" variant="outline">
                                      Add to Audit Sheet
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => addSectionWithQuestions(
                                        selectedCategory,
                                        predefinedQuestions[selectedCategory as keyof typeof predefinedQuestions] || []
                                      )}
                                    >
                                      Add as new section
                                    </DropdownMenuItem>
                                    {watchSections.map((section, idx) => (
                                      <DropdownMenuItem
                                        key={idx}
                                        onClick={() => {
                                          const questions = predefinedQuestions[selectedCategory as keyof typeof predefinedQuestions] || [];
                                          questions.forEach(q => addQuestionFromLibrary(q, idx));
                                        }}
                                      >
                                        Add to "{section.title}"
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            )}

                            <div className="border rounded-md divide-y">
                              {searchQuery && filteredQuestions.length === 0 && (
                                <p className="p-4 text-center text-muted-foreground">No questions found matching your search</p>
                              )}
                              
                              {searchQuery && filteredQuestions.length > 0 && (
                                <div className="divide-y">
                                  {filteredQuestions.map((item, idx) => (
                                    <div key={idx} className="p-3 hover:bg-muted/50 flex justify-between items-center">
                                      <div>
                                        <p className="font-medium">{item.question}</p>
                                        <p className="text-sm text-muted-foreground">{item.category}</p>
                                      </div>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button size="sm" variant="ghost">
                                            <Plus className="h-4 w-4" />
                                            <span className="sr-only">Add question</span>
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          {watchSections.map((section, idx) => (
                                            <DropdownMenuItem
                                              key={idx}
                                              onClick={() => addQuestionFromLibrary(item.question, idx)}
                                            >
                                              Add to "{section.title}"
                                            </DropdownMenuItem>
                                          ))}
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              {!searchQuery && selectedCategory && (
                                <div className="divide-y">
                                  {(predefinedQuestions[selectedCategory as keyof typeof predefinedQuestions] || []).map((question, idx) => (
                                    <div key={idx} className="p-3 hover:bg-muted/50 flex justify-between items-center">
                                      <p>{question}</p>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button size="sm" variant="ghost">
                                            <Plus className="h-4 w-4" />
                                            <span className="sr-only">Add question</span>
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          {watchSections.map((section, idx) => (
                                            <DropdownMenuItem
                                              key={idx}
                                              onClick={() => addQuestionFromLibrary(question, idx)}
                                            >
                                              Add to "{section.title}"
                                            </DropdownMenuItem>
                                          ))}
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              {!searchQuery && !selectedCategory && (
                                <div className="p-4 text-center">
                                  <p className="text-muted-foreground">Select a category to view questions</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button type="button" onClick={addSection} variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" /> Add Section
                      </Button>
                    </div>
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
                              placeholder="Enter section title"
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
                            
                            <div className="flex space-x-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addQuestion(sectionIndex)}
                                className="mt-2"
                              >
                                <Plus className="h-4 w-4 mr-1" /> Add Question
                              </Button>
                              
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                  >
                                    <ClipboardCheck className="h-4 w-4 mr-1" /> Add from Library
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Add Questions</DialogTitle>
                                    <DialogDescription>
                                      Select questions from the library to add to this section
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  <div className="mt-4 space-y-4">
                                    <Select
                                      value={selectedCategory || "none"}
                                      onValueChange={(value) => setSelectedCategory(value === "none" ? null : value)}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {Object.keys(predefinedQuestions).map((category) => (
                                          <SelectItem key={category} value={category}>
                                            {category}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    
                                    {selectedCategory && (
                                      <div className="max-h-[300px] overflow-y-auto border rounded-md divide-y">
                                        {(predefinedQuestions[selectedCategory as keyof typeof predefinedQuestions] || []).map((question, idx) => (
                                          <div key={idx} className="p-3 hover:bg-muted/50 flex justify-between items-center">
                                            <p className="text-sm">{question}</p>
                                            <Button
                                              size="sm" 
                                              variant="ghost"
                                              onClick={() => addQuestionFromLibrary(question, sectionIndex)}
                                            >
                                              <Plus className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
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
