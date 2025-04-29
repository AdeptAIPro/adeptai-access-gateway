
import { lambdaApi } from '../backend-api/LambdaApiClient';
import { MatchingOptions, MatchingResult } from "@/components/talent-matching/types";
import { TALENT_MATCH_LAMBDA } from '../aws/config';

/**
 * Service for talent matching that uses AWS Lambda backend
 * This replaces direct database calls with secure Lambda invocations
 */
export async function matchCandidatesWithJobDescription(
  jobDescription: string,
  matchingOptions: MatchingOptions
): Promise<MatchingResult> {
  // Call the talent matching Lambda function
  const result = await lambdaApi.invoke<
    { jobDescription: string; options: MatchingOptions },
    MatchingResult
  >(
    TALENT_MATCH_LAMBDA,
    'matchCandidates',
    { jobDescription, options: matchingOptions }
  );
  
  return result;
}

/**
 * Get available matching models from the backend
 */
export async function getAvailableMatchingModels() {
  // Call the talent matching Lambda function to get models
  const result = await lambdaApi.invoke<
    void,
    { models: any[] }
  >(
    TALENT_MATCH_LAMBDA,
    'getMatchingModels',
    {}
  );
  
  return result.models;
}

/**
 * Save a candidate match result
 */
export async function saveMatchResult(matchId: string, candidateId: string) {
  return lambdaApi.invoke(
    TALENT_MATCH_LAMBDA,
    'saveMatchResult',
    { matchId, candidateId }
  );
}

/**
 * Get a candidate's detailed profile
 */
export async function getCandidateDetails(candidateId: string) {
  return lambdaApi.invoke(
    TALENT_MATCH_LAMBDA,
    'getCandidateDetails',
    { candidateId }
  );
}

/**
 * Process a job description through AI
 */
export async function processJobDescription(jobDescription: string) {
  return lambdaApi.invoke(
    TALENT_MATCH_LAMBDA,
    'processJobDescription',
    { jobDescription }
  );
}
