
import { supabase } from "@/lib/supabase";

/**
 * Service for managing HubSpot CRM integration
 */

// Types for lead data
export interface Lead {
  id?: string;
  email: string;
  name?: string;
  company?: string;
  phone?: string;
  source: string;
  message?: string;
  created_at?: string;
  status?: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
}

export interface LeadFilter {
  status?: string;
  source?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

// Save lead to local database
export const saveLead = async (lead: Lead): Promise<boolean> => {
  try {
    // Check for placeholder credentials
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey ||
        supabaseUrl === 'https://placeholder-supabase-url.supabase.co' || 
        supabaseAnonKey === 'placeholder-anon-key') {
      // Demo mode - store in localStorage instead
      const storedLeads = JSON.parse(localStorage.getItem('adeptai_leads') || '[]');
      storedLeads.push({
        ...lead,
        id: `demo-${Date.now()}`,
        created_at: new Date().toISOString(),
        status: 'new'
      });
      localStorage.setItem('adeptai_leads', JSON.stringify(storedLeads));
      
      // Also simulate HubSpot API call
      console.log('Demo mode: Lead would be sent to HubSpot', lead);
      return true;
    }
    
    // Store in Supabase
    const { error } = await supabase
      .from('leads')
      .insert([{ 
        ...lead,
        created_at: new Date().toISOString(), 
        status: 'new' 
      }]);
    
    if (error) {
      console.error('Error saving lead to database:', error);
      return false;
    }
    
    // If using real credentials, also send to HubSpot
    sendToHubSpot(lead);
    return true;
  } catch (error) {
    console.error('Failed to save lead:', error);
    return false;
  }
};

// Get all leads
export const getLeads = async (filter?: LeadFilter): Promise<Lead[]> => {
  try {
    // Check for placeholder credentials
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey ||
        supabaseUrl === 'https://placeholder-supabase-url.supabase.co' || 
        supabaseAnonKey === 'placeholder-anon-key') {
      // Demo mode - get from localStorage
      const storedLeads = JSON.parse(localStorage.getItem('adeptai_leads') || '[]');
      return storedLeads;
    }
    
    // Fetch from Supabase with optional filters
    let query = supabase.from('leads').select('*').order('created_at', { ascending: false });
    
    if (filter?.status) {
      query = query.eq('status', filter.status);
    }
    
    if (filter?.source) {
      query = query.eq('source', filter.source);
    }
    
    if (filter?.dateFrom) {
      query = query.gte('created_at', filter.dateFrom.toISOString());
    }
    
    if (filter?.dateTo) {
      query = query.lte('created_at', filter.dateTo.toISOString());
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching leads:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch leads:', error);
    return [];
  }
};

// Update lead status
export const updateLeadStatus = async (id: string, status: string): Promise<boolean> => {
  try {
    // Check for placeholder credentials
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey ||
        supabaseUrl === 'https://placeholder-supabase-url.supabase.co' || 
        supabaseAnonKey === 'placeholder-anon-key') {
      // Demo mode - update in localStorage
      const storedLeads = JSON.parse(localStorage.getItem('adeptai_leads') || '[]');
      const updatedLeads = storedLeads.map((lead: Lead) => 
        lead.id === id ? { ...lead, status } : lead
      );
      localStorage.setItem('adeptai_leads', JSON.stringify(updatedLeads));
      return true;
    }
    
    const { error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating lead status:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Failed to update lead status:', error);
    return false;
  }
};

// Simulate sending to HubSpot
const sendToHubSpot = async (lead: Lead): Promise<void> => {
  try {
    const hubspotApiKey = import.meta.env.VITE_HUBSPOT_API_KEY;
    
    // Only attempt to send if we have an API key
    if (hubspotApiKey && hubspotApiKey !== 'placeholder-hubspot-key') {
      // This would be a real API call to HubSpot in production
      console.log('Sending lead to HubSpot:', lead);
      
      // In a real implementation, you would use the HubSpot API
      // const response = await fetch('https://api.hubapi.com/contacts/v1/contact/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${hubspotApiKey}`
      //   },
      //   body: JSON.stringify({
      //     properties: [
      //       { property: 'email', value: lead.email },
      //       { property: 'firstname', value: lead.name?.split(' ')[0] || '' },
      //       { property: 'lastname', value: lead.name?.split(' ')[1] || '' },
      //       { property: 'company', value: lead.company || '' },
      //       { property: 'phone', value: lead.phone || '' },
      //       { property: 'message', value: lead.message || '' },
      //       { property: 'source', value: lead.source || 'website' }
      //     ]
      //   })
      // });
      // const data = await response.json();
      // console.log('HubSpot response:', data);
    }
  } catch (error) {
    console.error('Error sending lead to HubSpot:', error);
  }
};
