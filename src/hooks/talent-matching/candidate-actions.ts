
import { supabase } from "@/lib/supabase";

type ToastFunction = {
  (props: {
    title: string;
    description: string;
    variant?: "default" | "destructive" | undefined;
  }): void;
};

/**
 * Save a candidate to favorites
 */
export const saveCandidate = async (id: string, user: any, toast: ToastFunction) => {
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

/**
 * Contact a candidate
 */
export const contactCandidate = async (id: string, user: any, toast: ToastFunction) => {
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
