
// Re-export react-hook-form
export * from 'react-hook-form';

// Re-export from zod resolver
export const zodResolver = (schema: any) => {
  return (data: any) => {
    try {
      const validated = schema.parse(data);
      return {
        values: validated,
        errors: {}
      };
    } catch (error: any) {
      // Basic error mapping
      const errors = error.errors || [];
      const formattedErrors = errors.reduce((acc: any, err: any) => {
        const path = err.path.join('.');
        acc[path] = {
          message: err.message,
          type: 'validation'
        };
        return acc;
      }, {});
      
      return {
        values: {},
        errors: formattedErrors
      };
    }
  };
};

// Basic implementation of common hook form functions
export function useForm(options = {}) {
  return {
    register: (name: string) => ({
      name,
      onChange: () => {},
      onBlur: () => {},
    }),
    handleSubmit: (onSubmit: Function) => (e: any) => {
      e.preventDefault();
      onSubmit({});
    },
    formState: {
      errors: {},
      isSubmitting: false,
      isDirty: false,
      isValid: true
    },
    reset: () => {},
    control: {},
    watch: () => {},
    setError: () => {},
    clearErrors: () => {},
    setValue: () => {},
    getValues: () => ({}),
    trigger: () => true,
    ...options
  };
}
