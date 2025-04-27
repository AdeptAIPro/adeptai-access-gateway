
import { getEnvVar, setEnvVar } from '@/utils/env-utils';

/**
 * Check if AWS credentials are valid
 */
export const checkAwsCredentials = async (): Promise<boolean> => {
  try {
    // This is a mock implementation since we can't make real AWS API calls from the client
    // In a real application, you would make an API call to your backend which would verify the credentials
    
    const region = getEnvVar('AWS_REGION', '');
    const accessKeyId = getEnvVar('AWS_ACCESS_KEY_ID', '');
    const secretAccessKey = getEnvVar('AWS_SECRET_ACCESS_KEY', '');
    
    // Basic validation
    if (!region || !accessKeyId || !secretAccessKey) {
      console.error("Missing AWS credentials");
      return false;
    }
    
    if (accessKeyId.length < 16 || secretAccessKey.length < 16) {
      console.warn("AWS credentials look incomplete");
    }
    
    // In a real app, you would verify these credentials
    // For demo purposes, we'll just consider them valid if they're provided
    console.log("AWS credentials seem valid (demo mode)");
    return true;
  } catch (error) {
    console.error("Error checking AWS credentials:", error);
    return false;
  }
};

/**
 * Initialize AWS configuration with credentials
 */
export const initializeAwsConfig = (
  region: string,
  accessKeyId: string,
  secretAccessKey: string
): void => {
  // Store in localStorage for use across the application
  setEnvVar('AWS_REGION', region);
  setEnvVar('AWS_ACCESS_KEY_ID', accessKeyId);
  setEnvVar('AWS_SECRET_ACCESS_KEY', secretAccessKey);
  
  console.log("AWS configuration initialized");
};
