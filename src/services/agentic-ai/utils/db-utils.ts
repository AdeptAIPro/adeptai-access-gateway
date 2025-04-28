
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// Initialize DynamoDB client
export const ddbClient = new DynamoDBClient({ 
  region: getEnvVar('AWS_REGION', 'us-east-1'),
  credentials: {
    accessKeyId: getEnvVar('AWS_ACCESS_KEY_ID', 'AKIAxxxxxxxxxxxxx'),
    secretAccessKey: getEnvVar('AWS_SECRET_ACCESS_KEY', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
  }
});

// Get environment variables safely with fallbacks
export const getEnvVar = (key: string, fallback: string): string => {
  try {
    return (import.meta.env?.[key] || import.meta.env?.[`VITE_${key}`] || fallback) as string;
  } catch (e) {
    return fallback;
  }
};

// Utility function to handle DynamoDB operations
export const executeDbOperation = async (command: any) => {
  try {
    const response = await ddbClient.send(command);
    return response;
  } catch (error) {
    console.error("DynamoDB operation failed:", error);
    throw error;
  }
};
