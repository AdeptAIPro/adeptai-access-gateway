
import * as dataGenerators from "./dataGenerators";

/**
 * Service responsible for enriching talent profile data
 */

// Cache for enriched data to prevent redundant calculations
const talentEnrichmentCache = new Map<string, any>();

// Enrich talent profile using an AI service
export const enrichTalentWithAI = async (
  talentId: string,
  source: string
): Promise<boolean> => {
  try {
    // Check cache first
    const cacheKey = `talent-${talentId}-${source}`;
    if (talentEnrichmentCache.has(cacheKey)) {
      console.log(`[AI Enrichment] Using cached data for talent ${talentId}`);
      return true;
    }
    
    // In a real implementation, this would call an external API
    // For now, we'll simulate enrichment by adding additional fields
    
    // Get additional data that would be retrieved from the AI service
    const enrichedData = {
      skills_verified: dataGenerators.getRandomSkills(),
      languages: dataGenerators.getRandomLanguages(),
      certifications: dataGenerators.getRandomCertifications(),
      education_verified: {
        institution: dataGenerators.getRandomUniversity(),
        degree: dataGenerators.getRandomDegree(),
        field: dataGenerators.getRandomField(),
        graduation_year: 2010 + Math.floor(Math.random() * 13)
      },
      previous_companies: dataGenerators.getRandomCompanies(),
      github_repositories: Math.floor(Math.random() * 30),
      enrichment_source: source,
      enrichment_date: new Date().toISOString()
    };
    
    console.log(`[AI Enrichment] Enriched talent ${talentId} with data from ${source}`);
    
    // Store in cache
    talentEnrichmentCache.set(cacheKey, enrichedData);
    
    // Limit cache size to prevent memory leaks
    if (talentEnrichmentCache.size > 100) {
      const firstKey = talentEnrichmentCache.keys().next().value;
      talentEnrichmentCache.delete(firstKey);
    }
    
    // In a real implementation, this would update the talent in the database
    return true;
  } catch (error) {
    console.error(`Error enriching talent with ${source}:`, error);
    return false;
  }
};

// Batch enrich talents with optimized processing
export const batchEnrichTalents = async (
  talentIds: string[],
  source: string
): Promise<{ success: number; failed: number }> => {
  let success = 0;
  let failed = 0;
  
  // Process in batches of 5 for better performance
  const batchSize = 5;
  for (let i = 0; i < talentIds.length; i += batchSize) {
    const batch = talentIds.slice(i, i + batchSize);
    
    // Process batch in parallel
    const results = await Promise.all(
      batch.map(id => enrichTalentWithAI(id, source))
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
