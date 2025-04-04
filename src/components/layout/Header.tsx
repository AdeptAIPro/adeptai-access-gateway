
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

const Header = () => {
  const { user } = useAuth();

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <div className="flex items-center space-x-8">
          <Link to="/" className="font-bold text-2xl text-adept">
            AdeptAI
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link to="/professional-development" className="text-muted-foreground hover:text-foreground transition-colors">
              Professional Development
            </Link>
            <Link to="/marketplace" className="text-muted-foreground hover:text-foreground transition-colors">
              Marketplace
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <Link to="/dashboard">
              <Button className="bg-adept hover:bg-adept-dark">
                Dashboard
              </Button>
            </Link>
          ) : (
            <React.Fragment>
              <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                Log in
              </Link>
              <Link to="/signup">
                <Button className="bg-adept hover:bg-adept-dark">
                  Sign up
                </Button>
              </Link>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
