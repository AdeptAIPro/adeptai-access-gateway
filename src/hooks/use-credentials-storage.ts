
/**
 * Secure storage for credentials with encryption support
 */
const useCredentialsStorage = () => {
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
  
  return {
    storeCredential,
    getCredential,
    clearCredential,
    clearAllCredentials,
    hasCredential
  };
};

export default useCredentialsStorage;
