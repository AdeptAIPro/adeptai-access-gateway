
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import JobDescriptionInput from "@/components/talent-matching/JobDescriptionInput";
import MatchingControls from "@/components/talent-matching/MatchingControls";
import AdvancedOptionsToggle from "@/components/talent-matching/AdvancedOptionsToggle";
import ResultsSection from "@/components/talent-matching/ResultsSection";
import MatchingWorkflow from "@/components/talent-matching/MatchingWorkflow";
import { MatchingOptions } from "@/components/talent-matching/types";
import { checkSupabaseConnection } from "@/components/talent-matching/utils/matching-utils";
import { extractTextFromImage } from "@/services/talent-matching/ImageProcessingService";
import useMatchingProcess from "@/hooks/use-matching-process";

const TalentMatchingContainer: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState("paste");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [matchingOptions, setMatchingOptions] = useState<MatchingOptions>({
    useSemanticMatching: true,
    useSkillBasedFiltering: true,
    useComplianceVerification: false,
    useRAG: false,
    matchingModel: "openai-ada-002",
    minMatchScore: 75
  });
  
  const {
    isLoading,
    matchingProgress,
    matchResult,
    matchingCandidates,
    startMatching,
    saveCandidate,
    contactCandidate
  } = useMatchingProcess(user, jobDescription, matchingOptions, toast);
  
  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    // Check database connection once on component mount
    checkSupabaseConnection(toast);
  }, [toast]);

  if (!user) {
    return null;
  }

  const handleSourceSelect = (source: string) => {
    setSelectedSource(source);
  };

  const parseJobDescription = async () => {
    const isImageTab = tab === "image";
    const isDocumentTab = tab === "upload";
    const isPasteTab = tab === "paste";
    
    if ((isPasteTab && !jobDescription) || 
        (isDocumentTab && !fileUploaded) || 
        (isImageTab && !fileUploaded)) {
      
      let errorMessage = "Please ";
      if (isPasteTab) errorMessage += "enter a job description";
      else if (isDocumentTab) errorMessage += "upload a document";
      else if (isImageTab) errorMessage += "upload an image";
      
      toast({
        title: "Missing Input",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }
    
    let descriptionToUse = jobDescription;
    
    if (isImageTab && fileUploaded) {
      try {
        const extractedText = await extractTextFromImage(fileUploaded);
        if (!extractedText) {
          toast({
            title: "Extraction Failed",
            description: "Could not extract text from the image. Please try a clearer image or use the paste option.",
            variant: "destructive",
          });
          return;
        }
        setJobDescription(extractedText);
        descriptionToUse = extractedText;
      } catch (extractionError) {
        toast({
          title: "Extraction Error",
          description: "An error occurred while extracting text from the image.",
          variant: "destructive",
        });
        return;
      }
    }
    
    startMatching(descriptionToUse);
  };

  const toggleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
  };

  const filteredCandidates = selectedSource === "all" 
    ? matchingCandidates 
    : matchingCandidates.filter(candidate => candidate.source.toLowerCase() === selectedSource.toLowerCase());

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Job Description Matching</CardTitle>
          <CardDescription>
            Upload, paste, or extract from images a job description to find matching candidates using advanced AI models
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <MatchingWorkflow />
          
          <JobDescriptionInput 
            tab={tab}
            setTab={setTab}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            fileUploaded={fileUploaded}
            setFileUploaded={setFileUploaded}
          />
        </CardContent>
        
        <CardFooter className="flex-col space-y-4">
          <MatchingControls 
            handleSourceSelect={handleSourceSelect}
            parseJobDescription={parseJobDescription}
            isLoading={isLoading}
            toggleAdvancedOptions={toggleAdvancedOptions}
            showAdvancedOptions={showAdvancedOptions}
          />
          
          <AdvancedOptionsToggle 
            showAdvancedOptions={showAdvancedOptions}
            matchingOptions={matchingOptions}
            setMatchingOptions={setMatchingOptions}
          />
        </CardFooter>
      </Card>

      <ResultsSection 
        isLoading={isLoading}
        matchingProgress={matchingProgress}
        matchResult={matchResult}
        matchingCandidates={matchingCandidates}
        filteredCandidates={filteredCandidates}
        saveCandidate={saveCandidate}
        contactCandidate={contactCandidate}
      />
    </div>
  );
};

export default TalentMatchingContainer;
