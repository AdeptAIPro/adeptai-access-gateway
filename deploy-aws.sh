
#!/bin/bash

# This script deploys the necessary AWS infrastructure for the application

echo "🚀 Deploying AWS infrastructure..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
  echo "❌ AWS CLI not found. Please install it first."
  exit 1
fi

# Check if AWS credentials are set
if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
  echo "❌ AWS credentials not set. Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY."
  exit 1
fi

# Set AWS region if not already set
AWS_REGION=${AWS_REGION:-"us-east-1"}
echo "Using AWS region: $AWS_REGION"

# Create DynamoDB tables
echo "Creating DynamoDB tables..."

# adept-talents table
aws dynamodb create-table \
  --table-name adept-talents \
  --attribute-definitions AttributeName=id,AttributeType=S AttributeName=tenantId,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --global-secondary-indexes \
    "IndexName=TenantIndex,KeySchema=[{AttributeName=tenantId,KeyType=HASH}],Projection={ProjectionType=ALL}" \
  --billing-mode PAY_PER_REQUEST \
  --region $AWS_REGION

# adept-jobs table
aws dynamodb create-table \
  --table-name adept-jobs \
  --attribute-definitions AttributeName=id,AttributeType=S AttributeName=tenantId,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --global-secondary-indexes \
    "IndexName=TenantIndex,KeySchema=[{AttributeName=tenantId,KeyType=HASH}],Projection={ProjectionType=ALL}" \
  --billing-mode PAY_PER_REQUEST \
  --region $AWS_REGION

# adept-matches table
aws dynamodb create-table \
  --table-name adept-matches \
  --attribute-definitions AttributeName=id,AttributeType=S AttributeName=tenantId,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --global-secondary-indexes \
    "IndexName=TenantIndex,KeySchema=[{AttributeName=tenantId,KeyType=HASH}],Projection={ProjectionType=ALL}" \
  --billing-mode PAY_PER_REQUEST \
  --region $AWS_REGION

# adept-tasks table
aws dynamodb create-table \
  --table-name adept-tasks \
  --attribute-definitions AttributeName=id,AttributeType=S AttributeName=tenantId,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --global-secondary-indexes \
    "IndexName=TenantIndex,KeySchema=[{AttributeName=tenantId,KeyType=HASH}],Projection={ProjectionType=ALL}" \
  --billing-mode PAY_PER_REQUEST \
  --region $AWS_REGION

# adept-agents table
aws dynamodb create-table \
  --table-name adept-agents \
  --attribute-definitions AttributeName=id,AttributeType=S AttributeName=tenantId,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --global-secondary-indexes \
    "IndexName=TenantIndex,KeySchema=[{AttributeName=tenantId,KeyType=HASH}],Projection={ProjectionType=ALL}" \
  --billing-mode PAY_PER_REQUEST \
  --region $AWS_REGION

# adept-users table
aws dynamodb create-table \
  --table-name adept-users \
  --attribute-definitions AttributeName=id,AttributeType=S AttributeName=tenantId,AttributeType=S AttributeName=email,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --global-secondary-indexes \
    "IndexName=TenantIndex,KeySchema=[{AttributeName=tenantId,KeyType=HASH}],Projection={ProjectionType=ALL}" \
    "IndexName=EmailIndex,KeySchema=[{AttributeName=email,KeyType=HASH}],Projection={ProjectionType=ALL}" \
  --billing-mode PAY_PER_REQUEST \
  --region $AWS_REGION

# adept-tenants table
aws dynamodb create-table \
  --table-name adept-tenants \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region $AWS_REGION

# Create S3 buckets
echo "Creating S3 buckets..."

# adept-resumes bucket
aws s3 mb s3://adept-resumes --region $AWS_REGION
aws s3api put-bucket-encryption \
  --bucket adept-resumes \
  --server-side-encryption-configuration \
    '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}' \
  --region $AWS_REGION

# adept-profile-images bucket
aws s3 mb s3://adept-profile-images --region $AWS_REGION
aws s3api put-bucket-encryption \
  --bucket adept-profile-images \
  --server-side-encryption-configuration \
    '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}' \
  --region $AWS_REGION

# adept-job-descriptions bucket
aws s3 mb s3://adept-job-descriptions --region $AWS_REGION
aws s3api put-bucket-encryption \
  --bucket adept-job-descriptions \
  --server-side-encryption-configuration \
    '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}' \
  --region $AWS_REGION

# adept-task-artifacts bucket
aws s3 mb s3://adept-task-artifacts --region $AWS_REGION
aws s3api put-bucket-encryption \
  --bucket adept-task-artifacts \
  --server-side-encryption-configuration \
    '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}' \
  --region $AWS_REGION

echo "✅ AWS infrastructure deployment complete!"
echo "Next steps:"
echo "1. Deploy Lambda functions"
echo "2. Configure API Gateway"
echo "3. Set up IAM roles and policies"
