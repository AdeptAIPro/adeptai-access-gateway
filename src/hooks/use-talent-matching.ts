
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import useMatchingProcess from "@/hooks/use-matching-process";
import { MatchingOptions } from "@/components/talent-matching/types";

export const useTalentMatching = () => {
  console.log("Initializing useTalentMatching hook");
  const { user } = useAuth();
  const { toast } = useToast();
  const [jobDescription, setJobDescription] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
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
  const [selectedTargetSources, setSelectedTargetSources] = useState<string[]>([]);

  // Add default target source if none selected
  useEffect(() => {
    if (selectedTargetSources.length === 0) {
      setSelectedTargetSources(["Internal Database"]);
    }
  }, [selectedTargetSources]);

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

  // Set matching options handler
  const setMatchingOptions = (options: MatchingOptions) => {
    setMinMatchScore(options.minMatchScore);
    setUseComplianceVerification(options.useComplianceVerification);
    setPrioritizeCulturalFit(options.prioritizeCulturalFit);
    setUseSemanticMatching(options.useSemanticMatching || false);
    setUseRAG(options.useRAG || false);
    setUseSkillBasedFiltering(options.useSkillBasedFiltering || true);
    if (options.matchingModel) {
      setSelectedModelId(options.matchingModel);
    }
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

  console.log("Current matching state:", { 
    isLoading, 
    matchingProgress, 
    showResults, 
    matchResult,
    isReadyToStart,
    selectedTargetSources
  });

  const handleStartMatching = () => {
    console.log("Starting matching process...");
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

  return {
    // State
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
    setError,
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
    
    // Actions
    handleStartMatching,
    handleStartNewMatch,
    saveCandidate,
    contactCandidate
  };
};
