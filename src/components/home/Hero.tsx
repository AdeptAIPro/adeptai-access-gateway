
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Unlock the power of <span className="text-adept">intelligent automation</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
            AdeptAI helps businesses streamline workflows, reduce manual effort, and make smarter decisions with cutting-edge AI tools.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Link to="/signup">
            <Button size="lg" className="bg-adept hover:bg-adept-dark px-8">
              Get Started
            </Button>
          </Link>
          <Link to="/pricing">
            <Button size="lg" variant="outline" className="px-8">
              View Pricing
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="mt-16 max-w-6xl mx-auto relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <div className="aspect-video rounded-lg bg-gray-200 glass-morphism overflow-hidden">
          {/* This would be a screenshot or demo video in a real application */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-lg font-medium">AdeptAI Platform Preview</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
