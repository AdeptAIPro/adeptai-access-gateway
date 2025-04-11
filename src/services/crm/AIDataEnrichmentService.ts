
/**
 * Service for AI-powered data enrichment of leads and talent profiles
 */

// Re-export the functions from their respective modules
export {
  enrichLeadWithAI,
  batchEnrichLeads
} from "./ai-enrichment/leadEnrichment";

export {
  enrichTalentWithAI,
  batchEnrichTalents
} from "./ai-enrichment/talentEnrichment";

