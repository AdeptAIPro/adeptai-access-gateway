
import { useState, useEffect } from 'react';

function usePersistedState<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [state, setState] = useState<T>(() => {
    // Try to get the value from localStorage
    if (typeof window !== 'undefined') {
      const persistedState = localStorage.getItem(key);
      
      if (persistedState !== null) {
        try {
          return JSON.parse(persistedState);
        } catch (error) {
          console.error(`Error parsing persisted state for key '${key}':`, error);
          return defaultValue;
        }
      }
    }
    
    return defaultValue;
  });
  
  // Update localStorage when the state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);
  
  return [state, setState];
}

export default usePersistedState;
