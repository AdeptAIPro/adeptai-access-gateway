
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import CandidateCard from "./CandidateCard";
import { Candidate } from "./types";

interface CandidateResultsProps {
  candidates: Candidate[];
  saveCandidate?: (id: string) => void;
  contactCandidate?: (id: string) => void;
}

const CandidateResults: React.FC<CandidateResultsProps> = ({
  candidates,
  saveCandidate = () => {},
  contactCandidate = () => {}
}) => {
  if (!candidates || candidates.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Matching Candidates</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            Showing {candidates.length} results
          </span>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {candidates.map((candidate) => (
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
