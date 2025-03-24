
import React, { useState } from "react";
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

const TalentMatching = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState("paste");
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSource, setSelectedSource] = useState("all");
  const [matchingProgress, setMatchingProgress] = useState(0);
  const [matchingCandidates, setMatchingCandidates] = useState<Candidate[]>([]);
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchingResult | null>(null);
  const [matchingOptions, setMatchingOptions] = useState<MatchingOptions>({
    useSemanticMatching: true,
    useSkillBasedFiltering: true,
    useComplianceVerification: false,
    useRAG: false,
    matchingModel: "openai-ada-002",
    minMatchScore: 75
  });
  
  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSourceSelect = (source: string) => {
    setSelectedSource(source);
  };

  const parseJobDescription = async () => {
    if ((!jobDescription && tab === "paste") || (!fileUploaded && tab === "upload")) {
      toast({
        title: "No Job Description",
        description: tab === "paste" ? "Please enter a job description" : "Please upload a job description file",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setMatchingProgress(0);
    
    // Simulate the initial matching progress
    const interval = setInterval(() => {
      setMatchingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90; // We'll set to 100 when the actual results are ready
        }
        return prev + 5;
      });
    }, 200);

    try {
      // Call the AI-driven matching service
      const result = await matchCandidatesWithJobDescription(jobDescription, matchingOptions);
      
      clearInterval(interval);
      setMatchingProgress(100);
      setMatchResult(result);
      setMatchingCandidates(result.candidates);
      setIsLoading(false);
      
      toast({
        title: "Matching Complete",
        description: `Found ${result.candidates.length} matching candidates using ${result.matchingModelUsed.split('-').join(' ')} model`,
      });
    } catch (error) {
      clearInterval(interval);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to match candidates",
        variant: "destructive",
      });
    }
  };

  const saveCandidate = (id: string) => {
    toast({
      title: "Candidate Saved",
      description: "Candidate has been saved to your favorites",
    });
  };

  const contactCandidate = (id: string) => {
    toast({
      title: "Contact Request Sent",
      description: "We've sent a connection request to the candidate",
    });
  };

  const toggleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
  };

  const filteredCandidates = selectedSource === "all" 
    ? matchingCandidates 
    : matchingCandidates.filter(candidate => candidate.source.toLowerCase() === selectedSource.toLowerCase());

  return (
    <DashboardLayout title="AI Talent Matching">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Description Matching</CardTitle>
            <CardDescription>
              Upload, paste, or fetch a job description to find matching candidates using advanced AI models
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

export default TalentMatching;
