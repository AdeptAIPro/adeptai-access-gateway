
import { AgentTask } from "../types/AgenticTypes";
import { CrossSourceIntelligenceParams, CrossSourceTaskResult } from "./types/CrossSourceTypes";
import { analyzeJobDescription } from "./utils/JobAnalyzer";
import { collectCandidatesFromAllSources, crossReferenceMultipleSourceCandidates, calculateAverageCrossSourceScore } from "./utils/CandidateCollector";
import { rankCandidates } from "./utils/CandidateRanking";
import { generateCrossSourceInsights } from "./utils/InsightsGenerator";
import { generateCustomOutreachStrategies } from "./utils/OutreachStrategiesGenerator";

// Process cross-source talent intelligence tasks
export const processCrossSourceTalentIntelligenceTask = async (task: AgentTask): Promise<AgentTask> => {
  console.log(`Processing cross-source talent intelligence task: ${task.id}`);
  
  // Mark task as processing
  const updatedTask = { ...task, status: "processing" as const };
  
  try {
    const params = task.params as CrossSourceIntelligenceParams;
    
    // Analyze job description to extract additional requirements and context
    const jobAnalysis = await analyzeJobDescription(params.jobDescription);
    
    // Collect candidates from multiple sources using parallel requests
    const candidatesFromAllSources = await collectCandidatesFromAllSources(params);
    
    // Apply intelligent ranking with emphasis on cross-source validation
    const rankedCandidates = rankCandidates(
      candidatesFromAllSources,
      params.requiredSkills,
      params.preferredSkills,
      params.culturalFitPriority > 5,
      jobAnalysis
    );
    
    // Filter by minimum match score
    const filteredCandidates = rankedCandidates.filter(
      candidate => candidate.matchScore >= params.minMatchScore
    );
    
    // Cross-reference candidates across sources to validate information
    const crossReferencedCandidates = await crossReferenceMultipleSourceCandidates(filteredCandidates);
    
    // Generate deep insights based on the cross-source validated data
    const insights = await generateCrossSourceInsights(crossReferencedCandidates, params);
    
    // Generate custom outreach strategies for each candidate
    const outreachStrategies = generateCustomOutreachStrategies(crossReferencedCandidates);
    
    const result: CrossSourceTaskResult = {
      candidates: crossReferencedCandidates,
      insights,
      outreachStrategies,
      crossSourceValidation: {
        candidatesFound: crossReferencedCandidates.length,
        sourcesSearched: params.sources,
        averageCrossSourceScore: calculateAverageCrossSourceScore(crossReferencedCandidates)
      }
    };
    
    // Complete the task
    return {
      ...updatedTask,
      status: "completed",
      result
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
