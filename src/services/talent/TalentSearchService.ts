
// Import and re-export from modular services
import { searchTalents } from './BasicTalentSearchService';
import { searchTalentsWithAgenticIntelligence } from './AgenticTalentSearchService';
import { getTalentSources } from './TalentSourcesService';
import { TalentSearchParams, TalentSearchResponse, Talent } from './types';

// Re-export types and functions for simpler imports
export type { TalentSearchParams, TalentSearchResponse, Talent };
export { searchTalents, searchTalentsWithAgenticIntelligence, getTalentSources };
