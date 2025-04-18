
import React, { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Lazy load components
const Hero = lazy(() => import("@/components/home/Hero"));
const Features = lazy(() => import("@/components/home/Features"));
const ContentMarketing = lazy(() => import("@/components/home/ContentMarketing"));
const CTA = lazy(() => import("@/components/home/CTA"));
const Chatbot = lazy(() => import("@/components/chatbot/Chatbot"));
const LeadCaptureWidget = lazy(() => import("@/components/crm/LeadCaptureWidget"));

// Loading component
const SectionLoader = () => (
  <div className="flex items-center justify-center p-12">
    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <Suspense fallback={<SectionLoader />}>
        <Hero />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Features />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ContentMarketing />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <CTA />
      </Suspense>
      
      <Footer />
      
      {/* Add Chatbot Component */}
      <Suspense fallback={null}>
        <Chatbot position="bottom-right" />
      </Suspense>
      
      {/* Add Lead Capture Widget */}
      <Suspense fallback={null}>
        <LeadCaptureWidget />
      </Suspense>
    </div>
  );
};

export default Index;
