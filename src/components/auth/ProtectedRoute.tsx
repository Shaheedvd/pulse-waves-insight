
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth, Permissions } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  requiredPermission?: keyof Permissions;
  allowedRoles?: string[];
  requireMFA?: boolean;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requiredPermission,
  allowedRoles,
  requireMFA,
  children 
}) => {
  const { isAuthenticated, hasPermission, currentUser } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Check for MFA requirement if specified
  if (requireMFA && currentUser && !currentUser.requiresMFA) {
    return <Navigate to="/dashboard" replace />;
  }

  // Special case for user activity report - only superusers can access
  if (location.pathname === "/user-activity-report" && currentUser?.role !== "superuser") {
    return <Navigate to="/dashboard" replace />;
  }

  // Check for specific allowed roles if provided
  if (allowedRoles && allowedRoles.length > 0) {
    if (currentUser && !allowedRoles.includes(currentUser.role)) {
      // Always allow superuser access regardless of role restrictions
      if (currentUser.role !== "superuser") {
        return <Navigate to="/dashboard" replace />;
      }
    }
  }

  // If a specific permission is required, check it
  if (requiredPermission && !hasPermission(requiredPermission)) {
    // For superuser, always grant access regardless of specific permissions
    if (currentUser?.role !== "superuser") {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // For nested routes with direct children prop
  if (children) {
    return <>{children}</>;
  }
  
  // Default case, allow access
  return <Outlet />;
};

export default ProtectedRoute;
