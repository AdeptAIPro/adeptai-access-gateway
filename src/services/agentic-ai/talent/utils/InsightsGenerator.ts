
import { 
  CrossSourceCandidate, 
  CrossSourceIntelligenceParams, 
  CrossSourceInsights,
  SourcingStrategy,
  CompetitivePositioning
} from "../types/CrossSourceTypes";
import { calculateAverageCrossSourceScore } from "./CandidateCollector";

/**
 * Generate cross-source insights for the matched candidates
 */
export const generateCrossSourceInsights = async (
  candidates: CrossSourceCandidate[], 
  params: CrossSourceIntelligenceParams
): Promise<CrossSourceInsights> => {
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

/**
 * Generate matching insights for regular candidate matching process
 * This function was missing and causing the import error
 */
export const generateMatchingInsights = (candidates: any[], params: any) => {
  // Generate basic insights for the matching process
  const candidatesCount = candidates.length;
  const highMatchCount = candidates.filter(c => c.matchScore >= 85).length;
  const matchQuality = highMatchCount > (candidatesCount * 0.6) ? 'High' : 
                       highMatchCount > (candidatesCount * 0.3) ? 'Medium' : 'Low';
  
  return {
    talentPoolQuality: matchQuality,
    totalCandidates: candidatesCount,
    highMatchCandidates: highMatchCount,
    averageMatchScore: candidates.length > 0 
      ? Math.round(candidates.reduce((sum, c) => sum + c.matchScore, 0) / candidatesCount) 
      : 0,
    recommendedNextSteps: candidates.length > 0 
      ? ['Review top candidates', 'Schedule interviews', 'Prepare offer packages'] 
      : ['Expand search criteria', 'Try different sources', 'Adjust requirements']
  };
};

/**
 * Generate a sourcing strategy based on candidate analysis
 */
export const generateSourcingStrategy = (
  candidates: CrossSourceCandidate[], 
  params: CrossSourceIntelligenceParams
): SourcingStrategy => {
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

/**
 * Analyze competitive positioning in the talent market
 */
export const analyzeMarketPosition = (
  candidates: CrossSourceCandidate[], 
  params: CrossSourceIntelligenceParams
): CompetitivePositioning => {
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
