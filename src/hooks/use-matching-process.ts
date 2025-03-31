
import { useState } from "react";
import { matchCandidatesWithJobDescription } from "@/services/talent-matching/MatchingService";
import { MatchingOptions, MatchingResult, Candidate } from "@/components/talent-matching/types";
import { supabase } from "@/lib/supabase";

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
  toast: ToastFunction
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
        return prev + 5;
      });
    }, 200);

    try {
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
