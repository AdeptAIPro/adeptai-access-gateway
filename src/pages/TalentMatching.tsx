
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
import { matchCandidatesWithJobDescription, getAvailableMatchingModels } from "@/services/talent-matching/MatchingService";
import { MatchingOptions, MatchingResult, Candidate } from "@/components/talent-matching/types";
import { extractTextFromImage } from "@/services/talent-matching/ImageProcessingService";
import { supabase } from "@/lib/supabase";

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
  
  // Use useEffect to handle navigation instead of returning the navigate function
  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Check Supabase connection on component mount
  useEffect(() => {
    const checkSupabaseConnection = async () => {
      try {
        // Simple ping to check connection
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

  // If user is not authenticated, render nothing while the navigation effect runs
  if (!user) {
    return null; // This returns a valid React node (null) instead of void
  }

  const handleSourceSelect = (source: string) => {
    setSelectedSource(source);
  };

  const parseJobDescription = async () => {
    const isImageTab = tab === "image";
    const isDocumentTab = tab === "upload";
    const isPasteTab = tab === "paste";
    
    // Validation based on the current tab
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
      // For image tab, extract text from image first
      let descriptionToUse = jobDescription;
      
      if (isImageTab && fileUploaded) {
        try {
          descriptionToUse = await extractTextFromImage(fileUploaded);
          if (!descriptionToUse) {
            clearInterval(interval);
            setIsLoading(false);
            toast({
              title: "Extraction Failed",
              description: "Could not extract text from the image. Please try a clearer image or use the paste option.",
              variant: "destructive",
            });
            return;
          }
          // Update the job description field with the extracted text
          setJobDescription(descriptionToUse);
        } catch (extractionError) {
          clearInterval(interval);
          setIsLoading(false);
          toast({
            title: "Extraction Error",
            description: "An error occurred while extracting text from the image.",
            variant: "destructive",
          });
          return;
        }
      }
      
      // Call the AI-driven matching service
      const result = await matchCandidatesWithJobDescription(descriptionToUse, matchingOptions);
      
      clearInterval(interval);
      setMatchingProgress(100);
      setMatchResult(result);
      setMatchingCandidates(result.candidates);
      setIsLoading(false);
      
      toast({
        title: "Matching Complete",
        description: `Found ${result.candidates.length} matching candidates using ${result.matchingModelUsed.split('-').join(' ')} model`,
      });
      
      // Save job description to recent searches in Supabase
      if (descriptionToUse) {
        saveRecentSearch(descriptionToUse);
      }
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

  // Save recent search to Supabase
  const saveRecentSearch = async (searchText: string) => {
    if (!user) return;
    
    try {
      await supabase
        .from('recent_searches')
        .insert([
          { 
            user_id: user.id, 
            search_text: searchText.substring(0, 500), // Limit to 500 chars
            search_type: 'job_description' 
          }
        ]);
    } catch (err) {
      console.error('Failed to save recent search:', err);
      // Non-critical error, so we don't show a toast
    }
  };

  const saveCandidate = async (id: string) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('saved_candidates')
        .insert([
          { 
            user_id: user.id, 
            candidate_id: id,
            saved_date: new Date().toISOString()
          }
        ]);
      
      if (error) throw error;
      
      toast({
        title: "Candidate Saved",
        description: "Candidate has been saved to your favorites",
      });
    } catch (err) {
      console.error('Failed to save candidate:', err);
      toast({
        title: "Error",
        description: "Failed to save candidate",
        variant: "destructive",
      });
    }
  };

  const contactCandidate = async (id: string) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('candidate_contacts')
        .insert([
          { 
            user_id: user.id, 
            candidate_id: id,
            contact_date: new Date().toISOString(),
            status: 'pending'
          }
        ]);
      
      if (error) throw error;
      
      toast({
        title: "Contact Request Sent",
        description: "We've sent a connection request to the candidate",
      });
    } catch (err) {
      console.error('Failed to contact candidate:', err);
      toast({
        title: "Error",
        description: "Failed to send contact request",
        variant: "destructive",
      });
    }
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

export default TalentMatching;
