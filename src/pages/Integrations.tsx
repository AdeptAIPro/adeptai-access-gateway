
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Puzzle, 
  Search, 
  Link as LinkIcon, 
  CheckCircle, 
  X as XIcon,
  Github,
  Slack,
  FileText,
  Database,
  Mail,
  Calendar,
  MessageSquare,
  HardDrive,
  CreditCard,
  Building,
  Phone
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface IntegrationItem {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  connected: boolean;
}

const Integrations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  if (!user) {
    navigate("/login");
    return null;
  }

  const integrationItems: IntegrationItem[] = [
    {
      id: "github",
      name: "GitHub",
      description: "Connect your repositories to manage software development",
      icon: Github,
      category: "Development",
      connected: true,
    },
    {
      id: "slack",
      name: "Slack",
      description: "Connect your workspace for team communication",
      icon: Slack,
      category: "Communication",
      connected: true,
    },
    {
      id: "google-docs",
      name: "Google Docs",
      description: "Connect for document collaboration",
      icon: FileText,
      category: "Productivity",
      connected: false,
    },
    {
      id: "salesforce",
      name: "Salesforce",
      description: "CRM integration for sales and customer management",
      icon: Database,
      category: "Sales",
      connected: false,
    },
    {
      id: "gmail",
      name: "Gmail",
      description: "Email integration for communication",
      icon: Mail,
      category: "Communication",
      connected: true,
    },
    {
      id: "google-calendar",
      name: "Google Calendar",
      description: "Calendar integration for scheduling",
      icon: Calendar,
      category: "Productivity",
      connected: false,
    },
    {
      id: "ms-teams",
      name: "Microsoft Teams",
      description: "Connect for team collaboration",
      icon: MessageSquare,
      category: "Communication",
      connected: false,
    },
    {
      id: "aws",
      name: "AWS",
      description: "Cloud infrastructure integration",
      icon: HardDrive,
      category: "Development",
      connected: false,
    },
    {
      id: "stripe",
      name: "Stripe",
      description: "Payment processing integration",
      icon: CreditCard,
      category: "Finance",
      connected: true,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      description: "Professional network integration",
      icon: Building,
      category: "Recruitment",
      connected: false,
    },
    {
      id: "twilio",
      name: "Twilio",
      description: "SMS and communication integration",
      icon: Phone,
      category: "Communication",
      connected: false,
    },
  ];

  // Get all unique categories
  const categories = ["all", ...new Set(integrationItems.map(item => item.category))];

  // Filter integrations based on search and category
  const filteredIntegrations = integrationItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Toggle connection status (would actually call an API in a real app)
  const toggleConnection = (id: string) => {
    console.log(`Toggling connection for ${id}`);
    // In a real app, this would update the state after calling an API
  };

  return (
    <DashboardLayout title="Integrations">
      <div className="space-y-6">
        {/* Search and filter bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search integrations..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 flex-nowrap">
            {categories.map(category => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="whitespace-nowrap"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Integrations grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredIntegrations.map((integration) => (
            <Card key={integration.id} className="hover:shadow-md transition-all overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="bg-primary/10 p-2 rounded-md">
                  <integration.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {integration.name}
                    {integration.connected && 
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Connected
                      </Badge>
                    }
                  </CardTitle>
                  <CardDescription className="text-xs">{integration.category}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                <Button 
                  variant={integration.connected ? "destructive" : "default"}
                  className="w-full"
                  onClick={() => toggleConnection(integration.id)}
                >
                  {integration.connected ? (
                    <>
                      <XIcon className="mr-2 h-4 w-4" /> Disconnect
                    </>
                  ) : (
                    <>
                      <LinkIcon className="mr-2 h-4 w-4" /> Connect
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Integrations;
