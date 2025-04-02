
import { supabase } from "@/lib/supabase";

export const getTalentSources = async (): Promise<string[]> => {
  try {
    // Try to fetch sources from Supabase
    const { data, error } = await supabase
      .from('talent_sources')
      .select('name');
    
    if (error) {
      console.error('Error fetching talent sources:', error);
      return getDefaultSources();
    }
    
    // If we have data, extract the source names
    if (data && data.length > 0) {
      return data.map(source => source.name);
    }
    
    // Fallback to default sources if no data
    return getDefaultSources();
  } catch (error) {
    console.error('Exception in getTalentSources:', error);
    return getDefaultSources();
  }
};

// Default sources to use if Supabase is not available or returns no data
const getDefaultSources = (): string[] => {
  return [
    'LinkedIn',
    'Indeed',
    'Glassdoor',
    'Monster',
    'ZipRecruiter',
    'Ceipal',
    'JobDiva',
    'Internal Database'
  ];
};
