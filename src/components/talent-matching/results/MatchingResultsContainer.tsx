
import React from "react";
import StateHandler from "@/components/shared/StateHandler";
import ResultsSection from "../ResultsSection";
import EnhancedNotification from "@/components/shared/EnhancedNotification";
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
  
  return (
    <>
      <StateHandler
        isLoading={isLoading}
        isError={!matchResult && !isLoading}
        error="Failed to process matching request"
        onRetry={() => onStartNewMatch()}
        loadingText="Processing AI talent matching..."
      >
        {matchResult && (
          <ResultsSection
            matchResult={matchResult}
            onStartNewMatch={onStartNewMatch}
            saveCandidate={saveCandidate}
            contactCandidate={contactCandidate}
          />
        )}
      </StateHandler>
      
      {/* Show notification for successful match */}
      {matchResult && !isLoading && (
        <EnhancedNotification
          variant="success"
          title="AI Matching Complete"
          description={`Found ${matchResult.candidates.length} matching candidates based on your job description.`}
          actionLabel="View Results"
          autoDismiss={true}
          onDismiss={() => {}}
        />
      )}
    </>
  );
};

export default MatchingResultsContainer;
