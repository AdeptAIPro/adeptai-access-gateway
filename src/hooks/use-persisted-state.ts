
import { useState, useEffect } from 'react';

export function usePersistedState<T>(
  key: string, 
  initialValue: T,
  storage: Storage = localStorage
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Create state based on persisted value or initial value
  const [state, setState] = useState<T>(() => {
    try {
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading persisted state for key ${key}:`, error);
      return initialValue;
    }
  });

  // Update storage when state changes
  useEffect(() => {
    try {
      storage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error persisting state for key ${key}:`, error);
    }
  }, [key, state, storage]);

  return [state, setState];
}

// Session-based persistence (clears when browser is closed)
export function useSessionPersistedState<T>(
  key: string, 
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  return usePersistedState(key, initialValue, sessionStorage);
}

export default usePersistedState;
