
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

interface BusinessAuditSheetProps {
  data: any;
}

const BusinessAuditSheet: React.FC<BusinessAuditSheetProps> = ({ data }) => {
  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto print:p-0">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        {data.description && <p className="text-muted-foreground mt-2">{data.description}</p>}
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

      <div className="mt-6">
        <Label>Overall Compliance with ISO Principles (General Observation):</Label>
        <div className="border p-2 min-h-[80px] mt-1"></div>
      </div>

      <Separator className="my-6" />

      <div className="space-y-8">
        {data.sections.map((section: any, index: number) => (
          <Card key={index} className="border print:break-inside-avoid">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {index + 1}. {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60%]">Question</TableHead>
                    <TableHead className="w-[20%]">Score</TableHead>
                    <TableHead className="w-[20%]">Comments</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {section.items.map((item: any, itemIndex: number) => (
                    <TableRow key={itemIndex}>
                      <TableCell>{item.question}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: item.maxScore }, (_, i) => (
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
        ))}
      </div>

      <Separator className="my-6" />
      
      <div className="space-y-4">
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

export default BusinessAuditSheet;
