
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

interface CheckoutDetailsProps {
  planName: string;
  price: string;
  planId: string;
  billingPeriod: "monthly" | "yearly";
  isPlanWithBilling: boolean;
  features: string[];
  isLoading: boolean;
  processingStep: "initializing" | "creating_session" | "redirecting" | null;
  handleCheckout: () => void;
  ProcessingStepMessage: React.FC;
}

const CheckoutDetails: React.FC<CheckoutDetailsProps> = ({
  planName,
  price,
  planId,
  billingPeriod,
  isPlanWithBilling,
  features,
  isLoading,
  processingStep,
  handleCheckout,
  ProcessingStepMessage
}) => {
  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle>Complete Your Purchase</CardTitle>
        <CardDescription>Review your plan details before checkout</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-muted/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-adept/5 text-adept border-adept/20">
                {planName}
              </Badge>
            </div>
            <div className="text-lg font-medium">{price}</div>
          </div>
          
          {isPlanWithBilling && (
            <div className="flex items-center justify-between">
              <Label htmlFor="billing-toggle">Billing Period</Label>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${billingPeriod === "monthly" ? "font-medium" : ""}`}>
                  Monthly
                </span>
                <Switch id="billing-toggle" disabled checked={billingPeriod === "yearly"} />
                <span className={`text-sm ${billingPeriod === "yearly" ? "font-medium" : ""}`}>
                  Yearly
                </span>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">What's included:</h3>
          <div className="space-y-3">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckIcon className="h-5 w-5 text-adept flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center pt-4">
            <ProcessingStepMessage />
          </div>
        ) : (
          <Button 
            onClick={handleCheckout} 
            disabled={isLoading}
            className="w-full bg-adept hover:bg-adept-dark text-white mt-2"
          >
            {planId === "free_trial" 
              ? "Start Free Trial" 
              : planId === "enterprise"
                ? "Contact Sales"
                : `Proceed to ${planId === "pay_per_use" || planId === "api_pay_as_you_go" ? "Setup" : "Payment"}`
            }
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CheckoutDetails;
