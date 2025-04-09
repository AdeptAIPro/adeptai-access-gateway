
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import useMatchingProcess from "@/hooks/use-matching-process"; 
import { MatchingResult, MatchingOptions } from "./types";
import JobDescriptionInput from "./JobDescriptionInput";
import ResultsSection from "./ResultsSection";
import MatchingWorkflow from "./MatchingWorkflow";
import AdvancedOptionsToggle from "./AdvancedOptionsToggle";
import TargetSourceSelection from "./TargetSourceSelection";
import { getAvailableMatchingModels } from "@/services/talent-matching/MatchingService";
import { MatchingModel } from "./types";
import StateHandler from "@/components/shared/StateHandler";
import TaskErrorDisplay from "@/components/agentic-ai/dashboard/TaskErrorDisplay";
import EnhancedNotification from "@/components/shared/EnhancedNotification";

const TalentMatchingContainer: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [jobDescription, setJobDescription] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [availableModels, setAvailableModels] = useState<MatchingModel[]>([]);
  const [selectedModelId, setSelectedModelId] = useState("");
  const [minMatchScore, setMinMatchScore] = useState(75);
  const [useComplianceVerification, setUseComplianceVerification] = useState(false);
  const [prioritizeCulturalFit, setPrioritizeCulturalFit] = useState(false);
  const [useSemanticMatching, setUseSemanticMatching] = useState(false);
  const [useRAG, setUseRAG] = useState(false);
  const [useSkillBasedFiltering, setUseSkillBasedFiltering] = useState(true);
  const [useCrossSourceIntelligence, setUseCrossSourceIntelligence] = useState(false);
  const [tab, setTab] = useState<string>("paste");
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingModels, setIsLoadingModels] = useState(true);
  const [selectedTargetSources, setSelectedTargetSources] = useState<string[]>([]);

  // Determine if the Start AI Matchmaking button should be enabled
  const isReadyToStart = jobDescription.length > 50 && selectedTargetSources.length > 0;

  // Construct matching options object
  const matchingOptions: MatchingOptions = {
    model: "basic", // Default model
    minMatchScore,
    useComplianceVerification,
    prioritizeCulturalFit,
    useSemanticMatching,
    useRAG,
    useSkillBasedFiltering,
    matchingModel: selectedModelId,
    targetSources: selectedTargetSources,
  };

  const {
    isLoading,
    matchingProgress,
    matchResult,
    startMatching,
    saveCandidate,
    contactCandidate
  } = useMatchingProcess(
    user,
    jobDescription,
    matchingOptions,
    toast,
    useCrossSourceIntelligence
  );

  useEffect(() => {
    const loadModels = async () => {
      setIsLoadingModels(true);
      setError(null);
      
      try {
        const models = await getAvailableMatchingModels();
        setAvailableModels(models);
        if (models.length > 0) {
          setSelectedModelId(models[0].id);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load matching models";
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoadingModels(false);
      }
    };

    loadModels();
  }, [toast]);

  const handleStartMatching = () => {
    if (!jobDescription) {
      toast({
        title: "Missing Job Description",
        description: "Please enter a job description to start matching",
      });
      return;
    }
    
    if (selectedTargetSources.length === 0) {
      toast({
        title: "No Target Sources Selected",
        description: "Please select at least one candidate source",
      });
      return;
    }
    
    setError(null);
    startMatching(jobDescription);
    setShowResults(true);
  };

  const handleStartNewMatch = () => {
    setJobDescription("");
    setShowResults(false);
  };

  const handleRetry = () => {
    setError(null);
    setIsLoadingModels(true);
    
    getAvailableMatchingModels()
      .then(models => {
        setAvailableModels(models);
        if (models.length > 0) {
          setSelectedModelId(models[0].id);
        }
      })
      .catch(err => {
        const errorMessage = err instanceof Error ? err.message : "Failed to load matching models";
        setError(errorMessage);
      })
      .finally(() => {
        setIsLoadingModels(false);
      });
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
          <>
            <JobDescriptionInput 
              jobDescription={jobDescription} 
              setJobDescription={setJobDescription}
              tab={tab}
              setTab={setTab}
              fileUploaded={fileUploaded}
              setFileUploaded={setFileUploaded}
            />
            
            <TargetSourceSelection
              selectedSources={selectedTargetSources}
              setSelectedSources={setSelectedTargetSources}
            />
            
            <AdvancedOptionsToggle
              showAdvancedOptions={showAdvancedOptions}
              matchingOptions={matchingOptions}
              setMatchingOptions={(options: MatchingOptions) => {
                setMinMatchScore(options.minMatchScore);
                setUseComplianceVerification(options.useComplianceVerification);
                setPrioritizeCulturalFit(options.prioritizeCulturalFit);
                setUseSemanticMatching(options.useSemanticMatching || false);
                setUseRAG(options.useRAG || false);
                setUseSkillBasedFiltering(options.useSkillBasedFiltering || true);
                if (options.matchingModel) {
                  setSelectedModelId(options.matchingModel);
                }
                // Don't override target sources from advanced options
              }}
              matchingModels={availableModels}
              useCrossSourceIntelligence={useCrossSourceIntelligence}
              setUseCrossSourceIntelligence={setUseCrossSourceIntelligence}
            />
            
            <MatchingWorkflow
              isStarted={false}
              isProcessing={isLoading}
              isComplete={matchResult !== null}
              currentStep={matchResult !== null ? 3 : isLoading ? 2 : 1}
              progress={matchingProgress}
              progressText={`${matchingProgress}% - Analyzing candidates`}
              showAdvancedOptions={showAdvancedOptions}
              setShowAdvancedOptions={setShowAdvancedOptions}
              onStartMatching={handleStartMatching}
              onCancel={() => {}}
              isReadyToStart={isReadyToStart}
            />
          </>
        </StateHandler>
      ) : (
        <StateHandler
          isLoading={isLoading}
          isError={!matchResult && !isLoading}
          error="Failed to process matching request"
          onRetry={() => {
            setShowResults(false);
          }}
          loadingText="Processing AI talent matching..."
        >
          {matchResult && (
            <ResultsSection
              matchResult={matchResult}
              onStartNewMatch={handleStartNewMatch}
              saveCandidate={saveCandidate}
              contactCandidate={contactCandidate}
            />
          )}
        </StateHandler>
      )}
      
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
    </div>
  );
};

export default TalentMatchingContainer;
