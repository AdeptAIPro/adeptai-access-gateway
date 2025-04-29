import React, { Suspense } from "react";
import { Route } from "@/utils/router-polyfill";
import { RouteErrorBoundary } from "@/components/error-boundary/RouteErrorBoundary";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { PageLoader } from "./page-loader";

// Import Dashboard without lazy loading to fix the immediate issue
import Dashboard from "@/pages/Dashboard";

// Other components can remain lazy loaded
const Checkout = React.lazy(() => import("@/pages/Checkout"));
const PaymentSuccess = React.lazy(() => import("@/pages/PaymentSuccess"));
const PaymentCancelled = React.lazy(() => import("@/pages/PaymentCancelled"));
const Talent = React.lazy(() => import("@/pages/Talent"));
const TalentMatching = React.lazy(() => import("@/pages/TalentMatching"));
const TalentSearch = React.lazy(() => import("@/pages/TalentSearch"));
const AgenticAI = React.lazy(() => import("@/pages/AgenticAI"));
const Integrations = React.lazy(() => import("@/pages/Integrations"));
const EnterpriseIntegrations = React.lazy(() => import("@/pages/EnterpriseIntegrations"));
const CRM = React.lazy(() => import("@/pages/CRM"));
const Analytics = React.lazy(() => import("@/pages/Analytics"));
const Payroll = React.lazy(() => import("@/pages/Payroll"));
const ProfessionalDevelopment = React.lazy(() => import("@/pages/ProfessionalDevelopment"));
const Skills = React.lazy(() => import("@/pages/Skills"));
const Settings = React.lazy(() => import("@/pages/Settings"));
const Compliance = React.lazy(() => import("@/pages/Compliance"));
const Onboarding = React.lazy(() => import("@/pages/Onboarding"));

export const protectedRoutes = (
  <>
    <Route path="/dashboard" element={
      <RouteErrorBoundary>
        <ProtectedRoute requiredPermission="viewDashboard">
          {/* No Suspense needed for non-lazy component */}
          <Dashboard />
        </ProtectedRoute>
      </RouteErrorBoundary>
    } />
    <Route path="/checkout" element={
      <RouteErrorBoundary>
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}>
            <Checkout />
          </Suspense>
        </ProtectedRoute>
      </RouteErrorBoundary>
    } />
    <Route path="/payment-success" element={
      <RouteErrorBoundary>
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}>
            <PaymentSuccess />
          </Suspense>
        </ProtectedRoute>
      </RouteErrorBoundary>
    } />
    <Route path="/payment-canceled" element={
      <RouteErrorBoundary>
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}>
            <PaymentCancelled />
          </Suspense>
        </ProtectedRoute>
      </RouteErrorBoundary>
    } />
    <Route path="/talent" element={
      <RouteErrorBoundary>
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><Talent /></Suspense>
        </ProtectedRoute>
      </RouteErrorBoundary>
    } />
    <Route path="/talent-matching" element={
      <RouteErrorBoundary>
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><TalentMatching /></Suspense>
        </ProtectedRoute>
      </RouteErrorBoundary>
    } />
    <Route path="/talent-search" element={
      <RouteErrorBoundary>
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><TalentSearch /></Suspense>
        </ProtectedRoute>
      </RouteErrorBoundary>
    } />
    <Route path="/agentic-ai" element={
      <RouteErrorBoundary>
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><AgenticAI /></Suspense>
        </ProtectedRoute>
      </RouteErrorBoundary>
    } />
    <Route path="/integrations" element={
      <RouteErrorBoundary>
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><Integrations /></Suspense>
        </ProtectedRoute>
      </RouteErrorBoundary>
    } />
    <Route path="/dashboard/integrations" element={
      <RouteErrorBoundary>
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><Integrations /></Suspense>
        </ProtectedRoute>
      </RouteErrorBoundary>
    } />
    <Route path="/dashboard/integrations/enterprise" element={
      <RouteErrorBoundary>
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><EnterpriseIntegrations /></Suspense>
        </ProtectedRoute>
      </RouteErrorBoundary>
    } />
    <Route path="/crm" element={
      <RouteErrorBoundary>
        <ProtectedRoute requiredPermission="viewCRM">
          <Suspense fallback={<PageLoader />}><CRM /></Suspense>
        </ProtectedRoute>
      </RouteErrorBoundary>
    } />
    <Route path="/analytics" element={
      <RouteErrorBoundary>
        <ProtectedRoute requiredPermission="viewAnalytics">
          <Suspense fallback={<PageLoader />}><Analytics /></Suspense>
        </ProtectedRoute>
      </RouteErrorBoundary>
    } />
    <Route path="/payroll" element={
      <RouteErrorBoundary>
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><Payroll /></Suspense>
        </ProtectedRoute>
      </RouteErrorBoundary>
    } />
    <Route path="/professional-development" element={
      <RouteErrorBoundary>
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><ProfessionalDevelopment /></Suspense>
        </ProtectedRoute>
      </RouteErrorBoundary>
    } />
    <Route path="/skills" element={
      <RouteErrorBoundary>
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><Skills /></Suspense>
        </ProtectedRoute>
      </RouteErrorBoundary>
    } />
    <Route path="/settings/*" element={
      <RouteErrorBoundary>
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><Settings /></Suspense>
        </ProtectedRoute>
      </RouteErrorBoundary>
    } />
    <Route path="/compliance" element={
      <RouteErrorBoundary>
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><Compliance /></Suspense>
        </ProtectedRoute>
      </RouteErrorBoundary>
    } />
    <Route path="/onboarding" element={
      <RouteErrorBoundary>
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><Onboarding /></Suspense>
        </ProtectedRoute>
      </RouteErrorBoundary>
    } />
  </>
);
