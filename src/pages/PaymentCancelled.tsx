
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-full p-3 w-16 h-16 mx-auto">
          <AlertCircle className="w-10 h-10 text-amber-600 dark:text-amber-500" />
        </div>
        
        <h1 className="text-3xl font-bold">Payment Cancelled</h1>
        
        <p className="text-muted-foreground">
          Your payment process was cancelled. No charges have been made to your account.
        </p>
        
        <div className="bg-muted/50 rounded-lg p-6 text-left">
          <h2 className="text-lg font-medium mb-4">Need Help?</h2>
          
          <p className="text-sm text-muted-foreground mb-4">
            If you're experiencing any issues with the payment process or have questions about our plans, our support team is here to help.
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Email:</span>
              <a href="mailto:payments@adeptaipro.com" className="text-sm text-adept hover:underline">
                payments@adeptaipro.com
              </a>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Support Hours:</span>
              <span className="text-sm">Monday-Friday, 9AM-5PM ET</span>
            </div>
          </div>
        </div>
        
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate("/pricing")} 
            className="bg-adept hover:bg-adept-dark text-white"
          >
            Back to Pricing
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
