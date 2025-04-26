
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  const [credentials, setCredentials] = useState<any | null>(null);
  const [isBackendReady, setIsBackendReady] = useState<boolean>(false);
  
  // Load credentials from localStorage on mount
  useEffect(() => {
    const savedCredentials = localStorage.getItem('agenticCredentials');
    if (savedCredentials) {
      try {
        const parsed = JSON.parse(savedCredentials);
        setCredentials(parsed);
        
        // Check if backend is ready
        checkBackendStatus();
      } catch (e) {
        console.error("Failed to parse saved credentials:", e);
      }
    }
  }, []);
  
  // Check if the backend services are ready
  const checkBackendStatus = async (): Promise<boolean> => {
    // In a real implementation, this would check if the backend is ready
    // For demo purposes, we'll simulate success if credentials exist
    const isReady = !!credentials;
    setIsBackendReady(isReady);
    return isReady;
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
