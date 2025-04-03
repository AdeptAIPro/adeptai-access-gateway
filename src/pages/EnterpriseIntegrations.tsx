
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { categories, createIntegrationsList } from "@/utils/integrationUtils";
import IntegrationSearch from "@/components/integrations/IntegrationSearch";
import IntegrationTabs from "@/components/integrations/IntegrationTabs";
import IntegrationsGuide from "@/components/integrations/IntegrationsGuide";
import { IntegrationItem } from "@/types/integration";
import { Button } from "@/components/ui/button";
import { Sparkles, Grid, List, ArrowDownUp, ScrollText, Activity, KeyRound } from "lucide-react";
import EnterpriseIntegrationStatus from "@/components/integrations/EnterpriseIntegrationStatus";
import EnterpriseApiAuthManager from "@/components/integrations/EnterpriseApiAuthManager";
import EnterpriseIntegrationMetrics from "@/components/integrations/EnterpriseIntegrationMetrics";
import { toast } from "sonner";
import { 
  getIntegrations, 
  connectIntegration, 
  disconnectIntegration 
} from "@/services/integrations/IntegrationService";

const EnterpriseIntegrations = () => {
  const { toast: uiToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [integrationItems, setIntegrationItems] = useState<IntegrationItem[]>(createIntegrationsList());
  const [showGuide, setShowGuide] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<"a-z" | "recent">("a-z");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryCount, setCategoryCount] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<"marketplace" | "status" | "auth" | "metrics">("marketplace");
  
  // Load integrations data
  useEffect(() => {
    const loadIntegrations = async () => {
      setIsLoading(true);
      try {
        // In a real app, would fetch from API. Using mock data for now.
        const items = createIntegrationsList();
        
        // Sort integrations based on current sortOrder
        const sortedItems = sortIntegrations(items, sortOrder);
        
        setIntegrationItems(sortedItems);
        
        // Calculate counts per category
        const counts = calculateCategoryCounts(items);
        setCategoryCount(counts);
      } catch (error) {
        console.error("Error loading integrations:", error);
        toast.error("Failed to load integrations data");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadIntegrations();
  }, []);
  
  // Sort integrations when sort order changes
  useEffect(() => {
    const sortedItems = sortIntegrations(integrationItems, sortOrder);
    setIntegrationItems(sortedItems);
  }, [sortOrder]);
  
  // Calculate category counts
  const calculateCategoryCounts = (items: IntegrationItem[]): Record<string, number> => {
    const counts: Record<string, number> = { "All": items.length };
    
    items.forEach(item => {
      if (!counts[item.category]) {
        counts[item.category] = 0;
      }
      counts[item.category]++;
    });
    
    return counts;
  };
  
  // Sort integrations based on sort order
  const sortIntegrations = (items: IntegrationItem[], order: "a-z" | "recent"): IntegrationItem[] => {
    return [...items].sort((a, b) => {
      if (order === "a-z") {
        return a.name.localeCompare(b.name);
      } else {
        // For "recent", prioritize connected integrations as a simple example
        if (a.connected && !b.connected) return -1;
        if (!a.connected && b.connected) return 1;
        return a.name.localeCompare(b.name);
      }
    });
  };
  
  // Filter integrations based on search query and active category
  const filteredIntegrations = integrationItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleConnection = async (id: string) => {
    setIsConnecting(true);
    const integration = integrationItems.find(item => item.id === id);
    
    if (!integration) {
      toast.error("Integration not found");
      setIsConnecting(false);
      return;
    }
    
    try {
      // If the integration is already connected, disconnect it
      if (integration.connected) {
        // In a real app, call the API to disconnect
        const success = await disconnectIntegration(id);
        
        if (!success) {
          throw new Error("Failed to disconnect from integration");
        }
        
        // Update the local state to reflect connection status change
        setIntegrationItems(prevItems => 
          prevItems.map(item => 
            item.id === id ? { ...item, connected: false } : item
          )
        );
        
        toast.success(`Disconnected from ${integration.name}`);
      } else {
        // In a real app, call the API to connect
        const success = await connectIntegration(id, {
          // Sample connection credentials, would come from a form in real app
          api_key: "sample_key",
          api_url: "https://api.example.com"
        });
        
        if (!success) {
          throw new Error("Failed to connect to integration");
        }
        
        // Update the local state to reflect connection status change
        setIntegrationItems(prevItems => 
          prevItems.map(item => 
            item.id === id ? { ...item, connected: true } : item
          )
        );
        
        toast.success(`Connected to ${integration.name} successfully!`);
      }
    } catch (error) {
      console.error(`Error toggling connection for ${id}:`, error);
      toast.error(error instanceof Error ? error.message : "Failed to update integration status");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSortChange = () => {
    const newSortOrder = sortOrder === "a-z" ? "recent" : "a-z";
    setSortOrder(newSortOrder);
    toast.info(`Sorting integrations by ${newSortOrder === "a-z" ? "name (A-Z)" : "recently used"}`);
  };
  
  const handleRefreshData = () => {
    // In a real app, this would refresh data from backend
    toast.info("Refreshing integration data");
  };

  return (
    <DashboardLayout title="Enterprise Integrations">
      <div className="space-y-6">
        {showGuide && (
          <div className="relative">
            <IntegrationsGuide />
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 right-2"
              onClick={() => setShowGuide(false)}
            >
              Hide Guide
            </Button>
          </div>
        )}
        
        {!showGuide && (
          <div className="flex justify-end mb-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowGuide(true)}
            >
              Show Guide
            </Button>
          </div>
        )}
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-blue-500" />
                Enterprise Integration Hub
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Connect your business systems and monitor integration performance
              </p>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="marketplace" className="flex items-center">
                  <Grid className="h-4 w-4 mr-2" />
                  Marketplace
                </TabsTrigger>
                <TabsTrigger value="status" className="flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Status
                </TabsTrigger>
                <TabsTrigger value="auth" className="flex items-center">
                  <KeyRound className="h-4 w-4 mr-2" />
                  Authentication
                </TabsTrigger>
                <TabsTrigger value="metrics" className="flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Metrics
                </TabsTrigger>
              </TabsList>
              
              {activeTab === "marketplace" && (
                <div className="flex flex-wrap items-center gap-3">
                  <IntegrationSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                  
                  <div className="flex gap-2 items-center">
                    <Button 
                      variant={viewMode === "grid" ? "default" : "outline"} 
                      size="icon"
                      onClick={() => setViewMode("grid")}
                      className="h-9 w-9"
                      title="Grid View"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant={viewMode === "list" ? "default" : "outline"} 
                      size="icon"
                      onClick={() => setViewMode("list")}
                      className="h-9 w-9"
                      title="List View"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleSortChange}
                      className="h-9"
                      title={`Sort by ${sortOrder === "a-z" ? "A-Z" : "Recent"}`}
                    >
                      <ArrowDownUp className="h-4 w-4 mr-2" />
                      {sortOrder === "a-z" ? "A-Z" : "Recent"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <TabsContent value="marketplace">
              {isLoading ? (
                <div className="flex justify-center items-center p-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <IntegrationTabs
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  categories={categories}
                  filteredIntegrations={filteredIntegrations}
                  onToggleConnection={toggleConnection}
                  viewMode={viewMode}
                  isConnecting={isConnecting}
                  categoryCounts={categoryCount}
                />
              )}
            </TabsContent>
            
            <TabsContent value="status">
              <div className="space-y-6">
                <EnterpriseIntegrationStatus onRefresh={handleRefreshData} />
              </div>
            </TabsContent>
            
            <TabsContent value="auth">
              <div className="space-y-6">
                <EnterpriseApiAuthManager />
              </div>
            </TabsContent>
            
            <TabsContent value="metrics">
              <div className="space-y-6">
                <EnterpriseIntegrationMetrics />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EnterpriseIntegrations;
