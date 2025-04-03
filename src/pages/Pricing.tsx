
import React, { useState, useEffect } from "react";
import { getPricingPlans } from "@/services/pricing/pricingService";
import PricingHeader from "@/components/pricing/PricingHeader";
import PricingTiersSection from "@/components/pricing/PricingTiersSection";
import ComparisonTable from "@/components/pricing/ComparisonTable";
import EnterpriseSection from "@/components/pricing/EnterpriseSection";
import PricingFaq from "@/components/pricing/PricingFaq";
import FinalCTA from "@/components/pricing/FinalCTA";
import PricingLoading from "@/components/pricing/PricingLoading";
import { PricingPlan } from "@/types/pricing";

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [isLoading, setIsLoading] = useState(true);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);

  useEffect(() => {
    // Simulate loading of pricing data
    const timer = setTimeout(() => {
      setPricingPlans(getPricingPlans(billingPeriod));
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [billingPeriod]);

  // Calculate yearly savings
  const calculateSavings = (monthlyPrice: string) => {
    const price = parseInt(monthlyPrice.replace(/[^0-9]/g, ""));
    return Math.round((price * 12 * 0.17)); // 17% savings for annual
  };

  if (isLoading) {
    return <PricingLoading />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header section with billing period toggle */}
      <PricingHeader 
        billingPeriod={billingPeriod} 
        setBillingPeriod={setBillingPeriod} 
      />
      
      {/* Main pricing cards */}
      <PricingTiersSection 
        pricingPlans={pricingPlans} 
        billingPeriod={billingPeriod} 
        calculateSavings={calculateSavings} 
      />
      
      {/* Feature comparison */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4">Compare All Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See exactly what's included in each plan to make the best choice for your business
            </p>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <ComparisonTable />
          </div>
        </div>
      </section>
      
      {/* Enterprise section */}
      <EnterpriseSection />
      
      {/* FAQ Section */}
      <PricingFaq />
      
      {/* Final CTA section */}
      <FinalCTA />
    </div>
  );
};

export default Pricing;
