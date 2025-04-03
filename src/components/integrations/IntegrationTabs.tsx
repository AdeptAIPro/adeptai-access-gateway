
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IntegrationItem } from "@/types/integration";
import IntegrationCard from "./IntegrationCard";
import IntegrationListItem from "./IntegrationListItem";

interface IntegrationTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: string[];
  filteredIntegrations: IntegrationItem[];
  onToggleConnection: (id: string) => void;
  viewMode?: "grid" | "list";
}

const IntegrationTabs: React.FC<IntegrationTabsProps> = ({
  activeCategory,
  setActiveCategory,
  categories,
  filteredIntegrations,
  onToggleConnection,
  viewMode = "grid"
}) => {
  return (
    <Tabs defaultValue="All" value={activeCategory} onValueChange={setActiveCategory}>
      <TabsList className="bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm mb-6 overflow-auto flex flex-nowrap max-w-full p-1 rounded-lg">
        {categories.map(category => (
          <TabsTrigger 
            key={category} 
            value={category} 
            className="whitespace-nowrap px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
          >
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value={activeCategory} className="mt-0">
        {filteredIntegrations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">No integrations found</h3>
            <p className="text-gray-500 max-w-md">
              Try adjusting your search or category filters to find what you're looking for.
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredIntegrations.map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onToggleConnection={onToggleConnection}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredIntegrations.map((integration) => (
              <IntegrationListItem
                key={integration.id}
                integration={integration}
                onToggleConnection={onToggleConnection}
              />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default IntegrationTabs;
