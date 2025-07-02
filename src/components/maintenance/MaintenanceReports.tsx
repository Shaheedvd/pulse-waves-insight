
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export const MaintenanceReports = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reports & Analytics</CardTitle>
          <CardDescription>Maintenance performance insights and reporting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <BarChart3 className="mx-auto h-12 w-12 mb-4" />
            <p className="text-lg font-medium mb-2">Maintenance Analytics</p>
            <p>Generate reports on performance, costs, and efficiency metrics</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
