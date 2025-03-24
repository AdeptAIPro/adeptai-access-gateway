
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import CandidateCard from "./CandidateCard";

interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  education: string;
  experience: number;
  skills: string[];
  matchScore: number;
  source: string;
  avatar: string;
}

interface CandidateResultsProps {
  filteredCandidates: Candidate[];
  matchingCandidates: Candidate[];
  saveCandidate: (id: string) => void;
  contactCandidate: (id: string) => void;
}

const CandidateResults: React.FC<CandidateResultsProps> = ({
  filteredCandidates,
  matchingCandidates,
  saveCandidate,
  contactCandidate,
}) => {
  if (filteredCandidates.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Matching Candidates</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            Showing {filteredCandidates.length} of {matchingCandidates.length} results
          </span>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {filteredCandidates.map((candidate) => (
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
