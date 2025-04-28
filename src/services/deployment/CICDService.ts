
import { handleError, ErrorType } from '@/utils/error-handler';

export interface CICDPipeline {
  name: string;
  provider: 'github' | 'gitlab' | 'azure-devops' | 'aws-codepipeline';
  template: string;
  description: string;
}

// Generates GitHub Actions workflow template
export const generateGitHubActionsWorkflow = (): string => {
  return `name: Build and Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run linting
      run: npm run lint
      
    - name: Run tests
      run: npm test
      
    - name: Build
      run: npm run build
      
    - name: Upload build artifact
      uses: actions/upload-artifact@v3
      with:
        name: build
        path: dist

  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
    - name: Download build artifact
      uses: actions/download-artifact@v3
      with:
        name: build
        path: dist
        
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: \${{ secrets.AWS_REGION }}
        
    - name: Deploy to S3
      run: aws s3 sync dist s3://YOUR-BUCKET-NAME --delete
      
    - name: Invalidate CloudFront cache
      run: aws cloudfront create-invalidation --distribution-id \${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
`;
};

// Generates AWS CloudFormation CI/CD template
export const generateAWSCodePipelineTemplate = (): string => {
  return `AWSTemplateFormatVersion: '2010-09-09'
Description: 'AdeptAI CI/CD Pipeline'

Parameters:
  GitHubOwner:
    Type: String
    Description: GitHub repository owner
    
  GitHubRepo:
    Type: String
    Description: GitHub repository name
    
  GitHubBranch:
    Type: String
    Default: main
    Description: GitHub repository branch
    
  GitHubToken:
    Type: String
    NoEcho: true
    Description: GitHub OAuth token
    
Resources:
  CodeBuildServiceRole:
    Type: 'AWS::IAM::Role'
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: codebuild.amazonaws.com
            Action: 'sts:AssumeRole'
      ManagedPolicyArns:
        - 'arn:aws:iam::aws:policy/AmazonS3FullAccess'
        - 'arn:aws:iam::aws:policy/CloudFrontFullAccess'
        
  CodePipelineServiceRole:
    Type: 'AWS::IAM::Role'
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: codepipeline.amazonaws.com
            Action: 'sts:AssumeRole'
      ManagedPolicyArns:
        - 'arn:aws:iam::aws:policy/AmazonS3FullAccess'
        - 'arn:aws:iam::aws:policy/AWSCodeBuildAdminAccess'
        
  BuildProject:
    Type: 'AWS::CodeBuild::Project'
    Properties:
      Name: !Sub '\${AWS::StackName}-build'
      ServiceRole: !GetAtt CodeBuildServiceRole.Arn
      Artifacts:
        Type: CODEPIPELINE
      Environment:
        Type: LINUX_CONTAINER
        ComputeType: BUILD_GENERAL1_SMALL
        Image: aws/codebuild/amazonlinux2-x86_64-standard:3.0
      Source:
        Type: CODEPIPELINE
        BuildSpec: |
          version: 0.2
          phases:
            install:
              runtime-versions:
                nodejs: 18
              commands:
                - npm ci
            build:
              commands:
                - npm run build
          artifacts:
            files:
              - '**/*'
            base-directory: 'dist'
            
  Pipeline:
    Type: 'AWS::CodePipeline::Pipeline'
    Properties:
      RoleArn: !GetAtt CodePipelineServiceRole.Arn
      ArtifactStore:
        Type: S3
        Location: !Ref ArtifactBucket
      Stages:
        - Name: Source
          Actions:
            - Name: Source
              ActionTypeId:
                Category: Source
                Owner: ThirdParty
                Version: 1
                Provider: GitHub
              Configuration:
                Owner: !Ref GitHubOwner
                Repo: !Ref GitHubRepo
                Branch: !Ref GitHubBranch
                OAuthToken: !Ref GitHubToken
              OutputArtifacts:
                - Name: SourceCode
        - Name: Build
          Actions:
            - Name: BuildAndTest
              ActionTypeId:
                Category: Build
                Owner: AWS
                Version: 1
                Provider: CodeBuild
              Configuration:
                ProjectName: !Ref BuildProject
              InputArtifacts:
                - Name: SourceCode
              OutputArtifacts:
                - Name: BuildOutput
        - Name: Deploy
          Actions:
            - Name: Deploy
              ActionTypeId:
                Category: Deploy
                Owner: AWS
                Version: 1
                Provider: S3
              Configuration:
                BucketName: YOUR-WEBSITE-BUCKET
                Extract: true
              InputArtifacts:
                - Name: BuildOutput
                
  ArtifactBucket:
    Type: 'AWS::S3::Bucket'
    Properties:
      VersioningConfiguration:
        Status: Enabled
        
Outputs:
  PipelineUrl:
    Description: URL to the CodePipeline console
    Value: !Sub 'https://\${AWS::Region}.console.aws.amazon.com/codepipeline/home?region=\${AWS::Region}#/view/\${Pipeline}'
`;
};

// Get available CI/CD pipeline templates
export const getAvailableCICDPipelines = (): CICDPipeline[] => {
  return [
    {
      name: 'GitHub Actions',
      provider: 'github',
      template: generateGitHubActionsWorkflow(),
      description: 'CI/CD workflow using GitHub Actions with AWS deployment'
    },
    {
      name: 'AWS CodePipeline',
      provider: 'aws-codepipeline',
      template: generateAWSCodePipelineTemplate(),
      description: 'Full AWS-native CI/CD pipeline using CodeBuild and CodePipeline'
    }
  ];
};

// Generate CI/CD pipeline configuration file
export const generateCICDPipeline = async (
  provider: 'github' | 'aws-codepipeline'
): Promise<{ success: boolean; template: string; filename: string }> => {
  try {
    const pipelines = getAvailableCICDPipelines();
    const selectedPipeline = pipelines.find(p => p.provider === provider);
    
    if (!selectedPipeline) {
      throw new Error(`Unsupported CI/CD provider: ${provider}`);
    }
    
    let filename = '';
    
    switch (provider) {
      case 'github':
        filename = '.github/workflows/deploy.yml';
        break;
      case 'aws-codepipeline':
        filename = 'aws/pipeline.yml';
        break;
      default:
        filename = 'ci-cd-config.yml';
    }
    
    return {
      success: true,
      template: selectedPipeline.template,
      filename
    };
  } catch (error) {
    handleError({
      type: ErrorType.CONFIGURATION,
      message: `Error generating CI/CD pipeline for ${provider}`,
      userFriendlyMessage: "Failed to generate CI/CD pipeline configuration",
      originalError: error
    }, true);
    
    return {
      success: false,
      template: '',
      filename: ''
    };
  }
};
