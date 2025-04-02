
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import useMatchingProcess from "@/hooks/use-matching-process"; // Fixed import
import { MatchingResult, MatchingOptions } from "./types";
import JobDescriptionInput from "./JobDescriptionInput";
import ResultsSection from "./ResultsSection";
import MatchingWorkflow from "./MatchingWorkflow";
import AdvancedMatchingOptions from "./AdvancedMatchingOptions";
import { getAvailableMatchingModels } from "@/services/talent-matching/MatchingService";
import { MatchingModel } from "./types";

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
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);

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
  };

  const {
    isLoading,
    matchingProgress,
    matchResult,
    startMatching,
  } = useMatchingProcess(
    user,
    jobDescription,
    matchingOptions,
    toast,
    useCrossSourceIntelligence
  );

  useEffect(() => {
    const loadModels = async () => {
      try {
        const models = await getAvailableMatchingModels();
        setAvailableModels(models);
        if (models.length > 0) {
          setSelectedModelId(models[0].id);
        }
      } catch (error) {
        console.error("Error loading models:", error);
        toast({
          title: "Error",
          description: "Failed to load matching models",
          variant: "destructive",
        });
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
    
    startMatching(jobDescription);
    setShowResults(true);
  };

  const handleStartNewMatch = () => {
    setJobDescription("");
    setShowResults(false);
  };

  return (
    <div className="space-y-6">
      {!showResults ? (
        <>
          <JobDescriptionInput 
            jobDescription={jobDescription} 
            setJobDescription={setJobDescription}
            tab={tab}
            setTab={setTab}
            fileUploaded={fileUploaded}
            setFileUploaded={setFileUploaded}
          />
          
          {showAdvancedOptions && (
            <AdvancedMatchingOptions
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
              }}
              matchingModels={availableModels}
              setUseCrossSourceIntelligence={setUseCrossSourceIntelligence}
              useCrossSourceIntelligence={useCrossSourceIntelligence}
            />
          )}
          
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
            isReadyToStart={jobDescription.length > 50}
          />
        </>
      ) : (
        matchResult && (
          <ResultsSection
            matchResult={matchResult}
            onStartNewMatch={handleStartNewMatch}
          />
        )
      )}
    </div>
  );
};

export default TalentMatchingContainer;
