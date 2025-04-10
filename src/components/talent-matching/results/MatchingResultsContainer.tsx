
import React from "react";
import StateHandler from "@/components/shared/StateHandler";
import ResultsSection from "../ResultsSection";
import EnhancedNotification from "@/components/shared/EnhancedNotification";
import { MatchingResult } from "../types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BarChart4, Database, Users } from "lucide-react";

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
  
  // Function to get the cross-source intelligence message
  const getCrossSourceMessage = () => {
    if (!matchResult?.crossSourceValidation) return null;
    
    const { verificationRate, sourcesSearched } = matchResult.crossSourceValidation;
    
    if (verificationRate > 0.7) {
      return (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <Database className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Cross-Source Intelligence Applied</AlertTitle>
          <AlertDescription className="text-green-700">
            {`We verified candidates across ${sourcesSearched.join(", ")} with a ${Math.round(verificationRate * 100)}% verification rate. Your results are highly reliable.`}
          </AlertDescription>
        </Alert>
      );
    } else if (verificationRate > 0.4) {
      return (
        <Alert className="mb-4 bg-blue-50 border-blue-200">
          <BarChart4 className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Cross-Source Intelligence Applied</AlertTitle>
          <AlertDescription className="text-blue-700">
            {`We verified candidates across ${sourcesSearched.join(", ")} with a ${Math.round(verificationRate * 100)}% verification rate.`}
          </AlertDescription>
        </Alert>
      );
    }
    
    return null;
  };
  
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
          <>
            {getCrossSourceMessage()}
            <ResultsSection
              matchResult={matchResult}
              onStartNewMatch={onStartNewMatch}
              saveCandidate={saveCandidate}
              contactCandidate={contactCandidate}
            />
          </>
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
