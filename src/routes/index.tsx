
import React from "react";
import { Routes, Route } from "@/utils/router-polyfill";
import { RouteErrorBoundary } from "@/components/error-boundary/RouteErrorBoundary";
import { authRoutes } from "./auth-routes";
import { protectedRoutes } from "./protected-routes";
import { marketplaceRoutes } from "./marketplace-routes";
import { resourceRoutes } from "./resource-routes";
import NotFound from "@/pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {authRoutes}
      {protectedRoutes}
      {marketplaceRoutes}
      {resourceRoutes}
      <Route path="*" element={<RouteErrorBoundary><NotFound /></RouteErrorBoundary>} />
    </Routes>
  );
};

export default AppRoutes;
