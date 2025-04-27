import React, { useState } from "react";
import { Link, useNavigate } from "@/utils/router-polyfill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import AuthLayout from "@/components/AuthLayout";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return toast.error("Please fill in all required fields");
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
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
      <div className="mb-6">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center gap-2 mb-2">
            <Button 
              variant="outline" 
              className="w-full" 
              type="button" 
              onClick={() => {
                setEmail("admin@example.com");
                setPassword("password");
              }}
            >
              Admin Demo
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              type="button"
              onClick={() => {
                setEmail("user@example.com");
                setPassword("password");
              }}
            >
              User Demo
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Click a demo account or login with your credentials
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-glow"
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link 
              to="/forgot-password" 
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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
        </div>
        
        <Button
          type="submit"
          className="w-full bg-adept hover:bg-adept-dark transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      
      <div className="mt-4 text-center text-sm">
        <span className="text-muted-foreground">Don't have an account?{" "}</span>
        <Link to="/signup" className="text-adept hover:underline">
          Sign up
        </Link>
      </div>
      
      <div className="relative mt-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Button variant="outline" type="button">
          Google
        </Button>
        <Button variant="outline" type="button">
          GitHub
        </Button>
        <Button variant="outline" type="button">
          Apple
        </Button>
      </div>
    </AuthLayout>
  );
};

export default Login;
