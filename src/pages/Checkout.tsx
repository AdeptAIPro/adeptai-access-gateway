
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";

interface PlanDetails {
  id: string;
  name: string;
  price: number;
  description: string;
}

const plans: Record<string, PlanDetails> = {
  starter: {
    id: "starter",
    name: "Starter Plan",
    price: 29,
    description: "Basic access to AdeptAI tools"
  },
  pro: {
    id: "pro",
    name: "Pro Plan",
    price: 99,
    description: "Advanced features and increased usage limits"
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise Plan",
    price: 499,
    description: "Full access with dedicated support and custom integrations"
  }
};

const Checkout = () => {
  const [planId, setPlanId] = useState<string | null>(null);
  const [plan, setPlan] = useState<PlanDetails | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }
    
    // Get plan from URL
    const params = new URLSearchParams(location.search);
    const paramPlanId = params.get("plan");
    
    if (paramPlanId && plans[paramPlanId]) {
      setPlanId(paramPlanId);
      setPlan(plans[paramPlanId]);
    } else {
      // Default to pro plan if none specified
      setPlanId("pro");
      setPlan(plans.pro);
    }
  }, [location, navigate, user]);
  
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };
  
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return value;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNumber || !cardName || !expiry || !cvc) {
      return toast.error("Please fill in all payment details");
    }
    
    setIsLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Payment successful! Welcome to AdeptAI.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment processing failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading checkout...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-6">
      <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center space-x-2 animate-fade-in">
            <Button variant="ghost" onClick={() => navigate(-1)} className="p-0 h-8 w-8">
              &larr;
            </Button>
            <h1 className="text-2xl font-bold">Checkout</h1>
          </div>
          
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>
                Enter your card details to complete your subscription
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength={19}
                    className="input-glow"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="card-name">Cardholder Name</Label>
                  <Input
                    id="card-name"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="input-glow"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      maxLength={5}
                      className="input-glow"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ""))}
                      maxLength={3}
                      className="input-glow"
                      required
                    />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-adept hover:bg-adept-dark" 
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : `Pay $${plan.price.toFixed(2)}`}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <Card className="sticky top-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>{plan.name}</span>
                <span>${plan.price.toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-medium">
                <span>Total (USD)</span>
                <span>${plan.price.toFixed(2)}</span>
              </div>
              
              <div className="text-xs text-muted-foreground">
                <p>Your subscription will renew automatically each month.</p>
                <p className="mt-1">You can cancel anytime from your account settings.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
