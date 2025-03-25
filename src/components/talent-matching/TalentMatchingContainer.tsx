
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import JobDescriptionInput from "@/components/talent-matching/JobDescriptionInput";
import MatchingControls from "@/components/talent-matching/MatchingControls";
import MatchingProgress from "@/components/talent-matching/MatchingProgress";
import CandidateResults from "@/components/talent-matching/CandidateResults";
import AdvancedMatchingOptions from "@/components/talent-matching/AdvancedMatchingOptions";
import { matchCandidatesWithJobDescription } from "@/services/talent-matching/MatchingService";
import { MatchingOptions, MatchingResult, Candidate } from "@/components/talent-matching/types";
import { extractTextFromImage } from "@/services/talent-matching/ImageProcessingService";
import { supabase } from "@/lib/supabase";
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
    const checkSupabaseConnection = async () => {
      try {
        const { data, error } = await supabase.from('health_check').select('*').limit(1);
        
        if (error) {
          console.warn('Supabase connection check failed:', error);
          toast({
            title: "Database Connection Warning",
            description: "Could not connect to the database. Some features may use fallback data.",
            variant: "destructive",
          });
        } else {
          console.log('Supabase connection successful');
        }
      } catch (err) {
        console.error('Error checking Supabase connection:', err);
      }
    };
    
    checkSupabaseConnection();
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
        descriptionToUse = await extractTextFromImage(fileUploaded);
        if (!descriptionToUse) {
          toast({
            title: "Extraction Failed",
            description: "Could not extract text from the image. Please try a clearer image or use the paste option.",
            variant: "destructive",
          });
          return;
        }
        setJobDescription(descriptionToUse);
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
    <DashboardLayout title="Talent Matchmaking - AI">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Description Matching</CardTitle>
            <CardDescription>
              Upload, paste, or extract from images a job description to find matching candidates using advanced AI models
            </CardDescription>
          </CardHeader>
          <CardContent>
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
            
            {showAdvancedOptions && (
              <div className="w-full mt-4">
                <AdvancedMatchingOptions 
                  matchingOptions={matchingOptions}
                  setMatchingOptions={setMatchingOptions}
                />
              </div>
            )}
          </CardFooter>
        </Card>

        {isLoading && (
          <MatchingProgress progress={matchingProgress} />
        )}
        
        {matchResult && !isLoading && (
          <Alert variant="default" className="bg-muted">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Matching Results</AlertTitle>
            <AlertDescription>
              Found {matchingCandidates.length} candidates in {matchResult.matchingTime.toFixed(1)} seconds using {matchResult.matchingModelUsed.split('-').join(' ')} model
            </AlertDescription>
          </Alert>
        )}

        {matchingCandidates.length > 0 && !isLoading && (
          <CandidateResults 
            filteredCandidates={filteredCandidates}
            matchingCandidates={matchingCandidates}
            saveCandidate={saveCandidate}
            contactCandidate={contactCandidate}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default TalentMatchingContainer;
