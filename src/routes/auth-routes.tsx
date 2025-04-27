
import React, { Suspense } from "react";
import { Route } from "@/utils/router-polyfill";
import { RouteErrorBoundary } from "@/components/error-boundary/RouteErrorBoundary";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Unauthorized from "@/pages/Unauthorized";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";
import Pricing from "@/pages/Pricing";
import ITConsulting from "@/pages/ITConsulting";
import { PageLoader } from "./page-loader";

export const authRoutes = (
  <>
    <Route path="/" element={<RouteErrorBoundary><Index /></RouteErrorBoundary>} />
    <Route path="/login" element={<RouteErrorBoundary><Login /></RouteErrorBoundary>} />
    <Route path="/signup" element={<RouteErrorBoundary><Signup /></RouteErrorBoundary>} />
    <Route path="/unauthorized" element={<RouteErrorBoundary><Unauthorized /></RouteErrorBoundary>} />
    <Route path="/pricing" element={
      <RouteErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Pricing />
        </Suspense>
      </RouteErrorBoundary>
    } />
    <Route path="/services/it-consulting" element={
      <RouteErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <ITConsulting />
        </Suspense>
      </RouteErrorBoundary>
    } />
    <Route path="*" element={<RouteErrorBoundary><NotFound /></RouteErrorBoundary>} />
  </>
);
