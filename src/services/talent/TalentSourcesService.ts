
import { supabase } from "@/lib/supabase";

// Get available talent sources (could be fetched from Supabase in a real app)
export const getTalentSources = async (): Promise<string[]> => {
  try {
    // This would typically come from your database of integrated sources
    const { data, error } = await supabase
      .from('talent_sources')
      .select('name');
    
    if (error) {
      throw error;
    }
    
    return data?.map(source => source.name) || getDefaultSources();
  } catch (error) {
    console.error('Error fetching talent sources:', error);
    return getDefaultSources();
  }
};

export const getDefaultSources = (): string[] => {
  return [
    'Internal Database',
    'LinkedIn',
    'Indeed',
    'Dice',
    'ZipRecruiter',
    'Monster',
    'CareerBuilder'
  ];
};
