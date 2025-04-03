
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface IntegrationSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const IntegrationSearch: React.FC<IntegrationSearchProps> = ({ 
  searchQuery, 
  setSearchQuery 
}) => {
  return (
    <div className="relative w-full max-w-xs">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
      />
      <Input 
        placeholder="Search integrations..." 
        className="pl-10 bg-background border-gray-200 dark:border-gray-700 focus-visible:ring-blue-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default IntegrationSearch;
