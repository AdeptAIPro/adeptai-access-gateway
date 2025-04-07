import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import Dashboard from "@/pages/Dashboard";
import Pricing from "@/pages/Pricing";
import Checkout from "@/pages/Checkout";
import PaymentSuccess from "@/pages/PaymentSuccess";
import PaymentCancelled from "@/pages/PaymentCancelled";
import Talent from "@/pages/Talent";
import TalentMatching from "@/pages/TalentMatching";
import TalentSearch from "@/pages/TalentSearch";
import AgenticAI from "@/pages/AgenticAI";
import CRM from "@/pages/CRM";
import Analytics from "@/pages/Analytics";
import Payroll from "@/pages/Payroll";
import ProfessionalDevelopment from "@/pages/ProfessionalDevelopment";
import Skills from "@/pages/Skills";
import Settings from "@/pages/Settings";
import Compliance from "@/pages/Compliance";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";
import Unauthorized from "@/pages/Unauthorized";
import Integrations from "@/pages/Integrations";
import Onboarding from "@/pages/Onboarding";
import EnterpriseIntegrations from "@/pages/EnterpriseIntegrations";

// Marketplace Pages
import Marketplace from "@/pages/Marketplace";
import TalentMarketplace from "@/pages/TalentMarketplace";
import SoftwareMarketplace from "@/pages/SoftwareMarketplace";
import AffiliateMarketplace from "@/pages/AffiliateMarketplace";

// Components
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      {/* Marketplace Routes */}
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/marketplace/talent" element={<TalentMarketplace />} />
      <Route path="/marketplace/software" element={<SoftwareMarketplace />} />
      
      {/* Keep the old route temporarily for backwards compatibility */}
      <Route path="/affiliate-marketplace" element={<AffiliateMarketplace />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute requiredPermission="viewDashboard"><Dashboard /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute requiredPermission="viewDashboard"><Checkout /></ProtectedRoute>} />
      <Route path="/payment-success" element={<ProtectedRoute requiredPermission="viewDashboard"><PaymentSuccess /></ProtectedRoute>} />
      <Route path="/payment-canceled" element={<ProtectedRoute requiredPermission="viewDashboard"><PaymentCancelled /></ProtectedRoute>} />
      <Route path="/talent" element={<ProtectedRoute requiredPermission="viewDashboard"><Talent /></ProtectedRoute>} />
      <Route path="/talent-matching" element={<ProtectedRoute requiredPermission="viewDashboard"><TalentMatching /></ProtectedRoute>} />
      <Route path="/talent-search" element={<ProtectedRoute requiredPermission="viewDashboard"><TalentSearch /></ProtectedRoute>} />
      <Route path="/agentic-ai" element={<ProtectedRoute requiredPermission="viewDashboard"><AgenticAI /></ProtectedRoute>} />
      <Route path="/integrations" element={<ProtectedRoute requiredPermission="viewDashboard"><Integrations /></ProtectedRoute>} />
      <Route path="/dashboard/integrations" element={<ProtectedRoute requiredPermission="viewDashboard"><Integrations /></ProtectedRoute>} />
      <Route path="/dashboard/integrations/enterprise" element={<ProtectedRoute requiredPermission="viewDashboard"><EnterpriseIntegrations /></ProtectedRoute>} />
      <Route path="/crm" element={<ProtectedRoute requiredPermission="viewCRM"><CRM /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute requiredPermission="viewAnalytics"><Analytics /></ProtectedRoute>} />
      <Route path="/payroll" element={<ProtectedRoute requiredPermission="viewDashboard"><Payroll /></ProtectedRoute>} />
      <Route path="/professional-development" element={<ProtectedRoute requiredPermission="viewDashboard"><ProfessionalDevelopment /></ProtectedRoute>} />
      <Route path="/skills" element={<ProtectedRoute requiredPermission="viewDashboard"><Skills /></ProtectedRoute>} />
      <Route path="/settings/*" element={<ProtectedRoute requiredPermission="viewDashboard"><Settings /></ProtectedRoute>} />
      <Route path="/compliance" element={<ProtectedRoute requiredPermission="viewDashboard"><Compliance /></ProtectedRoute>} />
      <Route path="/onboarding" element={<ProtectedRoute requiredPermission="viewDashboard"><Onboarding /></ProtectedRoute>} />
      
      {/* Catch all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
