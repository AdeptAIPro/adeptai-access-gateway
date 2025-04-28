
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSecureStorage } from '@/hooks/use-secure-storage';
import { handleError, ErrorType } from '@/utils/error-handler';
import { useSecurity } from '@/providers/SecurityProvider';
import { initializeAwsConfig, checkAwsCredentials, checkAwsInfrastructure } from '@/services/aws/AwsConfigService';
import { toast } from 'sonner';

interface AWSCredentials {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

interface OpenAICredentials {
  apiKey: string;
}

export interface AppCredentials {
  aws?: AWSCredentials;
  openai?: OpenAICredentials;
  [key: string]: any; // Allow for other credential types
}

interface InfrastructureStatus {
  ready: boolean;
  issues: string[];
  lastChecked: string;
}

interface CredentialsContextType {
  credentials: AppCredentials | null;
  setCredentials: (creds: AppCredentials) => void;
  isBackendReady: boolean;
  checkBackendStatus: () => Promise<boolean>;
  testAwsConnection: (awsCredentials: AWSCredentials) => Promise<boolean>;
  checkInfrastructure: () => Promise<InfrastructureStatus>;
  clearCredentials: () => void;
}

const CredentialsContext = createContext<CredentialsContextType>({
  credentials: null,
  setCredentials: () => {},
  isBackendReady: false,
  checkBackendStatus: async () => false,
  testAwsConnection: async () => false,
  checkInfrastructure: async () => ({ ready: false, issues: [], lastChecked: '' }),
  clearCredentials: () => {}
});

export const CredentialsProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [credentials, setCredentialsState] = useState<AppCredentials | null>(null);
  const [isBackendReady, setIsBackendReady] = useState<boolean>(false);
  const [infrastructureStatus, setInfrastructureStatus] = useState<InfrastructureStatus | null>(null);
  const { encryptData, decryptData } = useSecurity();
  const { getItem, setItem } = useSecureStorage({ 
    storageType: 'local',
    encryptionKey: 'adept_credentials_key'
  });
  
  // Load credentials from secure storage on mount
  useEffect(() => {
    try {
      const savedCredentials = getItem('agenticCredentials');
      if (savedCredentials) {
        setCredentialsState(savedCredentials);
        
        // Initialize AWS config with saved credentials if present
        if (savedCredentials.aws) {
          const { region, accessKeyId, secretAccessKey } = savedCredentials.aws;
          initializeAwsConfig(region, accessKeyId, secretAccessKey);
        }
        
        // Check if backend is ready
        checkBackendStatus();
      }
    } catch (error) {
      handleError({
        type: ErrorType.DATA_ENCRYPTION,
        message: "Failed to load saved credentials",
        userFriendlyMessage: "Failed to retrieve saved credentials",
        originalError: error
      }, true);
    }
  }, [getItem]);
  
  // Check if the backend services are ready
  const checkBackendStatus = async (): Promise<boolean> => {
    try {
      // If we have AWS credentials, check if they're valid
      if (credentials?.aws) {
        const awsReady = await checkAwsCredentials();
        setIsBackendReady(awsReady);
        return awsReady;
      }
      
      // For other backend services, implement appropriate checks
      // For now, consider backend ready if we have any credentials
      const isReady = !!credentials;
      setIsBackendReady(isReady);
      return isReady;
    } catch (error) {
      handleError({
        type: ErrorType.API,
        message: "Failed to check backend status",
        userFriendlyMessage: "Failed to connect to backend services",
        originalError: error
      }, true);
      return false;
    }
  };
  
  // Test AWS connection with provided credentials
  const testAwsConnection = async (awsCredentials: AWSCredentials): Promise<boolean> => {
    try {
      // First initialize the AWS config with the credentials
      initializeAwsConfig(
        awsCredentials.region,
        awsCredentials.accessKeyId,
        awsCredentials.secretAccessKey
      );
      
      // Then test the connection
      const isConnected = await checkAwsCredentials();
      
      if (isConnected) {
        toast.success("Successfully connected to AWS");
      } else {
        toast.error("Failed to connect to AWS. Please check your credentials.");
      }
      
      return isConnected;
    } catch (error) {
      handleError({
        type: ErrorType.API,
        message: "Failed to test AWS connection",
        userFriendlyMessage: "Could not verify AWS credentials",
        originalError: error
      }, true);
      return false;
    }
  };
  
  // Check AWS infrastructure readiness
  const checkInfrastructure = async (): Promise<InfrastructureStatus> => {
    try {
      if (!credentials?.aws) {
        return {
          ready: false,
          issues: ["AWS credentials not configured"],
          lastChecked: new Date().toISOString()
        };
      }
      
      const { ready, issues } = await checkAwsInfrastructure();
      
      const status = {
        ready,
        issues,
        lastChecked: new Date().toISOString()
      };
      
      setInfrastructureStatus(status);
      return status;
    } catch (error) {
      handleError({
        type: ErrorType.INFRASTRUCTURE,
        message: "Failed to check infrastructure status",
        userFriendlyMessage: "Unable to verify AWS infrastructure readiness",
        originalError: error
      }, true);
      
      return {
        ready: false,
        issues: ["Error checking infrastructure status"],
        lastChecked: new Date().toISOString()
      };
    }
  };
  
  // Set credentials securely
  const setCredentials = (creds: AppCredentials) => {
    try {
      if (creds) {
        // Ensure we're using secure storage
        setItem('agenticCredentials', creds);
        setCredentialsState(creds);
        
        // If AWS credentials are provided, initialize the AWS config
        if (creds.aws) {
          const { region, accessKeyId, secretAccessKey } = creds.aws;
          initializeAwsConfig(region, accessKeyId, secretAccessKey);
        }
      } else {
        clearCredentials();
      }
    } catch (error) {
      handleError({
        type: ErrorType.DATA_ENCRYPTION,
        message: "Failed to securely store credentials",
        userFriendlyMessage: "Failed to save credentials securely",
        originalError: error
      }, true);
    }
  };
  
  // Clear all credentials
  const clearCredentials = () => {
    try {
      setItem('agenticCredentials', null);
      setCredentialsState(null);
      setIsBackendReady(false);
      setInfrastructureStatus(null);
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
  
  // When credentials change, update backend ready status
  useEffect(() => {
    if (credentials) {
      checkBackendStatus();
    } else {
      setIsBackendReady(false);
    }
  }, [credentials]);
  
  return (
    <CredentialsContext.Provider 
      value={{
        credentials,
        setCredentials,
        isBackendReady,
        checkBackendStatus,
        testAwsConnection,
        checkInfrastructure,
        clearCredentials
      }}
    >
      {children}
    </CredentialsContext.Provider>
  );
};

export const useCredentials = () => useContext(CredentialsContext);
