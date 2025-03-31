
import { Lead, HubspotContact } from "./types";

/**
 * Service for interacting with the HubSpot API
 */

// Send lead to HubSpot
export const sendToHubSpot = async (lead: Lead): Promise<void> => {
  try {
    const hubspotApiKey = import.meta.env.VITE_HUBSPOT_API_KEY;
    
    // Only attempt to send if we have an API key
    if (hubspotApiKey && hubspotApiKey !== 'placeholder-hubspot-key') {
      console.log('Sending lead to HubSpot:', lead);
      
      // In a real implementation, you would use the HubSpot API
      const response = await fetch('https://api.hubapi.com/contacts/v1/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${hubspotApiKey}`
        },
        body: JSON.stringify({
          properties: [
            { property: 'email', value: lead.email },
            { property: 'firstname', value: lead.name?.split(' ')[0] || '' },
            { property: 'lastname', value: lead.name?.split(' ')[1] || '' },
            { property: 'company', value: lead.company || '' },
            { property: 'phone', value: lead.phone || '' },
            { property: 'message', value: lead.message || '' },
            { property: 'source', value: lead.source || 'website' }
          ]
        })
      });
      
      // Check response
      if (!response.ok) {
        const errorData = await response.json();
        console.error('HubSpot API error:', errorData);
      } else {
        console.log('Lead successfully sent to HubSpot');
      }
    } else {
      console.log('No valid HubSpot API key found - lead not sent to HubSpot');
    }
  } catch (error) {
    console.error('Error sending lead to HubSpot:', error);
  }
};

/**
 * Fetch contacts from HubSpot API
 * @param limit Number of contacts to fetch (default: 10)
 * @returns Array of HubSpot contacts or empty array if error
 */
export const fetchHubSpotContacts = async (limit: number = 10): Promise<HubspotContact[]> => {
  try {
    const hubspotApiKey = import.meta.env.VITE_HUBSPOT_API_KEY;
    
    if (!hubspotApiKey || hubspotApiKey === 'placeholder-hubspot-key') {
      console.log('No valid HubSpot API key found');
      return [];
    }
    
    const response = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts?limit=${limit}&archived=false`, 
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${hubspotApiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('HubSpot API error:', errorData);
      return [];
    }
    
    const data = await response.json();
    return data.results as HubspotContact[];
  } catch (error) {
    console.error('Error fetching HubSpot contacts:', error);
    return [];
  }
};
