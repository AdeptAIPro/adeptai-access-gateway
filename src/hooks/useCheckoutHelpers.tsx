
import { useState } from "react";
import { toast } from "sonner";

interface PlanDetails {
  id: string;
  name: string;
  price: number;
  priceYearly?: number;
  description: string;
}

export const useCheckoutHelpers = (plan: PlanDetails | null, planId: string | null, billingPeriod: "monthly" | "yearly") => {
  const [checkoutErrors, setCheckoutErrors] = useState<string[]>([]);
  
  // Helper functions for checkout page
  const getPrice = () => {
    if (!plan) return "";
    if (planId === "free_trial") return "$0";
    if (planId === "enterprise") return "Custom pricing";
    if (planId === "pay_per_use") return `$${plan.price} per use`;
    if (planId === "api_pay_as_you_go") return "$0.01 per API call";
    
    return billingPeriod === "monthly" 
      ? `$${plan.price}/month` 
      : `$${plan.priceYearly}/year`;
  };

  const getPlanFeatures = () => {
    switch(planId) {
      case 'free_trial':
        return ["Limited AI workflows & automations", "Access to basic Agentic AI models", "Community support", "Basic documentation"];
      case 'pro':
        return ["50 AI workflows per month", "5,000 API calls per month", "Standard integrations (Zapier, Slack, Notion)", "Email support", "Standard analytics"];
      case 'business':
        return ["Unlimited AI workflows", "50,000 API calls per month", "Advanced automation & analytics", "Priority support", "API access for custom integrations", "Advanced team collaboration tools"];
      case 'enterprise':
        return ["Fully customizable AI solutions", "Unlimited API calls & workflows", "Dedicated account manager & SLAs", "On-premise deployment options", "White-label options", "Custom security requirements"];
      case 'pay_per_use':
        return ["Pay only for the AI features you use", "No monthly commitment", "Access to all AI features", "Standard support", "$9 per transaction"];
      case 'api_pay_as_you_go':
        return ["Pay only for API calls you make", "Volume discounts available", "No monthly subscription", "Complete API documentation", "Usage-based billing"];
      default:
        return ["Access to AI automation features", "Standard support", "Regular updates"];
    }
  };

  const isPlanWithBilling = () => {
    return !(planId === "free_trial" || planId === "pay_per_use" || planId === "api_pay_as_you_go" || planId === "enterprise");
  };
  
  const validateCheckout = () => {
    const errors = [];
    
    // Validate plan selection
    if (!planId || !plan) {
      errors.push("Please select a valid plan");
    }
    
    // For plans with billing periods, validate the period
    if (isPlanWithBilling() && !["monthly", "yearly"].includes(billingPeriod)) {
      errors.push("Please select a valid billing period");
    }
    
    setCheckoutErrors(errors);
    
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return false;
    }
    
    return true;
  };

  return {
    getPrice,
    getPlanFeatures,
    isPlanWithBilling,
    validateCheckout,
    checkoutErrors
  };
};
