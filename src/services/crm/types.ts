
/**
 * Types for CRM data
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

// HubSpot contact interface
export interface HubspotContact {
  id: string;
  properties: {
    email: string;
    firstname?: string;
    lastname?: string;
    company?: string;
    phone?: string;
    createdate: string;
    [key: string]: any;
  };
  createdAt: string;
  updatedAt: string;
}
