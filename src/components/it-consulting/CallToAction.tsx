
import React from 'react';
import { Button } from '@/components/ui/button';

const CallToAction: React.FC = () => {
  return (
    <div className="text-center mt-12 bg-adept-light p-10 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Ready to secure your digital future?</h2>
      <p className="text-lg mb-6 max-w-2xl mx-auto">
        Our team of experts is ready to help you navigate the complex world of cybersecurity and IT infrastructure.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button size="lg" className="bg-adept hover:bg-adept-dark">
          <a href="/contact">Contact Our Team</a>
        </Button>
        <Button size="lg" variant="outline">
          <a href="/pricing">View Pricing Options</a>
        </Button>
      </div>
    </div>
  );
};

export default CallToAction;
