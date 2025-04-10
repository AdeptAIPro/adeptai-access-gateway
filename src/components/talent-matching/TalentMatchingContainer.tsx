
import { useState } from "react";
import StateHandler from "@/components/shared/StateHandler";
import TaskErrorDisplay from "@/components/agentic-ai/dashboard/TaskErrorDisplay";
import MatchingInputForm from "./input/MatchingInputForm";
import MatchingResultsContainer from "./results/MatchingResultsContainer";
import { useTalentMatching } from "@/hooks/use-talent-matching";

const TalentMatchingContainer: React.FC = () => {
  const {
    jobDescription,
    setJobDescription,
    showResults,
    showAdvancedOptions,
    setShowAdvancedOptions,
    tab,
    setTab,
    fileUploaded,
    setFileUploaded,
    error,
    isLoading,
    matchingProgress,
    matchResult,
    selectedTargetSources,
    setSelectedTargetSources,
    matchingOptions,
    setMatchingOptions,
    useCrossSourceIntelligence,
    setUseCrossSourceIntelligence,
    isReadyToStart,
    
    handleStartMatching,
    handleStartNewMatch,
    saveCandidate,
    contactCandidate
  } = useTalentMatching();

  const [isLoadingModels, setIsLoadingModels] = useState(false);

  const handleRetry = () => {
    // Reload would be handled by the AdvancedMatchingSection component
    setIsLoadingModels(false);
  };

  return (
    <div className="space-y-6">
      {error && (
        <TaskErrorDisplay 
          error={error} 
          showToast={false}
          title="Failed to load matching models"
        />
      )}
      
      {!showResults ? (
        <StateHandler
          isLoading={isLoadingModels}
          isError={!!error}
          onRetry={handleRetry}
          loadingText="Loading AI matching models..."
        >
          <MatchingInputForm
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            tab={tab}
            setTab={setTab}
            fileUploaded={fileUploaded}
            setFileUploaded={setFileUploaded}
            showAdvancedOptions={showAdvancedOptions}
            setShowAdvancedOptions={setShowAdvancedOptions}
            matchingOptions={matchingOptions}
            setMatchingOptions={setMatchingOptions}
            selectedTargetSources={selectedTargetSources}
            setSelectedTargetSources={setSelectedTargetSources}
            useCrossSourceIntelligence={useCrossSourceIntelligence}
            setUseCrossSourceIntelligence={setUseCrossSourceIntelligence}
            isLoading={isLoading}
            matchingProgress={matchingProgress}
            onStartMatching={handleStartMatching}
            isReadyToStart={isReadyToStart}
          />
        </StateHandler>
      ) : (
        <MatchingResultsContainer
          isLoading={isLoading}
          matchResult={matchResult}
          onStartNewMatch={handleStartNewMatch}
          saveCandidate={saveCandidate}
          contactCandidate={contactCandidate}
        />
      )}
    </div>
  );
};

export default TalentMatchingContainer;
