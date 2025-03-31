
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
  score?: number; // AI-generated lead score (0-100)
  scoringFactors?: string[]; // Factors that contributed to the score
}

export interface LeadFilter {
  status?: string;
  source?: string;
  dateFrom?: Date;
  dateTo?: Date;
  minScore?: number; // Filter by minimum lead score
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

// User role types for role-based access control
export type UserRole = 'admin' | 'sales' | 'marketing' | 'leadership';

export interface UserRolePermissions {
  viewCRM: boolean;
  viewDashboard: boolean;
  editLeads: boolean;
  viewAnalytics: boolean;
}
