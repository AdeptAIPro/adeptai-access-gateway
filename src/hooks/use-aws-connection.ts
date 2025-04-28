
import { toast } from "sonner";
import { AWSCredentials } from "@/types/credentials";
import { initializeAwsConfig, checkAwsCredentials } from "@/services/aws/AwsConfigService";

export const useAwsConnection = () => {
  const testAwsConnection = async (awsCredentials: AWSCredentials): Promise<boolean> => {
    try {
      initializeAwsConfig(
        awsCredentials.region,
        awsCredentials.accessKeyId,
        awsCredentials.secretAccessKey
      );
      
      const isConnected = await checkAwsCredentials();
      
      if (isConnected) {
        toast.success("Successfully connected to AWS");
      } else {
        toast.error("Failed to connect to AWS. Please check your credentials.");
      }
      
      return isConnected;
    } catch (error) {
      toast.error("Could not verify AWS credentials");
      return false;
    }
  };

  return { testAwsConnection };
};
