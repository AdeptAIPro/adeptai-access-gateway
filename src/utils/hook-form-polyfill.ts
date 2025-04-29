
// Re-export react-hook-form
export * from 'react-hook-form';

// Mock zod resolver if not available
export const zodResolver = (schema: any) => (data: any) => {
  try {
    // Try to use real zod resolver if available
    const { zodResolver: actualResolver } = require('@hookform/resolvers/zod');
    return actualResolver(schema)(data);
  } catch (e) {
    // Simple fallback implementation
    console.log('Using fallback zodResolver');
    return {
      values: data,
      errors: {}
    };
  }
};
