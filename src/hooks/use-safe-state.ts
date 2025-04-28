
import { useState, useCallback, SetStateAction, Dispatch } from 'react';

/**
 * A wrapper around useState that provides a safe setState function
 * that won't cause errors if the component is unmounted
 */
export function useSafeState<T>(initialState: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialState);
  
  const isMounted = useRef(true);
  
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  const safeSetState = useCallback((value: SetStateAction<T>) => {
    if (isMounted.current) {
      setState(value);
    }
  }, []);
  
  return [state, safeSetState];
}

// Add missing React import
import { useRef, useEffect } from 'react';
