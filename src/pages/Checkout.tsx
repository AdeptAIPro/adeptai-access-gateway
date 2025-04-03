
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { createCheckoutSession, createPayPerUseCheckout, createApiPayAsYouGoCheckout } from "@/services/payment/StripeService";

// Import refactored components
import CheckoutDetails from "@/components/checkout/CheckoutDetails";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import LoadingState from "@/components/checkout/LoadingState";
import ProcessingMessage from "@/components/checkout/ProcessingMessage";
import { useCheckoutHelpers } from "@/hooks/useCheckoutHelpers";

interface PlanDetails {
  id: string;
  name: string;
  price: number;
  priceYearly?: number;
  description: string;
}

const plans: Record<string, PlanDetails> = {
  free_trial: {
    id: "free_trial",
    name: "Free Tier",
    price: 0,
    description: "All features with limited usage"
  },
  pro: {
    id: "pro",
    name: "Pro Plan",
    price: 49,
    priceYearly: 490,
    description: "Best for startups & small businesses"
  },
  business: {
    id: "business",
    name: "Business Plan",
    price: 199,
    priceYearly: 1990,
    description: "Best for growing teams & mid-sized companies"
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise Plan",
    price: 0, // Custom pricing
    description: "Custom solution for large organizations"
  },
  pay_per_use: {
    id: "pay_per_use",
    name: "Pay Per Use",
    price: 9,
    description: "Pay only for what you use"
  },
  api_pay_as_you_go: {
    id: "api_pay_as_you_go",
    name: "API Pay-As-You-Go",
    price: 0.01,
    description: "Pay only for API calls you make"
  }
};

const Checkout = () => {
  const [planId, setPlanId] = useState<string | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [plan, setPlan] = useState<PlanDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [processingStep, setProcessingStep] = useState<
    "initializing" | "creating_session" | "redirecting" | null
  >(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getPrice, getPlanFeatures, isPlanWithBilling, validateCheckout } = useCheckoutHelpers(plan, planId, billingPeriod);
  
  useEffect(() => {
    const checkUserAndLoadPlan = async () => {
      if (!user) {
        toast.error("Please log in to continue");
        navigate("/login", { state: { from: location } });
        return;
      }
      
      try {
        const params = new URLSearchParams(location.search);
        const paramPlanId = params.get("plan");
        const paramBilling = params.get("billing") as "monthly" | "yearly" | null;
        
        if (paramBilling && (paramBilling === "monthly" || paramBilling === "yearly")) {
          setBillingPeriod(paramBilling);
        }
        
        if (paramPlanId && plans[paramPlanId]) {
          setPlanId(paramPlanId);
          setPlan(plans[paramPlanId]);
        } else {
          setPlanId("pro");
          setPlan(plans.pro);
        }
      } catch (error) {
        toast.error("Failed to load plan details");
        console.error("Error loading plan:", error);
      } finally {
        // Short delay to allow for a smooth transition
        setTimeout(() => setIsPageLoading(false), 500);
      }
    };
    
    checkUserAndLoadPlan();
  }, [location, navigate, user]);
  
  const handleCheckout = async () => {
    // Validate checkout before proceeding
    if (!validateCheckout()) {
      return;
    }
    
    if (!planId || !plan) {
      toast.error("Invalid plan selected");
      return;
    }
    
    setIsLoading(true);
    setProcessingStep("initializing");
    
    try {
      // Small delay for initializing step to be visible
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingStep("creating_session");
      
      let result;
      
      if (planId === "pay_per_use") {
        result = await createPayPerUseCheckout();
      } else if (planId === "api_pay_as_you_go") {
        result = await createApiPayAsYouGoCheckout();
      } else if (planId === "free_trial") {
        toast.success("Your free trial has started");
        navigate("/dashboard");
        return;
      } else if (planId === "enterprise") {
        toast.success("Redirecting to sales contact page");
        navigate("/contact");
        return;
      } else {
        result = await createCheckoutSession({
          planId,
          billingPeriod,
        });
      }
      
      if ('error' in result) {
        throw new Error(result.error);
      }
      
      if ('url' in result && result.url) {
        setProcessingStep("redirecting");
        // Small delay for redirecting step to be visible
        await new Promise(resolve => setTimeout(resolve, 800));
        window.location.href = result.url;
      } else {
        throw new Error("No checkout URL returned");
      }
      
    } catch (error: any) {
      console.error("Checkout failed:", error);
      toast.error(`Payment processing failed: ${error.message}`);
      setProcessingStep(null);
      setIsLoading(false);
    }
  };
  
  if (isPageLoading || !plan) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-2 mb-8 animate-fade-in">
          <Button variant="ghost" onClick={() => navigate("/pricing")} className="p-0 h-8 w-8">
            &larr;
          </Button>
          <h1 className="text-2xl font-bold">Complete Your Order</h1>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <CheckoutDetails
              planName={plan.name}
              price={getPrice()}
              planId={planId || ""}
              billingPeriod={billingPeriod}
              isLoading={isLoading}
              isPlanWithBilling={isPlanWithBilling()}
              features={getPlanFeatures()}
              processingStep={processingStep}
              handleCheckout={handleCheckout}
              ProcessingStepMessage={() => <ProcessingMessage step={processingStep} />}
            />
          </div>
          
          <div className="md:col-span-1">
            <CheckoutSummary
              planName={plan.name}
              price={getPrice()}
              billingPeriod={billingPeriod}
              isPlanWithBilling={isPlanWithBilling()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
