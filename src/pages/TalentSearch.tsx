
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import TalentSearchBar from '@/components/talent-search/TalentSearchBar';
import TalentSearchResults from '@/components/talent-search/TalentSearchResults';
import { searchTalents, TalentSearchParams, Talent, TalentSearchResponse } from '@/services/talent/TalentSearchService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const TalentSearch = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchParams, setSearchParams] = useState<TalentSearchParams>({});
  const [searchResults, setSearchResults] = useState<Talent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
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
  
  return (
    <DashboardLayout title="Talent Search">
      <div className="space-y-6">
        <Alert variant="default" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Connect your job boards</AlertTitle>
          <AlertDescription>
            To search across multiple talent sources, connect your job boards in the Integrations section.
          </AlertDescription>
        </Alert>
        
        <TalentSearchBar
          onSearch={handleSearch}
          isLoading={isLoading}
        />
        
        {hasSearched && (
          <TalentSearchResults
            results={searchResults}
            totalResults={totalResults}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default TalentSearch;
