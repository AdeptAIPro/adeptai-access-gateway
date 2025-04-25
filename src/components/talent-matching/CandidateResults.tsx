
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import CandidateCard from "./CandidateCard";
import { Candidate, MatchingResult } from "./types";

interface CandidateResultsProps {
  candidates?: Candidate[];
  isLoading?: boolean;
  matchingProgress?: number;
  matchResult?: MatchingResult | null;
  handleStartNewMatch?: () => void;
  saveCandidate?: (id: string) => void;
  contactCandidate?: (id: string) => void;
}

const CandidateResults: React.FC<CandidateResultsProps> = ({
  candidates,
  isLoading = false,
  matchingProgress = 0,
  matchResult,
  handleStartNewMatch,
  saveCandidate = () => {},
  contactCandidate = () => {}
}) => {
  // Use candidates from props if provided, otherwise try to get them from matchResult
  const candidatesToShow = candidates || (matchResult?.candidates || []);

  if (!candidatesToShow || candidatesToShow.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Matching Candidates</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            Showing {candidatesToShow.length} results
          </span>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {candidatesToShow.map((candidate) => (
          <CandidateCard 
            key={candidate.id}
            candidate={candidate} 
            saveCandidate={saveCandidate}
            contactCandidate={contactCandidate}
          />
        ))}
      </div>
    </div>
  );
};

export default CandidateResults;
