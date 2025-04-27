import React, { Suspense, lazy } from "react";
import { Route } from "@/utils/router-polyfill";
import { RouteErrorBoundary } from "@/components/error-boundary/RouteErrorBoundary";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { PageLoader } from "./page-loader";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const PaymentSuccess = lazy(() => import("@/pages/PaymentSuccess"));
const PaymentCancelled = lazy(() => import("@/pages/PaymentCancelled"));
const Talent = lazy(() => import("@/pages/Talent"));
const TalentMatching = lazy(() => import("@/pages/TalentMatching"));
const TalentSearch = lazy(() => import("@/pages/TalentSearch"));
const AgenticAI = lazy(() => import("@/pages/AgenticAI"));
const Integrations = lazy(() => import("@/pages/Integrations"));
const EnterpriseIntegrations = lazy(() => import("@/pages/EnterpriseIntegrations"));
const CRM = lazy(() => import("@/pages/CRM"));
const Analytics = lazy(() => import("@/pages/Analytics"));
const Payroll = lazy(() => import("@/pages/Payroll"));
const ProfessionalDevelopment = lazy(() => import("@/pages/ProfessionalDevelopment"));
const Skills = lazy(() => import("@/pages/Skills"));
const Settings = lazy(() => import("@/pages/Settings"));
const Compliance = lazy(() => import("@/pages/Compliance"));
const Onboarding = lazy(() => import("@/pages/Onboarding"));

export const protectedRoutes = (
  <>
    <Route path="/dashboard" element={
      <RouteErrorBoundary>
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
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
