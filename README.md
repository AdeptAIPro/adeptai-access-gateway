
# Enterprise Ready SaaS Application

This application follows enterprise-level architecture best practices for security, scalability and multi-tenancy.

## Architecture Overview

- **Frontend**: React/TypeScript application with secure API access
- **Backend**: AWS Serverless architecture (Lambda, DynamoDB, S3)
- **Security**: Tenant isolation, IAM roles, encrypted data at rest and in transit
- **Scalability**: Auto-scaling serverless infrastructure

## Security Implementation

- **Multi-Tenant Architecture**: All data is isolated by tenant ID
- **No Direct DB Access**: Frontend never accesses databases directly
- **No Client-Side API Keys**: All external API calls are proxied through backend Lambda functions
- **Secure Authentication**: Token-based authentication with proper session management

## Setup Instructions

1. Clone the repository
2. Run `npm install` to install dependencies
3. Configure AWS credentials:
   - Set AWS_REGION
   - Set AWS_ACCESS_KEY_ID
   - Set AWS_SECRET_ACCESS_KEY
4. Run `./fix-all-issues.sh` to ensure proper setup
5. Start the development server with `./run-vite.sh`

## AWS Resources Required

- Lambda functions:
  - talent-match-processor
  - user-management
  - agentic-task-processor
- DynamoDB tables:
  - adept-talents
  - adept-jobs
  - adept-matches
  - adept-tasks
  - adept-agents
  - adept-users
  - adept-tenants
- S3 buckets:
  - adept-resumes
  - adept-profile-images
  - adept-job-descriptions
  - adept-task-artifacts

## Directory Structure

- `/src/components`: UI components
- `/src/services`: Service layer for business logic
  - `/src/services/aws`: AWS service clients
  - `/src/services/backend-api`: Centralized API client for Lambda
  - `/src/services/ai`: Secure AI services
- `/src/utils`: Utility functions

## Development Guidelines

1. **Never** store API keys in frontend code
2. **Always** go through Lambda backend for any data operations
3. **Always** include tenant ID in requests for proper data isolation
4. **Use** proper error handling for all AWS operations
