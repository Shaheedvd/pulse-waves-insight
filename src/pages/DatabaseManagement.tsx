
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Shield, Users, Building2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import DataExportImport from "@/components/shared/DataExportImport";

const DatabaseManagement = () => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Database Management</h1>
          <p className="text-muted-foreground">
            Import and export data, manage external integrations, and monitor data operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          <Badge variant="outline">
            {currentUser?.role === "superuser" ? "Full Access" : "Limited Access"}
          </Badge>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employee Data</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              Active employee records
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Client Data</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">
              Active client records
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Security</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Secured</div>
            <p className="text-xs text-muted-foreground">
              All transfers encrypted
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Data Export/Import Component */}
      <DataExportImport />
    </div>
  );
};

export default DatabaseManagement;
