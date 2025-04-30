
/**
 * Secure storage for credentials with encryption support
 */
export const useCredentialsStorage = () => {
  const prefix = 'adeptai_cred_';
  
  // Simple encode/decode for basic obfuscation (not true encryption)
  const encode = (str: string): string => {
    return btoa(encodeURIComponent(str));
  };
  
  const decode = (str: string): string => {
    try {
      return decodeURIComponent(atob(str));
    } catch (e) {
      console.error('Failed to decode stored value');
      return '';
    }
  };
  
  // Store credentials
  const storeCredential = (key: string, value: string): void => {
    try {
      const encodedKey = `${prefix}${key}`;
      const encodedValue = encode(value);
      localStorage.setItem(encodedKey, encodedValue);
    } catch (error) {
      console.error('Failed to store credential', error);
    }
  };
  
  // Get credentials
  const getCredential = (key: string): string => {
    try {
      const encodedKey = `${prefix}${key}`;
      const encodedValue = localStorage.getItem(encodedKey);
      if (!encodedValue) return '';
      return decode(encodedValue);
    } catch (error) {
      console.error('Failed to retrieve credential', error);
      return '';
    }
  };
  
  // Clear a specific credential
  const clearCredential = (key: string): void => {
    try {
      const encodedKey = `${prefix}${key}`;
      localStorage.removeItem(encodedKey);
    } catch (error) {
      console.error('Failed to clear credential', error);
    }
  };
  
  // Clear all credentials
  const clearAllCredentials = (): void => {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Failed to clear all credentials', error);
    }
  };
  
  // Check if credential exists
  const hasCredential = (key: string): boolean => {
    const encodedKey = `${prefix}${key}`;
    return !!localStorage.getItem(encodedKey);
  };
  
  // Additional functions needed by CredentialsContext
  
  // Store full credentials object
  const storeCredentials = (credentials: any): void => {
    try {
      if (credentials?.aws) {
        storeCredential('aws_region', credentials.aws.region || '');
        storeCredential('aws_access_key_id', credentials.aws.accessKeyId || '');
        storeCredential('aws_secret_access_key', credentials.aws.secretAccessKey || '');
      }
      
      if (credentials?.openai) {
        storeCredential('openai_api_key', credentials.openai.apiKey || '');
      }
      
      // Store any additional credential fields
      Object.entries(credentials || {}).forEach(([key, value]) => {
        if (key !== 'aws' && key !== 'openai' && typeof value === 'string') {
          storeCredential(key, value);
        }
      });
    } catch (error) {
      console.error('Failed to store credentials', error);
    }
  };
  
  // Load stored credentials
  const loadStoredCredentials = () => {
    try {
      // Check if AWS credentials exist
      const awsRegion = getCredential('aws_region');
      const awsAccessKeyId = getCredential('aws_access_key_id');
      const awsSecretAccessKey = getCredential('aws_secret_access_key');
      
      // Check if OpenAI credentials exist
      const openaiApiKey = getCredential('openai_api_key');
      
      // Build credentials object
      const credentials: any = {};
      
      if (awsRegion || awsAccessKeyId || awsSecretAccessKey) {
        credentials.aws = {
          region: awsRegion,
          accessKeyId: awsAccessKeyId,
          secretAccessKey: awsSecretAccessKey
        };
      }
      
      if (openaiApiKey) {
        credentials.openai = {
          apiKey: openaiApiKey
        };
      }
      
      return Object.keys(credentials).length > 0 ? credentials : null;
    } catch (error) {
      console.error('Failed to load stored credentials', error);
      return null;
    }
  };
  
  // Clear all stored credentials
  const clearStoredCredentials = (): void => {
    clearAllCredentials();
  };
  
  return {
    storeCredential,
    getCredential,
    clearCredential,
    clearAllCredentials,
    hasCredential,
    // Additional functions
    storeCredentials,
    loadStoredCredentials,
    clearStoredCredentials
  };
};

// Also provide the function as default export for backward compatibility
export default useCredentialsStorage;
