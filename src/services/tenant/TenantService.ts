
/**
 * TenantService - Provides multi-tenant isolation functionality
 * 
 * This service helps implement secure multi-tenancy by:
 * - Managing tenant context for all API calls
 * - Providing tenant-specific storage isolation
 * - Enforcing tenant boundaries for data access
 */

// Default tenant ID for single-tenant mode
const DEFAULT_TENANT_ID = 'default';

// Storage key for tenant context
const TENANT_CONTEXT_KEY = 'adept_tenant_context';

// Tenant context interface
export interface TenantContext {
  tenantId: string;
  tenantName?: string;
  tier?: string;
  features?: string[];
}

/**
 * Get the current tenant context
 */
export const getTenantContext = (): TenantContext => {
  try {
    const storedContext = localStorage.getItem(TENANT_CONTEXT_KEY);
    if (storedContext) {
      return JSON.parse(storedContext) as TenantContext;
    }
  } catch (error) {
    console.error('Error getting tenant context:', error);
  }
  
  // Return default context if none exists
  return { tenantId: DEFAULT_TENANT_ID };
};

/**
 * Set the current tenant context
 */
export const setTenantContext = (context: TenantContext): void => {
  try {
    localStorage.setItem(TENANT_CONTEXT_KEY, JSON.stringify(context));
    console.log(`Tenant context set to ${context.tenantId}`);
  } catch (error) {
    console.error('Error setting tenant context:', error);
  }
};

/**
 * Get the current tenant ID
 */
export const getCurrentTenantId = (): string => {
  return getTenantContext().tenantId || DEFAULT_TENANT_ID;
};

/**
 * Add tenant context to an object
 * Used for adding tenant metadata to resources
 */
export const withTenantContext = <T extends Record<string, any>>(obj: T): T & { tenantId: string } => {
  const tenantId = getCurrentTenantId();
  return {
    ...obj,
    tenantId
  };
};

/**
 * Initialize tenant context from user information
 */
export const initializeTenantFromUser = (user: any): void => {
  if (user && user.tenantId) {
    setTenantContext({
      tenantId: user.tenantId,
      tenantName: user.tenantName || user.organization,
      tier: user.tier,
      features: user.features
    });
    console.log(`Tenant initialized from user: ${user.tenantId}`);
  } else {
    console.warn('User object missing tenant information');
  }
};
