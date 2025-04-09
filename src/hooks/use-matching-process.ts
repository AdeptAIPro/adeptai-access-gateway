import { useState } from "react";
import { matchCandidatesWithJobDescription } from "@/services/talent-matching/MatchingService";
import { MatchingOptions, MatchingResult, Candidate } from "@/components/talent-matching/types";
import { supabase } from "@/lib/supabase";
import { searchTalentsWithAgenticIntelligence } from "@/services/talent/TalentSearchService";

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
        // Extract skills from job description (simplified version)
        const extractedSkills = extractSkillsFromJobDescription(descriptionToUse);
        
        // Use the agentic intelligence service with target sources
        result = await searchTalentsWithAgenticIntelligence(
          {
            skills: extractedSkills,
            limit: 20,
            sources: matchingOptions.targetSources || [], // Use selected target sources
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
          matchTime: 4.5
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

  // Simple function to extract skills from job description
  const extractSkillsFromJobDescription = (text: string): string[] => {
    const commonSkills = [
      "JavaScript", "TypeScript", "React", "Angular", "Vue", "Node.js",
      "Python", "Java", "C#", "Ruby", "PHP", "Go", "Rust", "Swift",
      "SQL", "MongoDB", "PostgreSQL", "MySQL", "AWS", "Azure", "GCP",
      "Docker", "Kubernetes", "CI/CD", "DevOps", "Machine Learning",
      "Data Science", "AI", "Project Management", "Agile", "Scrum"
    ];
    
    // Return skills that are mentioned in the text
    return commonSkills.filter(skill => 
      text.toLowerCase().includes(skill.toLowerCase())
    ).slice(0, 10); // Limit to 10 skills
  };

  const saveRecentSearch = async (user: any, searchText: string) => {
    if (!user) return;
    
    try {
      await supabase
        .from('recent_searches')
        .insert([
          { 
            user_id: user.id, 
            search_text: searchText.substring(0, 500),
            search_type: 'job_description' 
          }
        ]);
    } catch (err) {
      console.error('Failed to save recent search:', err);
    }
  };

  const saveCandidate = async (id: string) => {
    if (!user) return;
    
    try {
      // Check for placeholder credentials
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey ||
          supabaseUrl === 'https://placeholder-supabase-url.supabase.co' || 
          supabaseAnonKey === 'placeholder-anon-key') {
        // Simulate success for demo purposes
        toast({
          title: "Candidate Saved",
          description: "Candidate has been saved to your favorites (demo mode)",
        });
        return;
      }
      
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
      // Check for placeholder credentials
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey ||
          supabaseUrl === 'https://placeholder-supabase-url.supabase.co' || 
          supabaseAnonKey === 'placeholder-anon-key') {
        // Simulate success for demo purposes
        toast({
          title: "Contact Request Sent",
          description: "We've sent a connection request to the candidate (demo mode)",
        });
        return;
      }
      
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
