
// Type definitions for Agent
import { UserRolePermissions } from './auth-types';

declare global {
  interface Agent {
    id: string;
    name: string;
    description: string;
    capabilities: string[];
    icon?: string;
    status: 'active' | 'inactive' | 'maintenance';
    specialties?: string[];
    version?: string;
    restrictions?: string[];
    type?: string;
    createdAt?: string;
  }
}

export {};
