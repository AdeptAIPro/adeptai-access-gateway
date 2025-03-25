
import { supabase } from "@/lib/supabase";

export interface TalentSearchParams {
  skills?: string[];
  location?: string;
  experience?: number;
  source?: string;
  page?: number;
  limit?: number;
}

export interface Talent {
  id: string;
  name: string;
  title: string;
  location: string;
  skills: string[];
  experience: number;
  education: string;
  source: string;
  avatar?: string;
  email?: string;
  phone?: string;
  availability?: string;
  rate?: string;
  bio?: string;
}

export interface TalentSearchResponse {
  candidates: Talent[];
  total: number;
  page: number;
  totalPages: number;
}

// Function to fetch talent data from Supabase
export const searchTalentsFromSupabase = async (
  params: TalentSearchParams
): Promise<TalentSearchResponse> => {
  const {
    skills,
    location,
    experience,
    source,
    page = 1,
    limit = 10
  } = params;
  
  try {
    let query = supabase.from('candidates').select('*', { count: 'exact' });
    
    // Add filters
    if (skills && skills.length > 0) {
      // In Supabase, we would use contains operator for array columns
      // This assumes skills is stored as an array in Supabase
      query = query.containsAny('skills', skills);
    }
    
    if (location) {
      query = query.ilike('location', `%${location}%`);
    }
    
    if (experience) {
      query = query.gte('experience', experience);
    }
    
    if (source) {
      query = query.eq('source', source);
    }
    
    // Add pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    query = query.range(from, to);
    
    const { data, error, count } = await query;
    
    if (error) {
      console.error('Error fetching talents from Supabase:', error);
      throw error;
    }
    
    // Map the data to our Talent interface
    const candidates: Talent[] = data?.map((item: any) => ({
      id: item.id,
      name: item.name,
      title: item.title || 'Unknown Position',
      location: item.location || 'Remote',
      skills: item.skills || [],
      experience: item.experience || 0,
      education: item.education || 'Not specified',
      source: item.source || 'Internal Database',
      avatar: item.avatar_url,
      email: item.email,
      phone: item.phone,
      availability: item.availability,
      rate: item.rate,
      bio: item.bio
    })) || [];
    
    return {
      candidates,
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit)
    };
  } catch (error) {
    console.error('Error in searchTalentsFromSupabase:', error);
    // Return empty results as fallback
    return {
      candidates: [],
      total: 0,
      page,
      totalPages: 0
    };
  }
};

// Function to fetch talent data from external job boards via API
export const searchTalentsFromExternalSource = async (
  source: string,
  params: TalentSearchParams
): Promise<Talent[]> => {
  // In a real application, this would call different API endpoints based on the source
  // For now, we'll just return an empty array as this would be implemented based on
  // the actual third-party APIs integrated with the system
  console.log(`Searching talents from ${source} with params:`, params);
  
  // This would be replaced with actual API calls
  return [];
};

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

const getDefaultSources = (): string[] => {
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
