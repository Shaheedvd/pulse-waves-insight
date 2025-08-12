
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

  // Super users have unrestricted access to everything
  const isSuperUser = currentUser?.role === "superuser";
  
  if (isSuperUser) {
    // For nested routes with direct children prop
    if (children) {
      return <>{children}</>;
    }
    // Default case, allow access
    return <Outlet />;
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

  // For nested routes with direct children prop
  if (children) {
    return <>{children}</>;
  }
  
  // Default case, allow access
  return <Outlet />;
};

export default ProtectedRoute;
