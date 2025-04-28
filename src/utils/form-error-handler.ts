import { ZodError } from 'zod';
import { AppError, ErrorType, handleError } from './error-handler';
import { showToast } from './toast-wrapper';

interface ValidationError {
  field: string;
  message: string;
}

/**
 * Handle form validation errors - especially useful with Zod or other validation libraries
 */
export function handleFormValidationError(
  error: unknown, 
  showToast: boolean = true
): ValidationError[] {
  // If it's a Zod error, format it nicely
  if (error instanceof ZodError) {
    const errors = error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));
    
    if (showToast) {
      const firstError = errors[0];
      if (firstError) {
        showToast.error('Validation Error', `${firstError.field}: ${firstError.message}`);
      }
    }
    
    return errors;
  }
  
  // For other validation libraries or custom validation errors
  if (error instanceof Error && error.name === 'ValidationError') {
    const genericError = { field: 'form', message: error.message };
    
    if (showToast) {
      showToast.error('Validation Error', error.message);
    }
    
    return [genericError];
  }
  
  // For our AppError type
  if (error instanceof AppError && error.type === ErrorType.VALIDATION) {
    const field = error.data?.field || 'form';
    const genericError = { field, message: error.userFriendlyMessage || error.message };
    
    if (showToast) {
      showToast.error('Validation Error', genericError.message);
    }
    
    return [genericError];
  }
  
  // For unexpected errors, convert to generic form error
  const appError = handleError(error, showToast);
  return [{ field: 'form', message: appError.userFriendlyMessage }];
}

/**
 * Form submission wrapper with error handling
 */
export async function safeFormSubmit<T>(
  submitFn: () => Promise<T>,
  onSuccess?: (data: T) => void,
  onValidationError?: (errors: ValidationError[]) => void
): Promise<T | null> {
  try {
    const result = await submitFn();
    if (onSuccess) {
      onSuccess(result);
    }
    return result;
  } catch (error) {
    // If it's a validation error, handle it specially
    if (
      error instanceof ZodError || 
      (error instanceof Error && error.name === 'ValidationError') ||
      (error instanceof AppError && error.type === ErrorType.VALIDATION)
    ) {
      const validationErrors = handleFormValidationError(error, true);
      if (onValidationError) {
        onValidationError(validationErrors);
      }
      return null;
    }
    
    // Otherwise, use generic error handling
    handleError(error, true);
    return null;
  }
}
