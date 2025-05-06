
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar, Check, FileText, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

// Sample payroll data
const payrollPeriods = [
  { 
    id: "pay1", 
    period: "May 2025", 
    startDate: "2025-05-01", 
    endDate: "2025-05-31", 
    status: "pending", 
    employeeCount: 152, 
    totalGross: "R1,254,500", 
    totalNet: "R985,250",
    taxLiability: "R195,800"
  },
  { 
    id: "pay2", 
    period: "April 2025", 
    startDate: "2025-04-01", 
    endDate: "2025-04-30", 
    status: "complete", 
    employeeCount: 150, 
    totalGross: "R1,230,800", 
    totalNet: "R965,750",
    taxLiability: "R190,500"
  },
  { 
    id: "pay3", 
    period: "March 2025", 
    startDate: "2025-03-01", 
    endDate: "2025-03-31", 
    status: "complete", 
    employeeCount: 148, 
    totalGross: "R1,210,400", 
    totalNet: "R950,200",
    taxLiability: "R187,600"
  },
];

export const PayrollProcessing = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(payrollPeriods[0]);
  const [processingStatus, setProcessingStatus] = useState<null | "calculating" | "generating" | "finalizing" | "complete">(null);
  const [progressValue, setProgressValue] = useState(0);
  const { toast } = useToast();

  const handleRunPayroll = () => {
    toast({
      title: "Processing Payroll",
      description: `Started payroll processing for ${selectedPeriod.period}`,
    });
    setProcessingStatus("calculating");
    setProgressValue(10);

    // Simulate payroll processing stages
    setTimeout(() => {
      setProcessingStatus("generating");
      setProgressValue(40);
      
      setTimeout(() => {
        setProcessingStatus("finalizing");
        setProgressValue(75);
        
        setTimeout(() => {
          setProcessingStatus("complete");
          setProgressValue(100);
          toast({
            title: "Payroll Complete",
            description: `Successfully processed payroll for ${selectedPeriod.period}`,
            variant: "default", // Changed from "success" to "default"
          });
          
          // Reset after completion
          setTimeout(() => {
            setProcessingStatus(null);
            setProgressValue(0);
          }, 3000);
        }, 2000);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl">Payroll Processing</CardTitle>
            <CardDescription>Run payroll for the current period and view payroll history</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2">Current Payroll Period</h3>
              <Select 
                defaultValue={selectedPeriod.id}
                onValueChange={(value) => setSelectedPeriod(payrollPeriods.find(p => p.id === value) || payrollPeriods[0])}
              >
                <SelectTrigger className="w-full md:w-[300px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  {payrollPeriods.map((period) => (
                    <SelectItem key={period.id} value={period.id}>{period.period}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2">Period Details</h3>
              <p><span className="font-medium">Start Date:</span> {selectedPeriod.startDate}</p>
              <p><span className="font-medium">End Date:</span> {selectedPeriod.endDate}</p>
              <p>
                <span className="font-medium">Status:</span> 
                <Badge 
                  className={`ml-2 ${
                    selectedPeriod.status === "complete" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {selectedPeriod.status}
                </Badge>
              </p>
            </div>
            <div className="flex-1 flex items-end">
              <Button 
                className="w-full" 
                onClick={handleRunPayroll}
                disabled={processingStatus !== null || selectedPeriod.status === "complete"}
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Run Payroll
              </Button>
            </div>
          </div>

          {processingStatus && (
            <div className="mb-6 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Processing Payroll...</h4>
                <span>{progressValue}%</span>
              </div>
              <Progress value={progressValue} className="w-full" />
              <p className="text-sm text-muted-foreground">
                {processingStatus === "calculating" && "Calculating employee gross pay and deductions..."}
                {processingStatus === "generating" && "Generating tax calculations and statutory reports..."}
                {processingStatus === "finalizing" && "Finalizing bank payment files and payslips..."}
                {processingStatus === "complete" && "Payroll processing complete!"}
              </p>
            </div>
          )}

          <h3 className="text-lg font-medium mb-4">Recent Payroll Periods</h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Total Gross</TableHead>
                  <TableHead>Total Net</TableHead>
                  <TableHead>Tax Liability</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollPeriods.map((period) => (
                  <TableRow key={period.id}>
                    <TableCell className="font-medium">{period.period}</TableCell>
                    <TableCell>{period.startDate}</TableCell>
                    <TableCell>{period.endDate}</TableCell>
                    <TableCell>{period.employeeCount}</TableCell>
                    <TableCell>{period.totalGross}</TableCell>
                    <TableCell>{period.totalNet}</TableCell>
                    <TableCell>{period.taxLiability}</TableCell>
                    <TableCell>
                      <Badge className={`
                        ${period.status === "complete" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {period.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        {period.status === "complete" && (
                          <Button variant="ghost" size="sm">
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              Next Payroll Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">May 25, 2025</div>
            <p className="text-xs text-muted-foreground">Process deadline: May 23, 2025</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-primary" />
              Current Month Gross
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R1,254,500</div>
            <p className="text-xs text-muted-foreground">+1.9% from previous month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2 text-primary" />
              SARS Filing Due
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">June 7, 2025</div>
            <p className="text-xs text-muted-foreground">EMP201 monthly submission</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

