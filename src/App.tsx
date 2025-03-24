
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
import Analytics from "./pages/Analytics";
import Skills from "./pages/Skills";
import Compliance from "./pages/Compliance";
import Onboarding from "./pages/Onboarding";
import Settings from "./pages/Settings";
import Pricing from "./pages/Pricing";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import ProfessionalDevelopment from "./pages/ProfessionalDevelopment";

function App() {
  // Create a stable QueryClient instance using useState
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <React.StrictMode>
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
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/integrations" element={<Integrations />} />
                <Route path="/dashboard/talent" element={<Talent />} />
                <Route path="/dashboard/talent-matching" element={<TalentMatching />} />
                <Route path="/dashboard/analytics" element={<Analytics />} />
                <Route path="/dashboard/skills" element={<Skills />} />
                <Route path="/dashboard/compliance" element={<Compliance />} />
                <Route path="/dashboard/onboarding" element={<Onboarding />} />
                <Route path="/dashboard/settings" element={<Settings />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/professional-development" element={<ProfessionalDevelopment />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
