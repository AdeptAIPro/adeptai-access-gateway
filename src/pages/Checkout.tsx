
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, CreditCard, Check } from "lucide-react";
import { createCheckoutSession, createPayPerUseCheckout, createApiPayAsYouGoCheckout } from "@/services/payment/StripeService";

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
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      toast.error("Please log in to continue");
      navigate("/login", { state: { from: location } });
      return;
    }
    
    // Get plan and billing period from URL
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
      // Default to pro plan if none specified
      setPlanId("pro");
      setPlan(plans.pro);
    }
  }, [location, navigate, user]);
  
  const handleCheckout = async () => {
    if (!planId || !plan) {
      toast.error("Invalid plan selected");
      return;
    }
    
    setIsLoading(true);
    setProcessingStep("initializing");
    
    try {
      setProcessingStep("creating_session");
      
      let result;
      
      if (planId === "pay_per_use") {
        result = await createPayPerUseCheckout();
      } else if (planId === "api_pay_as_you_go") {
        result = await createApiPayAsYouGoCheckout();
      } else if (planId === "free_trial") {
        // Free trial doesn't need payment processing
        navigate("/dashboard");
        return;
      } else if (planId === "enterprise") {
        // Enterprise plan requires contacting sales
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
  
  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-adept" />
          <p>Loading checkout...</p>
        </div>
      </div>
    );
  }

  const getPrice = () => {
    if (planId === "free_trial") return "$0";
    if (planId === "enterprise") return "Custom pricing";
    if (planId === "pay_per_use") return `$${plan.price} per use`;
    if (planId === "api_pay_as_you_go") return `$0.01 per API call`;
    
    return billingPeriod === "monthly" 
      ? `$${plan.price}/month` 
      : `$${plan.priceYearly}/year`;
  };

  const ProcessingStepMessage = () => {
    if (!processingStep) return null;
    
    const messages = {
      initializing: "Initializing checkout...",
      creating_session: "Creating secure checkout session...",
      redirecting: "Redirecting to secure payment page..."
    };
    
    return (
      <div className="flex items-center justify-center space-x-3 text-sm font-medium text-adept">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>{messages[processingStep]}</span>
      </div>
    );
  };

  // Get plan-specific features
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
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-adept" />
                  Secure Checkout
                </CardTitle>
                <CardDescription>
                  {planId === 'enterprise' ? 'Contact our sales team to customize your solution' : 'You'll be redirected to our secure payment processor'}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Selected Plan</span>
                    <span className="text-adept font-medium">{plan.name}</span>
                  </div>
                  {planId !== "free_trial" && planId !== "pay_per_use" && planId !== "api_pay_as_you_go" && planId !== "enterprise" && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Billing Period</span>
                      <span className="capitalize">{billingPeriod}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total</span>
                    <span className="text-lg font-bold">{getPrice()}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">What's included:</h3>
                  <ul className="space-y-2">
                    {getPlanFeatures().map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              
              <CardFooter className="flex-col space-y-4">
                <Button 
                  onClick={handleCheckout}
                  className={`w-full ${
                    planId === "enterprise" 
                      ? "bg-indigo-600 hover:bg-indigo-700" 
                      : planId === "api_pay_as_you_go"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-adept hover:bg-adept-dark"
                  } text-white`}
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    planId === "free_trial" 
                      ? "Start Free Trial" 
                      : planId === "enterprise"
                      ? "Contact Sales"
                      : `Proceed to ${planId === "pay_per_use" || planId === "api_pay_as_you_go" ? "Payment" : "Checkout"}`
                  )}
                </Button>
                
                {processingStep && (
                  <div className="w-full pt-2">
                    <ProcessingStepMessage />
                  </div>
                )}
                
                {!isLoading && (
                  <p className="text-xs text-center text-muted-foreground">
                    By proceeding, you agree to our Terms of Service and Privacy Policy
                  </p>
                )}
              </CardFooter>
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <Card className="sticky top-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{plan.name}</span>
                  <span>{getPrice()}</span>
                </div>
                
                {planId !== "free_trial" && planId !== "pay_per_use" && planId !== "api_pay_as_you_go" && planId !== "enterprise" && (
                  <div className="text-xs text-muted-foreground">
                    Billed {billingPeriod === "monthly" ? "monthly" : "annually"}
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{getPrice()}</span>
                </div>
                
                <div className="text-xs text-muted-foreground space-y-2 pt-2">
                  {planId !== "free_trial" && planId !== "pay_per_use" && planId !== "api_pay_as_you_go" && planId !== "enterprise" && (
                    <p>Your subscription will renew automatically.</p>
                  )}
                  <p>You can cancel anytime from your account settings.</p>
                  <p>Need help? Contact <a href="mailto:payments@adeptaipro.com" className="text-adept hover:underline">payments@adeptaipro.com</a></p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
