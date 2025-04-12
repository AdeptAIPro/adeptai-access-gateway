
import { TalentSearchParams, TalentSearchResponse } from '../types';

// Cache expiry time in milliseconds (5 minutes)
export const CACHE_EXPIRY = 5 * 60 * 1000;

// Results cache to prevent redundant API calls
const searchCache = new Map<string, TalentSearchResponse>();

// Generate cache key from search params
export const getCacheKey = (params: TalentSearchParams): string => {
  return JSON.stringify({
    query: params.query || '',
    location: params.location || '',
    experience: params.experience || 0,
    skills: params.skills || [],
    source: params.source || '',
    sources: params.sources || [],
    page: params.page || 1,
    limit: params.limit || 10
  });
};

// Check if cache has a valid entry
export const getFromCache = (cacheKey: string): TalentSearchResponse | null => {
  if (searchCache.has(cacheKey)) {
    const cached = searchCache.get(cacheKey)!;
    const cacheAge = Date.now() - (cached.timestamp || 0);
    
    // Return cached results if not expired
    if (cacheAge < CACHE_EXPIRY) {
      console.log('[TalentSearch] Using cached results');
      return cached;
    }
    
    // Remove expired cache entry
    searchCache.delete(cacheKey);
  }
  
  return null;
};

// Add result to cache
export const addToCache = (cacheKey: string, result: TalentSearchResponse): void => {
  // Ensure timestamp exists
  const resultWithTimestamp = {
    ...result,
    timestamp: Date.now()
  };
  
  // Cache the results
  searchCache.set(cacheKey, resultWithTimestamp);
  
  // Limit cache size to prevent memory leaks
  if (searchCache.size > 50) {
    const oldestKey = [...searchCache.entries()]
      .sort(([, a], [, b]) => (a.timestamp || 0) - (b.timestamp || 0))[0][0];
    searchCache.delete(oldestKey);
  }
};
