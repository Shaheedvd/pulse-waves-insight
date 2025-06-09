
import React from "react";
import { useGlobal } from "@/contexts/GlobalContext";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";

interface PermissionGateProps {
  module: string;
  action: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  module,
  action,
  children,
  fallback
}) => {
  const { hasPermission } = useGlobal();
  const { currentUser } = useAuth();

  // Superusers have access to everything
  const isSuperUser = currentUser?.role === "superuser";
  const hasAccess = isSuperUser || hasPermission(module, action);

  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    return (
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          You don't have permission to {action} {module} data.
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
};
