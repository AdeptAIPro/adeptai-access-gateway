
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { TalentSearchParams, Talent, TalentSearchResponse, searchTalents } from '@/services/talent/TalentSearchService';
import { useToast } from '@/hooks/use-toast';

interface TalentSearchContextType {
  searchParams: TalentSearchParams;
  searchResults: Talent[];
  isLoading: boolean;
  totalResults: number;
  currentPage: number;
  totalPages: number;
  hasSearched: boolean;
  handleSearch: (params: TalentSearchParams) => Promise<void>;
  handlePageChange: (page: number) => void;
}

const TalentSearchContext = createContext<TalentSearchContextType | undefined>(undefined);

export const useTalentSearch = () => {
  const context = useContext(TalentSearchContext);
  if (context === undefined) {
    throw new Error('useTalentSearch must be used within a TalentSearchProvider');
  }
  return context;
};

interface TalentSearchProviderProps {
  children: ReactNode;
}

export const TalentSearchProvider: React.FC<TalentSearchProviderProps> = ({ children }) => {
  const { toast } = useToast();
  
  const [searchParams, setSearchParams] = useState<TalentSearchParams>({});
  const [searchResults, setSearchResults] = useState<Talent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  
  const handleSearch = async (params: TalentSearchParams) => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      // Merge with pagination params
      const searchParamsWithPage: TalentSearchParams = {
        ...params,
        page: currentPage,
        limit: 10
      };
      
      setSearchParams(searchParamsWithPage);
      
      const results: TalentSearchResponse = await searchTalents(searchParamsWithPage);
      
      setSearchResults(results.candidates);
      setTotalResults(results.total);
      setTotalPages(results.totalPages);
      
      // Show success toast
      if (results.candidates.length > 0) {
        toast({
          title: "Search Complete",
          description: `Found ${results.total} matching candidates`,
        });
      } else {
        toast({
          title: "No Results",
          description: "No candidates match your search criteria. Try adjusting your filters.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error searching talents:', error);
      toast({
        title: "Search Error",
        description: "Failed to complete talent search. Please try again.",
        variant: "destructive",
      });
      
      // Clear results on error
      setSearchResults([]);
      setTotalResults(0);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Re-run the search with the new page
    handleSearch({
      ...searchParams,
      page
    });
  };
  
  const value = {
    searchParams,
    searchResults,
    isLoading,
    totalResults,
    currentPage,
    totalPages,
    hasSearched,
    handleSearch,
    handlePageChange
  };
  
  return (
    <TalentSearchContext.Provider value={value}>
      {children}
    </TalentSearchContext.Provider>
  );
};
