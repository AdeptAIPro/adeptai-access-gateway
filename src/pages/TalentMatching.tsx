
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import { useTalentMatching } from "@/hooks/use-talent-matching";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchingSavedResults from "@/components/talent-matching/MatchingSavedResults";
import MatchingTab from "@/components/talent-matching/tabs/MatchingTab";
import AnalyticsTab from "@/components/talent-matching/tabs/AnalyticsTab";
import type { MatchingSavedResultsProps } from "@/components/talent-matching/types/saved-results.types";

const TalentMatching = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
    isLoading,
    matchingProgress,
    matchResult,
    selectedTargetSources,
    setSelectedTargetSources,
    matchingOptions,
    setMatchingOptions,
    useCrossSourceIntelligence,
    setUseCrossSourceIntelligence,
    error,
    isReadyToStart,
    handleStartMatching,
    handleStartNewMatch,
    showPremiumFeaturePrompt,
    dismissPremiumFeaturePrompt,
    premiumFeatures,
    saveCandidate,
    contactCandidate,
  } = useTalentMatching();

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLoadSavedResult = (id: string) => {
    console.log("Loading saved result:", id);
  };
  
  const handleDeleteSavedResult = (id: string) => {
    console.log("Deleting saved result:", id);
  };
  
  const handleExportSavedResult = (id: string) => {
    console.log("Exporting saved result:", id);
  };
  
  const handleToggleFavorite = (id: string) => {
    console.log("Toggling favorite for:", id);
  };
  
  const matchingSavedResultsProps: MatchingSavedResultsProps = {
    savedResults: [],
    onLoad: handleLoadSavedResult,
    onDelete: handleDeleteSavedResult,
    onExport: handleExportSavedResult,
    onToggleFavorite: handleToggleFavorite
  };

  return (
    <DashboardLayout title="AI Talent Matching">
      <Tabs defaultValue="match" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="match">Find Candidates</TabsTrigger>
          <TabsTrigger value="saved">Saved Matches</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="match">
          <MatchingTab
            showResults={showResults}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            tab={tab}
            setTab={setTab}
            fileUploaded={fileUploaded}
            setFileUploaded={setFileUploaded}
            selectedTargetSources={selectedTargetSources}
            setSelectedTargetSources={setSelectedTargetSources}
            showAdvancedOptions={showAdvancedOptions}
            setShowAdvancedOptions={setShowAdvancedOptions}
            matchingOptions={matchingOptions}
            setMatchingOptions={setMatchingOptions}
            isReadyToStart={isReadyToStart}
            isLoading={isLoading}
            matchingProgress={matchingProgress}
            handleStartMatching={handleStartMatching}
            handleStartNewMatch={handleStartNewMatch}
            matchResult={matchResult}
            saveCandidate={saveCandidate}
            contactCandidate={contactCandidate}
            showPremiumFeaturePrompt={showPremiumFeaturePrompt}
            dismissPremiumFeaturePrompt={dismissPremiumFeaturePrompt}
            premiumFeatures={premiumFeatures}
          />
        </TabsContent>

        <TabsContent value="saved">
          <MatchingSavedResults {...matchingSavedResultsProps} />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsTab />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default TalentMatching;
