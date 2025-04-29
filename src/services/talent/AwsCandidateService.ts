
import { lambdaApi } from '@/services/backend-api/LambdaApiClient';
import { TALENT_MATCH_LAMBDA } from '@/services/aws/config';
import { TalentSearchParams, TalentSearchResponse, Talent } from './types';
import { reportApiError } from '@/services/error-reporting';
import { isAwsConfigured } from '@/utils/aws-migration-utils';
import { searchTalentsFromSupabase } from './SupabaseTalentService';
import { supabase } from '@/lib/supabase';

/**
 * Search for talents using AWS Lambda backend
 * This replaces the direct Supabase database queries with secure API calls
 */
export const searchTalents = async (
  params: TalentSearchParams
): Promise<TalentSearchResponse> => {
  try {
    // Check if AWS is configured, otherwise fall back to Supabase
    if (!isAwsConfigured()) {
      console.warn('AWS not configured, falling back to Supabase for talent search');
      return searchTalentsFromSupabase(params);
    }
    
    // Call Lambda function through API Gateway
    const result = await lambdaApi.invoke<
      TalentSearchParams,
      TalentSearchResponse
    >(
      TALENT_MATCH_LAMBDA,
      'searchCandidates',
      params
    );
    
    return result;
  } catch (error) {
    reportApiError('searchTalents', error, { params });
    
    // Return empty results as fallback
    return {
      candidates: [],
      total: 0,
      page: params.page || 1,
      totalPages: 0
    };
  }
};

/**
 * Get detailed information about a candidate
 */
export const getCandidateById = async (id: string): Promise<Talent | null> => {
  try {
    // Check if AWS is configured, otherwise fall back to Supabase
    if (!isAwsConfigured()) {
      console.warn('AWS not configured, falling back to Supabase for candidate details');
      
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error || !data) return null;
      
      // Map to our Talent interface
      return {
        id: data.id,
        name: data.name,
        title: data.title || 'Unknown Position',
        location: data.location || 'Remote',
        skills: data.skills || [],
        experience: data.experience || 0,
        education: data.education || 'Not specified',
        source: data.source || 'Internal Database',
        avatar: data.avatar_url,
        email: data.email,
        phone: data.phone,
      };
    }
    
    // Call Lambda function through API Gateway
    const result = await lambdaApi.invoke<
      { id: string },
      { candidate: Talent | null }
    >(
      TALENT_MATCH_LAMBDA,
      'getCandidateById',
      { id }
    );
    
    return result.candidate;
  } catch (error) {
    reportApiError('getCandidateById', error, { id });
    return null;
  }
};
