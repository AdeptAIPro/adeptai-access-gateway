
import { useState, useCallback } from 'react';
import { handleError, ErrorType } from '@/utils/error-handler';

type ValidationRule<T> = {
  test: (value: T) => boolean;
  message: string;
  errorType?: ErrorType;
};

type ValidationResult = {
  valid: boolean;
  error: string | null;
};

type ValidationConfig<T> = {
  value: T;
  rules: ValidationRule<T>[];
  validateOnChange?: boolean;
  showToastOnError?: boolean;
};

export function useInputValidation<T = string>() {
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validate = useCallback((config: ValidationConfig<T>): ValidationResult => {
    const { value, rules, validateOnChange = false, showToastOnError = false } = config;
    
    let isValid = true;
    let errorMessage: string | null = null;
    
    for (const rule of rules) {
      if (!rule.test(value)) {
        isValid = false;
        errorMessage = rule.message;
        
        // Handle the error
        handleError({
          type: rule.errorType || ErrorType.VALIDATION,
          message: rule.message,
          userFriendlyMessage: rule.message,
        }, showToastOnError);
        
        break;
      }
    }
    
    if (validateOnChange) {
      setError(errorMessage);
      setIsValid(isValid);
    }
    
    return {
      valid: isValid,
      error: errorMessage
    };
  }, []);

  // Function to validate email
  const validateEmail = useCallback((email: string, required = true): ValidationResult => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const rules: ValidationRule<string>[] = [];
    
    if (required) {
      rules.push({
        test: (value: string) => Boolean(value),
        message: 'Email is required',
        errorType: ErrorType.VALIDATION
      });
    }
    
    if (email) {
      rules.push({
        test: (value: string) => emailRegex.test(value),
        message: 'Please enter a valid email address',
        errorType: ErrorType.VALIDATION
      });
    }
    
    return validate({ value: email, rules });
  }, [validate]);

  // Function to validate password strength
  const validatePassword = useCallback((password: string, required = true): ValidationResult => {
    const rules: ValidationRule<string>[] = [];
    
    if (required) {
      rules.push({
        test: (value: string) => Boolean(value),
        message: 'Password is required',
        errorType: ErrorType.SECURITY
      });
    }
    
    if (password) {
      rules.push({
        test: (value: string) => value.length >= 8,
        message: 'Password must be at least 8 characters long',
        errorType: ErrorType.SECURITY
      });
      
      rules.push({
        test: (value: string) => /[A-Z]/.test(value),
        message: 'Password must contain at least one uppercase letter',
        errorType: ErrorType.SECURITY
      });
      
      rules.push({
        test: (value: string) => /[0-9]/.test(value),
        message: 'Password must contain at least one number',
        errorType: ErrorType.SECURITY
      });
    }
    
    return validate({ value: password, rules });
  }, [validate]);

  return {
    validate,
    validateEmail,
    validatePassword,
    error,
    isValid,
    clearError: () => setError(null),
  };
}

export default useInputValidation;
