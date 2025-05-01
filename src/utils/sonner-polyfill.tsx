
import React from 'react';
import { toast as sonnerToast, Toaster } from 'sonner';

// Re-export everything from sonner
export * from 'sonner';

// Export toast directly for compatibility
export const toast = sonnerToast;

// Export default for compatibility
export default sonnerToast;
