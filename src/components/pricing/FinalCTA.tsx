
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FinalCTA: React.FC = () => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
        <h2 className="text-3xl font-bold">Ready to transform your business with AI?</h2>
        <p className="text-xl text-muted-foreground">
          Start with our free tier today. No credit card required.
        </p>
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Link to="/signup?plan=free_trial">
            <Button size="lg" className="bg-adept hover:bg-adept-dark text-white px-8">
              Get Started For Free
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline">
              Schedule a Demo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
