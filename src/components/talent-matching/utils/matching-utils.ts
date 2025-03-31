
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

/**
 * Checks the Supabase connection and displays a toast if there are issues
 * Only shows a warning if we're using real credentials (not placeholder values)
 */
export const checkSupabaseConnection = async (toast: ReturnType<typeof useToast>["toast"]) => {
  try {
    // Check if we're using placeholder credentials
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    // If using placeholder credentials, don't attempt connection
    if (!supabaseUrl || !supabaseAnonKey || 
        supabaseUrl === 'https://placeholder-supabase-url.supabase.co' || 
        supabaseAnonKey === 'placeholder-anon-key') {
      console.log('Using placeholder Supabase credentials - skipping connection check');
      return;
    }
    
    // Only attempt connection if we have real credentials
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
