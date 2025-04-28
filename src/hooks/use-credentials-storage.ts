
import { useSecureStorage } from "./use-secure-storage";
import { AppCredentials } from "@/types/credentials";
import { handleError, ErrorType } from "@/utils/error-handler";
import { initializeAwsConfig } from "@/services/aws/AwsConfigService";
import { toast } from "sonner";

export const useCredentialsStorage = () => {
  const { getItem, setItem } = useSecureStorage({ 
    storageType: 'local',
    encryptionKey: 'adept_credentials_key'
  });

  const loadStoredCredentials = () => {
    try {
      const savedCredentials = getItem('agenticCredentials');
      if (savedCredentials?.aws) {
        const { region, accessKeyId, secretAccessKey } = savedCredentials.aws;
        initializeAwsConfig(region, accessKeyId, secretAccessKey);
      }
      return savedCredentials;
    } catch (error) {
      handleError({
        type: ErrorType.DATA_ENCRYPTION,
        message: "Failed to load saved credentials",
        userFriendlyMessage: "Failed to retrieve saved credentials",
        originalError: error
      }, true);
      return null;
    }
  };

  const storeCredentials = (creds: AppCredentials | null) => {
    try {
      if (creds) {
        setItem('agenticCredentials', creds);
        if (creds.aws) {
          const { region, accessKeyId, secretAccessKey } = creds.aws;
          initializeAwsConfig(region, accessKeyId, secretAccessKey);
        }
      } else {
        setItem('agenticCredentials', null);
      }
    } catch (error) {
      handleError({
        type: ErrorType.DATA_ENCRYPTION,
        message: "Failed to store credentials",
        userFriendlyMessage: "Failed to save credentials securely",
        originalError: error
      }, true);
    }
  };

  const clearStoredCredentials = () => {
    try {
      setItem('agenticCredentials', null);
      toast.success("All credentials have been cleared");
    } catch (error) {
      handleError({
        type: ErrorType.DATA_ENCRYPTION,
        message: "Failed to clear credentials",
        userFriendlyMessage: "Failed to clear stored credentials",
        originalError: error
      }, true);
    }
  };

  return {
    loadStoredCredentials,
    storeCredentials,
    clearStoredCredentials
  };
};
