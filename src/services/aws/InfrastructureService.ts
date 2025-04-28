
import { handleError, ErrorType } from '@/utils/error-handler';
import { 
  checkAwsInfrastructure,
  TASK_DATA_BUCKET,
  MODEL_ARTIFACTS_BUCKET,
  TASKS_TABLE,
  AGENTS_TABLE
} from './AwsConfigService';

export interface InfrastructureRequirement {
  type: 'bucket' | 'table';
  name: string;
  description: string;
  required: boolean;
}

export interface InfrastructureReport {
  ready: boolean;
  missingComponents: InfrastructureRequirement[];
  cloudFormationTemplate?: string;
}

// Generate infrastructure requirements for application
export const getInfrastructureRequirements = (): InfrastructureRequirement[] => {
  return [
    {
      type: 'bucket',
      name: TASK_DATA_BUCKET,
      description: 'Stores task data for agentic processing',
      required: true
    },
    {
      type: 'bucket',
      name: MODEL_ARTIFACTS_BUCKET,
      description: 'Stores machine learning model artifacts',
      required: true
    },
    {
      type: 'table',
      name: TASKS_TABLE,
      description: 'Stores agentic task data and processing status',
      required: true
    },
    {
      type: 'table',
      name: AGENTS_TABLE,
      description: 'Stores agent definitions and configurations',
      required: true
    }
  ];
};

// Generate simplified CloudFormation template for AWS resources
export const generateCloudFormationTemplate = (): string => {
  const requirements = getInfrastructureRequirements();
  
  let template = `AWSTemplateFormatVersion: '2010-09-09'
Description: 'AdeptAI Application Infrastructure'

Resources:`;

  // Add S3 buckets
  requirements
    .filter(req => req.type === 'bucket')
    .forEach(bucket => {
      template += `
  ${bucket.name.replace(/-/g, '')}:
    Type: 'AWS::S3::Bucket'
    Properties:
      BucketName: ${bucket.name}
      AccessControl: Private
      VersioningConfiguration:
        Status: Enabled`;
    });
    
  // Add DynamoDB tables
  requirements
    .filter(req => req.type === 'table')
    .forEach(table => {
      template += `
  ${table.name.replace(/-/g, '')}:
    Type: 'AWS::DynamoDB::Table'
    Properties:
      TableName: ${table.name}
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
      KeySchema:
        - AttributeName: id
          KeyType: HASH`;
    });
    
  template += `

Outputs:`;

  // Add outputs for S3 buckets
  requirements
    .filter(req => req.type === 'bucket')
    .forEach(bucket => {
      template += `
  ${bucket.name.replace(/-/g, '')}Name:
    Description: Name of the ${bucket.description}
    Value: !Ref ${bucket.name.replace(/-/g, '')}`;
    });
    
  // Add outputs for DynamoDB tables
  requirements
    .filter(req => req.type === 'table')
    .forEach(table => {
      template += `
  ${table.name.replace(/-/g, '')}Name:
    Description: Name of the ${table.description}
    Value: !Ref ${table.name.replace(/-/g, '')}`;
    });
    
  return template;
};

// Generate report on infrastructure readiness
export const getInfrastructureReport = async (): Promise<InfrastructureReport> => {
  try {
    const { ready, issues } = await checkAwsInfrastructure();
    const requirements = getInfrastructureRequirements();
    
    const missingComponents = requirements.filter(req => {
      if (req.type === 'bucket') {
        return issues.some(issue => issue.includes(req.name));
      } else if (req.type === 'table') {
        return issues.some(issue => issue.includes(req.name));
      }
      return false;
    });
    
    return {
      ready,
      missingComponents,
      cloudFormationTemplate: generateCloudFormationTemplate()
    };
  } catch (error) {
    handleError({
      type: ErrorType.CONFIGURATION,
      message: "Error generating infrastructure report",
      userFriendlyMessage: "Failed to analyze infrastructure requirements",
      originalError: error
    }, true);
    
    return {
      ready: false,
      missingComponents: getInfrastructureRequirements()
    };
  }
};
