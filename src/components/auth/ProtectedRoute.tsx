import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, Permissions } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  requiredPermission?: keyof Permissions;
  allowedRoles?: string[];
  requireMFA?: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requiredPermission,
  allowedRoles,
  requireMFA,
  children 
}) => {
  const { isAuthenticated, hasPermission, currentUser } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute rendering", { isAuthenticated, currentUser });

  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to /");
    return <Navigate to="/" replace />;
  }

  // Super users have unrestricted access to everything
  const isSuperUser = currentUser?.role === "superuser";
  
  if (isSuperUser) {
    console.log("Super user detected, allowing access");
    return <>{children}</>;
  }

  // Check for MFA requirement if specified (non-super users only)
  if (requireMFA && currentUser && !currentUser.requiresMFA) {
    return <Navigate to="/dashboard" replace />;
  }

  // Special case for user activity report - only superusers can access
  if (location.pathname === "/user-activity-report") {
    return <Navigate to="/dashboard" replace />;
  }

  // Check for specific allowed roles if provided (non-super users only)
  if (allowedRoles && allowedRoles.length > 0) {
    if (currentUser && !allowedRoles.includes(currentUser.role)) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // If a specific permission is required, check it (non-super users only)
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/dashboard" replace />;
  }

  console.log("All checks passed, rendering children");
  return <>{children}</>;
};

export default ProtectedRoute;
