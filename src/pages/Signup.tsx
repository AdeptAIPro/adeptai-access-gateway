
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";
import AuthLayout from "@/components/AuthLayout";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  
  useEffect(() => {
    // Extract plan from URL query params if present
    const params = new URLSearchParams(location.search);
    const planId = params.get("plan");
    if (planId) {
      setSelectedPlan(planId);
    }
  }, [location]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      return toast.error("Please fill in all required fields");
    }
    
    if (!agreedToTerms) {
      return toast.error("You must agree to the terms of service");
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would call your registration API
      await register(name, email, password);
      
      // If there's a selected plan, redirect to checkout
      if (selectedPlan) {
        toast.success("Account created! Proceeding to checkout...");
        navigate(`/checkout?plan=${selectedPlan}`);
      } else {
        toast.success("Account created successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Enter your information to get started" 
      type="signup"
    >
      <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        {selectedPlan && (
          <div className="p-3 bg-adept/10 rounded-md text-sm">
            You selected the <span className="font-medium">{selectedPlan === "pro" ? "Pro" : selectedPlan === "enterprise" ? "Enterprise" : "Starter"}</span> plan. 
            You'll be directed to payment after creating your account.
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-glow"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-glow"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-glow pr-10"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Password must be at least 8 characters long
          </p>
        </div>
        
        <div className="flex items-start space-x-2 pt-2">
          <Checkbox
            id="terms"
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
          />
          <Label htmlFor="terms" className="text-sm font-normal leading-tight">
            I agree to the{" "}
            <a href="/terms" className="text-adept hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-adept hover:underline">
              Privacy Policy
            </a>
          </Label>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-adept hover:bg-adept-dark transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" type="button" className="hover-lift">
            Google
          </Button>
          <Button variant="outline" type="button" className="hover-lift">
            GitHub
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Signup;
