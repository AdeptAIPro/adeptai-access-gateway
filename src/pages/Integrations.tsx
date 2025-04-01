
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";
import { categories, createIntegrationsList } from "@/utils/integrationUtils";
import IntegrationSearch from "@/components/integrations/IntegrationSearch";
import IntegrationTabs from "@/components/integrations/IntegrationTabs";
import { IntegrationItem } from "@/types/integration";

const Integrations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [integrationItems] = useState<IntegrationItem[]>(createIntegrationsList());
  
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
        <IntegrationSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <IntegrationTabs
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
          filteredIntegrations={filteredIntegrations}
          onToggleConnection={toggleConnection}
        />
      </div>
    </DashboardLayout>
  );
};

export default Integrations;
