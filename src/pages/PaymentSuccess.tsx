
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // You could potentially verify the payment status here
    // by calling an API endpoint
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-full p-3 w-16 h-16 mx-auto">
          <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold">Payment Successful!</h1>
        
        <p className="text-muted-foreground">
          Thank you for your purchase. Your transaction has been completed and a receipt has been emailed to you.
        </p>
        
        <div className="bg-muted/50 rounded-lg p-6 text-left space-y-4">
          <h2 className="text-lg font-medium">What's Next?</h2>
          
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="bg-adept text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
              <span>Access your new features by exploring the dashboard</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-adept text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
              <span>Configure your settings to customize your experience</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-adept text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
              <span>Check out our tutorials to get the most out of AdeptAI Pro</span>
            </li>
          </ul>
        </div>
        
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate("/dashboard")} 
            className="bg-adept hover:bg-adept-dark text-white"
          >
            Go to Dashboard
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate("/settings/billing")}
          >
            View Subscription Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
