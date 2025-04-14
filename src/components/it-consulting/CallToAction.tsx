
import React from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const CallToAction: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="text-center mt-8 md:mt-12 bg-adept-light p-6 md:p-10 rounded-xl">
      <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Ready to secure your digital future?</h2>
      <p className="text-base md:text-lg mb-4 md:mb-6 max-w-2xl mx-auto">
        Our team of experts is ready to help you navigate the complex world of cybersecurity and IT infrastructure.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
        <Button size={isMobile ? "default" : "lg"} className="bg-adept hover:bg-adept-dark">
          <a href="/contact">Contact Our Team</a>
        </Button>
        <Button size={isMobile ? "default" : "lg"} variant="outline" className="mt-3 sm:mt-0">
          <a href="/pricing">View Pricing Options</a>
        </Button>
      </div>
    </div>
  );
};

export default CallToAction;
