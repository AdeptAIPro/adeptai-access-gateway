import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import React from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Integrations from "./pages/Integrations";
import Talent from "./pages/Talent";
import TalentMatching from "./pages/TalentMatching";
import TalentSearch from "./pages/TalentSearch";
import Analytics from "./pages/Analytics";
import Skills from "./pages/Skills";
import Compliance from "./pages/Compliance";
import Onboarding from "./pages/Onboarding";
import Settings from "./pages/Settings";
import Pricing from "./pages/Pricing";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import ProfessionalDevelopment from "./pages/ProfessionalDevelopment";
import CRM from "./pages/CRM";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Payroll from "./pages/Payroll";
import AgenticAI from "./pages/AgenticAI";
import AffiliateMarketplace from "./pages/AffiliateMarketplace";
import Marketplace from "./pages/Marketplace";
import TalentMarketplace from "./pages/TalentMarketplace";
import SoftwareMarketplace from "./pages/SoftwareMarketplace";

function App() {
  // Create a stable QueryClient instance using useState
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Marketplace routes */}
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/marketplace/talent" element={<TalentMarketplace />} />
              <Route path="/marketplace/software" element={<SoftwareMarketplace />} />
              <Route path="/affiliate-marketplace" element={<AffiliateMarketplace />} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute requiredPermission="viewDashboard">
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard/integrations" element={
                <ProtectedRoute requiredPermission="viewDashboard">
                  <Integrations />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/talent" element={
                <ProtectedRoute requiredPermission="viewDashboard">
                  <Talent />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/talent-search" element={
                <ProtectedRoute requiredPermission="viewDashboard">
                  <TalentSearch />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/talent-matching" element={
                <ProtectedRoute requiredPermission="viewDashboard">
                  <TalentMatching />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/payroll" element={
                <ProtectedRoute requiredPermission="viewDashboard">
                  <Payroll />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/analytics" element={
                <ProtectedRoute requiredPermission="viewAnalytics">
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/skills" element={
                <ProtectedRoute requiredPermission="viewDashboard">
                  <Skills />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/compliance" element={
                <ProtectedRoute requiredPermission="viewDashboard">
                  <Compliance />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/onboarding" element={
                <ProtectedRoute requiredPermission="viewDashboard">
                  <Onboarding />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/settings" element={
                <ProtectedRoute requiredPermission="viewDashboard">
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/crm" element={
                <ProtectedRoute requiredPermission="viewCRM">
                  <CRM />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/agentic-ai" element={
                <ProtectedRoute requiredPermission="viewDashboard">
                  <AgenticAI />
                </ProtectedRoute>
              } />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/professional-development" element={<ProfessionalDevelopment />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
