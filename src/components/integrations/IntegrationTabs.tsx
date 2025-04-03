
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IntegrationCard from "@/components/integrations/IntegrationCard";
import IntegrationListItem from "@/components/integrations/IntegrationListItem";
import { IntegrationItem } from "@/types/integration";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { checkSubscription } from "@/services/payment/StripeService";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

interface IntegrationTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: string[];
  filteredIntegrations: IntegrationItem[];
  onToggleConnection: (id: string) => void;
  viewMode: "grid" | "list";
  isConnecting: boolean;
  categoryCounts: Record<string, number>;
}

const IntegrationTabs: React.FC<IntegrationTabsProps> = ({
  activeCategory,
  setActiveCategory,
  categories,
  filteredIntegrations,
  onToggleConnection,
  viewMode,
  isConnecting,
  categoryCounts,
}) => {
  const { user } = useAuth();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = React.useState(false);
  const [isSubscriptionDialogOpen, setIsSubscriptionDialogOpen] = React.useState(false);
  const [selectedIntegrationId, setSelectedIntegrationId] = React.useState<string | null>(null);
  const [isChecking, setIsChecking] = React.useState(false);
  const [apiError, setApiError] = React.useState<string | null>(null);
  const [selectedIntegration, setSelectedIntegration] = React.useState<IntegrationItem | null>(null);

  const handleIntegrationConnect = async (id: string) => {
    setSelectedIntegrationId(id);
    
    // If user is not authenticated, show auth dialog
    if (!user) {
      setIsAuthDialogOpen(true);
      return;
    }

    // Clear any previous errors
    setApiError(null);
    
    // If user is authenticated, check subscription
    setIsChecking(true);
    try {
      const subscriptionResult = await checkSubscription();
      setIsChecking(false);
      
      if ('error' in subscriptionResult) {
        setApiError("Failed to verify subscription status. Please try again.");
        toast.error("Failed to check subscription status");
        return;
      }

      // Skip subscription check for free integrations
      const integration = filteredIntegrations.find(item => item.id === id);
      const isFreeIntegration = integration?.category === "Free Job Posting";

      if (subscriptionResult.subscribed || isFreeIntegration) {
        // User has an active subscription or is connecting a free integration
        onToggleConnection(id);
      } else {
        // User doesn't have an active subscription
        setIsSubscriptionDialogOpen(true);
      }
    } catch (error) {
      setIsChecking(false);
      console.error("Error checking subscription:", error);
      setApiError("An unexpected error occurred. Please try again later.");
      toast.error("Failed to check subscription status");
    }
  };
  
  const handleViewDetails = (integration: IntegrationItem) => {
    setSelectedIntegration(integration);
    // You can handle this directly here or pass up through props if needed
  };

  return (
    <>
      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-4 flex items-center">
          <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
          {apiError}
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-auto text-red-700" 
            onClick={() => setApiError(null)}
          >
            Dismiss
          </Button>
        </div>
      )}

      <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="mb-6 flex flex-wrap gap-2 h-auto py-2">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white relative group"
            >
              {category}
              {categoryCounts[category] > 0 && (
                <span className="ml-2 px-1.5 py-0.5 text-xs bg-gray-100 group-data-[state=active]:bg-blue-500 group-data-[state=active]:text-white rounded-full">
                  {categoryCounts[category] || 0}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-0">
          {filteredIntegrations.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed">
              <p className="text-muted-foreground">No integrations found in this category.</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration) => (
                <IntegrationCard
                  key={integration.id}
                  integration={integration}
                  onToggleConnection={handleIntegrationConnect}
                  isConnecting={isConnecting && selectedIntegrationId === integration.id}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredIntegrations.map((integration) => (
                <IntegrationListItem
                  key={integration.id}
                  integration={integration}
                  onToggleConnection={handleIntegrationConnect}
                  isConnecting={isConnecting && selectedIntegrationId === integration.id}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Authentication Dialog */}
      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Authentication Required</DialogTitle>
            <DialogDescription>
              You need to sign in to connect with this integration.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAuthDialogOpen(false)}>
              Cancel
            </Button>
            <Link to={`/login?redirect=${encodeURIComponent('/integrations')}`}>
              <Button>Sign In</Button>
            </Link>
            <Link to={`/signup?redirect=${encodeURIComponent('/integrations')}`}>
              <Button variant="default">Sign Up</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Subscription Dialog */}
      <Dialog open={isSubscriptionDialogOpen} onOpenChange={setIsSubscriptionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Subscription Required</DialogTitle>
            <DialogDescription>
              This integration requires an active subscription. Please upgrade your plan to continue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSubscriptionDialogOpen(false)}>
              Cancel
            </Button>
            <Link to="/pricing">
              <Button>View Plans</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Loading Dialog */}
      <Dialog open={isChecking}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Checking subscription status</DialogTitle>
            <DialogDescription>
              Please wait while we verify your account permissions...
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center p-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IntegrationTabs;
