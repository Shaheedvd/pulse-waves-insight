
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format, isSameDay } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

// Sample scheduled audits
const scheduledAudits = [
  {
    id: "AUD-2301",
    client: "QuickMart Retail Group",
    location: "Cape Town CBD Branch",
    date: new Date("2025-05-15"),
    time: "09:00 AM",
    auditor: "John Evaluator",
    status: "scheduled"
  },
  {
    id: "AUD-2302",
    client: "EcoFuel Stations",
    location: "Pretoria East Branch",
    date: new Date("2025-05-18"),
    time: "10:30 AM",
    auditor: "Sarah Auditor",
    status: "scheduled"
  },
  {
    id: "AUD-2303",
    client: "LuxCafé Chain",
    location: "Sandton City Mall",
    date: new Date("2025-05-20"),
    time: "14:00 PM",
    auditor: "Mike Inspector",
    status: "scheduled"
  },
  {
    id: "AUD-2304",
    client: "HealthPlus Pharmacy",
    location: "Johannesburg North",
    date: new Date("2025-05-25"),
    time: "11:00 AM",
    auditor: "Lisa Examiner",
    status: "scheduled"
  }
];

const AuditScheduling = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState<any>(null);

  // Filter audits for the selected date
  const auditsForSelectedDate = selectedDate 
    ? scheduledAudits.filter((audit) => isSameDay(audit.date, selectedDate))
    : [];

  const handleViewAudit = (audit: any) => {
    setSelectedAudit(audit);
    setIsViewOpen(true);
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  // Function to decorate calendar days that have audits scheduled
  const renderCalendarDay = (day: Date, modifiers: Record<string, unknown>) => {
    // Check if there are any audits scheduled for this day
    const hasAudits = scheduledAudits.some(audit => isSameDay(audit.date, day));
    
    return (
      <div className="relative">
        <div>{day.getDate()}</div>
        {hasAudits && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Audit Scheduling</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>
              Select a date to view scheduled audits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={handleCalendarSelect}
                className="rounded-md border shadow"
                components={{
                  DayContent: ({ date, ...props }) => renderCalendarDay(date, props)
                }}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? `Audits for ${format(selectedDate, "PPP")}` : "All Upcoming Audits"}
            </CardTitle>
            <CardDescription>
              {auditsForSelectedDate.length} audits scheduled
            </CardDescription>
          </CardHeader>
          <CardContent>
            {auditsForSelectedDate.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Auditor</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditsForSelectedDate.map((audit) => (
                    <TableRow key={audit.id}>
                      <TableCell className="font-medium">{audit.client}</TableCell>
                      <TableCell>{audit.time}</TableCell>
                      <TableCell>{audit.auditor}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleViewAudit(audit)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                No audits scheduled for this date
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {isViewOpen && selectedAudit && (
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Audit Details</DialogTitle>
              <DialogDescription>
                Viewing scheduled audit information
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Audit ID</h4>
                  <p className="mt-1">{selectedAudit.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                  <div className="mt-1">
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                      {selectedAudit.status}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Client</h4>
                <p className="mt-1">{selectedAudit.client}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                <p className="mt-1">{selectedAudit.location}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
                  <p className="mt-1">{format(selectedAudit.date, "PPP")}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Time</h4>
                  <p className="mt-1">{selectedAudit.time}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Assigned Auditor</h4>
                <p className="mt-1">{selectedAudit.auditor}</p>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
              <Button>Edit Audit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AuditScheduling;
