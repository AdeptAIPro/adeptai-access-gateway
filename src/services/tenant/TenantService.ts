
/**
 * Service for managing multi-tenancy
 * This ensures proper isolation between different customers' data
 */

import { lambdaApi } from '../backend-api/LambdaApiClient';
import { USER_MANAGEMENT_LAMBDA } from '../aws/config';
import { useAuth } from '@/hooks/use-auth';

/**
 * Get the current tenant ID from the authentication context
 */
export const getCurrentTenantId = (): string => {
  try {
    const auth = useAuth();
    return auth.user?.tenantId || '';
  } catch (error) {
    console.warn('Could not get tenant ID from auth context');
    return '';
  }
};

/**
 * Ensure all requests include the tenant ID for proper data isolation
 */
export const withTenantContext = <T extends object>(data: T): T & { tenantId: string } => {
  const tenantId = getCurrentTenantId();
  return {
    ...data,
    tenantId
  };
};

/**
 * Get tenant details
 */
export const getTenantDetails = async (): Promise<any> => {
  const tenantId = getCurrentTenantId();
  
  if (!tenantId) {
    throw new Error('No tenant ID available');
  }
  
  return lambdaApi.invoke(
    USER_MANAGEMENT_LAMBDA,
    'getTenantDetails',
    { tenantId }
  );
};

/**
 * Check if multiple tenants are supported in the current deployment
 */
export const isMultiTenancyEnabled = (): boolean => {
  return import.meta.env.VITE_MULTI_TENANCY_ENABLED === 'true';
};

/**
 * Types for tenant management
 */
export interface Tenant {
  id: string;
  name: string;
  createdAt: string;
  status: 'active' | 'suspended' | 'trial';
  planId: string;
  settings: {
    branding: {
      primaryColor?: string;
      logo?: string;
    };
    features: {
      [feature: string]: boolean;
    };
  };
}

