
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../config';
import { v4 as uuidv4 } from 'uuid';
import { getEnvVar } from '@/utils/env-utils';

/**
 * Service for secure file uploads to S3
 * This replaces any direct uploads to Supabase or other storage
 */
export class FileUploadService {
  private tenantId: string;
  
  constructor() {
    this.tenantId = getEnvVar('TENANT_ID', 'default');
  }
  
  /**
   * Upload a file to the specified S3 bucket with tenant isolation
   */
  async uploadFile(file: File, bucketName: string, directory: string = ''): Promise<string> {
    try {
      // Create a tenant-specific path for multi-tenancy security
      const tenantPath = `tenants/${this.tenantId}/${directory}`;
      const fileId = uuidv4();
      const fileExtension = file.name.split('.').pop();
      const fileName = `${tenantPath}/${fileId}.${fileExtension}`;
      
      // Convert file to buffer for upload
      const fileBuffer = await file.arrayBuffer();
      
      // Set content type based on file type
      const contentType = file.type || 'application/octet-stream';
      
      // Upload to S3 with tenant isolation
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: Buffer.from(fileBuffer),
        ContentType: contentType,
        Metadata: {
          'tenant-id': this.tenantId,
          'original-name': file.name
        }
      });
      
      await s3Client.send(command);
      
      // Return the S3 object key for later reference
      return fileName;
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw error;
    }
  }
  
  /**
   * Set the current tenant ID
   */
  setTenantId(tenantId: string): void {
    this.tenantId = tenantId;
  }
}

// Export a singleton instance
export const fileUploadService = new FileUploadService();
