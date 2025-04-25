import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
// Replace lucide-react import with plain text
// import { Loader2 } from "lucide-react";

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
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      {/* Lazy loaded routes */}
      <Route path="/pricing" element={<Suspense fallback={<PageLoader />}><Pricing /></Suspense>} />
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
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><Dashboard /></Suspense>
        </ProtectedRoute>
      } />
      <Route path="/checkout" element={
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><Checkout /></Suspense>
        </ProtectedRoute>
      } />
      <Route path="/payment-success" element={
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><PaymentSuccess /></Suspense>
        </ProtectedRoute>
      } />
      <Route path="/payment-canceled" element={
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><PaymentCancelled /></Suspense>
        </ProtectedRoute>
      } />
      <Route path="/talent" element={
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><Talent /></Suspense>
        </ProtectedRoute>
      } />
      <Route path="/talent-matching" element={
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><TalentMatching /></Suspense>
        </ProtectedRoute>
      } />
      <Route path="/talent-search" element={
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><TalentSearch /></Suspense>
        </ProtectedRoute>
      } />
      <Route path="/agentic-ai" element={
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><AgenticAI /></Suspense>
        </ProtectedRoute>
      } />
      <Route path="/integrations" element={
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><Integrations /></Suspense>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/integrations" element={
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><Integrations /></Suspense>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/integrations/enterprise" element={
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><EnterpriseIntegrations /></Suspense>
        </ProtectedRoute>
      } />
      <Route path="/crm" element={
        <ProtectedRoute requiredPermission="viewCRM">
          <Suspense fallback={<PageLoader />}><CRM /></Suspense>
        </ProtectedRoute>
      } />
      <Route path="/analytics" element={
        <ProtectedRoute requiredPermission="viewAnalytics">
          <Suspense fallback={<PageLoader />}><Analytics /></Suspense>
        </ProtectedRoute>
      } />
      <Route path="/payroll" element={
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><Payroll /></Suspense>
        </ProtectedRoute>
      } />
      <Route path="/professional-development" element={
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><ProfessionalDevelopment /></Suspense>
        </ProtectedRoute>
      } />
      <Route path="/skills" element={
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><Skills /></Suspense>
        </ProtectedRoute>
      } />
      <Route path="/settings/*" element={
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><Settings /></Suspense>
        </ProtectedRoute>
      } />
      <Route path="/compliance" element={
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><Compliance /></Suspense>
        </ProtectedRoute>
      } />
      <Route path="/onboarding" element={
        <ProtectedRoute requiredPermission="viewDashboard">
          <Suspense fallback={<PageLoader />}><Onboarding /></Suspense>
        </ProtectedRoute>
      } />
      
      {/* Catch all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// Define lazy loaded components to avoid TypeScript errors
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
const Marketplace = lazy(() => import("@/pages/Marketplace"));
const TalentMarketplace = lazy(() => import("@/pages/TalentMarketplace"));
const SoftwareMarketplace = lazy(() => import("@/pages/SoftwareMarketplace"));
const AffiliateMarketplace = lazy(() => import("@/pages/AffiliateMarketplace"));

export default AppRoutes;
