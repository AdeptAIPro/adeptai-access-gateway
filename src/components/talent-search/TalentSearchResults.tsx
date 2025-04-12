
import React from 'react';
import { useTalentSearch } from '@/context/TalentSearchContext';
import TalentCard from './TalentCard';
import TalentSearchPagination from './TalentSearchPagination';
import TalentSearchHeader from './TalentSearchHeader';
import { LoadingState, EmptyState } from './TalentSearchStates';

interface TalentSearchResultsProps {
  useAgenticIntelligence?: boolean;
}

const TalentSearchResults: React.FC<TalentSearchResultsProps> = ({ useAgenticIntelligence = false }) => {
  const { 
    searchResults, 
    totalResults, 
    currentPage, 
    totalPages, 
    handlePageChange, 
    isLoading,
    hasSearched
  } = useTalentSearch();

  if (!hasSearched) {
    return null;
  }

  if (isLoading) {
    return <LoadingState useAgenticIntelligence={useAgenticIntelligence} />;
  }

  if (searchResults.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <TalentSearchHeader totalResults={totalResults} />

      <div className="grid grid-cols-1 gap-4">
        {searchResults.map((talent) => (
          <TalentCard key={talent.id} talent={talent} />
        ))}
      </div>

      <TalentSearchPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default TalentSearchResults;
