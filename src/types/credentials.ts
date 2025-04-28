
export interface AWSCredentials {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface OpenAICredentials {
  apiKey: string;
}

export interface AppCredentials {
  aws?: AWSCredentials;
  openai?: OpenAICredentials;
  [key: string]: any;
}

export interface InfrastructureStatus {
  ready: boolean;
  issues: string[];
  lastChecked: string;
}

export interface CredentialsContextType {
  credentials: AppCredentials | null;
  setCredentials: (creds: AppCredentials) => void;
  isBackendReady: boolean;
  checkBackendStatus: () => Promise<boolean>;
  testAwsConnection: (awsCredentials: AWSCredentials) => Promise<boolean>;
  checkInfrastructure: () => Promise<InfrastructureStatus>;
  clearCredentials: () => void;
}
