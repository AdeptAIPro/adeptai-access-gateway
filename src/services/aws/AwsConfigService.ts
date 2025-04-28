
import { getEnvVar, setEnvVar } from '@/utils/env-utils';
import { S3Client, ListBucketsCommand, HeadBucketCommand } from '@aws-sdk/client-s3';
import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { handleError, ErrorType } from '@/utils/error-handler';
import { toast } from 'sonner';

// Define bucket names
export const TASK_DATA_BUCKET = 'adeptai-task-data';
export const MODEL_ARTIFACTS_BUCKET = 'adeptai-model-artifacts';

// Define table names
export const TASKS_TABLE = 'adeptai-tasks';
export const AGENTS_TABLE = 'adeptai-agents';

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
    
    try {
      const s3 = getS3Client();
      const dynamoDB = getDynamoDBClient();
      
      // Make lightweight calls to verify access
      const s3Response = await s3.send(new ListBucketsCommand({}));
      
      console.log("AWS S3 connection verified successfully");
      return true;
    } catch (error) {
      console.error("Failed to verify AWS access:", error);
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
 * Verify if required S3 buckets exist
 */
export const verifyRequiredBuckets = async (): Promise<{
  success: boolean;
  missingBuckets: string[];
}> => {
  const requiredBuckets = [TASK_DATA_BUCKET, MODEL_ARTIFACTS_BUCKET];
  const missingBuckets: string[] = [];
  
  try {
    const s3Client = getS3Client();
    
    for (const bucket of requiredBuckets) {
      try {
        await s3Client.send(new HeadBucketCommand({ Bucket: bucket }));
        console.log(`Bucket ${bucket} exists`);
      } catch (error) {
        console.warn(`Bucket ${bucket} does not exist or is not accessible`);
        missingBuckets.push(bucket);
      }
    }
    
    return {
      success: missingBuckets.length === 0,
      missingBuckets
    };
  } catch (error) {
    handleError({
      type: ErrorType.AWS,
      message: "Error verifying S3 buckets",
      userFriendlyMessage: "Failed to verify S3 storage buckets",
      originalError: error
    }, true);
    
    return {
      success: false,
      missingBuckets: requiredBuckets
    };
  }
};

/**
 * Verify if required DynamoDB tables exist
 */
export const verifyRequiredTables = async (): Promise<{
  success: boolean;
  missingTables: string[];
}> => {
  const requiredTables = [TASKS_TABLE, AGENTS_TABLE];
  
  try {
    const dynamoClient = getDynamoDBClient();
    const response = await dynamoClient.send(new ListTablesCommand({}));
    const existingTables = response.TableNames || [];
    
    const missingTables = requiredTables.filter(
      table => !existingTables.includes(table)
    );
    
    return {
      success: missingTables.length === 0,
      missingTables
    };
  } catch (error) {
    handleError({
      type: ErrorType.AWS,
      message: "Error verifying DynamoDB tables",
      userFriendlyMessage: "Failed to verify database tables",
      originalError: error
    }, true);
    
    return {
      success: false,
      missingTables: requiredTables
    };
  }
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

/**
 * Check if AWS infrastructure is ready for production use
 */
export const checkAwsInfrastructure = async (): Promise<{
  ready: boolean;
  issues: string[];
}> => {
  const issues: string[] = [];
  
  try {
    // Check credentials
    const credentialsValid = await checkAwsCredentials();
    if (!credentialsValid) {
      issues.push("AWS credentials are invalid or missing");
      return { ready: false, issues };
    }
    
    // Check S3 buckets
    const { success: bucketsExist, missingBuckets } = await verifyRequiredBuckets();
    if (!bucketsExist) {
      issues.push(`Missing required S3 buckets: ${missingBuckets.join(", ")}`);
    }
    
    // Check DynamoDB tables
    const { success: tablesExist, missingTables } = await verifyRequiredTables();
    if (!tablesExist) {
      issues.push(`Missing required DynamoDB tables: ${missingTables.join(", ")}`);
    }
    
    return {
      ready: bucketsExist && tablesExist,
      issues
    };
  } catch (error) {
    handleError({
      type: ErrorType.AWS,
      message: "Error checking AWS infrastructure",
      userFriendlyMessage: "Failed to verify AWS infrastructure readiness",
      originalError: error
    }, true);
    
    issues.push("Error occurred while checking AWS infrastructure");
    return { ready: false, issues };
  }
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
