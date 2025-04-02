
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import JobDescriptionInput from "./JobDescriptionInput";
import MatchingWorkflow from "./MatchingWorkflow";
import ResultsSection from "./ResultsSection";
import AdvancedMatchingOptions from "./AdvancedMatchingOptions";
import { getDefaultMatchingModel } from "@/services/talent-matching/models/MatchingModelsService";
import { MatchingOptions, MatchingResult } from "./types";
import { useMatchingProcess } from "@/hooks/use-matching-process";

const TalentMatchingContainer: React.FC = () => {
  const [jobDescription, setJobDescription] = useState<string>("");
  const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);
  const [selectedModelId, setSelectedModelId] = useState<string>(getDefaultMatchingModel().id);
  const [minMatchScore, setMinMatchScore] = useState<number>(70);
  const [useComplianceVerification, setUseComplianceVerification] = useState<boolean>(false);
  const [prioritizeCulturalFit, setPrioritizeCulturalFit] = useState<boolean>(false);
  const [useSemanticMatching, setUseSemanticMatching] = useState<boolean>(true);
  const [useRAG, setUseRAG] = useState<boolean>(false);
  const [useSkillBasedFiltering, setUseSkillBasedFiltering] = useState<boolean>(true);

  const { 
    matchingState, 
    startMatching, 
    cancelMatching, 
    matchingResult 
  } = useMatchingProcess();

  const handleStartMatching = () => {
    const matchingOptions: MatchingOptions = {
      model: selectedModelId,
      minMatchScore,
      useComplianceVerification,
      prioritizeCulturalFit,
      useSemanticMatching,
      useRAG,
      useSkillBasedFiltering,
      matchingModel: selectedModelId
    };
    startMatching(jobDescription, matchingOptions);
  };

  return (
    <div className="space-y-6">
      {!matchingState.isComplete ? (
        <>
          <Card>
            <CardContent className="p-6">
              <JobDescriptionInput 
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
              />
            </CardContent>
          </Card>

          {showAdvancedOptions && (
            <AdvancedMatchingOptions 
              selectedModelId={selectedModelId}
              setSelectedModelId={setSelectedModelId}
              minMatchScore={minMatchScore}
              setMinMatchScore={setMinMatchScore}
              useComplianceVerification={useComplianceVerification}
              setUseComplianceVerification={setUseComplianceVerification}
              prioritizeCulturalFit={prioritizeCulturalFit}
              setPrioritizeCulturalFit={setPrioritizeCulturalFit}
              useSemanticMatching={useSemanticMatching}
              setUseSemanticMatching={setUseSemanticMatching}
              useRAG={useRAG}
              setUseRAG={setUseRAG}
              useSkillBasedFiltering={useSkillBasedFiltering}
              setUseSkillBasedFiltering={setUseSkillBasedFiltering}
            />
          )}

          <MatchingWorkflow 
            jobDescription={jobDescription}
            isStarted={matchingState.isStarted}
            isProcessing={matchingState.isProcessing}
            isComplete={matchingState.isComplete}
            currentStep={matchingState.currentStep}
            progress={matchingState.progress}
            progressText={matchingState.progressText}
            showAdvancedOptions={showAdvancedOptions}
            setShowAdvancedOptions={setShowAdvancedOptions}
            onStartMatching={handleStartMatching}
            onCancel={cancelMatching}
            isReadyToStart={jobDescription.length > 50}
          />
        </>
      ) : (
        <ResultsSection 
          matchingResult={matchingResult as MatchingResult} 
          onStartNewMatch={() => {
            window.scrollTo(0, 0);
            cancelMatching();
          }}
        />
      )}
    </div>
  );
};

export default TalentMatchingContainer;
