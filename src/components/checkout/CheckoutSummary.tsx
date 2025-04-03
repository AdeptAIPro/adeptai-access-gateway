
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CheckoutSummaryProps {
  planName: string;
  price: string;
  billingPeriod: string;
  isPlanWithBilling: boolean;
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  planName,
  price,
  billingPeriod,
  isPlanWithBilling
}) => {
  return (
    <Card className="sticky top-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
      <CardHeader>
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>{planName}</span>
          <span>{price}</span>
        </div>
        
        {isPlanWithBilling && (
          <div className="text-xs text-muted-foreground">
            Billed {billingPeriod === "monthly" ? "monthly" : "annually"}
          </div>
        )}
        
        <Separator />
        
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>{price}</span>
        </div>
        
        <div className="text-xs text-muted-foreground space-y-2 pt-2">
          {isPlanWithBilling && (
            <p>Your subscription will renew automatically.</p>
          )}
          <p>You can cancel anytime from your account settings.</p>
          <p>Need help? Contact <a href="mailto:payments@adeptaipro.com" className="text-adept hover:underline">payments@adeptaipro.com</a></p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckoutSummary;
