
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download, ChevronDown } from "lucide-react";
import { generateAuditPdf } from "@/lib/pdf-utils";
import { useToast } from "@/hooks/use-toast";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ComprehensiveBusinessAuditSheetProps {
  data: any;
}

const ComprehensiveBusinessAuditSheet: React.FC<ComprehensiveBusinessAuditSheetProps> = ({ data }) => {
  const { toast } = useToast();

  const handleDownloadAudit = () => {
    // Create a comprehensive audit data object with all visible data
    const auditData = {
      name: data.name || "Comprehensive Business Assessment",
      description: data.description || "",
      date: new Date().toLocaleDateString(),
      company: "___________",
      location: "___________",
      auditor: "___________",
      sections: data.sections || [],
      overallFindings: "",
      strengths: "",
      improvementAreas: "",
      recommendations: "",
      followupActions: ""
    };
    
    generateAuditPdf(auditData);
    
    toast({
      title: "Comprehensive Audit PDF Generated",
      description: `${data.name} has been downloaded as a PDF`,
    });
  };

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto print:p-0">
      <div className="flex justify-between items-center mb-8">
        <div className="text-center flex-1">
          <h1 className="text-2xl font-bold">{data.name}</h1>
          {data.description && <p className="text-muted-foreground mt-2">{data.description}</p>}
        </div>
        <Button variant="outline" onClick={handleDownloadAudit}>
          <Download className="mr-2 h-4 w-4" />
          Download Audit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2">
        <div>
          <Label>Company</Label>
          <div className="border-b p-2">______________________</div>
        </div>
        <div>
          <Label>Location</Label>
          <div className="border-b p-2">______________________</div>
        </div>
        <div>
          <Label>Date of Audit</Label>
          <div className="border-b p-2">______________________</div>
        </div>
        <div>
          <Label>Auditor(s)</Label>
          <div className="border-b p-2">______________________</div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="space-y-8">
        {data.sections.map((section: any, index: number) => (
          <Accordion 
            key={index} 
            type="single" 
            collapsible 
            className="w-full border rounded-md print:break-inside-avoid"
          >
            <AccordionItem value={`section-${index}`}>
              <AccordionTrigger className="px-4 py-3 hover:bg-accent hover:no-underline">
                <div className="flex items-center">
                  <span className="text-lg font-medium">
                    {index + 1}. {section.title}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    ({section.items.length} questions)
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Card className="border-0 shadow-none">
                  {section.description && (
                    <CardHeader className="pb-2 pt-0">
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </CardHeader>
                  )}
                  <CardContent className="p-0 pt-2">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50%]">Question</TableHead>
                          <TableHead className="w-[20%]">Score</TableHead>
                          <TableHead className="w-[30%]">Comments</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {section.items.map((item: any, itemIndex: number) => (
                          <TableRow key={itemIndex}>
                            <TableCell>
                              <div className="font-medium">{item.question}</div>
                              <div className="text-xs text-muted-foreground mt-1">{item.subcategory}</div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <div 
                                    key={i} 
                                    className="h-5 w-5 border rounded flex items-center justify-center text-xs"
                                  >
                                    {i + 1}
                                  </div>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="border-b border-dashed min-h-[1.5rem]"></div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>

      <Separator className="my-6" />
      
      <div className="space-y-4">
        <div>
          <Label>Overall Findings & Observations:</Label>
          <div className="border p-2 min-h-[80px] mt-1"></div>
        </div>
        
        <div>
          <Label>Areas of Strength:</Label>
          <div className="border p-2 min-h-[80px] mt-1"></div>
        </div>
        
        <div>
          <Label>Areas for Improvement:</Label>
          <div className="border p-2 min-h-[80px] mt-1"></div>
        </div>
        
        <div>
          <Label>Recommendations:</Label>
          <div className="border p-2 min-h-[80px] mt-1"></div>
        </div>
        
        <div>
          <Label>Follow-up Actions (if applicable):</Label>
          <div className="border p-2 min-h-[80px] mt-1"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-12 mt-12 print:mt-8">
        <div className="border-t pt-2 text-center">
          <p>Auditor(s) Signature(s)</p>
        </div>
        <div className="border-t pt-2 text-center">
          <p>Management Representative Signature</p>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveBusinessAuditSheet;
