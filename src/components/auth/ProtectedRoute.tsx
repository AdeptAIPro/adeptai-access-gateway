
import React from "react";
import { Navigate, useLocation } from "@/utils/router-polyfill";
import { useAuth } from "@/hooks/use-auth";
import { UserRolePermissions } from "@/types/auth-types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission: string;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredPermission,
  redirectTo = "/login" 
}) => {
  const { user, isLoading, hasPermission } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // You can show a loading spinner here
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to={redirectTo} replace />;
  }

  if (!hasPermission(requiredPermission)) {
    // Redirect to unauthorized page if they don't have permission
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
