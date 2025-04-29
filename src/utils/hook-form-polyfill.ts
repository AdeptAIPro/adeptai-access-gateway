
// Export zod resolver from @hookform/resolvers/zod
export const zodResolver = (schema: any) => {
  return (data: any) => {
    try {
      const validatedData = schema.parse(data);
      return {
        values: validatedData,
        errors: {}
      };
    } catch (error: any) {
      const formattedErrors: Record<string, { message: string }> = {};
      
      if (error.errors) {
        error.errors.forEach((err: any) => {
          const path = err.path.join('.');
          formattedErrors[path] = { message: err.message };
        });
      }
      
      return {
        values: {},
        errors: formattedErrors
      };
    }
  };
};

// Export polyfill versions of react-hook-form
export const useForm = (options = {}) => {
  return {
    register: (name: string) => ({
      name,
      onChange: () => {},
      onBlur: () => {},
      ref: () => {},
    }),
    handleSubmit: (onSubmit: any) => (event: any) => {
      event.preventDefault();
      onSubmit({});
    },
    watch: () => {},
    formState: { errors: {} },
    reset: () => {},
    control: {},
    setError: () => {},
    clearErrors: () => {},
    setValue: () => {},
    getValues: () => ({}),
    trigger: () => Promise.resolve(true),
  };
};

