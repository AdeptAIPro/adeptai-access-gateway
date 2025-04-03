
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckIcon, Package, PackageCheck, PackagePlus, ServerCog, Buildings } from "lucide-react";
import PricingCard from "@/components/pricing/PricingCard";
import PricingFaq from "@/components/pricing/PricingFaq";
import ComparisonTable from "@/components/pricing/ComparisonTable";
import ApiPricing from "@/components/pricing/ApiPricing";

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const pricingPlans = [
    {
      name: "Free Tier",
      price: "$0",
      description: "Best for individuals exploring AI automation",
      features: [
        { text: "Limited AI workflows & automations", included: true },
        { text: "Access to basic Agentic AI models", included: true },
        { text: "Community support", included: true },
        { text: "Basic documentation", included: true },
        { text: "No team collaboration", included: false },
        { text: "No custom integrations", included: false },
        { text: "No priority access", included: false },
      ],
      highlight: false,
      cta: "Start Free",
      planId: "free_trial",
      popular: false,
      usageLimit: "Limited",
      apiCalls: "100/month"
    },
    {
      name: "Pro Plan",
      price: billingPeriod === "monthly" ? "$49" : "$490",
      description: "Best for startups & small businesses",
      features: [
        { text: "50 AI workflows/month", included: true },
        { text: "5,000 API calls/month", included: true },
        { text: "Standard integrations", included: true },
        { text: "Email support", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Team collaboration", included: false },
        { text: "API access for custom integrations", included: false },
      ],
      highlight: false,
      cta: "Get Started",
      planId: "pro",
      popular: false,
      usageLimit: "50 workflows/month",
      apiCalls: "5,000/month"
    },
    {
      name: "Business Plan",
      price: billingPeriod === "monthly" ? "$199" : "$1,990",
      description: "Best for growing teams & mid-sized companies",
      features: [
        { text: "Unlimited AI workflows", included: true },
        { text: "50,000 API calls/month", included: true },
        { text: "Advanced automation & analytics", included: true },
        { text: "Priority support", included: true },
        { text: "Team collaboration", included: true },
        { text: "API access for custom integrations", included: true },
        { text: "Dedicated onboarding", included: true },
      ],
      highlight: true,
      cta: "Choose Business",
      planId: "business",
      popular: true,
      usageLimit: "Unlimited",
      apiCalls: "50,000/month"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Best for large organizations with high-scale AI needs",
      features: [
        { text: "Fully customizable AI solutions", included: true },
        { text: "Unlimited API calls & workflows", included: true },
        { text: "Dedicated account manager & SLAs", included: true },
        { text: "On-premise or private cloud deployment", included: true },
        { text: "White-label options", included: true },
        { text: "AI customization options", included: true },
        { text: "Custom integrations", included: true },
      ],
      highlight: false,
      cta: "Contact Sales",
      planId: "enterprise",
      popular: false,
      usageLimit: "Unlimited",
      apiCalls: "Unlimited"
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
            Simple & Transparent Pricing
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-in-up">
            Choose the plan that fits your business
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Powerful AI automation with flexible pricing options for businesses of all sizes
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
      
      {/* Main pricing cards */}
      <section className="pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan, index) => (
            <div key={plan.planId} className="animate-fade-in-up" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
              <PricingCard 
                {...plan} 
                billingPeriod={billingPeriod}
                savings={billingPeriod === "yearly" && plan.price !== "$0" && plan.price !== "Custom" ? calculateSavings(plan.price) : undefined}
                customButton={plan.planId === "enterprise" ? (
                  <Link to="/contact" className="w-full">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                      Contact Sales
                    </Button>
                  </Link>
                ) : undefined}
              />
            </div>
          ))}
        </div>
        
        {/* API Pay-As-You-Go option */}
        <div className="max-w-6xl mx-auto mt-12 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <ApiPricing />
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
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 p-8 md:p-12 rounded-2xl shadow-sm animate-fade-in-up">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            <div className="md:w-2/3 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">Need a custom enterprise solution?</h2>
              <p className="text-muted-foreground">
                Our enterprise plan offers tailored AI solutions, dedicated support, and advanced features to meet your specific requirements.
              </p>
              <ul className="space-y-2 pt-2">
                {[
                  "Custom model training",
                  "On-premise deployment options",
                  "Dedicated account manager",
                  "Service-level agreement (SLA)",
                  "Custom security requirements"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-indigo-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-6 h-auto text-lg">
                Schedule a Demo
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
          <h2 className="text-3xl font-bold">Ready to transform your business with AI?</h2>
          <p className="text-xl text-muted-foreground">
            Start with our free tier today. No credit card required.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-adept hover:bg-adept-dark text-white px-8">
              Get Started For Free
            </Button>
            <Button size="lg" variant="outline">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
