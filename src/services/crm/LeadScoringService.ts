
import { Lead } from "./types";

/**
 * AI Lead Scoring Service
 * 
 * This service calculates lead scores based on various factors
 * including demographic data, behavior, and engagement metrics.
 */

// Scoring weights
const SCORING_WEIGHTS = {
  hasCompany: 15,        // Lead provided company information
  hasPhone: 10,          // Lead provided phone number
  hasMessage: 20,        // Lead provided detailed message
  sourceFactor: {        // Score adjustment based on lead source
    'website': 15,
    'widget': 10,
    'manual': 5,
    'default': 0
  },
  industryFactor: {      // Industry-based scoring (simplified)
    'technology': 15,
    'healthcare': 12,
    'finance': 10,
    'education': 8,
    'default': 5
  }
};

/**
 * Detects industry from company name or message content
 */
const detectIndustry = (lead: Lead): string => {
  const content = `${lead.company || ''} ${lead.message || ''}`.toLowerCase();
  
  if (content.match(/tech|software|app|digital|ai|ml|data/)) return 'technology';
  if (content.match(/health|medical|doctor|hospital|clinic|patient/)) return 'healthcare';
  if (content.match(/bank|finance|invest|capital|fund|money|loan/)) return 'finance';
  if (content.match(/school|university|college|education|learn|teach|training/)) return 'education';
  
  return 'default';
};

/**
 * Scores a lead based on available information
 */
export const calculateLeadScore = (lead: Lead): { score: number; factors: string[] } => {
  let score = 50; // Start at neutral score
  const factors: string[] = [];
  
  // Adjust for completeness of information
  if (lead.company) {
    score += SCORING_WEIGHTS.hasCompany;
    factors.push('Provided company information');
  }
  
  if (lead.phone) {
    score += SCORING_WEIGHTS.hasPhone;
    factors.push('Provided contact phone');
  }
  
  if (lead.message && lead.message.length > 10) {
    score += SCORING_WEIGHTS.hasMessage;
    factors.push('Provided detailed inquiry');
  }
  
  // Adjust for lead source
  const sourceWeight = SCORING_WEIGHTS.sourceFactor[lead.source as keyof typeof SCORING_WEIGHTS.sourceFactor] || 
                       SCORING_WEIGHTS.sourceFactor.default;
  score += sourceWeight;
  factors.push(`Lead source: ${lead.source}`);
  
  // Adjust for detected industry
  const industry = detectIndustry(lead);
  if (industry !== 'default') {
    const industryWeight = SCORING_WEIGHTS.industryFactor[industry as keyof typeof SCORING_WEIGHTS.industryFactor];
    score += industryWeight;
    factors.push(`Industry detected: ${industry}`);
  }
  
  // Cap score between 0-100
  score = Math.max(0, Math.min(100, score));
  
  return { 
    score: Math.round(score), 
    factors 
  };
};

/**
 * Updates the lead with an AI-generated score
 */
export const scoreLeads = (leads: Lead[]): Lead[] => {
  return leads.map(lead => {
    if (lead.score !== undefined) return lead; // Skip if already scored
    
    const { score, factors } = calculateLeadScore(lead);
    return {
      ...lead,
      score,
      scoringFactors: factors
    };
  });
};

/**
 * Returns lead priority category based on score
 */
export const getLeadPriority = (score: number): 'low' | 'medium' | 'high' => {
  if (score >= 75) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
};
