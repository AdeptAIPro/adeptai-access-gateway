
import React from 'react';
import {
  useForm,
  FormProvider as RHFFormProvider,
  UseFormReturn,
  FieldValues,
} from 'react-hook-form';

// FormProvider wrapper for React Hook Form
export const FormProvider = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues = TFieldValues
>({
  children,
  methods,
}: {
  children: React.ReactNode;
  methods: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
}) => {
  return <RHFFormProvider {...methods}>{children}</RHFFormProvider>;
};

// Helper to extract error message from form error object
export const getErrorMessage = (
  error: any,
  defaultMessage: string = 'This field is required'
): string => {
  if (!error) return '';
  
  if (typeof error === 'string') return error;
  
  if (error.message) return error.message;
  
  return defaultMessage;
};

// Helper hook to handle API errors and set form errors
export const useApiErrorHandler = () => {
  const handleApiError = (
    error: any,
    form: UseFormReturn<any>,
    defaultMessage: string = 'An error occurred'
  ) => {
    if (!error) return;
    
    // Handle form validation errors from API
    if (error.errors && typeof error.errors === 'object') {
      Object.entries(error.errors).forEach(([field, message]) => {
        form.setError(field as any, {
          type: 'manual',
          message: message as string,
        });
      });
      return;
    }
    
    // Handle general API error
    form.setError('root.serverError', {
      type: 'manual',
      message: error.message || defaultMessage,
    });
  };
  
  return { handleApiError };
};

// Regular expression validations for form fields
export const formValidations = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^\+?[0-9]{10,15}$/,
  url: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  zipCode: /^\d{5}(-\d{4})?$/,
};
