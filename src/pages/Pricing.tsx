
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckIcon, CircleDollarSign, Package, PackageCheck, PackagePlus } from "lucide-react";
import PricingCard from "@/components/pricing/PricingCard";
import PricingFaq from "@/components/pricing/PricingFaq";
import ComparisonTable from "@/components/pricing/ComparisonTable";
import PayPerUseCard from "@/components/pricing/PayPerUseCard";

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const pricingPlans = [
    {
      name: "Free Trial",
      price: billingPeriod === "monthly" ? "$0" : "$0",
      description: "Try all features with limited usage",
      features: [
        { text: "All AI features included", included: true },
        { text: "1 use per feature per day", included: true },
        { text: "Basic support", included: true },
        { text: "Limited analytics", included: true },
        { text: "No team collaboration", included: false },
        { text: "No custom integrations", included: false },
        { text: "No priority access", included: false },
      ],
      highlight: false,
      cta: "Start Free Trial",
      planId: "free_trial",
      popular: false,
      usageLimit: "1/day"
    },
    {
      name: "Basic",
      price: billingPeriod === "monthly" ? "$299" : "$2,990",
      description: "For growing businesses and teams",
      features: [
        { text: "All AI features included", included: true },
        { text: "50 uses per feature per month", included: true },
        { text: "Email & chat support", included: true },
        { text: "Full analytics dashboard", included: true },
        { text: "Team collaboration", included: true },
        { text: "Basic integrations", included: true },
        { text: "No priority access", included: false },
      ],
      highlight: false,
      cta: "Get Started",
      planId: "basic",
      popular: false,
      usageLimit: "50/month"
    },
    {
      name: "Professional",
      price: billingPeriod === "monthly" ? "$999" : "$9,990",
      description: "For enterprises with advanced needs",
      features: [
        { text: "All AI features included", included: true },
        { text: "Unlimited usage", included: true },
        { text: "Priority 24/7 support", included: true },
        { text: "Advanced analytics & reporting", included: true },
        { text: "Enterprise team management", included: true },
        { text: "Custom integrations", included: true },
        { text: "Priority feature access", included: true },
      ],
      highlight: true,
      cta: "Contact Sales",
      planId: "professional",
      popular: true,
      usageLimit: "Unlimited"
    }
  ];

  // Calculate yearly savings
  const calculateSavings = (monthlyPrice: string) => {
    const price = parseInt(monthlyPrice.replace(/[^0-9]/g, ""));
    return Math.round((price * 12 * 0.17)); // 17% savings for annual
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="outline" className="px-3 py-1 bg-white/50 dark:bg-gray-800/50 text-sm font-medium mb-2 animate-fade-in-up">
            Transparent Pricing
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-in-up">
            Choose the plan that's right for you
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Access powerful AI features with flexible pricing options designed for businesses of all sizes
          </p>
          
          <div className="flex justify-center pt-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Tabs 
              defaultValue="monthly" 
              className="bg-muted/50 rounded-full p-1"
              onValueChange={(value) => setBillingPeriod(value as "monthly" | "yearly")}
            >
              <TabsList className="grid grid-cols-2 w-[300px]">
                <TabsTrigger value="monthly" className="rounded-full">
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="yearly" className="rounded-full">
                  Yearly <span className="ml-2 text-xs bg-adept py-0.5 px-1.5 rounded-full text-white">Save 17%</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Pricing cards */}
      <section className="pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div key={plan.planId} className="animate-fade-in-up" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
              <PricingCard 
                {...plan} 
                billingPeriod={billingPeriod}
                savings={billingPeriod === "yearly" ? calculateSavings(plan.price) : undefined}
              />
            </div>
          ))}
        </div>
        
        {/* Pay-per-use option */}
        <div className="max-w-6xl mx-auto mt-12 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <PayPerUseCard />
        </div>
      </section>
      
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
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-8 md:p-12 rounded-2xl shadow-sm animate-fade-in-up">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            <div className="md:w-2/3 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">Need a custom solution?</h2>
              <p className="text-muted-foreground">
                Our enterprise plan offers tailored solutions, dedicated support, and advanced features to meet your specific requirements.
              </p>
              <ul className="space-y-2 pt-2">
                {[
                  "Custom model training",
                  "Dedicated account manager",
                  "Service-level agreement (SLA)",
                  "Custom security requirements"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-adept" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <Button size="lg" className="bg-adept hover:bg-adept-dark text-white px-6 py-6 h-auto text-lg">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <PricingFaq />
      
      {/* Final CTA section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
          <h2 className="text-3xl font-bold">Ready to transform your business?</h2>
          <p className="text-xl text-muted-foreground">
            Start with a free trial today. No credit card required.
          </p>
          <div className="pt-4">
            <Button size="lg" className="bg-adept hover:bg-adept-dark text-white px-8">
              Get Started For Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
