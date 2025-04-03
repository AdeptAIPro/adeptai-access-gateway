
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
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
      <Route path="/payment-canceled" element={<ProtectedRoute><PaymentCancelled /></ProtectedRoute>} />
      <Route path="/talent" element={<ProtectedRoute><Talent /></ProtectedRoute>} />
      <Route path="/talent-matching" element={<ProtectedRoute><TalentMatching /></ProtectedRoute>} />
      <Route path="/talent-search" element={<ProtectedRoute><TalentSearch /></ProtectedRoute>} />
      <Route path="/agentic-ai" element={<ProtectedRoute><AgenticAI /></ProtectedRoute>} />
      <Route path="/integrations" element={<ProtectedRoute><Integrations /></ProtectedRoute>} />
      <Route path="/crm" element={<ProtectedRoute><CRM /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/payroll" element={<ProtectedRoute><Payroll /></ProtectedRoute>} />
      <Route path="/professional-development" element={<ProtectedRoute><ProfessionalDevelopment /></ProtectedRoute>} />
      <Route path="/skills" element={<ProtectedRoute><Skills /></ProtectedRoute>} />
      <Route path="/settings/*" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/compliance" element={<ProtectedRoute><Compliance /></ProtectedRoute>} />
      <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
      
      {/* Catch all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
