
import React from "react";
import { Button } from "@/components/ui/button";
import PricingCard from "@/components/pricing/PricingCard";
import ApiPricing from "@/components/pricing/ApiPricing";
import { toast } from "sonner";
import { PricingPlan } from "@/types/pricing";

interface PricingTiersSectionProps {
  pricingPlans: PricingPlan[];
  billingPeriod: "monthly" | "yearly";
  calculateSavings: (monthlyPrice: string) => number;
}

const PricingTiersSection: React.FC<PricingTiersSectionProps> = ({
  pricingPlans,
  billingPeriod,
  calculateSavings
}) => {
  const handleDebugClick = () => {
    toast.success("Pricing plan component is working");
    console.log("Pricing plans:", pricingPlans);
  };

  return (
    <section className="pb-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pricingPlans.map((plan, index) => (
          <div key={plan.planId} className="animate-fade-in-up" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
            <PricingCard 
              {...plan} 
              billingPeriod={billingPeriod}
              savings={billingPeriod === "yearly" && plan.price !== "$0" && plan.price !== "Custom" ? calculateSavings(plan.price) : undefined}
            />
          </div>
        ))}
      </div>
      
      {/* API Pay-As-You-Go option */}
      <div className="max-w-6xl mx-auto mt-12 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        <ApiPricing />
      </div>
      
      {/* Debug button - only for development */}
      <div className="flex justify-center mt-8">
        <Button variant="ghost" size="sm" onClick={handleDebugClick} className="text-xs text-muted-foreground">
          Verify Plans
        </Button>
      </div>
    </section>
  );
};

export default PricingTiersSection;
