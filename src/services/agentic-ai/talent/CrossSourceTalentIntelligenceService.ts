
import { AgentTask } from "../types/AgenticTypes";
import { collectCandidatesFromAllSources, crossReferenceMultipleSourceCandidates, calculateAverageCrossSourceScore } from "./utils/CandidateCollector";
import { getFallbackCandidates, getFallbackMatchingResult } from "../../talent-matching/fallbacks/MatchingFallbacks";

/**
 * Process a cross-source talent intelligence task
 * This service aggregates candidate information across multiple sources,
 * validates it, and provides insights about the candidates
 */
export const processCrossSourceTalentIntelligenceTask = async (task: AgentTask): Promise<AgentTask> => {
  console.log(`Processing cross-source talent intelligence task: ${task.id}`);
  
  // Mark task as processing
  const updatedTask = { ...task, status: "processing" as const };
  
  try {
    // Add some delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get parameters from the task
    const params = task.params as any;
    
    if (!params.jobDescription && !params.requiredSkills) {
      throw new Error("Missing required parameters: jobDescription or requiredSkills");
    }
    
    // 1. Collect candidates from all configured sources
    const candidates = await collectCandidatesFromAllSources({
      jobDescription: params.jobDescription,
      requiredSkills: params.requiredSkills,
      preferredSkills: params.preferredSkills,
      sources: params.sources,
      minMatchScore: params.minMatchScore || 70,
      culturalFitPriority: params.culturalFitPriority || 5
    });
    
    // 2. Cross-reference candidates across sources for validation
    const crossReferencedCandidates = await crossReferenceMultipleSourceCandidates(candidates);
    
    // 3. Compute cross-source statistics
    const verifiedCandidates = crossReferencedCandidates.filter(c => c.crossSourceVerified);
    const averageCrossSourceScore = calculateAverageCrossSourceScore(crossReferencedCandidates);
    const sourcesSearched = Array.from(new Set(candidates.flatMap(c => c.crossSourceSources || [c.source]))); 
    
    // 4. Generate insights from fallback data
    const fallbackResult = getFallbackMatchingResult();
    
    // Combine with our cross-source validation data
    return {
      ...updatedTask,
      status: "completed",
      result: {
        candidates: crossReferencedCandidates,
        insights: fallbackResult.insights,
        crossSourceValidation: {
          sourcesSearched,
          candidatesFound: candidates.length,
          verifiedCandidates: verifiedCandidates.length,
          verificationRate: Math.round((verifiedCandidates.length / candidates.length) * 100),
          averageCrossSourceScore
        },
        outreachStrategies: {
          recommendedChannels: ["Email", "LinkedIn InMail"],
          messagingTemplates: [
            {
              type: "initial-contact",
              subject: "Opportunity at [Company]",
              body: "Hello [Name], I came across your profile and think you'd be a great fit for our [Position] role..."
            }
          ]
        }
      }
    };
  } catch (error) {
    console.error(`Error processing cross-source talent intelligence task: ${error}`);
    return {
      ...updatedTask,
      status: "failed",
      error: `Failed to process task: ${error}`
    };
  }
};
