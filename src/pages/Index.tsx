
import React, { lazy, Suspense } from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load non-critical components
const Features = lazy(() => import("@/components/home/Features"));
const ContentMarketing = lazy(() => import("@/components/home/ContentMarketing"));
const CTA = lazy(() => import("@/components/home/CTA"));
const Footer = lazy(() => import("@/components/layout/Footer"));
const Chatbot = lazy(() => import("@/components/chatbot/Chatbot"));
const LeadCaptureWidget = lazy(() => import("@/components/crm/LeadCaptureWidget"));

// Loading fallback
const LoadingFallback = () => (
  <div className="w-full p-12">
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4 mx-auto" />
      <Skeleton className="h-4 w-1/2 mx-auto" />
      <Skeleton className="h-40 w-full mx-auto" />
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      <Suspense fallback={<LoadingFallback />}>
        <Features />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <ContentMarketing />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <CTA />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Footer />
      </Suspense>
      
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
