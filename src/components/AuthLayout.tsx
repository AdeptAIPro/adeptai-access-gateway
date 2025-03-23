
import React from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  type: "login" | "signup";
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title, 
  subtitle,
  type 
}) => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left side - Brand panel */}
      <div className="hidden md:flex md:w-1/2 bg-adept p-10 flex-col justify-between">
        <div className="animate-fade-in">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-white text-2xl">AdeptAI</span>
          </Link>
        </div>
        
        <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h1 className="text-4xl font-bold text-white">
            Unlock the power of intelligent automation
          </h1>
          <p className="text-white/80 text-lg">
            Join thousands of professionals leveraging AdeptAI to transform their workflow.
          </p>
          
          <div className="flex items-center gap-4 mt-8">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-white/20 border border-white/40" />
              ))}
            </div>
            <p className="text-white/90 text-sm">
              Trusted by 10,000+ users worldwide
            </p>
          </div>
        </div>
        
        <div className="text-white/70 text-sm animate-fade-in" style={{ animationDelay: "0.5s" }}>
          &copy; {new Date().getFullYear()} AdeptAI. All rights reserved.
        </div>
      </div>
      
      {/* Right side - Auth form */}
      <div className="flex-1 w-full md:w-1/2 flex flex-col p-6 md:p-10 justify-center">
        <div className="md:hidden mb-10 animate-fade-in">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-adept text-2xl">AdeptAI</span>
          </Link>
        </div>
        
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="space-y-2 animate-fade-in-up">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          
          {children}
          
          <div className="text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {type === "login" ? (
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="font-medium text-adept hover:underline hover-lift inline-block">
                  Sign up
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-adept hover:underline hover-lift inline-block">
                  Sign in
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
