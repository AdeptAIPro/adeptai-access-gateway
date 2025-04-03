
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, Loader2 } from "lucide-react";

interface PlanFeature {
  text: string;
}

interface CheckoutDetailsProps {
  planName: string;
  price: string;
  planId: string;
  billingPeriod: string;
  isLoading: boolean;
  isPlanWithBilling: boolean;
  features: string[];
  processingStep: "initializing" | "creating_session" | "redirecting" | null;
  handleCheckout: () => void;
  ProcessingStepMessage: React.FC;
}

const CheckoutDetails: React.FC<CheckoutDetailsProps> = ({
  planName,
  price,
  planId,
  billingPeriod,
  isLoading,
  isPlanWithBilling,
  features,
  processingStep,
  handleCheckout,
  ProcessingStepMessage
}) => {
  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-adept" />
          Secure Checkout
        </CardTitle>
        <CardDescription>
          {planId === 'enterprise' ? 
            'Contact our sales team to customize your solution' : 
            'You'll be redirected to our secure payment processor'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-muted/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Selected Plan</span>
            <span className="text-adept font-medium">{planName}</span>
          </div>
          {isPlanWithBilling && (
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Billing Period</span>
              <span className="capitalize">{billingPeriod}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="font-medium">Total</span>
            <span className="text-lg font-bold">{price}</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">What's included:</h3>
          <ul className="space-y-2">
            {features.map((feature, index) => (
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
  );
};

export default CheckoutDetails;
