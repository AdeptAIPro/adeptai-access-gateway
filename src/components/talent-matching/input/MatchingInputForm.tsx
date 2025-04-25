
import React, { useState } from "react";
import { JobDescriptionInput, TargetSourceSelection, AdvancedMatchingOptions, MatchingWorkflow } from "@/components/talent-matching";
import BulkUploadModal from "../bulk-upload/BulkUploadModal";
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
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [bulkUploaded, setBulkUploaded] = useState(false);

  const handleShowBulkUpload = () => {
    setShowBulkUpload(true);
  };

  const handleBulkUploadComplete = () => {
    setBulkUploaded(true);
    // Add Uploaded Resumes to selected sources if not already selected
    if (!selectedTargetSources.includes("Uploaded Resumes")) {
      setSelectedTargetSources([...selectedTargetSources, "Uploaded Resumes"]);
    }
  };

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
        onShowBulkUpload={handleShowBulkUpload}
        bulkUploaded={bulkUploaded}
      />
      
      <AdvancedMatchingOptions
        matchingOptions={matchingOptions}
        setMatchingOptions={setMatchingOptions}
        useCrossSourceIntelligence={useCrossSourceIntelligence}
        setUseCrossSourceIntelligence={setUseCrossSourceIntelligence}
      />
      
      <MatchingWorkflow
        isProcessing={isLoading}
        progress={matchingProgress}
        showAdvancedOptions={showAdvancedOptions}
        setShowAdvancedOptions={setShowAdvancedOptions}
        onStartMatching={onStartMatching}
        isReadyToStart={isReadyToStart}
        handleStartMatching={onStartMatching}
      />

      <BulkUploadModal 
        isOpen={showBulkUpload}
        onClose={() => setShowBulkUpload(false)}
        onUploadComplete={handleBulkUploadComplete}
      />
    </>
  );
};

export default MatchingInputForm;
