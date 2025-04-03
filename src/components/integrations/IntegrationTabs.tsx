
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

interface IntegrationTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: string[];
  filteredIntegrations: IntegrationItem[];
  onToggleConnection: (id: string) => void;
  viewMode: "grid" | "list";
}

const IntegrationTabs: React.FC<IntegrationTabsProps> = ({
  activeCategory,
  setActiveCategory,
  categories,
  filteredIntegrations,
  onToggleConnection,
  viewMode,
}) => {
  const { user } = useAuth();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = React.useState(false);
  const [isSubscriptionDialogOpen, setIsSubscriptionDialogOpen] = React.useState(false);
  const [selectedIntegrationId, setSelectedIntegrationId] = React.useState<string | null>(null);
  const [isChecking, setIsChecking] = React.useState(false);

  const handleIntegrationConnect = async (id: string) => {
    // If user is not authenticated, show auth dialog
    if (!user) {
      setSelectedIntegrationId(id);
      setIsAuthDialogOpen(true);
      return;
    }

    // If user is authenticated, check subscription
    setIsChecking(true);
    try {
      const subscriptionResult = await checkSubscription();
      setIsChecking(false);
      
      if ('error' in subscriptionResult) {
        toast.error("Failed to check subscription status");
        return;
      }

      // Skip subscription check for free integrations (you might want to define which ones are free)
      const integration = filteredIntegrations.find(item => item.id === id);
      const isFreeIntegration = integration?.category === "Free Job Posting";

      if (subscriptionResult.subscribed || isFreeIntegration) {
        // User has an active subscription or is connecting a free integration
        onToggleConnection(id);
      } else {
        // User doesn't have an active subscription
        setSelectedIntegrationId(id);
        setIsSubscriptionDialogOpen(true);
      }
    } catch (error) {
      setIsChecking(false);
      console.error("Error checking subscription:", error);
      toast.error("Failed to check subscription status");
    }
  };

  return (
    <>
      <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              {category}
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
    </>
  );
};

export default IntegrationTabs;
