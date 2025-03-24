import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import Chatbot from "@/components/chatbot/Chatbot";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
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
      
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Unlock the power of <span className="text-adept">intelligent automation</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
              AdeptAI helps businesses streamline workflows, reduce manual effort, and make smarter decisions with cutting-edge AI tools.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/signup">
              <Button size="lg" className="bg-adept hover:bg-adept-dark px-8">
                Get Started
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="px-8">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-16 max-w-6xl mx-auto relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <div className="aspect-video rounded-lg bg-gray-200 glass-morphism overflow-hidden">
            {/* This would be a screenshot or demo video in a real application */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-lg font-medium">AdeptAI Platform Preview</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold">Powerful features for every need</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform combines advanced AI capabilities with user-friendly interfaces to deliver exceptional results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Automation",
                description: "Automate repetitive tasks with AI-powered workflows that learn and adapt to your needs."
              },
              {
                title: "Intelligent Analysis",
                description: "Extract valuable insights from your data with advanced analytics and visualization tools."
              },
              {
                title: "Seamless Integration",
                description: "Connect with your existing tools and platforms for a unified workflow experience."
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="p-6 rounded-lg bg-white border hover:border-adept transition-all duration-300 animate-fade-in-up hover-lift"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <div className="h-12 w-12 rounded-md bg-adept/10 flex items-center justify-center mb-4">
                  <div className="h-6 w-6 rounded-full bg-adept/30" />
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to transform your workflow?</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of businesses that trust AdeptAI to power their operations.
          </p>
          
          <div className="pt-4">
            <Link to="/signup">
              <Button size="lg" className="bg-adept hover:bg-adept-dark px-8">
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-lg">AdeptAI</h3>
            <p className="text-muted-foreground text-sm">
              Powering intelligent automation for businesses worldwide.
            </p>
          </div>
          
          {["Product", "Company", "Resources", "Legal"].map((category, i) => (
            <div key={i} className="space-y-4">
              <h3 className="font-bold text-lg">{category}</h3>
              <ul className="space-y-2">
                {[1, 2, 3, 4].map(item => (
                  <li key={item}>
                    <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                      {category} Link {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AdeptAI. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Twitter", "LinkedIn", "GitHub"].map((social, i) => (
              <a 
                key={i} 
                href="#" 
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
      
      {/* Add Chatbot Component */}
      <Chatbot position="bottom-right" />
    </div>
  );
};

export default Index;
