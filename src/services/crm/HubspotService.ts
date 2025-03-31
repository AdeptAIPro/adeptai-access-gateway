
import { supabase } from "@/lib/supabase";
import { saveLead, getLeads, updateLeadStatus } from "./LeadService";
import { fetchHubSpotContacts, sendToHubSpot } from "./HubspotApiService";
import { calculateLeadScore, scoreLeads, getLeadPriority } from "./LeadScoringService";

/**
 * Service for managing HubSpot CRM integration
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a HubSpot account at https://www.hubspot.com/ using crm@adeptaipro.com
 * 2. Get your API key from HubSpot: Settings > Integrations > API Keys
 * 3. Set your HubSpot API key as VITE_HUBSPOT_API_KEY in your environment
 *    or in the Supabase secrets if using Supabase
 * 
 * Note: When properly set up, all leads captured in this system will 
 * automatically sync to your HubSpot CRM
 */

// For future: get HubSpot connection status
export const getHubSpotStatus = (): { connected: boolean; email: string } => {
  const hubspotApiKey = import.meta.env.VITE_HUBSPOT_API_KEY;
  return {
    connected: hubspotApiKey && hubspotApiKey !== 'placeholder-hubspot-key',
    email: 'crm@adeptaipro.com'
  };
};

/**
 * Test the HubSpot connection by attempting to fetch a single contact
 * @returns Boolean indicating if the connection was successful
 */
export const testHubSpotConnection = async (): Promise<boolean> => {
  try {
    const contacts = await fetchHubSpotContacts(1);
    return contacts.length >= 0; // Even if we have 0 contacts, as long as the API call works, it's true
  } catch (error) {
    console.error('HubSpot connection test failed:', error);
    return false;
  }
};

// Re-export functions
export { 
  saveLead, 
  getLeads, 
  updateLeadStatus, 
  fetchHubSpotContacts, 
  sendToHubSpot,
  calculateLeadScore,
  scoreLeads,
  getLeadPriority
};

// Re-export types with 'export type'
export type { Lead, LeadFilter, HubspotContact } from './types';
