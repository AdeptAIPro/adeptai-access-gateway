
import { useState, useCallback } from 'react';
import { ErrorType, handleError } from '@/utils/error-handler';

interface ValidationOptions {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  blacklist?: RegExp;
  customValidator?: (value: string) => boolean;
  sanitizeInput?: boolean;
}

interface ValidationResult {
  isValid: boolean;
  errorMessage: string;
  sanitizedValue: string;
}

/**
 * Hook for validating user inputs against common security threats
 * including XSS, injection attacks, and common data validation
 */
export const useInputValidation = () => {
  // Common dangerous patterns to detect
  const scriptPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  const injectionPattern = /((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i;
  const sqlInjectionPattern = /(\b)(on\S+)(\s*)=|javascript:|(<\s*)(\/*)script/i;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  // Basic sanitization function to remove potentially dangerous content
  const sanitizeInput = useCallback((value: string): string => {
    if (!value) return '';
    
    // Replace HTML tags and entities
    const sanitized = value
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
      
    return sanitized;
  }, []);
  
  // Validate input against common security threats
  const validateInput = useCallback((
    value: string, 
    options: ValidationOptions = {}
  ): ValidationResult => {
    const {
      required = false,
      minLength,
      maxLength,
      pattern,
      blacklist,
      customValidator,
      sanitizeInput: shouldSanitize = true
    } = options;
    
    const sanitizedValue = shouldSanitize ? sanitizeInput(value) : value;
    
    // Results object
    const result: ValidationResult = {
      isValid: true,
      errorMessage: '',
      sanitizedValue
    };
    
    // Required field validation
    if (required && !sanitizedValue) {
      result.isValid = false;
      result.errorMessage = 'This field is required';
      return result;
    }
    
    // Skip other validations if value is empty and not required
    if (!sanitizedValue && !required) {
      return result;
    }
    
    // Min length validation
    if (minLength !== undefined && sanitizedValue.length < minLength) {
      result.isValid = false;
      result.errorMessage = `Input must be at least ${minLength} characters`;
      return result;
    }
    
    // Max length validation
    if (maxLength !== undefined && sanitizedValue.length > maxLength) {
      result.isValid = false;
      result.errorMessage = `Input cannot exceed ${maxLength} characters`;
      return result;
    }
    
    // Check for script tags (potential XSS)
    if (scriptPattern.test(value)) {
      result.isValid = false;
      result.errorMessage = 'Input contains potentially unsafe content';
      
      // Log security issue
      handleError({
        type: ErrorType.SECURITY,
        message: "XSS attempt detected in input",
        userFriendlyMessage: "Invalid input detected",
        context: { value }
      }, false);
      
      return result;
    }
    
    // Check for SQL injection attempts
    if (sqlInjectionPattern.test(value) || injectionPattern.test(value)) {
      result.isValid = false;
      result.errorMessage = 'Input contains invalid characters';
      
      // Log security issue
      handleError({
        type: ErrorType.SECURITY,
        message: "Injection attempt detected in input",
        userFriendlyMessage: "Invalid input detected",
        context: { value }
      }, false);
      
      return result;
    }
    
    // Blacklist validation (for forbidden patterns)
    if (blacklist && blacklist.test(value)) {
      result.isValid = false;
      result.errorMessage = 'Input contains invalid characters';
      return result;
    }
    
    // Pattern validation (for required formats)
    if (pattern && !pattern.test(sanitizedValue)) {
      result.isValid = false;
      result.errorMessage = 'Input format is invalid';
      return result;
    }
    
    // Custom validator
    if (customValidator && !customValidator(sanitizedValue)) {
      result.isValid = false;
      result.errorMessage = 'Input validation failed';
      return result;
    }
    
    return result;
  }, [sanitizeInput]);
  
  // Email validation
  const validateEmail = useCallback((email: string, required = false): ValidationResult => {
    return validateInput(email, {
      required,
      pattern: emailPattern,
      sanitizeInput: true
    });
  }, [validateInput]);
  
  // URL validation
  const validateUrl = useCallback((url: string, required = false): ValidationResult => {
    let validUrl = false;
    
    try {
      new URL(url);
      validUrl = true;
    } catch {
      validUrl = false;
    }
    
    const result: ValidationResult = {
      isValid: validUrl || (!required && !url),
      errorMessage: validUrl ? '' : 'Please enter a valid URL',
      sanitizedValue: url
    };
    
    return result;
  }, []);
  
  // Password strength check
  const validatePasswordStrength = useCallback((password: string): ValidationResult => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;
    
    const isStrong = isLongEnough && hasLowerCase && hasUpperCase && hasNumbers && hasSpecialChars;
    const isMedium = isLongEnough && 
      ((hasLowerCase && hasUpperCase && hasNumbers) || 
       (hasLowerCase && hasSpecialChars) || 
       (hasUpperCase && hasSpecialChars));
    
    let errorMessage = '';
    let isValid = true;
    
    if (!isLongEnough) {
      errorMessage = 'Password must be at least 8 characters long';
      isValid = false;
    } else if (!isStrong && !isMedium) {
      errorMessage = 'Password is too weak. Add uppercase, numbers or special characters';
      isValid = false;
    } else if (!isStrong) {
      // Medium is acceptable but give feedback
      errorMessage = 'Consider adding more character types for a stronger password';
      isValid = true;
    }
    
    return {
      isValid,
      errorMessage,
      sanitizedValue: password // Don't sanitize passwords
    };
  }, []);
  
  return {
    validateInput,
    validateEmail,
    validateUrl,
    validatePasswordStrength,
    sanitizeInput,
    patterns: {
      email: emailPattern
    }
  };
};
