
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initializeOpenAI, isOpenAIInitialized } from '@/services/llm/OpenAIService';
import { checkBackendAvailability } from '@/services/agentic-ai/AgenticService';

interface Credentials {
  openaiApiKey: string;
  awsRegion: string;
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
}

interface CredentialsContextType {
  credentials: Credentials | null;
  setCredentials: (credentials: Credentials) => void;
  clearCredentials: () => void;
  isBackendReady: boolean;
  checkBackendStatus: () => Promise<boolean>;
}

const CredentialsContext = createContext<CredentialsContextType | undefined>(undefined);

interface CredentialsProviderProps {
  children: ReactNode;
}

export const CredentialsProvider: React.FC<CredentialsProviderProps> = ({ children }) => {
  const [credentials, setCredentialsState] = useState<Credentials | null>(null);
  const [isBackendReady, setIsBackendReady] = useState<boolean>(false);
  
  // Load credentials from localStorage on mount
  useEffect(() => {
    const loadCredentials = async () => {
      const savedCredentials = localStorage.getItem('agenticCredentials');
      if (savedCredentials) {
        try {
          const parsed = JSON.parse(savedCredentials);
          setCredentialsState(parsed);
          
          // Initialize OpenAI with the saved key
          if (parsed.openaiApiKey) {
            initializeOpenAI(parsed.openaiApiKey);
          }
          
          // Set AWS environment variables
          if (parsed.awsAccessKeyId && parsed.awsSecretAccessKey) {
            process.env.AWS_REGION = parsed.awsRegion;
            process.env.AWS_ACCESS_KEY_ID = parsed.awsAccessKeyId;
            process.env.AWS_SECRET_ACCESS_KEY = parsed.awsSecretAccessKey;
          }
          
          // Check backend availability
          const backendStatus = await checkBackendAvailability();
          setIsBackendReady(backendStatus);
        } catch (e) {
          console.error("Failed to parse saved credentials:", e);
        }
      }
    };
    
    loadCredentials();
  }, []);
  
  const setCredentials = (newCredentials: Credentials) => {
    // Save to localStorage
    localStorage.setItem('agenticCredentials', JSON.stringify(newCredentials));
    setCredentialsState(newCredentials);
    
    // Initialize services
    initializeOpenAI(newCredentials.openaiApiKey);
    
    // Set AWS environment variables
    process.env.AWS_REGION = newCredentials.awsRegion;
    process.env.AWS_ACCESS_KEY_ID = newCredentials.awsAccessKeyId;
    process.env.AWS_SECRET_ACCESS_KEY = newCredentials.awsSecretAccessKey;
    
    // Check backend availability
    checkBackendStatus();
  };
  
  const clearCredentials = () => {
    localStorage.removeItem('agenticCredentials');
    setCredentialsState(null);
    setIsBackendReady(false);
  };
  
  const checkBackendStatus = async (): Promise<boolean> => {
    const status = await checkBackendAvailability();
    setIsBackendReady(status);
    return status;
  };
  
  return (
    <CredentialsContext.Provider
      value={{
        credentials,
        setCredentials,
        clearCredentials,
        isBackendReady,
        checkBackendStatus
      }}
    >
      {children}
    </CredentialsContext.Provider>
  );
};

export const useCredentials = (): CredentialsContextType => {
  const context = useContext(CredentialsContext);
  if (context === undefined) {
    throw new Error('useCredentials must be used within a CredentialsProvider');
  }
  return context;
};
