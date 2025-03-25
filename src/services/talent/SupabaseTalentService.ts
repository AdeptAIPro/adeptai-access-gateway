
import { supabase } from "@/lib/supabase";
import { TalentSearchParams, TalentSearchResponse, Talent } from './types';

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
      // Fix: Use 'contains' instead of 'containsAny' for PostgreSQL array operations
      // This will search for candidates that have any of the specified skills
      query = query.contains('skills', skills);
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
