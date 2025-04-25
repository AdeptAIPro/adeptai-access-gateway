
import { 
  PutObjectCommand, 
  GetObjectCommand, 
  DeleteObjectCommand, 
  ListObjectsV2Command 
} from "@aws-sdk/client-s3";
import { s3Client, TASK_DATA_BUCKET, MODEL_ARTIFACTS_BUCKET } from "./AwsConfigService";

// Upload a file to S3
export const uploadFile = async (
  bucket: string,
  key: string,
  body: string | Uint8Array | Buffer | Blob,
  contentType: string = "application/json"
): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
  });
  
  try {
    await s3Client.send(command);
    return `https://${bucket}.s3.amazonaws.com/${key}`;
  } catch (error) {
    console.error(`Error uploading file to S3 (${bucket}/${key}):`, error);
    throw error;
  }
};

// Download a file from S3
export const downloadFile = async (bucket: string, key: string): Promise<any> => {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });
  
  try {
    const response = await s3Client.send(command);
    
    // Convert stream to string/JSON
    if (response.Body) {
      const bodyContents = await response.Body.transformToString();
      try {
        // Try to parse as JSON
        return JSON.parse(bodyContents);
      } catch (parseError) {
        // Return as string if not JSON
        return bodyContents;
      }
    }
    return null;
  } catch (error) {
    console.error(`Error downloading file from S3 (${bucket}/${key}):`, error);
    throw error;
  }
};

// Upload task data to S3
export const uploadTaskData = async (taskId: string, data: any): Promise<string> => {
  const key = `tasks/${taskId}/data.json`;
  return uploadFile(
    TASK_DATA_BUCKET,
    key,
    JSON.stringify(data),
    "application/json"
  );
};

// Download task data from S3
export const downloadTaskData = async (taskId: string): Promise<any> => {
  const key = `tasks/${taskId}/data.json`;
  return downloadFile(TASK_DATA_BUCKET, key);
};

// Upload model artifact to S3
export const uploadModelArtifact = async (
  modelId: string,
  artifactType: string,
  data: any
): Promise<string> => {
  const key = `models/${modelId}/${artifactType}.json`;
  return uploadFile(
    MODEL_ARTIFACTS_BUCKET,
    key,
    JSON.stringify(data),
    "application/json"
  );
};

// List all files in a folder
export const listFiles = async (bucket: string, prefix: string): Promise<string[]> => {
  const command = new ListObjectsV2Command({
    Bucket: bucket,
    Prefix: prefix,
  });
  
  try {
    const response = await s3Client.send(command);
    return (response.Contents || []).map(item => item.Key || "");
  } catch (error) {
    console.error(`Error listing files in S3 (${bucket}/${prefix}):`, error);
    throw error;
  }
};
