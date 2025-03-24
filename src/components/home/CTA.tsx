
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
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
