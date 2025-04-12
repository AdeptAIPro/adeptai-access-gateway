
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

interface SearchActionsProps {
  onSearch: () => void;
  onClear: () => void;
  isLoading: boolean;
}

const SearchActions: React.FC<SearchActionsProps> = ({ 
  onSearch, 
  onClear, 
  isLoading 
}) => {
  return (
    <div className="col-span-1 md:col-span-3 flex justify-end gap-2 mt-4">
      <Button variant="outline" onClick={onClear} disabled={isLoading}>
        Clear All
      </Button>
      <Button onClick={onSearch} disabled={isLoading}>
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Searching...
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Search Talent
          </>
        )}
      </Button>
    </div>
  );
};

export default SearchActions;
