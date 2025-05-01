
import React from 'react';
import { toast as sonnerToast, Toaster } from 'sonner';

// Re-export everything from sonner
export * from 'sonner';

// Export default for compatibility
export const toast = sonnerToast;

// Export ToastProvider component for convenient usage
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default toast;
