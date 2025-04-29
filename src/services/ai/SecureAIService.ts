
import { lambdaApi } from '../backend-api/LambdaApiClient';
import { TASK_PROCESSOR_LAMBDA } from '../aws/config';

/**
 * Secure service for AI operations through Lambda backend
 * This prevents exposing API keys in the frontend
 */
export class SecureAIService {
  /**
   * Generate text using AI models through backend Lambda
   */
  async generateText(prompt: string, model: string = 'gpt-4o-mini'): Promise<string> {
    const result = await lambdaApi.invoke<
      { prompt: string; model: string },
      { text: string }
    >(
      TASK_PROCESSOR_LAMBDA,
      'generateText',
      { prompt, model }
    );
    
    return result.text;
  }
  
  /**
   * Process a resume using AI through backend Lambda
   */
  async processResume(resumeText: string): Promise<any> {
    const result = await lambdaApi.invoke<
      { resumeText: string },
      { skills: string[]; experience: number; education: string[]; summary: string }
    >(
      TASK_PROCESSOR_LAMBDA,
      'processResume',
      { resumeText }
    );
    
    return result;
  }
  
  /**
   * Match a candidate to a job using AI through backend Lambda
   */
  async matchCandidateToJob(candidateProfile: any, jobDescription: string): Promise<number> {
    const result = await lambdaApi.invoke<
      { candidateProfile: any; jobDescription: string },
      { matchScore: number; factors: any[] }
    >(
      TASK_PROCESSOR_LAMBDA,
      'matchCandidateToJob',
      { candidateProfile, jobDescription }
    );
    
    return result.matchScore;
  }
}

// Export a singleton instance
export const secureAIService = new SecureAIService();
