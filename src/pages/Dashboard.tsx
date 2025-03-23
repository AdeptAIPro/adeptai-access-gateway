
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Handle unauthorized access
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-md animate-fade-in-up">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">
            You need to be logged in to access the dashboard.
          </p>
          <Button 
            onClick={() => navigate("/login")}
            className="bg-adept hover:bg-adept-dark"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="font-bold text-xl text-adept">AdeptAI Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground hidden md:inline-block">
              Welcome, {user.name}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={logout}
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fade-in-up">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Welcome to AdeptAI</CardTitle>
              <CardDescription>
                Your intelligent automation assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This is your dashboard where you can access all AdeptAI features and services.
                Your subscription is active and you have full access to the platform.
              </p>
            </CardContent>
          </Card>
          
          {/* Add more dashboard cards and widgets here */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
