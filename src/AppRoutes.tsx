import React, { Suspense, lazy } from "react";
import { Route, Routes } from "@/utils/router-polyfill";
// Using icon-polyfill instead of direct lucide-react imports
import { Loader2 } from '@/utils/icon-polyfill';
import { RouteErrorBoundary } from "@/components/error-boundary/RouteErrorBoundary";

// Auth Components - Not lazy loaded as they're essential
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";
import Index from "@/pages/Index";

// Lazy loaded pages
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const PaymentSuccess = lazy(() => import("@/pages/PaymentSuccess"));
const PaymentCancelled = lazy(() => import("@/pages/PaymentCancelled"));
const Talent = lazy(() => import("@/pages/Talent"));
const TalentMatching = lazy(() => import("@/pages/TalentMatching"));
const TalentSearch = lazy(() => import("@/pages/TalentSearch"));
const AgenticAI = lazy(() => import("@/pages/AgenticAI"));
const CRM = lazy(() => import("@/pages/CRM"));
const Analytics = lazy(() => import("@/pages/Analytics"));
const Payroll = lazy(() => import("@/pages/Payroll"));
const ProfessionalDevelopment = lazy(() => import("@/pages/ProfessionalDevelopment"));
const Skills = lazy(() => import("@/pages/Skills"));
const Settings = lazy(() => import("@/pages/Settings"));
const Compliance = lazy(() => import("@/pages/Compliance"));
const Integrations = lazy(() => import("@/pages/Integrations"));
const Onboarding = lazy(() => import("@/pages/Onboarding"));
const EnterpriseIntegrations = lazy(() => import("@/pages/EnterpriseIntegrations"));
const Resources = lazy(() => import("@/pages/Resources"));
const ITConsulting = lazy(() => import("@/pages/ITConsulting"));

// Marketplace Pages
const Marketplace = lazy(() => import("@/pages/Marketplace"));
const TalentMarketplace = lazy(() => import("@/pages/TalentMarketplace"));
const SoftwareMarketplace = lazy(() => import("@/pages/SoftwareMarketplace"));
const AffiliateMarketplace = lazy(() => import("@/pages/AffiliateMarketplace"));

// Loading component
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-12 w-12 animate-spin text-primary">Loading...</div>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RouteErrorBoundary><Index /></RouteErrorBoundary>} />
      <Route path="/login" element={<RouteErrorBoundary><Login /></RouteErrorBoundary>} />
      <Route path="/signup" element={<RouteErrorBoundary><Signup /></RouteErrorBoundary>} />
      <Route path="/unauthorized" element={<RouteErrorBoundary><Unauthorized /></RouteErrorBoundary>} />
      
      {/* Lazy loaded routes */}
      <Route path="/pricing" element={
        <RouteErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Pricing />
          </Suspense>
        </RouteErrorBoundary>
      } />
      <Route path="/services/it-consulting" element={<Suspense fallback={<PageLoader />}><ITConsulting /></Suspense>} />
      
      {/* Resources Routes */}
      <Route path="/resources" element={<Suspense fallback={<PageLoader />}><Resources /></Suspense>} />
      <Route path="/resources/:category" element={<Suspense fallback={<PageLoader />}><Resources /></Suspense>} />
      <Route path="/resources/:category/:slug" element={<Suspense fallback={<PageLoader />}><Resources /></Suspense>} />
      
      {/* Marketplace Routes */}
      <Route path="/marketplace" element={<Suspense fallback={<PageLoader />}><Marketplace /></Suspense>} />
      <Route path="/marketplace/talent" element={<Suspense fallback={<PageLoader />}><TalentMarketplace /></Suspense>} />
      <Route path="/marketplace/software" element={<Suspense fallback={<PageLoader />}><SoftwareMarketplace /></Suspense>} />
      <Route path="/affiliate-marketplace" element={<Suspense fallback={<PageLoader />}><AffiliateMarketplace /></Suspense>} />
      
      {/* Protected Routes */}
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
      
      {/* Catch all route */}
      <Route path="*" element={<RouteErrorBoundary><NotFound /></RouteErrorBoundary>} />
    </Routes>
  );
};

export default AppRoutes;
