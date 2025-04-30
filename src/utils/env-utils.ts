
/**
 * Environment variable utilities
 * 
 * These utilities provide a consistent way to access environment variables
 * from various sources (import.meta.env, localStorage, etc)
 */

/**
 * Get an environment variable from various sources
 * 
 * Priority order:
 * 1. import.meta.env
 * 2. localStorage
 * 3. Default value
 * 
 * @param key The environment variable key
 * @param defaultValue Default value if not found
 * @returns The environment variable value
 */
export const getEnvVar = (key: string, defaultValue: string = ''): string => {
  // Check if it exists in import.meta.env (Vite environment variables)
  const envValue = (import.meta.env as any)[key];
  if (envValue !== undefined) {
    return envValue;
  }
  
  // Check if it exists in localStorage
  const localValue = localStorage.getItem(key);
  if (localValue !== null) {
    return localValue;
  }
  
  // Return default value
  return defaultValue;
};

/**
 * Set an environment variable in localStorage
 * 
 * @param key The environment variable key
 * @param value The environment variable value
 */
export const setEnvVar = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

/**
 * Clear an environment variable from localStorage
 * 
 * @param key The environment variable key
 */
export const clearEnvVar = (key: string): void => {
  localStorage.removeItem(key);
};

/**
 * Check if an environment variable is defined
 * 
 * @param key The environment variable key
 * @returns True if the environment variable is defined
 */
export const isEnvVarDefined = (key: string): boolean => {
  return getEnvVar(key) !== '';
};

/**
 * Get all environment variables as an object
 * 
 * @returns Object containing all environment variables
 */
export const getAllEnvVars = (): Record<string, string> => {
  const result: Record<string, string> = {};
  
  // Add values from import.meta.env
  Object.entries(import.meta.env).forEach(([key, value]) => {
    if (typeof value === 'string') {
      result[key] = value;
    }
  });
  
  // Add values from localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('VITE_')) {
      result[key] = localStorage.getItem(key) || '';
    }
  }
  
  return result;
};
