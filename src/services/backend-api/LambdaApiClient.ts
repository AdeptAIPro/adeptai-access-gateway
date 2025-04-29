
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { lambdaClient } from '../aws/config';
import { getEnvVar } from '@/utils/env-utils';
import { ErrorType, handleError } from '@/utils/error-handler';

/**
 * Central API client for calling Lambda functions
 * All API calls should go through this client instead of direct service calls
 */
export class LambdaApiClient {
  private tenantId: string;
  private authToken?: string;
  
  constructor() {
    // Get tenant ID from environment or local storage
    this.tenantId = getEnvVar('TENANT_ID', 'default');
    // Get auth token from local storage if available
    this.authToken = localStorage.getItem('auth_token') || undefined;
  }
  
  /**
   * Invoke a Lambda function with the specified action and payload
   */
  async invoke<T, R>(functionName: string, action: string, payload: T): Promise<R> {
    try {
      // Add tenant ID and auth token to all requests for multi-tenancy and security
      const requestPayload = {
        action,
        payload,
        meta: {
          tenantId: this.tenantId,
          authToken: this.authToken,
          timestamp: new Date().toISOString()
        }
      };
      
      // Log API call for debugging (remove in production)
      console.log(`Invoking Lambda: ${functionName}::${action}`);
      
      const command = new InvokeCommand({
        FunctionName: functionName,
        Payload: Buffer.from(JSON.stringify(requestPayload)),
        InvocationType: 'RequestResponse'
      });
      
      const response = await lambdaClient.send(command);
      
      // Parse response payload
      if (!response.Payload) {
        throw new Error('Empty response from Lambda function');
      }
      
      const responseText = Buffer.from(response.Payload).toString();
      const responseData = JSON.parse(responseText);
      
      // Check for Lambda function error
      if (responseData.errorMessage) {
        throw new Error(responseData.errorMessage);
      }
      
      // Return function result
      return responseData as R;
    } catch (error: any) {
      // Handle error properly
      return handleError({
        type: ErrorType.API,
        message: `Error calling Lambda function ${functionName}::${action}`,
        userFriendlyMessage: 'An error occurred while processing your request',
        originalError: error
      }, true) as any;
    }
  }
  
  /**
   * Set the current tenant ID
   */
  setTenantId(tenantId: string): void {
    this.tenantId = tenantId;
  }
  
  /**
   * Set the authentication token
   */
  setAuthToken(token: string | undefined): void {
    this.authToken = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }
}

// Export a singleton instance
export const lambdaApi = new LambdaApiClient();
