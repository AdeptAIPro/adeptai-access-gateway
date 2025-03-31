
import { supabase } from "@/lib/supabase";
import { Lead, LeadFilter } from "./types";
import { sendToHubSpot } from "./HubspotApiService";

/**
 * Service for managing leads
 */

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
        status: 'new' as const
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
    await sendToHubSpot(lead);
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
      
      // Ensure all leads have proper status type
      return storedLeads.map((lead: any) => ({
        ...lead,
        status: (lead.status || 'new') as Lead['status']
      }));
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
    
    // Ensure proper status typing
    return (data || []).map(lead => ({
      ...lead,
      status: (lead.status || 'new') as Lead['status']
    }));
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
        lead.id === id ? { ...lead, status: status as Lead['status'] } : lead
      );
      localStorage.setItem('adeptai_leads', JSON.stringify(updatedLeads));
      return true;
    }
    
    // Ensure status is valid
    const validStatus = status as Lead['status'];
    
    const { error } = await supabase
      .from('leads')
      .update({ status: validStatus })
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
