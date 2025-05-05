
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { addDays, format, isSameDay } from "date-fns";
import { Eye, Calendar as CalendarIcon } from "lucide-react";

const AuditScheduling = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedDateAudits, setSelectedDateAudits] = useState<any[]>([]);
  const [viewAuditDetails, setViewAuditDetails] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState<any>(null);
  
  // Sample audit events for the calendar
  const auditEvents = [
    { date: new Date(), client: "ABC Corp", type: "ISO Audit", location: "Head Office", assignedTo: "John Smith", status: "Pending" },
    { date: addDays(new Date(), 2), client: "Tech Solutions", type: "Business Audit", location: "Johannesburg Branch", assignedTo: "Sarah Johnson", status: "Scheduled" },
    { date: addDays(new Date(), 5), client: "Retail Chain", type: "Shop Audit", location: "Cape Town Mall", assignedTo: "Michael Brown", status: "Scheduled" },
    { date: addDays(new Date(), 7), client: "Fuel Stations Inc", type: "Forecourt Shop Audit", location: "Durban Station", assignedTo: "Emily Davis", status: "Pending" },
    { date: addDays(new Date(), 1), client: "Pharmacy Group", type: "Health Audit", location: "Pretoria Store", assignedTo: "David Wilson", status: "Pending" },
    { date: addDays(new Date(), 3), client: "Restaurant Chain", type: "Food Safety Audit", location: "Sandton Branch", assignedTo: "Lisa Taylor", status: "Scheduled" },
    { date: addDays(new Date(), 4), client: "Hotel Group", type: "Hospitality Audit", location: "Waterfront Location", assignedTo: "James Anderson", status: "Pending" },
    { date: addDays(new Date(), 6), client: "Logistics Company", type: "Warehouse Audit", location: "Distribution Center", assignedTo: "Patricia Thomas", status: "Scheduled" }
  ];

  // Function to check if a date has audits
  const hasAudits = (day: Date) => {
    return auditEvents.some(event => isSameDay(day, event.date));
  };

  // Update selected date audits when date changes
  useEffect(() => {
    if (date) {
      const auditsOnDate = auditEvents.filter(event => isSameDay(date, event.date));
      setSelectedDateAudits(auditsOnDate);
    } else {
      setSelectedDateAudits([]);
    }
  }, [date]);

  const handleViewAudit = (audit: any) => {
    setSelectedAudit(audit);
    setViewAuditDetails(true);
  };

  // Custom calendar component that shows dots for days with audits
  const renderCalendarCell = (day: Date) => {
    const isAuditDay = hasAudits(day);
    
    return (
      <div className="relative">
        {isAuditDay && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Audit Scheduling</h1>
        <p className="text-muted-foreground">
          Schedule and manage upcoming audits for your clients
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
            <CardDescription>Select a date to view or schedule audits</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              components={{
                DayContent: ({ day }) => (
                  <div className="relative flex h-9 w-9 items-center justify-center">
                    <span>{format(day, "d")}</span>
                    {hasAudits(day) && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      </div>
                    )}
                  </div>
                )
              }}
            />
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                {selectedDateAudits.length > 0 
                  ? `${selectedDateAudits.length} audit(s) scheduled for ${format(date!, 'MMMM d, yyyy')}` 
                  : `No audits scheduled for ${format(date!, 'MMMM d, yyyy')}`
                }
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Audits</CardTitle>
              <CardDescription>View and manage scheduled audits</CardDescription>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">
                {date ? format(date, 'MMMM d, yyyy') : 'Today'}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            {selectedDateAudits.length > 0 ? (
              <div className="space-y-4">
                {selectedDateAudits.map((audit, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <p className="font-medium">{audit.client}</p>
                      <div className="flex flex-col text-sm text-muted-foreground">
                        <span>{audit.type}</span>
                        <span>{audit.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{audit.status}</Badge>
                      <Button variant="ghost" size="sm" onClick={() => handleViewAudit(audit)}>
                        <Eye className="h-4 w-4 mr-1" /> Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium">No audits scheduled</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {date ? `No audits are scheduled for ${format(date, 'MMMM d, yyyy')}` : 'Select a date to view scheduled audits'}
                </p>
              </div>
            )}
            
            {date && selectedDateAudits.length === 0 && (
              <Button className="w-full mt-4" variant="outline">
                + Schedule Audit for {format(date, 'MMMM d, yyyy')}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Audit Details Dialog */}
      <Dialog open={viewAuditDetails} onOpenChange={setViewAuditDetails}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Audit Details</DialogTitle>
            <DialogDescription>
              {selectedAudit?.client} - {selectedAudit?.type}
            </DialogDescription>
          </DialogHeader>
          
          {selectedAudit && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Client</h4>
                  <p>{selectedAudit.client}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Type</h4>
                  <p>{selectedAudit.type}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                  <p>{selectedAudit.location}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
                  <p>{format(selectedAudit.date, 'MMMM d, yyyy')}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Assigned To</h4>
                  <p>{selectedAudit.assignedTo}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                  <p>{selectedAudit.status}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewAuditDetails(false)}>Close</Button>
            <Button>Edit Audit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuditScheduling;
