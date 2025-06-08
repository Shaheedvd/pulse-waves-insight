
import React from "react";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import AuditTrailsViewer from "@/components/audit/AuditTrailsViewer";

const AuditTrails = () => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Trails & Activity Logs</h1>
          <p className="text-muted-foreground">
            Complete traceability across all departments with detailed change tracking
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          <Badge variant="outline">
            {currentUser?.role === "superuser" || currentUser?.role === "power_manager" ? "Full Access" : "Limited Access"}
          </Badge>
        </div>
      </div>

      <AuditTrailsViewer />
    </div>
  );
};

export default AuditTrails;
