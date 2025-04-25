
import { TalentMatchingHero } from "@/components/talent-matching";
import MatchingSidebar from "../sidebar/MatchingSidebar";
import MatchingInputForm from "../input/MatchingInputForm";
import MatchingResultsContainer from "../results/MatchingResultsContainer";

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
  useCrossSourceIntelligence: boolean;
  setUseCrossSourceIntelligence: (value: boolean) => void;
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
  premiumFeatures,
  useCrossSourceIntelligence,
  setUseCrossSourceIntelligence
}: MatchingTabProps) => {
  return (
    <>
      {!showResults && (
        <>
          <TalentMatchingHero />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
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
        <MatchingResultsContainer
          isLoading={isLoading}
          matchResult={matchResult}
          onStartNewMatch={handleStartNewMatch}
          saveCandidate={saveCandidate}
          contactCandidate={contactCandidate}
        />
      )}
    </>
  );
};

export default MatchingTab;
