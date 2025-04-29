
export interface UserRolePermissions {
  viewCRM: boolean;
  editCRM: boolean;
  viewPayroll: boolean;
  runPayroll: boolean;
  viewAnalytics: boolean;
  viewDashboard: boolean;
  [key: string]: boolean;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  status?: 'lead' | 'customer' | 'prospect';
  lastContact?: string;
  nextContactDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Deal {
  id: string;
  name: string;
  value: number;
  stage: string;
  contactId: string;
  closingDate?: string;
  probability?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  name: string;
  website?: string;
  industry?: string;
  size?: string;
  revenue?: number;
  location?: string;
  contacts?: string[];
  deals?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'task' | 'note';
  subject: string;
  description?: string;
  date: string;
  duration?: number;
  contactId?: string;
  dealId?: string;
  companyId?: string;
  userId: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
