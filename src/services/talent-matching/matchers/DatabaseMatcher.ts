
import { Candidate, MatchingOptions } from "@/components/talent-matching/types";
import { supabase, CandidateRecord } from "@/lib/supabase";
import { calculateMatchScore } from "../utils/MatchingUtils";

/**
 * Fetches candidates from the database with filters applied based on matching options
 */
export const matchCandidatesFromDatabase = async (
  jobDescription: string,
  options: MatchingOptions
): Promise<Candidate[]> => {
  try {
    // Build the query based on options
    let query = supabase
      .from('candidates')
      .select('*');
    
    // Apply filters based on options
    if (options.minMatchScore > 0) {
      query = query.gte('match_score', options.minMatchScore);
    }
    
    if (options.useComplianceVerification) {
      query = query.eq('compliance_verified', true);
    }
    
    // Execute the query
    const { data: candidateRecords, error } = await query;
    
    if (error) {
      console.error("Error fetching candidates:", error);
      throw error;
    }
    
    // If no candidates found or empty array returned
    if (!candidateRecords || candidateRecords.length === 0) {
      return [];
    }
    
    // Transform to our application's Candidate type
    const matchedCandidates: Candidate[] = candidateRecords.map((record: CandidateRecord) => ({
      id: record.id,
      name: record.name,
      title: record.title,
      location: record.location,
      education: record.education,
      experience: record.experience,
      skills: record.skills,
      matchScore: calculateMatchScore(record, jobDescription, options),
      source: record.source,
      avatar: record.avatar_url,
      culturalFitScore: record.cultural_fit_score,
      complianceVerified: record.compliance_verified,
      certifications: record.certifications,
      implicitCompetencies: record.implicit_competencies,
      historicalSuccessRate: record.historical_success_rate
    }));
    
    return matchedCandidates;
  } catch (error) {
    console.error("Error in database matcher:", error);
    return [];
  }
};
