
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/it-consulting/HeroSection';
import ServicesSection from '@/components/it-consulting/ServicesSection';
import TechPartnersSection from '@/components/it-consulting/TechPartnersSection';
import CybersecurityNewsSection from '@/components/it-consulting/CybersecurityNewsSection';
import CaseStudiesSection from '@/components/it-consulting/CaseStudiesSection';
import TestimonialsSection from '@/components/it-consulting/TestimonialsSection';
import CallToAction from '@/components/it-consulting/CallToAction';
import { useIsMobile } from '@/hooks/use-mobile';

export default function ITConsulting() {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        {/* Main Content with adjusted padding for mobile */}
        <section className="py-8 md:py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <ServicesSection />
            <CaseStudiesSection />
            <TestimonialsSection />
            <TechPartnersSection />
            <CybersecurityNewsSection />
            <CallToAction />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
