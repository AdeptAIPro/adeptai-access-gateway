
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/it-consulting/HeroSection';
import ServicesSection from '@/components/it-consulting/ServicesSection';
import TechPartnersSection from '@/components/it-consulting/TechPartnersSection';
import CybersecurityNewsSection from '@/components/it-consulting/CybersecurityNewsSection';
import CallToAction from '@/components/it-consulting/CallToAction';

export default function ITConsulting() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        {/* Main Content */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <ServicesSection />
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
