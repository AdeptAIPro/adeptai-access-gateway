
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Command } from "@aws-sdk/smithy-client";

// Initialize the DynamoDB client
let dynamoClient: DynamoDBClient | null = null;

/**
 * Get the DynamoDB client instance, creating it if necessary
 */
export const getDynamoDBClient = (): DynamoDBClient => {
  if (!dynamoClient) {
    // Get region from environment or use a default
    const region = getEnvVar('AWS_REGION', 'us-east-1');
    
    dynamoClient = new DynamoDBClient({ 
      region,
      // Add credentials if available
      credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
        ? {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          }
        : undefined
    });
  }
  return dynamoClient;
};

/**
 * Utility to get environment variables with defaults
 */
export const getEnvVar = (name: string, defaultValue: string): string => {
  return process.env[name] || defaultValue;
};

/**
 * Execute a DynamoDB operation with error handling
 */
export const executeDbOperation = async <T>(command: Command<any, T, any, any, any>): Promise<T> => {
  try {
    const client = getDynamoDBClient();
    return await client.send(command);
  } catch (error) {
    console.error(`DynamoDB operation failed: ${error}`);
    throw error;
  }
};

/**
 * Mock implementation for development environments
 * This will return mock data when no actual DynamoDB is available
 */
export const executeMockDbOperation = async <T>(mockData: T): Promise<T> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockData;
};
