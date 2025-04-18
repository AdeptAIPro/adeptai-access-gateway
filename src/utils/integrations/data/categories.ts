
export interface Integration {
  id: string;
  name: string;
  description: string;
  icon?: string;
  status: 'active' | 'coming_soon' | 'beta';
  url?: string;
  popular?: boolean;
  logoUrl?: string;
}

export interface IntegrationCategory {
  id: string;
  name: string;
  description: string;
  list: Integration[];
}
