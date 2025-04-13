
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-adept to-adept-dark text-white py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">IT Consulting & Cybersecurity Solutions</h1>
          <p className="text-xl mb-8">Transforming businesses with cutting-edge technology and unparalleled security expertise</p>
          <Button size="lg" variant="outline" className="bg-white text-adept hover:bg-white/90">
            <a href="/contact">Get a Free Consultation</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
