
/**
 * LambdaApiClient - A secure API client for AWS Lambda interactions
 * 
 * This client handles all communication between the frontend and AWS Lambda functions,
 * enforcing secure practices like:
 * - Adding authentication headers
 * - Tenant isolation
 * - Error handling
 * - Logging
 */

import { getTenantContext } from '../tenant/TenantService';
import { ErrorType, handleError } from '@/utils/error-handler';
import { API_GATEWAY_BASE_URL, API_VERSION } from '../aws/config';
import { toast } from 'sonner';

class LambdaApiClient {
  private apiBaseUrl: string;
  
  constructor() {
    this.apiBaseUrl = API_GATEWAY_BASE_URL || 'https://api.adeptaipro.com';
  }
  
  /**
   * Invoke a Lambda function through API Gateway
   * 
   * @param functionName The Lambda function to invoke
   * @param action The specific action to perform
   * @param payload The data to send to the Lambda function
   * @returns The response from the Lambda function
   */
  async invoke<TPayload, TResponse>(
    functionName: string,
    action: string,
    payload: TPayload
  ): Promise<TResponse> {
    try {
      // Get authentication token from storage
      const token = localStorage.getItem('auth_token');
      if (!token) {
        console.warn('No authentication token found. Proceeding with unauthenticated request.');
      }
      
      // Get tenant context for multi-tenancy
      const tenantContext = getTenantContext();
      
      // Build request with tenant and auth context
      const requestPayload = {
        action,
        payload,
        meta: {
          ...tenantContext,
          authToken: token,
          timestamp: new Date().toISOString()
        }
      };
      
      // Log outgoing requests in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`Invoking ${functionName}:${action}`, requestPayload);
      }
      
      // Make the request
      const response = await fetch(`${this.apiBaseUrl}/${API_VERSION}/functions/${functionName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
          'X-Tenant-ID': tenantContext.tenantId || 'default',
          'X-API-Version': API_VERSION
        },
        body: JSON.stringify(requestPayload)
      });
      
      // Handle HTTP errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error ${response.status}`);
      }
      
      // Parse response
      const data = await response.json();
      
      // Check for API-level errors
      if (data.error) {
        throw new Error(data.error);
      }
      
      return data as TResponse;
    } catch (error) {
      // Handle errors with centralized error handler
      handleError({
        type: ErrorType.API,
        message: `Error invoking Lambda function ${functionName}:${action}`,
        userFriendlyMessage: `Operation failed. Please try again later.`,
        originalError: error
      }, true);
      
      // Rethrow to allow component-level handling
      throw error;
    }
  }
}

// Export a singleton instance
export const lambdaApi = new LambdaApiClient();
