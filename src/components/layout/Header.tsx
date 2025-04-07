
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Briefcase, Store } from "lucide-react";

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
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-muted-foreground hover:text-foreground transition-colors bg-transparent">Marketplace</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-500 to-indigo-700 p-6 no-underline outline-none focus:shadow-md"
                            to="/marketplace"
                          >
                            <div className="mt-4 mb-2 text-lg font-medium text-white">
                              AdeptAI Marketplace
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Discover top talent and premium software for your business
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/marketplace/talent"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center space-x-2">
                              <Briefcase className="h-4 w-4" />
                              <div className="text-sm font-medium leading-none">Talent Marketplace</div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Find top talent or post your job openings
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/marketplace/software"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center space-x-2">
                              <Store className="h-4 w-4" />
                              <div className="text-sm font-medium leading-none">Software Marketplace</div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Discover premium AI and SaaS tools
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link to="/professional-development" className="text-muted-foreground hover:text-foreground transition-colors">
              Professional Development
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
