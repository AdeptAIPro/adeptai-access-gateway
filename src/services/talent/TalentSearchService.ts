
import { TalentSearchParams, TalentSearchResponse, Talent } from './types';
import { searchTalentsFromSupabase } from './SupabaseTalentService';
import { searchTalentsFromExternalSource } from './ExternalTalentService';
import { getTalentSources } from './TalentSourcesService';

// Combine results from multiple sources
export const searchTalents = async (
  params: TalentSearchParams
): Promise<TalentSearchResponse> => {
  try {
    // First, get results from Supabase
    const supabaseResults = await searchTalentsFromSupabase(params);
    
    // If a specific external source is requested, fetch from there too
    let externalResults: Talent[] = [];
    if (params.source && params.source !== 'internal') {
      externalResults = await searchTalentsFromExternalSource(params.source, params);
      
      // If we have external results, combine them with Supabase results
      // Note: In a real application, you'd need to handle pagination differently
      // when combining results from multiple sources
      return {
        ...supabaseResults,
        candidates: [...supabaseResults.candidates, ...externalResults],
        total: supabaseResults.total + externalResults.length,
        totalPages: Math.ceil((supabaseResults.total + externalResults.length) / (params.limit || 10))
      };
    }
    
    return supabaseResults;
  } catch (error) {
    console.error('Error in searchTalents:', error);
    return {
      candidates: [],
      total: 0,
      page: params.page || 1,
      totalPages: 0
    };
  }
};

// Re-export types and functions for simpler imports
export type { TalentSearchParams, TalentSearchResponse, Talent };
export { getTalentSources };
