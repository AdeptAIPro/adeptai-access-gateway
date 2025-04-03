
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PricingHeaderProps {
  billingPeriod: "monthly" | "yearly";
  setBillingPeriod: (value: "monthly" | "yearly") => void;
}

const PricingHeader: React.FC<PricingHeaderProps> = ({ 
  billingPeriod, 
  setBillingPeriod 
}) => {
  return (
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
            defaultValue={billingPeriod}
            value={billingPeriod}
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
  );
};

export default PricingHeader;
