
import { lambdaApi } from '../backend-api/LambdaApiClient';
import { User } from '@/types/auth-types';
import { USER_MANAGEMENT_LAMBDA } from '../aws/config';

export class AuthService {
  /**
   * Login using Lambda backend with multi-tenant awareness
   */
  async login(email: string, password: string, tenantId: string): Promise<User> {
    // Set tenant ID before making the request
    lambdaApi.setTenantId(tenantId);
    
    const result = await lambdaApi.invoke<
      { email: string; password: string },
      { user: User; token: string }
    >(
      USER_MANAGEMENT_LAMBDA,
      'login',
      { email, password }
    );
    
    // Save the auth token
    lambdaApi.setAuthToken(result.token);
    
    return result.user;
  }
  
  /**
   * Register using Lambda backend
   */
  async register(name: string, email: string, password: string, tenantId: string): Promise<User> {
    // Set tenant ID before making the request
    lambdaApi.setTenantId(tenantId);
    
    const result = await lambdaApi.invoke<
      { name: string; email: string; password: string },
      { user: User; token: string }
    >(
      USER_MANAGEMENT_LAMBDA,
      'register',
      { name, email, password }
    );
    
    // Save the auth token
    lambdaApi.setAuthToken(result.token);
    
    return result.user;
  }
  
  /**
   * Logout
   */
  logout(): void {
    lambdaApi.setAuthToken(undefined);
  }
  
  /**
   * Get the current user
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const result = await lambdaApi.invoke<
        void,
        { user: User | null }
      >(
        USER_MANAGEMENT_LAMBDA,
        'getCurrentUser',
        {}
      );
      
      return result.user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }
  
  /**
   * Check if the user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
  
  /**
   * Set tenant
   */
  setTenant(tenantId: string): void {
    lambdaApi.setTenantId(tenantId);
    localStorage.setItem('TENANT_ID', tenantId);
  }
  
  /**
   * Get current tenant
   */
  getCurrentTenant(): string {
    return localStorage.getItem('TENANT_ID') || 'default';
  }
}

// Export a singleton instance
export const authService = new AuthService();
