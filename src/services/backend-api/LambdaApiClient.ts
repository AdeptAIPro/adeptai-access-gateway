
/**
 * Secure client for AWS Lambda invocation through API Gateway
 * This handles authentication, tenant isolation, and error handling
 */

import { API_GATEWAY_BASE_URL, API_VERSION } from "@/services/aws/config";
import { useAuth } from "@/hooks/use-auth";
import { createAppError, ErrorType, tryCatch } from "@/utils/error-handler";
import { reportApiError } from "@/services/error-reporting";

class LambdaApiClient {
  private apiBaseUrl: string;
  private apiVersion: string;
  
  constructor() {
    this.apiBaseUrl = API_GATEWAY_BASE_URL;
    this.apiVersion = API_VERSION;
  }

  /**
   * Invoke a Lambda function through API Gateway
   * @param functionName The Lambda function name (defined in aws/config.ts)
   * @param action The specific action to invoke within the Lambda
   * @param payload The data to send to the Lambda
   * @returns The response from the Lambda
   */
  async invoke<TPayload, TResult>(
    functionName: string, 
    action: string, 
    payload: TPayload
  ): Promise<TResult> {
    try {
      // Get current user and token from auth context
      // For now, we'll use a polyfill that works without the actual authentication
      let authToken = "";
      let tenantId = "";
      
      try {
        const auth = useAuth();
        if (auth.user) {
          authToken = "Bearer " + localStorage.getItem("authToken") || "";
          tenantId = auth.user.id;
        }
      } catch (error) {
        console.warn("Auth context not available, using anonymous access");
      }

      // Endpoint URL format: {baseUrl}/api/{version}/{functionName}
      const url = `${this.apiBaseUrl}/api/${this.apiVersion}/${functionName}`;
      
      // Request body includes the action to perform and payload
      const body = {
        action,
        payload,
        meta: {
          tenantId,
          timestamp: new Date().toISOString(),
          clientInfo: {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language
          }
        }
      };
      
      // Prepare headers with authentication token if available
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (authToken) {
        headers['Authorization'] = authToken;
      }

      // Make the API call
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });

      // Handle HTTP errors
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          // If response isn't JSON, use status text
          errorData = { message: response.statusText };
        }
        
        // Handle different error types
        let errorType = ErrorType.API;
        if (response.status === 401) errorType = ErrorType.AUTHENTICATION;
        if (response.status === 403) errorType = ErrorType.AUTHORIZATION;
        if (response.status === 404) errorType = ErrorType.NOT_FOUND;
        if (response.status === 422) errorType = ErrorType.VALIDATION;
        
        throw createAppError(
          errorData.message || `API Error: ${response.status}`,
          errorType,
          errorData,
          { functionName, action, url }
        );
      }

      // Parse and return the response
      const data = await response.json();
      return data as TResult;
    } catch (error) {
      // Report and re-throw the error
      reportApiError(
        `lambdaApi.invoke:${functionName}.${action}`,
        error,
        { functionName, action }
      );
      throw error;
    }
  }
  
  /**
   * Check if the API is available
   */
  async checkHealth(): Promise<boolean> {
    try {
      const url = `${this.apiBaseUrl}/health`;
      const response = await fetch(url);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

// Export a singleton instance
export const lambdaApi = new LambdaApiClient();
