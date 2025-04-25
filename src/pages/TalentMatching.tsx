
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import JobDescriptionInput from "@/components/talent-matching/JobDescriptionInput";
import CandidateResults from "@/components/talent-matching/CandidateResults";
import AdvancedMatchingOptions from "@/components/talent-matching/AdvancedMatchingOptions";
import TargetSourceSelection from "@/components/talent-matching/TargetSourceSelection";
import MatchingWorkflow from "@/components/talent-matching/MatchingWorkflow";
import MatchingSavedResults from "@/components/talent-matching/MatchingSavedResults";
import { useTalentMatching } from "@/hooks/use-talent-matching";
import TalentMatchingHero from "@/components/talent-matching/TalentMatchingHero";
import TalentMatchingCallToAction from "@/components/talent-matching/TalentMatchingCallToAction";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { MatchingSavedResultsProps } from "@/components/talent-matching/MatchingSavedResults";

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

  // Mock handler functions for MatchingSavedResults
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
  
  // Props for MatchingSavedResults
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

        <TabsContent value="match" className="space-y-8">
          {!showResults && (
            <>
              <TalentMatchingHero />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <JobDescriptionInput
                    jobDescription={jobDescription}
                    setJobDescription={setJobDescription}
                    tab={tab}
                    setTab={setTab}
                    fileUploaded={fileUploaded}
                    setFileUploaded={setFileUploaded}
                  />

                  {/* Add Target Source Selection - Candidate Sources */}
                  <TargetSourceSelection
                    selectedSources={selectedTargetSources}
                    setSelectedSources={setSelectedTargetSources}
                    onShowBulkUpload={() => {}}
                    bulkUploaded={false}
                  />
                  
                  {/* Add Matching Workflow - AI Matchmaking */}
                  <MatchingWorkflow
                    isReadyToStart={isReadyToStart}
                    showAdvancedOptions={showAdvancedOptions}
                    setShowAdvancedOptions={setShowAdvancedOptions}
                    onStartMatching={handleStartMatching}
                    isProcessing={isLoading}
                    progress={matchingProgress}
                  />

                  {showAdvancedOptions && (
                    <div className="mt-6">
                      <AdvancedMatchingOptions
                        matchingOptions={matchingOptions}
                        setMatchingOptions={setMatchingOptions}
                        isPremiumFeatures={premiumFeatures}
                      />
                    </div>
                  )}
                </div>

                <div className="lg:col-span-1">
                  {showPremiumFeaturePrompt ? (
                    <TalentMatchingCallToAction onDismiss={dismissPremiumFeaturePrompt} />
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-slate-50 border rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Recent Talent Searches</h3>
                        <div className="space-y-3">
                          <div className="bg-white p-3 rounded border">
                            <div className="text-sm font-medium">Senior Software Engineer</div>
                            <div className="text-xs text-gray-500 mt-1">43 candidates • 3 days ago</div>
                          </div>
                          <div className="bg-white p-3 rounded border">
                            <div className="text-sm font-medium">Product Manager</div>
                            <div className="text-xs text-gray-500 mt-1">28 candidates • 5 days ago</div>
                          </div>
                          <div className="bg-white p-3 rounded border">
                            <div className="text-sm font-medium">DevOps Engineer</div>
                            <div className="text-xs text-gray-500 mt-1">16 candidates • 1 week ago</div>
                          </div>
                        </div>
                      </div>

                      <Separator />
                      
                      <div className="bg-blue-50 border-blue-100 border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-3">AI Matching Tips</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            Use detailed job descriptions for better matches
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            Include both required and preferred skills
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            Specify years of experience for more accurate results
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            Try different candidate sources for wider reach
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {showResults && (
            <CandidateResults
              isLoading={isLoading}
              matchingProgress={matchingProgress}
              matchResult={matchResult}
              handleStartNewMatch={handleStartNewMatch}
              saveCandidate={saveCandidate}
              contactCandidate={contactCandidate}
            />
          )}
        </TabsContent>

        <TabsContent value="saved">
          <MatchingSavedResults 
            {...matchingSavedResultsProps}
          />
        </TabsContent>

        <TabsContent value="analytics">
          <div className="flex items-center justify-center bg-gray-50 border rounded-lg p-12">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-gray-500 mb-6">Get insights into your talent matching activities</p>
              <TalentMatchingCallToAction />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default TalentMatching;
