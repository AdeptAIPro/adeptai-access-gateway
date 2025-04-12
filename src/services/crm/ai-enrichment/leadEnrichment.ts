
import { Lead } from "../types";
import * as dataGenerators from "./dataGenerators";

/**
 * Service responsible for enriching lead data
 */

// Cache for enriched data to prevent redundant calculations
const enrichmentCache = new Map<string, any>();

// Enrich lead data using an AI service
export const enrichLeadWithAI = async (
  leadId: string,
  source: string
): Promise<boolean> => {
  try {
    // Check cache first
    const cacheKey = `lead-${leadId}-${source}`;
    if (enrichmentCache.has(cacheKey)) {
      console.log(`[AI Enrichment] Using cached data for lead ${leadId}`);
      return true;
    }

    // In a real implementation, this would call an external API
    // For now, we'll simulate enrichment by adding additional fields
    
    // Get additional data that would be retrieved from the AI service
    const enrichedData = {
      company_size: Math.floor(Math.random() * 5000) + 10,
      industry: dataGenerators.getRandomIndustry(),
      company_founded: 2000 + Math.floor(Math.random() * 23),
      estimated_revenue: `$${Math.floor(Math.random() * 50) + 1}M-${Math.floor(Math.random() * 50) + 51}M`,
      technologies: dataGenerators.getRandomTechnologies(),
      lead_score_adjusted: Math.min(100, Math.floor(Math.random() * 30) + 65),
      social_profiles: {
        linkedin: `https://linkedin.com/company/${Math.floor(Math.random() * 10000)}`,
        twitter: `https://twitter.com/company${Math.floor(Math.random() * 10000)}`
      },
      last_funding_round: Math.random() > 0.5 ? `Series ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}` : null,
      enrichment_source: source,
      enrichment_date: new Date().toISOString()
    };
    
    console.log(`[AI Enrichment] Enriched lead ${leadId} with data from ${source}`);
    
    // Store in cache
    enrichmentCache.set(cacheKey, enrichedData);
    
    // Limit cache size to prevent memory leaks
    if (enrichmentCache.size > 100) {
      const firstKey = enrichmentCache.keys().next().value;
      enrichmentCache.delete(firstKey);
    }
    
    // In a real implementation, this would update the lead in the database
    return true;
  } catch (error) {
    console.error(`Error enriching lead with ${source}:`, error);
    return false;
  }
};

// Batch enrich leads with optimized processing
export const batchEnrichLeads = async (
  leadIds: string[],
  source: string
): Promise<{ success: number; failed: number }> => {
  let success = 0;
  let failed = 0;
  
  // Process in batches of 5 for better performance
  const batchSize = 5;
  for (let i = 0; i < leadIds.length; i += batchSize) {
    const batch = leadIds.slice(i, i + batchSize);
    
    // Process batch in parallel
    const results = await Promise.all(
      batch.map(id => enrichLeadWithAI(id, source))
    );
    
    // Count results
    results.forEach(result => {
      if (result) {
        success++;
      } else {
        failed++;
      }
    });
  }
  
  return { success, failed };
};
