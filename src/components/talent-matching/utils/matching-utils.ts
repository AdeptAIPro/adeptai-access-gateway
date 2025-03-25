
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

/**
 * Checks the Supabase connection and displays a toast if there are issues
 */
export const checkSupabaseConnection = async (toast: ReturnType<typeof useToast>["toast"]) => {
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
