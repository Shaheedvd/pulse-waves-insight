
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth, Permissions } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  requiredPermission?: keyof Permissions;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredPermission }) => {
  const { isAuthenticated, hasPermission, currentUser } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
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
