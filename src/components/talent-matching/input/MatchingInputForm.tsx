
import React from "react";
import JobDescriptionInput from "../JobDescriptionInput";
import TargetSourceSelection from "../TargetSourceSelection";
import AdvancedMatchingSection from "../advanced-options/AdvancedMatchingSection";
import MatchingWorkflow from "../MatchingWorkflow";
import { MatchingOptions } from "../types";

interface MatchingInputFormProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  tab: string;
  setTab: (tab: string) => void;
  fileUploaded: File | null;
  setFileUploaded: React.Dispatch<React.SetStateAction<File | null>>;
  showAdvancedOptions: boolean;
  setShowAdvancedOptions: (show: boolean) => void;
  matchingOptions: MatchingOptions;
  setMatchingOptions: (options: MatchingOptions) => void;
  selectedTargetSources: string[];
  setSelectedTargetSources: (sources: string[]) => void;
  useCrossSourceIntelligence: boolean;
  setUseCrossSourceIntelligence: (value: boolean) => void;
  isLoading: boolean;
  matchingProgress: number;
  onStartMatching: () => void;
  isReadyToStart: boolean;
}

const MatchingInputForm: React.FC<MatchingInputFormProps> = ({
  jobDescription,
  setJobDescription,
  tab,
  setTab,
  fileUploaded,
  setFileUploaded,
  showAdvancedOptions,
  setShowAdvancedOptions,
  matchingOptions,
  setMatchingOptions,
  selectedTargetSources,
  setSelectedTargetSources,
  useCrossSourceIntelligence,
  setUseCrossSourceIntelligence,
  isLoading,
  matchingProgress,
  onStartMatching,
  isReadyToStart
}) => {
  return (
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
      
      <AdvancedMatchingSection
        showAdvancedOptions={showAdvancedOptions}
        setShowAdvancedOptions={setShowAdvancedOptions}
        matchingOptions={matchingOptions}
        setMatchingOptions={setMatchingOptions}
        useCrossSourceIntelligence={useCrossSourceIntelligence}
        setUseCrossSourceIntelligence={setUseCrossSourceIntelligence}
      />
      
      <MatchingWorkflow
        isStarted={false}
        isProcessing={isLoading}
        isComplete={false}
        currentStep={isLoading ? 2 : 1}
        progress={matchingProgress}
        progressText={`${matchingProgress}% - Analyzing candidates`}
        showAdvancedOptions={showAdvancedOptions}
        setShowAdvancedOptions={setShowAdvancedOptions}
        onStartMatching={onStartMatching}
        onCancel={() => {}}
        isReadyToStart={isReadyToStart}
      />
    </>
  );
};

export default MatchingInputForm;
