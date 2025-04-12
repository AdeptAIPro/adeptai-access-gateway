
import React from 'react';
import { 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Search } from 'lucide-react';

interface SearchHeaderProps {
  useAgenticIntelligence: boolean;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ useAgenticIntelligence }) => {
  return (
    <CardHeader>
      <CardTitle className="text-2xl flex items-center">
        <Search className="mr-2 h-5 w-5" />
        {useAgenticIntelligence ? 'AI-Enhanced Talent Search' : 'Talent Search'}
      </CardTitle>
      <CardDescription>
        {useAgenticIntelligence 
          ? 'Our AI agents are searching across multiple sources for the best candidates'
          : 'Search for talent with specific skills, location, and experience level'}
      </CardDescription>
    </CardHeader>
  );
};

export default SearchHeader;
