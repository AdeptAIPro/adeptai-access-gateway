
import { AgentTask } from "../types/AgenticTypes";
import agenticDatabaseService, { executeQuery } from "../database/AgenticDatabaseService";
import { searchTalents } from "@/services/talent/TalentSearchService";
import { generateMatchingInsights } from "./utils/InsightsGenerator";
import { rankCandidates } from "./utils/CandidateRanking";
import { TalentSearchParams } from '@/services/talent/types';

interface CrossSourceIntelligenceParams {
  jobDescription: string;
  requiredSkills: string[];
  preferredSkills: string[];
  experienceLevel: number;
  locations: string[];
  sources: string[];
  culturalFitPriority: number; // 0-10 scale
  minMatchScore: number;
}

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
    
    // Complete the task
    return {
      ...updatedTask,
      status: "completed",
      result: {
        candidates: crossReferencedCandidates,
        insights,
        outreachStrategies,
        crossSourceValidation: {
          candidatesFound: crossReferencedCandidates.length,
          sourcesSearched: params.sources,
          averageCrossSourceScore: calculateAverageCrossSourceScore(crossReferencedCandidates)
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

// Analyze job description to extract more contextual information
const analyzeJobDescription = async (jobDescription: string) => {
  // In production this would use an LLM to analyze, for now we'll use a simple simulation
  return {
    suggestedExperience: 3,
    companyCulture: "collaborative",
    teamDynamics: "fast-paced",
    projectComplexity: "high",
    suggestedSkills: [
      "problem-solving",
      "communication",
      "adaptability"
    ]
  };
};

// Collect candidates from multiple sources in parallel
const collectCandidatesFromAllSources = async (params: CrossSourceIntelligenceParams) => {
  const searchPromises = params.sources.map(source => {
    const searchParams: TalentSearchParams = {
      skills: params.requiredSkills,
      location: params.locations.join(','),
      experience: params.experienceLevel,
      source,
      limit: 20 // Get more candidates from each source for better matching
    };
    
    return searchTalents(searchParams);
  });
  
  try {
    const searchResults = await Promise.all(searchPromises);
    
    // Combine all candidates and remove duplicates 
    const allCandidates: any[] = [];
    const seenIds = new Set();
    
    searchResults.forEach(result => {
      result.candidates.forEach(candidate => {
        if (!seenIds.has(candidate.id)) {
          seenIds.add(candidate.id);
          allCandidates.push({
            ...candidate,
            sourcesFound: [candidate.source]
          });
        } else {
          // If candidate exists in multiple sources, update the sourcesFound array
          const existingCandidate = allCandidates.find(c => c.id === candidate.id);
          if (existingCandidate && !existingCandidate.sourcesFound.includes(candidate.source)) {
            existingCandidate.sourcesFound.push(candidate.source);
            existingCandidate.crossSourceVerified = true;
          }
        }
      });
    });
    
    return allCandidates;
  } catch (error) {
    console.error("Error collecting candidates from sources:", error);
    return [];
  }
};

// Cross-reference candidates who appear in multiple sources to validate information
const crossReferenceMultipleSourceCandidates = async (candidates: any[]) => {
  return candidates.map(candidate => {
    // Calculate cross-source verification score (higher if found in multiple sources)
    const crossSourceScore = candidate.sourcesFound?.length > 1 ? 
      Math.min(70 + (candidate.sourcesFound.length * 10), 100) : 
      50;
    
    return {
      ...candidate,
      crossSourceScore,
      verificationStatus: crossSourceScore > 70 ? 'verified' : 'unverified',
      informationConsistency: candidate.crossSourceVerified ? 
        analyzeCrossSourceConsistency(candidate) : 
        { score: 0, inconsistencies: [] }
    };
  });
};

// Analyze consistency of candidate information across sources
const analyzeCrossSourceConsistency = (candidate: any) => {
  // In production, this would compare actual data from different sources
  // For now, we'll simulate some consistency analysis
  return {
    score: candidate.sourcesFound?.length > 2 ? 90 : 75,
    inconsistencies: []
  };
};

// Generate cross-source insights for the matched candidates
const generateCrossSourceInsights = async (candidates: any[], params: CrossSourceIntelligenceParams) => {
  // In production, this would use an LLM to generate deeper insights
  const crossSourceVerifiedCount = candidates.filter(c => c.crossSourceVerified).length;
  const verifiedPercentage = candidates.length > 0 ? 
    Math.round((crossSourceVerifiedCount / candidates.length) * 100) : 0;
  
  return {
    crossSourceStatistics: {
      totalCandidates: candidates.length,
      verifiedCandidates: crossSourceVerifiedCount,
      verifiedPercentage,
      averageCrossSourceScore: calculateAverageCrossSourceScore(candidates)
    },
    talentPoolQuality: verifiedPercentage > 70 ? 'Excellent' : 
      verifiedPercentage > 50 ? 'Good' : 'Needs Expansion',
    recommendedSourcingStrategy: generateSourcingStrategy(candidates, params),
    competitivePositioning: analyzeMarketPosition(candidates, params)
  };
};

// Calculate the average cross-source verification score
const calculateAverageCrossSourceScore = (candidates: any[]) => {
  if (candidates.length === 0) return 0;
  const sum = candidates.reduce((total, candidate) => 
    total + (candidate.crossSourceScore || 0), 0);
  return Math.round(sum / candidates.length);
};

// Generate a sourcing strategy based on candidate analysis
const generateSourcingStrategy = (candidates: any[], params: CrossSourceIntelligenceParams) => {
  // Analysis to determine where to focus sourcing efforts
  const sourceDistribution: Record<string, number> = {};
  candidates.forEach(candidate => {
    if (candidate.source) {
      sourceDistribution[candidate.source] = (sourceDistribution[candidate.source] || 0) + 1;
    }
  });
  
  // Find the most effective sources
  const sortedSources = Object.entries(sourceDistribution)
    .sort(([, countA], [, countB]) => (countB as number) - (countA as number))
    .map(([source]) => source);
  
  return {
    mostEffectiveSources: sortedSources.slice(0, 3),
    recommendedSources: sortedSources,
    suggestedOutreachOrder: sortedSources,
    untappedSources: params.sources.filter(s => !sortedSources.includes(s))
  };
};

// Analyze competitive positioning in the talent market
const analyzeMarketPosition = (candidates: any[], params: CrossSourceIntelligenceParams) => {
  // In production, this would use actual market data
  const hasTopCandidates = candidates.some(c => c.matchScore > 90);
  const competitiveLevel = hasTopCandidates ? 'High' : 'Medium';
  
  return {
    talentAvailability: candidates.length > 10 ? 'Abundant' : 'Limited',
    competitiveness: competitiveLevel,
    salaryRange: {
      min: 80000,
      max: 150000,
      median: 115000
    },
    timeToHire: competitiveLevel === 'High' ? '4-6 weeks' : '2-4 weeks'
  };
};

// Generate customized outreach strategies for each candidate
const generateCustomOutreachStrategies = (candidates: any[]) => {
  return candidates.slice(0, 5).map(candidate => ({
    candidateId: candidate.id,
    candidateName: candidate.name,
    recommendedApproach: candidate.matchScore > 90 ? 'High-Touch Personalized' : 'Standard Outreach',
    suggestedTalkingPoints: [
      `Experience with ${candidate.skills?.slice(0, 2).join(' and ')}`,
      `Similar industry background at ${candidate.experience?.split(' at ')[1] || 'their current company'}`,
      candidate.crossSourceVerified ? 'Validated expertise across multiple platforms' : 'Unique skill combination'
    ],
    estimatedResponseRate: candidate.matchScore > 85 ? 'High' : 'Medium',
    bestContactMethod: candidate.email ? 'Email' : 'LinkedIn'
  }));
};
