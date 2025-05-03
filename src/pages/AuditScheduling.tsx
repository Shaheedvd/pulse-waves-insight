
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { addDays } from "date-fns";

const AuditScheduling = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Sample audit events for the calendar
  const auditEvents = [
    { date: new Date(), client: "ABC Corp", type: "ISO Audit" },
    { date: addDays(new Date(), 2), client: "Tech Solutions", type: "Business Audit" },
    { date: addDays(new Date(), 5), client: "Retail Chain", type: "Shop Audit" },
    { date: addDays(new Date(), 7), client: "Fuel Stations Inc", type: "Forecourt Shop Audit" }
  ];
  
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
            />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Audits</CardTitle>
            <CardDescription>View and manage scheduled audits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {auditEvents.map((event, idx) => (
                <div key={idx} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">{event.client}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.date.toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuditScheduling;
