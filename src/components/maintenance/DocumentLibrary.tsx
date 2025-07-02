
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export const DocumentLibrary = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Document Library</CardTitle>
          <CardDescription>Centralized storage for maintenance documentation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="mx-auto h-12 w-12 mb-4" />
            <p className="text-lg font-medium mb-2">Maintenance Document Repository</p>
            <p>Store manuals, procedures, warranties, and service contracts</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
