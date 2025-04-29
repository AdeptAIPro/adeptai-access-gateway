
/**
 * AWS service endpoints and configuration
 */

// Lambda function names
export const USER_MANAGEMENT_LAMBDA = "adept-user-management";
export const TALENT_MATCH_LAMBDA = "adept-talent-match";
export const DATA_IMPORT_LAMBDA = "adept-data-import";
export const ERROR_REPORTING_LAMBDA = "adept-error-reporting";
export const AI_PROCESSING_LAMBDA = "adept-ai-processing";
export const RESUME_PARSING_LAMBDA = "adept-resume-parsing";
export const INTEGRATION_LAMBDA = "adept-integration-service";
export const PAYMENT_LAMBDA = "adept-payment-service";
export const CRM_LAMBDA = "adept-crm-service";

// API Gateway endpoints
export const API_GATEWAY_BASE_URL = import.meta.env.VITE_API_GATEWAY_BASE_URL || "https://api.adeptaipro.com";
export const API_VERSION = "v1";

// S3 Bucket names
export const RESUME_BUCKET = "adept-resumes";
export const PROFILE_IMAGES_BUCKET = "adept-profile-images";
export const JOB_DESCRIPTIONS_BUCKET = "adept-job-descriptions";
export const TASK_ARTIFACTS_BUCKET = "adept-task-artifacts";

// Region configuration
export const AWS_REGION = import.meta.env.VITE_AWS_REGION || "us-east-1";
