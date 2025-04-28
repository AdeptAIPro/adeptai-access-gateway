
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppCredentials, CredentialsContextType, AWSCredentials } from '@/types/credentials';
import { useCredentialsStorage } from '@/hooks/use-credentials-storage';
import { useAwsConnection } from '@/hooks/use-aws-connection';
import { useInfrastructureCheck } from '@/hooks/use-infrastructure-check';

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
  
  const { loadStoredCredentials, storeCredentials, clearStoredCredentials } = useCredentialsStorage();
  const { testAwsConnection } = useAwsConnection();
  const { checkBackendStatus, checkInfrastructure } = useInfrastructureCheck(!!credentials?.aws);
  
  // Load credentials from secure storage on mount
  useEffect(() => {
    const savedCredentials = loadStoredCredentials();
    if (savedCredentials) {
      setCredentialsState(savedCredentials);
      checkBackendStatus();
    }
  }, []);
  
  // When credentials change, update backend ready status
  useEffect(() => {
    if (credentials) {
      checkBackendStatus().then(setIsBackendReady);
    } else {
      setIsBackendReady(false);
    }
  }, [credentials]);
  
  const setCredentials = (creds: AppCredentials) => {
    storeCredentials(creds);
    setCredentialsState(creds);
  };
  
  const clearCredentials = () => {
    clearStoredCredentials();
    setCredentialsState(null);
    setIsBackendReady(false);
  };
  
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
