
export interface Lead {
  id?: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  source: string;
  status?: string;
  created_at?: string;
  score?: number;
  scoringFactors?: string[];
}

export interface UserRolePermissions {
  viewCRM: boolean;
  editCRM: boolean;
  viewPayroll: boolean;
  runPayroll: boolean;
  viewAnalytics: boolean;
  viewDashboard: boolean; // Added this needed permission
  // Add other permissions as needed
}

export interface LeadFilter {
  status?: string;
  source?: string;
  fromDate?: Date;
  toDate?: Date;
  minScore?: number;
}

export interface TalentSource {
  id: string;
  name: string;
  connected: boolean;
  count?: number;
  lastSync?: string;
}

export interface EnrichmentTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: "leads" | "talents" | "both";
  configured: boolean;
}
