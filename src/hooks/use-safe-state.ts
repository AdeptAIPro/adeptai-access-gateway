
import { useState, useCallback, SetStateAction, Dispatch, useRef, useEffect } from 'react';

/**
 * A safer version of useState that prevents state updates on unmounted components
 * @returns [state, setState] - Similar to useState but prevents memory leaks
 */
export function useSafeState<T>(initialState: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(initialState);
  const isMounted = useRef(true);
  
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  const setSafeState = useCallback((value: SetStateAction<T>) => {
    if (isMounted.current) {
      setState(value);
    }
  }, []);
  
  return [state, setSafeState];
}
