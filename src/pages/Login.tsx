
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";
import AuthLayout from "@/components/AuthLayout";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { GoogleIcon, FacebookIcon, LinkedInIcon } from "@/utils/icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@/services/crm/types";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("admin");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  // Get redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would call an authentication API
      // For demo: set the email based on selected role to trigger proper role assignment
      const roleMappedEmail = role === "admin" ? email : `${role}@adeptaipro.com`;
      
      await login(roleMappedEmail, password);
      
      toast.success("Login successful!");

      // Redirect based on role
      if (role === "leadership") {
        navigate("/dashboard");
      } else if (["sales", "marketing"].includes(role)) {
        navigate("/dashboard/crm");
      } else {
        // Admin can access everything
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Enter your credentials to access your account" 
      type="login"
    >
      <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-glow bg-gray-50 border-gray-200"
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Button 
              variant="link" 
              className="px-0 font-normal text-xs text-adept h-auto"
              type="button"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </Button>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-glow pr-10 bg-gray-50 border-gray-200"
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
        </div>

        {/* Role selector for demo purposes */}
        <div className="space-y-2">
          <Label htmlFor="role">Login as (Demo)</Label>
          <Select
            value={role}
            onValueChange={(value) => setRole(value as UserRole)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Administrator</SelectItem>
              <SelectItem value="sales">Sales Team</SelectItem>
              <SelectItem value="marketing">Marketing Team</SelectItem>
              <SelectItem value="leadership">Leadership</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {role === "admin" ? "Full access to all features" : 
             role === "sales" ? "Access to CRM with edit permissions" :
             role === "marketing" ? "Access to CRM and Analytics" :
             "Access to Dashboards and Analytics only"}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          />
          <Label htmlFor="remember" className="text-sm font-normal">
            Remember me for 30 days
          </Label>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-adept hover:bg-adept-dark transition-all duration-300 shadow-md"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
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
        
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" type="button" className="hover-lift flex items-center justify-center gap-2 bg-white">
            <GoogleIcon className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:text-xs whitespace-nowrap">Google</span>
          </Button>
          <Button variant="outline" type="button" className="hover-lift flex items-center justify-center gap-2 bg-white">
            <FacebookIcon className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:text-xs whitespace-nowrap">Facebook</span>
          </Button>
          <Button variant="outline" type="button" className="hover-lift flex items-center justify-center gap-2 bg-white">
            <LinkedInIcon className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:text-xs whitespace-nowrap">LinkedIn</span>
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
