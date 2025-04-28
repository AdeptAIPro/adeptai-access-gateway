
/**
 * Utilities for handling environment variables in browser context
 * Since we can't directly access process.env in the browser,
 * we use localStorage as a temporary storage for environment variables
 */

/**
 * Get environment variable from localStorage or return default
 */
export const getEnvVar = (key: string, defaultValue: string = ''): string => {
  // First check localStorage
  const localValue = localStorage.getItem(key);
  if (localValue) return localValue;
  
  // Then check import.meta.env (for Vite environment variables)
  const envKey = `VITE_${key}`;
  // @ts-ignore - import.meta.env is not typed
  const envValue = import.meta.env[envKey];
  if (envValue) return envValue;
  
  // Fall back to default
  return defaultValue;
};

/**
 * Set environment variable in localStorage
 */
export const setEnvVar = (key: string, value: string): void => {
  if (value) {
    localStorage.setItem(key, value);
  } else {
    localStorage.removeItem(key);
  }
};

/**
 * Check if a specific environment is active
 */
export const isEnvironment = (env: 'development' | 'production' | 'test'): boolean => {
  // @ts-ignore - import.meta.env is not typed
  return import.meta.env.MODE === env;
};

/**
 * Get all environment variables as an object
 */
export const getAllEnvVars = (): Record<string, string> => {
  const vars: Record<string, string> = {};
  
  // Add all localStorage vars that look like env vars
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith('AWS_') || key.startsWith('API_') || key.includes('_API_KEY'))) {
      vars[key] = localStorage.getItem(key) || '';
    }
  }
  
  // Add all import.meta.env vars
  // @ts-ignore - import.meta.env is not typed
  Object.keys(import.meta.env).forEach(key => {
    if (key.startsWith('VITE_')) {
      // @ts-ignore - import.meta.env is not typed
      vars[key.replace('VITE_', '')] = import.meta.env[key];
    }
  });
  
  return vars;
};

/**
 * Clear all environment variables from localStorage
 */
export const clearEnvVars = (): void => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith('AWS_') || key.startsWith('API_') || key.includes('_API_KEY'))) {
      localStorage.removeItem(key);
    }
  }
};
