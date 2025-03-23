
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PricingCard from "@/components/PricingCard";

const Pricing = () => {
  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      description: "Essential tools for individuals and small teams",
      features: [
        { text: "Basic AI assistant", included: true },
        { text: "5 projects", included: true },
        { text: "1,000 API calls per month", included: true },
        { text: "Email support", included: true },
        { text: "Advanced analytics", included: false },
        { text: "Team collaboration", included: false },
        { text: "Custom training", included: false },
      ],
      highlight: false,
      cta: "Get Started",
      planId: "starter"
    },
    {
      name: "Professional",
      price: "$99",
      description: "Advanced features for growing businesses",
      features: [
        { text: "Advanced AI assistant", included: true },
        { text: "Unlimited projects", included: true },
        { text: "10,000 API calls per month", included: true },
        { text: "Priority email & chat support", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Team collaboration", included: true },
        { text: "Custom training", included: false },
      ],
      highlight: true,
      cta: "Get Pro",
      planId: "pro"
    },
    {
      name: "Enterprise",
      price: "$499",
      description: "Complete solution for large organizations",
      features: [
        { text: "Premium AI assistant", included: true },
        { text: "Unlimited projects", included: true },
        { text: "Unlimited API calls", included: true },
        { text: "24/7 dedicated support", included: true },
        { text: "Advanced analytics & reporting", included: true },
        { text: "Team collaboration & management", included: true },
        { text: "Custom training & integration", included: true },
      ],
      highlight: false,
      cta: "Contact Sales",
      planId: "enterprise"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-in-up">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Choose the perfect plan for your needs. All plans include core features with different limits and capabilities.
          </p>
        </div>
      </section>
      
      {/* Pricing cards */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div key={plan.planId} className="animate-fade-in-up" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
              <PricingCard {...plan} />
            </div>
          ))}
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in-up">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Find answers to common questions about our services and pricing
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {[
              {
                q: "Can I change plans later?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                q: "Is there a free trial available?",
                a: "We offer a 14-day free trial for all plans. No credit card required to get started."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept major credit cards, PayPal, and bank transfers for annual plans."
              },
              {
                q: "How does billing work?",
                a: "Plans are billed monthly or annually. You can cancel your subscription at any time."
              }
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <h3 className="text-lg font-medium">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center pt-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-lg font-medium mb-4">Still have questions?</h3>
            <Link to="/contact">
              <Button variant="outline" className="hover-lift">
                Contact our team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
