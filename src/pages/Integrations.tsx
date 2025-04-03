
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";
import { categories, createIntegrationsList } from "@/utils/integrationUtils";
import IntegrationSearch from "@/components/integrations/IntegrationSearch";
import IntegrationTabs from "@/components/integrations/IntegrationTabs";
import IntegrationsGuide from "@/components/integrations/IntegrationsGuide";
import { IntegrationItem } from "@/types/integration";
import { Button } from "@/components/ui/button";
import { Sparkles, Filter, Layout, ArrowDownUp } from "lucide-react";

const Integrations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [integrationItems] = useState<IntegrationItem[]>(createIntegrationsList());
  const [showGuide, setShowGuide] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<"a-z" | "recent">("a-z");
  
  if (!user) {
    navigate("/login");
    return null;
  }

  const filteredIntegrations = integrationItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleConnection = (id: string) => {
    toast({
      title: "Integration Status Changed",
      description: "Your integration settings have been updated.",
      variant: "default",
    });
    console.log(`Toggling connection for ${id}`);
  };

  return (
    <DashboardLayout title="Integrations">
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
                Integration Marketplace
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Connect your existing tools and services to enhance your workflow
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <IntegrationSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              
              <div className="flex gap-2 items-center">
                <Button 
                  variant={viewMode === "grid" ? "default" : "outline"} 
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="h-9 w-9"
                >
                  <Layout className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "outline"} 
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="h-9 w-9"
                >
                  <Filter className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === "a-z" ? "recent" : "a-z")}
                  className="h-9"
                >
                  <ArrowDownUp className="h-4 w-4 mr-2" />
                  {sortOrder === "a-z" ? "A-Z" : "Recent"}
                </Button>
              </div>
            </div>
          </div>
          
          <IntegrationTabs
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
            filteredIntegrations={filteredIntegrations}
            onToggleConnection={toggleConnection}
            viewMode={viewMode}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Integrations;
