import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import useMatchingProcess from "@/hooks/use-matching-process";
import { MatchingOptions } from "@/components/talent-matching/types";

export const useTalentMatching = () => {
  console.log("Initializing useTalentMatching hook");
  const { user } = useAuth();
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
  const [showPremiumFeaturePrompt, setShowPremiumFeaturePrompt] = useState(false);
  const [userPlan, setUserPlan] = useState<"free" | "basic" | "pro" | "enterprise">("free");
  
  // Check user plan on load
  useEffect(() => {
    if (user) {
      // In a real implementation, this would check the user's subscription status
      // For now, we'll default to "free" for demonstration
      setUserPlan("free");
    }
  }, [user]);

  // Add default target source if none selected
  useEffect(() => {
    if (selectedTargetSources.length === 0) {
      setSelectedTargetSources(["Internal Database"]);
    }
  }, [selectedTargetSources]);

  // Determine if the Start AI Matchmaking button should be enabled
  const isReadyToStart = jobDescription.length > 50 && selectedTargetSources.length > 0;

  // Determine which features should be marked as premium based on user plan
  const premiumFeatures = {
    crossSourceIntelligence: userPlan === "free" || userPlan === "basic",
    advancedFiltering: userPlan === "free",
    semanticMatching: userPlan === "free" || userPlan === "basic",
    complianceVerification: userPlan === "free" || userPlan === "basic",
    culturalFitAnalysis: userPlan === "free" || userPlan === "basic",
    bulkUpload: userPlan === "free" || userPlan === "basic",
    unlimitedSources: userPlan === "free" || userPlan === "basic",
    advancedInsights: userPlan === "free" || userPlan === "basic"
  };

  // Construct matching options object
  const matchingOptions: MatchingOptions = {
    matchingModel: selectedModelId,
    weightSkills: 0.5,
    weightExperience: 0.3,
    weightEducation: 0.2,
    threshold: 60,
    includePartialMatches: true,
    minMatchScore,
    useComplianceVerification,
    prioritizeCulturalFit,
    useSemanticMatching,
    useRAG,
    useSkillBasedFiltering,
    targetSources: selectedTargetSources,
    model: "basic", // Default model
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
    
    // Check if trying to use a premium feature
    if ((useCrossSourceIntelligence && premiumFeatures.crossSourceIntelligence) || 
        (useSemanticMatching && premiumFeatures.semanticMatching) ||
        (selectedTargetSources.length > 3 && premiumFeatures.unlimitedSources)) {
      setShowPremiumFeaturePrompt(true);
      return;
    }
    
    if (!jobDescription) {
      toast("Missing Job Description", {
        description: "Please enter a job description to start matching"
      });
      return;
    }
    
    if (selectedTargetSources.length === 0) {
      toast("No Target Sources Selected", {
        description: "Please select at least one candidate source"
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

  const dismissPremiumFeaturePrompt = () => {
    setShowPremiumFeaturePrompt(false);
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
    showPremiumFeaturePrompt,
    setShowPremiumFeaturePrompt,
    dismissPremiumFeaturePrompt,
    premiumFeatures,
    userPlan,
    
    // Actions
    handleStartMatching,
    handleStartNewMatch,
    saveCandidate,
    contactCandidate
  };
};
