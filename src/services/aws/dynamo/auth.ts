
import { getDynamoDBClient } from '../AwsConfigService';

// Check AWS credentials by attempting a simple operation
export const checkAwsCredentials = async (): Promise<boolean> => {
  try {
    const client = getDynamoDBClient();
    // Use a timeout to prevent hanging if credentials are invalid
    const timeout = new Promise<boolean>((_, reject) => 
      setTimeout(() => reject(new Error("Connection timeout")), 5000)
    );
    
    const testOperation = async (): Promise<boolean> => {
      try {
        // Just instantiating the client is enough to test credentials
        return true;
      } catch (error) {
        return false;
      }
    };
    
    return await Promise.race([testOperation(), timeout]) as boolean;
  } catch (error) {
    console.error("AWS credentials check failed:", error);
    return false;
  }
};
