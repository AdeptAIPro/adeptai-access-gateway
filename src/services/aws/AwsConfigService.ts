
import { getEnvVar, setEnvVar } from '@/utils/env-utils';
import { S3Client } from '@aws-sdk/client-s3';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { handleError, ErrorType } from '@/utils/error-handler';

// Define bucket names
export const TASK_DATA_BUCKET = 'adeptai-task-data';
export const MODEL_ARTIFACTS_BUCKET = 'adeptai-model-artifacts';

// Store clients to be reused across the application
let s3ClientInstance: S3Client | null = null;
let dynamoDBClientInstance: DynamoDBClient | null = null;

/**
 * Check if AWS credentials are valid by attempting to instantiate clients
 */
export const checkAwsCredentials = async (): Promise<boolean> => {
  try {
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
    
    // In production, we would verify these credentials by making a test call
    // For demo purposes, we'll just initialize S3 client with error handling
    try {
      const s3 = getS3Client();
      const dynamoDB = getDynamoDBClient();
      
      // In a real implementation, we'd make a lightweight call to verify access
      // For example: await s3.send(new HeadBucketCommand({ Bucket: TASK_DATA_BUCKET }));
      
      console.log("AWS clients initialized successfully");
      return true;
    } catch (error) {
      console.error("Failed to initialize AWS clients:", error);
      return false;
    }
  } catch (error) {
    handleError({
      type: ErrorType.CONFIGURATION,
      message: "Error checking AWS credentials",
      userFriendlyMessage: "Unable to verify AWS credentials",
      originalError: error
    }, true);
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
  
  // Reset existing clients to force recreation with new credentials
  s3ClientInstance = null;
  dynamoDBClientInstance = null;
  
  console.log("AWS configuration initialized");
};

/**
 * Get S3 client instance (create if doesn't exist)
 */
export const getS3Client = (): S3Client => {
  if (!s3ClientInstance) {
    const region = getEnvVar('AWS_REGION', '');
    const accessKeyId = getEnvVar('AWS_ACCESS_KEY_ID', '');
    const secretAccessKey = getEnvVar('AWS_SECRET_ACCESS_KEY', '');
    
    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error("AWS credentials not configured");
    }
    
    s3ClientInstance = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    });
  }
  
  return s3ClientInstance;
};

/**
 * Get DynamoDB client instance (create if doesn't exist)
 */
export const getDynamoDBClient = (): DynamoDBClient => {
  if (!dynamoDBClientInstance) {
    const region = getEnvVar('AWS_REGION', '');
    const accessKeyId = getEnvVar('AWS_ACCESS_KEY_ID', '');
    const secretAccessKey = getEnvVar('AWS_SECRET_ACCESS_KEY', '');
    
    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error("AWS credentials not configured");
    }
    
    dynamoDBClientInstance = new DynamoDBClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    });
  }
  
  return dynamoDBClientInstance;
};

/**
 * Clear AWS credentials and reset clients
 */
export const clearAwsConfig = (): void => {
  localStorage.removeItem('AWS_REGION');
  localStorage.removeItem('AWS_ACCESS_KEY_ID');
  localStorage.removeItem('AWS_SECRET_ACCESS_KEY');
  
  s3ClientInstance = null;
  dynamoDBClientInstance = null;
  
  console.log("AWS configuration cleared");
};

// Export client instances for use throughout the application
export const s3Client = {
  send: async (command: any) => {
    try {
      return await getS3Client().send(command);
    } catch (error) {
      handleError({
        type: ErrorType.AWS,
        message: "S3 operation failed",
        userFriendlyMessage: "Storage operation failed",
        originalError: error
      }, true);
      throw error;
    }
  }
};

export const dynamoDBClient = {
  send: async (command: any) => {
    try {
      return await getDynamoDBClient().send(command);
    } catch (error) {
      handleError({
        type: ErrorType.AWS,
        message: "DynamoDB operation failed",
        userFriendlyMessage: "Database operation failed",
        originalError: error
      }, true);
      throw error;
    }
  }
};
