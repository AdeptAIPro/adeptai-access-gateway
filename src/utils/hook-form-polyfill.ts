
// Polyfill for react-hook-form and related libraries
import React from 'react';

export function useForm<T = any>(options?: any) {
  // Mock form state
  const formState = {
    errors: {},
    isSubmitting: false,
    isSubmitted: false,
    isValid: true,
    submitCount: 0,
    isDirty: false,
  };

  // Mock form methods
  const mockMethods = {
    register: (name: string) => ({ 
      name, 
      onChange: (e: any) => console.log(`Field ${name} changed:`, e),
      onBlur: () => console.log(`Field ${name} blurred`),
      ref: () => {},
    }),
    handleSubmit: (onSubmit: Function) => (e: any) => {
      e.preventDefault();
      console.log('Form submitted');
      return onSubmit({});
    },
    control: {},
    reset: () => console.log('Form reset'),
    setError: () => {},
    clearErrors: () => {},
    setValue: () => {},
    getValues: () => ({}),
    trigger: () => Promise.resolve(true),
    formState,
    watch: (field: string) => field,
  };

  return mockMethods;
}

export function useController(props: any) {
  return {
    field: {
      name: props.name,
      value: props.defaultValue || '',
      onChange: (e: any) => console.log(`Field ${props.name} changed`, e),
      onBlur: () => {},
      ref: () => {},
    },
    fieldState: { error: null, invalid: false, isTouched: false, isDirty: false },
    formState: { errors: {}, isSubmitting: false, isValid: true },
  };
}

export const useFormContext = () => {
  return useForm().control;
}

// Fixed FormProvider component - proper React.FC typing
export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

// Zod resolvers
export const zodResolver = (schema: any) => {
  return (values: any) => {
    return { values, errors: {} };
  };
};

export default {
  useForm,
  useController,
  useFormContext,
  FormProvider,
  zodResolver
};
