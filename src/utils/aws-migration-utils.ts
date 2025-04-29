
import { supabase } from '@/lib/supabase';
import { lambdaApi } from '@/services/backend-api/LambdaApiClient';
import { dynamoService } from '@/services/aws/dynamodb/DynamoService';
import { s3StorageService } from '@/services/aws/s3/S3StorageService';
import { USER_MANAGEMENT_LAMBDA } from '@/services/aws/config';
import { getCurrentTenantId } from '@/services/tenant/TenantService';

/**
 * Utility to help migrate data from Supabase to AWS
 * This can be used during the transition period
 */

/**
 * Migrate a candidate from Supabase to DynamoDB
 */
export const migrateCandidate = async (candidateId: string): Promise<boolean> => {
  try {
    // 1. Fetch candidate from Supabase
    const { data: candidate, error } = await supabase
      .from('candidates')
      .select('*')
      .eq('id', candidateId)
      .single();
    
    if (error || !candidate) {
      console.error('Error fetching candidate from Supabase:', error);
      return false;
    }
    
    // 2. Add tenant ID for multi-tenancy
    const tenantId = getCurrentTenantId();
    const candidateWithTenant = {
      ...candidate,
      tenantId
    };
    
    // 3. Store in DynamoDB through Lambda
    await lambdaApi.invoke(
      USER_MANAGEMENT_LAMBDA,
      'storeCandidate',
      candidateWithTenant
    );
    
    return true;
  } catch (error) {
    console.error('Error migrating candidate:', error);
    return false;
  }
};

/**
 * Migrate a file from Supabase Storage to S3
 */
export const migrateFile = async (
  supabaseBucket: string,
  supabasePath: string,
  awsBucket: string
): Promise<string | null> => {
  try {
    // 1. Download file from Supabase
    const { data, error } = await supabase.storage
      .from(supabaseBucket)
      .download(supabasePath);
    
    if (error || !data) {
      console.error('Error downloading file from Supabase:', error);
      return null;
    }
    
    // 2. Create a File object from the blob
    const fileName = supabasePath.split('/').pop() || 'file';
    const file = new File([data], fileName, { 
      type: data.type 
    });
    
    // 3. Upload to S3
    const s3Path = await s3StorageService.uploadFile(file, awsBucket);
    
    return s3Path;
  } catch (error) {
    console.error('Error migrating file:', error);
    return null;
  }
};

/**
 * Check if AWS credentials are configured
 * This helps determine if we should use AWS or fall back to Supabase
 */
export const isAwsConfigured = (): boolean => {
  const awsAccessKey = localStorage.getItem('AWS_ACCESS_KEY_ID');
  const awsSecretKey = localStorage.getItem('AWS_SECRET_ACCESS_KEY');
  const awsRegion = localStorage.getItem('AWS_REGION');
  
  return !!(awsAccessKey && awsSecretKey && awsRegion);
};
