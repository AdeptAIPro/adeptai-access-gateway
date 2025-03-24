
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-adept-light via-white to-adept-light">
      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
        <div className="inline-flex items-center justify-center p-2 bg-white rounded-full mb-4">
          <GraduationCap className="h-6 w-6 text-adept" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">Ready to transform your workflow?</h2>
        <p className="text-xl text-muted-foreground">
          Join thousands of businesses that trust AdeptAI to power their operations.
        </p>
        
        <div className="pt-4">
          <Link to="/signup">
            <Button size="lg" className="bg-adept hover:bg-adept-dark px-8">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
