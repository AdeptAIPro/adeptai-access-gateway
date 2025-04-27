
import React, { Suspense, lazy } from "react";
import { Route } from "@/utils/router-polyfill";
import { RouteErrorBoundary } from "@/components/error-boundary/RouteErrorBoundary";
import { PageLoader } from "./page-loader";

const Resources = lazy(() => import("@/pages/Resources"));

export const resourceRoutes = (
  <>
    <Route path="/resources" element={
      <RouteErrorBoundary>
        <Suspense fallback={<PageLoader />}><Resources /></Suspense>
      </RouteErrorBoundary>
    } />
    <Route path="/resources/:category" element={
      <RouteErrorBoundary>
        <Suspense fallback={<PageLoader />}><Resources /></Suspense>
      </RouteErrorBoundary>
    } />
    <Route path="/resources/:category/:slug" element={
      <RouteErrorBoundary>
        <Suspense fallback={<PageLoader />}><Resources /></Suspense>
      </RouteErrorBoundary>
    } />
  </>
);
