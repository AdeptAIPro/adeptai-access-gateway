
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IntegrationItem } from "@/types/integration";
import IntegrationCard from "./IntegrationCard";

interface IntegrationTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: string[];
  filteredIntegrations: IntegrationItem[];
  onToggleConnection: (id: string) => void;
}

const IntegrationTabs: React.FC<IntegrationTabsProps> = ({
  activeCategory,
  setActiveCategory,
  categories,
  filteredIntegrations,
  onToggleConnection
}) => {
  return (
    <Tabs defaultValue="All" value={activeCategory} onValueChange={setActiveCategory}>
      <TabsList className="bg-background/80 backdrop-blur-sm mb-4 overflow-auto flex flex-nowrap max-w-full">
        {categories.map(category => (
          <TabsTrigger key={category} value={category} className="whitespace-nowrap">
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value={activeCategory} className="mt-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredIntegrations.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onToggleConnection={onToggleConnection}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default IntegrationTabs;
