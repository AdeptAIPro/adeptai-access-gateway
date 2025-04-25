
import React from "react";
import LoadingResults from "./LoadingResults";
import ErrorResults from "./ErrorResults";
import SuccessNotification from "./SuccessNotification";
import ResultsSection from "../ResultsSection";
import { MatchingResult } from "../types";

interface MatchingResultsContainerProps {
  isLoading: boolean;
  matchResult: MatchingResult | null;
  onStartNewMatch: () => void;
  saveCandidate: (id: string) => void;
  contactCandidate: (id: string) => void;
}

const MatchingResultsContainer: React.FC<MatchingResultsContainerProps> = ({
  isLoading,
  matchResult,
  onStartNewMatch,
  saveCandidate,
  contactCandidate
}) => {
  // Add console logs to help debug
  console.log("Rendering MatchingResultsContainer", { isLoading, matchResult });
  
  if (isLoading) {
    return <LoadingResults />;
  }

  if (!matchResult && !isLoading) {
    return (
      <ErrorResults 
        error="Failed to process matching request"
        onRetry={onStartNewMatch}
      />
    );
  }

  if (!matchResult) {
    return null;
  }

  return (
    <>
      <ResultsSection
        matchResult={matchResult}
        onStartNewMatch={onStartNewMatch}
        saveCandidate={saveCandidate}
        contactCandidate={contactCandidate}
      />
      <SuccessNotification candidatesCount={matchResult.candidates.length} />
    </>
  );
};

export default MatchingResultsContainer;
