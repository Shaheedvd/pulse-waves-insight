
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MARKETING_STRATEGIES, ISO_AUDIT_TEMPLATE } from "@/types/marketing";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AuditSheetPreview from "@/components/auditSheets/AuditSheetPreview";

const ManagerTraining = () => {
  const { currentUser, hasPermission } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("marketing");
  const [isAuditPreviewOpen, setIsAuditPreviewOpen] = useState(false);
  
  const canAccessTraining = 
    currentUser?.role === "manager" || 
    currentUser?.role === "superuser" ||
    currentUser?.role === "admin";

  if (!canAccessTraining) {
    // Redirect unauthorized users
    React.useEffect(() => {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access manager training tools",
        variant: "destructive",
      });
      navigate("/dashboard");
    }, [navigate, toast]);
    return null;
  }

  const isoAuditTemplate = ISO_AUDIT_TEMPLATE;
  const marketingStrategies = MARKETING_STRATEGIES;

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Manager Training Tools</h1>
        <p className="text-muted-foreground">
          Resources and tools to help managers implement business strategies and evaluate performance
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="marketing">Marketing Strategy Framework</TabsTrigger>
          <TabsTrigger value="iso">ISO Audit Implementation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="marketing" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Strategy Framework</CardTitle>
              <CardDescription>
                Comprehensive marketing strategies to implement for Pulse Point CX across different sectors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-sm">
                <p className="mb-4">
                  Implementing the following marketing strategies is part of your monthly KPI assessment. 
                  Each category provides actionable items that need to be tracked, recorded, and evaluated.
                </p>
              </div>
              
              {marketingStrategies.map((category, index) => (
                <Accordion key={index} type="single" collapsible className="w-full bg-card">
                  <AccordionItem value={category.category}>
                    <AccordionTrigger className="px-4 py-2 hover:bg-accent hover:text-accent-foreground">
                      {category.category}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      {category.subcategories.map((subcategory, subIndex) => (
                        <div key={subIndex} className="my-4">
                          <h4 className="font-semibold text-primary mb-2">{subcategory.name}</h4>
                          <div className="space-y-4 pl-4">
                            {subcategory.tasks.map((task, taskIndex) => (
                              <div key={taskIndex} className="bg-card border rounded-md p-4">
                                <h5 className="font-medium text-sm">{task.title}</h5>
                                <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-xs font-medium bg-accent rounded-full px-2 py-1">
                                    Tracking: {task.trackingMethod}
                                  </span>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => {
                                      toast({
                                        title: "Task added to your action items",
                                        description: "You can find this task in your marketing action items"
                                      });
                                    }}
                                  >
                                    Add to My Tasks
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      <div className="flex justify-end mt-4">
                        <Button 
                          onClick={() => navigate("/marketing-actions")}
                        >
                          View in Marketing Action Items
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
              
              <div className="bg-accent/20 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Monthly Manager KPI Assessment</h3>
                <p className="text-sm">
                  As part of your manager KPI assessment, you are expected to implement these marketing strategies and track their performance. 
                  Your assessment will be based on:
                </p>
                <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                  <li>Number of marketing tasks assigned and completed</li>
                  <li>Quality of implementation and documentation</li>
                  <li>Measurable outcomes from marketing efforts</li>
                  <li>Innovation and adaptation of strategies to specific sectors</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="iso" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>ISO Audit Implementation Guide</CardTitle>
              <CardDescription>
                Tools for implementing ISO-aligned business audits and assessments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-sm mb-6">
                <p className="mb-4">
                  As part of your management responsibility, you are expected to conduct regular ISO-aligned audits of 
                  business operations. These audits help ensure compliance with best practices and identify areas for improvement.
                </p>
                <p>
                  The ISO Business Audit template below covers key areas including security, health and safety, 
                  employee morale, business policy, and ISO alignment.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">ISO Business Audit</CardTitle>
                    <CardDescription>Comprehensive business assessment based on ISO principles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Evaluates physical & information security, health & safety, employee morale, 
                      business policy structure, and ISO alignment.
                    </p>
                    <div className="flex flex-col space-y-2">
                      <p className="text-xs">
                        <span className="font-medium">Sections:</span> {isoAuditTemplate.sections.length}
                      </p>
                      <p className="text-xs">
                        <span className="font-medium">Questions:</span> {isoAuditTemplate.sections.reduce((total, section) => total + section.items.length, 0)}
                      </p>
                      <Button 
                        className="mt-2" 
                        size="sm"
                        onClick={() => setIsAuditPreviewOpen(true)}
                      >
                        Preview Audit Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Implementation Guidelines</CardTitle>
                    <CardDescription>How to conduct and document ISO-aligned audits</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium">1. Preparation</h4>
                      <p className="text-xs text-muted-foreground">Schedule audit, notify stakeholders, review previous audits</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">2. Conducting the Audit</h4>
                      <p className="text-xs text-muted-foreground">Document findings, collect evidence, score objectively</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">3. Reporting</h4>
                      <p className="text-xs text-muted-foreground">Compile results, identify strengths/weaknesses, recommend improvements</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">4. Follow-up</h4>
                      <p className="text-xs text-muted-foreground">Create action items, track progress, schedule follow-up review</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-accent/20 rounded-lg p-4 mt-6">
                <h3 className="font-semibold mb-2">Monthly ISO Audit KPI Assessment</h3>
                <p className="text-sm">
                  Your manager KPI assessment includes implementation of ISO-aligned audits. Your performance will be evaluated based on:
                </p>
                <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                  <li>Number of complete audits conducted per month</li>
                  <li>Quality of documentation and evidence collection</li>
                  <li>Follow-up actions identified and implemented</li>
                  <li>Improvements demonstrated through successive audits</li>
                </ul>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button 
                  onClick={() => navigate("/audit-sheet-designer")} 
                  variant="outline" 
                  className="mr-2"
                >
                  Customize Audit Templates
                </Button>
                <Button>
                  Go to Audit Sheets
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* ISO Audit Preview Modal */}
      <Dialog open={isAuditPreviewOpen} onOpenChange={setIsAuditPreviewOpen}>
        <DialogContent className="sm:max-w-[90%] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>ISO Business Audit Template Preview</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <AuditSheetPreview type="iso" data={isoAuditTemplate} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagerTraining;
