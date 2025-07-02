
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export const MaintenanceCalendar = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Calendar</CardTitle>
          <CardDescription>Visual scheduler for all maintenance activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="mx-auto h-12 w-12 mb-4" />
            <p className="text-lg font-medium mb-2">Maintenance Scheduling Calendar</p>
            <p>View and manage all maintenance activities in a calendar interface</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
