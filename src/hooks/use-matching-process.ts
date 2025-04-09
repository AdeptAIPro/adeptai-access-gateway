
import { useState } from "react";
import { matchCandidatesWithJobDescription } from "@/services/talent-matching/MatchingService";
import { MatchingOptions, MatchingResult, Candidate } from "@/components/talent-matching/types";
import { searchTalentsWithAgenticIntelligence } from "@/services/talent/TalentSearchService";
import { 
  extractSkillsFromJobDescription, 
  generateDummyInsights, 
  saveRecentSearch 
} from "./talent-matching/matching-utils";
import { saveCandidate as saveCandidateAction, contactCandidate as contactCandidateAction } from "./talent-matching/candidate-actions";

type ToastFunction = {
  (props: {
    title: string;
    description: string;
    variant?: "default" | "destructive" | undefined;
  }): void;
};

const useMatchingProcess = (
  user: any,
  jobDescription: string,
  matchingOptions: MatchingOptions,
  toast: ToastFunction,
  useCrossSourceIntelligence: boolean = false
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [matchingProgress, setMatchingProgress] = useState(0);
  const [matchResult, setMatchResult] = useState<MatchingResult | null>(null);
  const [matchingCandidates, setMatchingCandidates] = useState<Candidate[]>([]);

  const startMatching = async (descriptionToUse: string) => {
    setIsLoading(true);
    setMatchingProgress(0);
    
    const interval = setInterval(() => {
      setMatchingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + (useCrossSourceIntelligence ? 3 : 5); // Slower progress for cross-source
      });
    }, 200);

    try {
      let result: any;
      
      if (useCrossSourceIntelligence) {
        // Extract skills from job description
        const extractedSkills = extractSkillsFromJobDescription(descriptionToUse);
        
        // Use the agentic intelligence service with target sources
        result = await searchTalentsWithAgenticIntelligence(
          {
            skills: extractedSkills,
            limit: 20,
            sources: matchingOptions.targetSources || [], 
          },
          descriptionToUse,
          extractedSkills.slice(0, 5), // Required skills (first 5)
          extractedSkills.slice(5) // Preferred skills (rest)
        );
        
        // Format the result to match the expected structure
        result = {
          ...result,
          jobTitle: extractedSkills.length > 0 ? `Role requiring ${extractedSkills[0]}` : "Job Role",
          extractedSkills,
          suggestedExperience: 3,
          matchingModelUsed: "cross-source-intelligence",
          totalCandidatesScanned: result.crossSourceValidation?.candidatesFound || 0,
          matchTime: 4.5,
          // Add insights property for the matching results
          insights: generateDummyInsights(matchingOptions.targetSources || [])
        };
      } else {
        // Use the standard matching service with target sources
        result = await matchCandidatesWithJobDescription(descriptionToUse, matchingOptions);
      }
      
      clearInterval(interval);
      setMatchingProgress(100);
      setMatchResult(result);
      setMatchingCandidates(result.candidates);
      setIsLoading(false);
      
      toast({
        title: "Matching Complete",
        description: `Found ${result.candidates.length} matching candidates from ${matchingOptions.targetSources?.length || 0} sources`,
      });
      
      if (descriptionToUse) {
        // Only save the search if we have valid Supabase credentials
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (supabaseUrl && supabaseAnonKey &&
            supabaseUrl !== 'https://placeholder-supabase-url.supabase.co' && 
            supabaseAnonKey !== 'placeholder-anon-key') {
          saveRecentSearch(user, descriptionToUse);
        }
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

  // Wrapper functions for candidate actions
  const saveCandidate = async (id: string) => {
    await saveCandidateAction(id, user, toast);
  };

  const contactCandidate = async (id: string) => {
    await contactCandidateAction(id, user, toast);
  };

  return {
    isLoading,
    matchingProgress,
    matchResult,
    matchingCandidates,
    startMatching,
    saveCandidate,
    contactCandidate
  };
};

export default useMatchingProcess;
