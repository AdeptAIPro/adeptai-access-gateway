
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
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-canceled" element={<PaymentCancelled />} />
        <Route path="/talent" element={<Talent />} />
        <Route path="/talent-matching" element={<TalentMatching />} />
        <Route path="/talent-search" element={<TalentSearch />} />
        <Route path="/agentic-ai" element={<AgenticAI />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/crm" element={<CRM />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/professional-development" element={<ProfessionalDevelopment />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/settings/*" element={<Settings />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Route>
      
      {/* Catch all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
