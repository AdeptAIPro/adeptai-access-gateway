
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Search } from 'lucide-react';

interface LoadingStateProps {
  useAgenticIntelligence?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ useAgenticIntelligence = false }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 border-4 border-t-blue-600 border-b-blue-600 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500">
        {useAgenticIntelligence 
          ? 'AI agents are searching across multiple sources...' 
          : 'Loading talent results...'}
      </p>
    </div>
  );
};

export const EmptyState: React.FC = () => {
  return (
    <Card className="bg-gray-50 dark:bg-gray-800 border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full mb-4">
          <Search className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium mb-2">No candidates found</h3>
        <p className="text-gray-500 text-center max-w-md">
          Try adjusting your search criteria or clear some filters to see more results.
        </p>
      </CardContent>
    </Card>
  );
};
