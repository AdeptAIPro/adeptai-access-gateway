
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { TalentFilter } from '../TalentSearchFilters';

interface SavedFiltersHistoryProps {
  savedFilters: TalentFilter[];
  searchHistory: TalentFilter[];
  loadFilter: (filter: TalentFilter) => void;
  deleteFilter: (filterId: string) => void;
  clearHistory: () => void;
}

const SavedFiltersHistory: React.FC<SavedFiltersHistoryProps> = ({
  savedFilters,
  searchHistory,
  loadFilter,
  deleteFilter,
  clearHistory
}) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="saved-filters">
        <AccordionTrigger>Saved Filters</AccordionTrigger>
        <AccordionContent>
          {savedFilters.length === 0 ? (
            <p className="text-sm text-muted-foreground">No saved filters yet.</p>
          ) : (
            <div className="space-y-2">
              {savedFilters.map((filter) => (
                <div key={filter.id} className="flex justify-between items-center">
                  <Button 
                    variant="ghost" 
                    className="text-left h-auto py-1 justify-start"
                    onClick={() => loadFilter(filter)}
                  >
                    {filter.name}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => deleteFilter(filter.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="search-history">
        <AccordionTrigger>Search History</AccordionTrigger>
        <AccordionContent>
          {searchHistory.length === 0 ? (
            <p className="text-sm text-muted-foreground">No search history yet.</p>
          ) : (
            <div className="space-y-2">
              {searchHistory.map((filter) => (
                <div key={filter.id} className="flex justify-between items-center">
                  <Button 
                    variant="ghost" 
                    className="text-left h-auto py-1 justify-start text-sm"
                    onClick={() => loadFilter(filter)}
                  >
                    <div className="truncate max-w-[180px]">
                      <span className="font-medium">{filter.skills?.join(', ') || 'All Skills'}</span>
                      {filter.location && <span className="text-xs text-muted-foreground ml-1">({filter.location})</span>}
                    </div>
                  </Button>
                </div>
              ))}
              <Button 
                variant="ghost"
                size="sm" 
                onClick={clearHistory} 
                className="text-destructive text-xs w-full justify-start mt-2"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1" />
                Clear History
              </Button>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SavedFiltersHistory;
