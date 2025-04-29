
import { S3Client } from '@aws-sdk/client-s3';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { LambdaClient } from '@aws-sdk/client-lambda';
import { getEnvVar } from '@/utils/env-utils';

// Get AWS configuration from environment variables
const region = getEnvVar('AWS_REGION', 'us-east-1');
const accessKeyId = getEnvVar('AWS_ACCESS_KEY_ID', '');
const secretAccessKey = getEnvVar('AWS_SECRET_ACCESS_KEY', '');

// Base AWS configuration
const awsConfig = {
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
};

// Create centralized clients
export const s3Client = new S3Client(awsConfig);
export const dynamoDbClient = new DynamoDBClient(awsConfig);
export const lambdaClient = new LambdaClient(awsConfig);

// Export configurations for Lambda functions
export const TALENT_MATCH_LAMBDA = 'talent-match-processor';
export const USER_MANAGEMENT_LAMBDA = 'user-management';
export const TASK_PROCESSOR_LAMBDA = 'agentic-task-processor';

// Export configurations for DynamoDB tables
export const TALENTS_TABLE = 'adept-talents';
export const JOBS_TABLE = 'adept-jobs';
export const MATCHES_TABLE = 'adept-matches';
export const TASKS_TABLE = 'adept-tasks';
export const AGENTS_TABLE = 'adept-agents';
export const USERS_TABLE = 'adept-users';
export const TENANTS_TABLE = 'adept-tenants';

// Export configurations for S3 buckets
export const RESUMES_BUCKET = 'adept-resumes';
export const PROFILE_IMAGES_BUCKET = 'adept-profile-images';
export const JOB_DESCRIPTIONS_BUCKET = 'adept-job-descriptions';
export const TASK_ARTIFACTS_BUCKET = 'adept-task-artifacts';

// Helper to check if AWS credentials are configured
export const isAwsConfigured = (): boolean => {
  return !!accessKeyId && !!secretAccessKey;
};

// Helper for multi-tenancy - append tenant ID to resource identifiers
export const getTenantResourceId = (baseId: string, tenantId: string): string => {
  return `${tenantId}-${baseId}`;
};
