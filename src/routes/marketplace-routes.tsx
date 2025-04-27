
import React, { Suspense, lazy } from "react";
import { Route } from "@/utils/router-polyfill";
import { RouteErrorBoundary } from "@/components/error-boundary/RouteErrorBoundary";
import { PageLoader } from "./page-loader";

const Marketplace = lazy(() => import("@/pages/Marketplace"));
const TalentMarketplace = lazy(() => import("@/pages/TalentMarketplace"));
const SoftwareMarketplace = lazy(() => import("@/pages/SoftwareMarketplace"));
const AffiliateMarketplace = lazy(() => import("@/pages/AffiliateMarketplace"));

export const marketplaceRoutes = (
  <>
    <Route path="/marketplace" element={
      <RouteErrorBoundary>
        <Suspense fallback={<PageLoader />}><Marketplace /></Suspense>
      </RouteErrorBoundary>
    } />
    <Route path="/marketplace/talent" element={
      <RouteErrorBoundary>
        <Suspense fallback={<PageLoader />}><TalentMarketplace /></Suspense>
      </RouteErrorBoundary>
    } />
    <Route path="/marketplace/software" element={
      <RouteErrorBoundary>
        <Suspense fallback={<PageLoader />}><SoftwareMarketplace /></Suspense>
      </RouteErrorBoundary>
    } />
    <Route path="/affiliate-marketplace" element={
      <RouteErrorBoundary>
        <Suspense fallback={<PageLoader />}><AffiliateMarketplace /></Suspense>
      </RouteErrorBoundary>
    } />
  </>
);
