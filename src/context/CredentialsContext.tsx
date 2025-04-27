
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSecureStorage } from '@/hooks/use-secure-storage';
import { handleError, ErrorType } from '@/utils/error-handler';

interface CredentialsContextType {
  credentials: any | null;
  setCredentials: (creds: any) => void;
  isBackendReady: boolean;
  checkBackendStatus: () => Promise<boolean>;
}

const CredentialsContext = createContext<CredentialsContextType>({
  credentials: null,
  setCredentials: () => {},
  isBackendReady: false,
  checkBackendStatus: async () => false
});

export const CredentialsProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [credentials, setCredentialsState] = useState<any | null>(null);
  const [isBackendReady, setIsBackendReady] = useState<boolean>(false);
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
      // In a real implementation, this would check if the backend is ready
      // For demo purposes, we'll simulate success if credentials exist
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
  
  // Set credentials securely
  const setCredentials = (creds: any) => {
    try {
      if (creds) {
        setItem('agenticCredentials', creds);
        setCredentialsState(creds);
      } else {
        setItem('agenticCredentials', null);
        setCredentialsState(null);
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
        checkBackendStatus
      }}
    >
      {children}
    </CredentialsContext.Provider>
  );
};

export const useCredentials = () => useContext(CredentialsContext);
