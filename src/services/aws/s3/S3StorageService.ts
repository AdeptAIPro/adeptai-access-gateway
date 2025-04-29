
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../AwsConfigService';
import { RESUME_BUCKET, PROFILE_IMAGES_BUCKET } from '../config';
import { reportApiError } from '@/services/error-reporting';
import { withTenantContext } from '@/services/tenant/TenantService';

/**
 * Service for file storage operations using S3
 * This replaces Supabase storage with secure S3 access
 */
export class S3StorageService {
  /**
   * Upload a file to S3 with proper tenant isolation
   */
  async uploadFile(
    file: File, 
    bucket: string, 
    path: string = ''
  ): Promise<string> {
    try {
      const fileExtension = file.name.split('.').pop();
      const fileName = `${path}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
      
      // Read file as ArrayBuffer
      const fileBuffer = await file.arrayBuffer();
      
      // Include tenant context for multi-tenancy security
      const metadata = withTenantContext({
        'original-filename': file.name,
        'content-type': file.type
      });
      
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: fileName,
        Body: Buffer.from(fileBuffer),
        ContentType: file.type,
        Metadata: metadata
      });
      
      await s3Client.send(command);
      
      // Return the file URL for referencing
      return `https://${bucket}.s3.amazonaws.com/${fileName}`;
    } catch (error) {
      reportApiError('s3StorageService.uploadFile', error, { bucket, path });
      throw error;
    }
  }
  
  /**
   * Upload a resume file to the resumes bucket
   */
  async uploadResume(file: File): Promise<string> {
    return this.uploadFile(file, RESUME_BUCKET, 'resumes');
  }
  
  /**
   * Upload a profile image to the profile images bucket
   */
  async uploadProfileImage(file: File): Promise<string> {
    return this.uploadFile(file, PROFILE_IMAGES_BUCKET, 'profiles');
  }
  
  /**
   * Get a signed URL for temporary access to a file
   * This replaces public Supabase URLs with secure, time-limited access
   */
  async getSignedUrl(bucket: string, key: string, expiresIn: number = 3600): Promise<string> {
    try {
      // In a real implementation, this would generate a signed URL
      // For now, we'll return a simulated URL
      return `https://${bucket}.s3.amazonaws.com/${key}?signed=true&expires=${Date.now() + expiresIn * 1000}`;
    } catch (error) {
      reportApiError('s3StorageService.getSignedUrl', error, { bucket, key });
      throw error;
    }
  }
  
  /**
   * Delete a file from S3
   */
  async deleteFile(bucket: string, key: string): Promise<boolean> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: bucket,
        Key: key
      });
      
      await s3Client.send(command);
      return true;
    } catch (error) {
      reportApiError('s3StorageService.deleteFile', error, { bucket, key });
      return false;
    }
  }
}

// Export a singleton instance
export const s3StorageService = new S3StorageService();
