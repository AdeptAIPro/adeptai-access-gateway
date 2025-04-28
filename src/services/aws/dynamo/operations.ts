
import { DynamoDBClient, GetItemCommand, QueryCommand, ScanCommand, UpdateItemCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { handleError, ErrorType } from '@/utils/error-handler';

// Helper function to handle DynamoDB operations with error handling
export async function executeDynamoDBOperation<T>(operation: () => Promise<T>, errorMessage: string): Promise<T> {
  try {
    return await operation();
  } catch (error: any) {
    if (error.name === "CredentialsProviderError" || 
        error.name === "ResourceNotFoundException" ||
        error.message.includes("credentials")) {
      console.warn("Using mock data due to: ", error.message);
      throw error;
    }
    
    handleError({
      type: ErrorType.DATABASE,
      message: errorMessage,
      userFriendlyMessage: "Database operation failed",
      originalError: error,
      context: { operation: errorMessage }
    }, true);
    
    throw error;
  }
}

// Query helper functions
export async function executeQuery(query: string, params: any[]): Promise<any[]> {
  console.log('Executing query:', query, params);
  
  if (query.toLowerCase().includes('candidates')) {
    return [
      {
        id: 'c1',
        name: 'Jane Smith',
        skills: ['JavaScript', 'React', 'Node.js'],
        experience: 4
      },
      {
        id: 'c2',
        name: 'John Doe',
        skills: ['Python', 'Django', 'React'],
        experience: 3
      }
    ];
  }
  
  return [];
}
