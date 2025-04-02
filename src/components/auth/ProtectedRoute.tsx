
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth, Permissions } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  requiredPermission?: keyof Permissions;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredPermission }) => {
  const { isAuthenticated, hasPermission, currentUser } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Special case for user activity report - only superusers can access
  if (location.pathname === "/user-activity-report" && currentUser?.role !== "superuser") {
    return <Navigate to="/dashboard" replace />;
  }

  // If a specific permission is required, check it
  if (requiredPermission && !hasPermission(requiredPermission)) {
    // For superuser, always grant access regardless of specific permissions
    if (currentUser?.role !== "superuser") {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
