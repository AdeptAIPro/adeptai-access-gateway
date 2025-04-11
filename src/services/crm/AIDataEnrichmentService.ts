
/**
 * Service for AI-powered data enrichment of leads and talent profiles
 */

import { Lead } from "./types";
import { saveLead } from "./LeadService";
import { 
  enrichLeadWithAI, 
  batchEnrichLeads 
} from "./ai-enrichment/leadEnrichment";
import { 
  enrichTalentWithAI, 
  batchEnrichTalents 
} from "./ai-enrichment/talentEnrichment";

// Re-export the functions for backward compatibility
export {
  enrichLeadWithAI,
  enrichTalentWithAI,
  batchEnrichLeads,
  batchEnrichTalents
};
