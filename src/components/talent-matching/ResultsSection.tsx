
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import MatchingProgress from "./MatchingProgress";
import CandidateResults from "./CandidateResults";
import { MatchingResult, Candidate } from "./types";

interface ResultsSectionProps {
  isLoading: boolean;
  matchingProgress: number;
  matchResult: MatchingResult | null;
  matchingCandidates: Candidate[];
  filteredCandidates: Candidate[];
  saveCandidate: (id: string) => void;
  contactCandidate: (id: string) => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  isLoading,
  matchingProgress,
  matchResult,
  matchingCandidates,
  filteredCandidates,
  saveCandidate,
  contactCandidate
}) => {
  return (
    <>
      {isLoading && (
        <MatchingProgress progress={matchingProgress} />
      )}
      
      {matchResult && !isLoading && (
        <Alert variant="default" className="bg-muted">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Matching Results</AlertTitle>
          <AlertDescription>
            Found {matchingCandidates.length} candidates in {matchResult.matchingTime.toFixed(1)} seconds using {matchResult.matchingModelUsed.split('-').join(' ')} model
          </AlertDescription>
        </Alert>
      )}

      {matchingCandidates.length > 0 && !isLoading && (
        <CandidateResults 
          filteredCandidates={filteredCandidates}
          matchingCandidates={matchingCandidates}
          saveCandidate={saveCandidate}
          contactCandidate={contactCandidate}
        />
      )}
    </>
  );
};

export default ResultsSection;
