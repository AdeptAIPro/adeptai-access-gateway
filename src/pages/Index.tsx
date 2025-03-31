
import React from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chatbot/Chatbot";
import LeadCaptureWidget from "@/components/crm/LeadCaptureWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <CTA />
      <Footer />
      
      {/* Add Chatbot Component */}
      <Chatbot position="bottom-right" />
      
      {/* Add Lead Capture Widget */}
      <LeadCaptureWidget />
    </div>
  );
};

export default Index;
