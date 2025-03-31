
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center p-8 max-w-md">
        <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-full inline-block mb-6">
          <Shield className="h-12 w-12 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
        
        <p className="text-muted-foreground mb-6">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        
        {user?.roles && (
          <div className="mb-6 p-4 bg-muted rounded-md">
            <p className="text-sm font-medium mb-2">Your current role(s):</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {user.roles.map((role, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <Button 
          onClick={() => navigate(-1)} 
          variant="outline" 
          className="mr-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
        
        <Button 
          onClick={() => navigate("/dashboard")} 
          variant="default"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
