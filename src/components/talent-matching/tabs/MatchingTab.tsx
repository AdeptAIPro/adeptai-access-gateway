
import { CandidateResults, JobDescriptionInput, TargetSourceSelection, MatchingWorkflow, AdvancedMatchingOptions, TalentMatchingHero } from "@/components/talent-matching";
import MatchingSidebar from "../sidebar/MatchingSidebar";

interface MatchingTabProps {
  showResults: boolean;
  jobDescription: string;
  setJobDescription: (value: string) => void;
  tab: string;
  setTab: (value: string) => void;
  fileUploaded: File | null;
  setFileUploaded: React.Dispatch<React.SetStateAction<File | null>>;
  selectedTargetSources: string[];
  setSelectedTargetSources: (sources: string[]) => void;
  showAdvancedOptions: boolean;
  setShowAdvancedOptions: (show: boolean) => void;
  matchingOptions: any;
  setMatchingOptions: (options: any) => void;
  isReadyToStart: boolean;
  isLoading: boolean;
  matchingProgress: number;
  handleStartMatching: () => void;
  handleStartNewMatch: () => void;
  matchResult: any;
  saveCandidate: (id: string) => void;
  contactCandidate: (id: string) => void;
  showPremiumFeaturePrompt: boolean;
  dismissPremiumFeaturePrompt: () => void;
  premiumFeatures: any;
}

const MatchingTab = ({
  showResults,
  jobDescription,
  setJobDescription,
  tab,
  setTab,
  fileUploaded,
  setFileUploaded,
  selectedTargetSources,
  setSelectedTargetSources,
  showAdvancedOptions,
  setShowAdvancedOptions,
  matchingOptions,
  setMatchingOptions,
  isReadyToStart,
  isLoading,
  matchingProgress,
  handleStartMatching,
  handleStartNewMatch,
  matchResult,
  saveCandidate,
  contactCandidate,
  showPremiumFeaturePrompt,
  dismissPremiumFeaturePrompt,
  premiumFeatures
}: MatchingTabProps) => {
  return (
    <>
      {!showResults && (
        <>
          <TalentMatchingHero />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
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
                onShowBulkUpload={() => {}}
                bulkUploaded={false}
              />
              
              <MatchingWorkflow
                isReadyToStart={isReadyToStart}
                showAdvancedOptions={showAdvancedOptions}
                setShowAdvancedOptions={setShowAdvancedOptions}
                onStartMatching={handleStartMatching}
                isProcessing={isLoading}
                progress={matchingProgress}
              />

              {showAdvancedOptions && (
                <div className="mt-4">
                  <AdvancedMatchingOptions
                    matchingOptions={matchingOptions}
                    setMatchingOptions={setMatchingOptions}
                    isPremiumFeatures={premiumFeatures}
                  />
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <MatchingSidebar 
                showPremiumFeaturePrompt={showPremiumFeaturePrompt}
                dismissPremiumFeaturePrompt={dismissPremiumFeaturePrompt}
              />
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
    </>
  );
};

export default MatchingTab;
