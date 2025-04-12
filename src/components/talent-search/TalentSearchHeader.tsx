
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';

interface TalentSearchHeaderProps {
  totalResults: number;
}

const TalentSearchHeader: React.FC<TalentSearchHeaderProps> = ({ totalResults }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">
        {totalResults} {totalResults === 1 ? 'Candidate' : 'Candidates'} Found
      </h2>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default TalentSearchHeader;
