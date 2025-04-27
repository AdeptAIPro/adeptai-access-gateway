
/**
 * Utility functions for handling environment variables in the browser environment
 */

/**
 * Get an environment variable with a fallback value
 * Checks for variables in import.meta.env (Vite) and localStorage
 */
export const getEnvVar = (key: string, fallback: string = ''): string => {
  try {
    // Try to get from import.meta.env first (Vite's way of exposing env vars)
    if (import.meta.env?.[key] !== undefined) {
      return import.meta.env[key];
    }
    
    // Then try with VITE_ prefix
    if (import.meta.env?.[`VITE_${key}`] !== undefined) {
      return import.meta.env[`VITE_${key}`];
    }
    
    // Then check localStorage
    const localValue = localStorage.getItem(key);
    if (localValue) {
      return localValue;
    }
    
    // Fallback value
    return fallback;
  } catch (e) {
    console.warn(`Error retrieving env var ${key}`, e);
    return fallback;
  }
};

/**
 * Set an environment variable in localStorage
 */
export const setEnvVar = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

/**
 * Get all available environment variables
 */
export const getAllEnvVars = (): Record<string, string> => {
  const vars: Record<string, string> = {};
  
  // Get vars from import.meta.env
  try {
    Object.keys(import.meta.env || {}).forEach(key => {
      vars[key] = import.meta.env[key];
    });
  } catch (e) {
    console.warn('Error accessing import.meta.env', e);
  }
  
  // Get vars from localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      vars[key] = localStorage.getItem(key) || '';
    }
  }
  
  return vars;
};
