
import React from "react";
import LoadingResults from "./LoadingResults";
import ErrorResults from "./ErrorResults";
import SuccessNotification from "./SuccessNotification";
import ResultsSection from "../ResultsSection";
import { MatchingResult } from "../types";
import { AppError } from "@/utils/error-handler";

interface MatchingResultsContainerProps {
  isLoading: boolean;
  matchResult: MatchingResult | null;
  error?: Error | AppError | string | null;
  onStartNewMatch: () => void;
  saveCandidate: (id: string) => void;
  contactCandidate: (id: string) => void;
}

const MatchingResultsContainer: React.FC<MatchingResultsContainerProps> = ({
  isLoading,
  matchResult,
  error,
  onStartNewMatch,
  saveCandidate,
  contactCandidate
}) => {
  // Add console logs to help debug
  console.log("Rendering MatchingResultsContainer", { isLoading, matchResult, error });
  
  if (isLoading) {
    return <LoadingResults />;
  }

  if (error) {
    return (
      <ErrorResults 
        error={error}
        onRetry={onStartNewMatch}
      />
    );
  }

  if (!matchResult && !isLoading) {
    return (
      <ErrorResults 
        error="No matching results found. Please try again with different criteria."
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
