
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { S3Client } from "@aws-sdk/client-s3";

// AWS Region
const REGION = "us-east-1"; // Default region, can be overridden with environment variables

// Initialize DynamoDB client
export const dynamoDbClient = new DynamoDBClient({
  region: REGION,
  // Credentials are managed via environment variables or IAM roles
  // AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
});

// Initialize the DynamoDB Document client (easier to use than the regular client)
export const docClient = DynamoDBDocumentClient.from(dynamoDbClient);

// Initialize S3 client
export const s3Client = new S3Client({
  region: REGION,
  // Credentials are managed via environment variables or IAM roles
});

// Table names for DynamoDB
export const TASKS_TABLE = "AgenticTasks";
export const AGENTS_TABLE = "AgenticAgents";
export const RESULTS_TABLE = "AgenticResults";

// S3 bucket names
export const TASK_DATA_BUCKET = "agentic-task-data";
export const MODEL_ARTIFACTS_BUCKET = "agentic-model-artifacts";

// Check if AWS credentials are configured
export const checkAwsCredentials = async (): Promise<boolean> => {
  try {
    // Try a simple operation to verify credentials
    const command = {
      TableName: AGENTS_TABLE,
      Limit: 1,
    };
    await docClient.send(command);
    return true;
  } catch (error) {
    console.error("AWS credentials check failed:", error);
    return false;
  }
};
