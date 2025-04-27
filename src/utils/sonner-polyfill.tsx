
import React, { ReactNode } from 'react';

// Basic toast types
type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

// Toast options
interface ToastOptions {
  description?: ReactNode;
  duration?: number;
  icon?: ReactNode;
  id?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: (toast: ToastT) => void;
  onAutoClose?: (toast: ToastT) => void;
  [key: string]: any;
}

// Toast instance
type ToastT = {
  id: string;
  type: ToastType;
  message: string;
  options?: ToastOptions;
};

// Define a simple toast implementation
const toastQueue: ToastT[] = [];

function createToast(message: string, options: ToastOptions = {}, type: ToastType = 'default'): string {
  const id = options.id || Date.now().toString();
  const toast = { id, message, options, type };
  
  // Add toast to queue
  toastQueue.push(toast);
  
  // Log toast to console for debugging
  console.log(`Toast (${type}):`, message, options);
  
  // Return id for potential dismissal
  return id;
}

// Toast API
export const toast = Object.assign(
  (message: string, options: ToastOptions = {}): string => createToast(message, options, 'default'),
  {
    success: (message: string, options: ToastOptions = {}): string => createToast(message, options, 'success'),
    error: (message: string, options: ToastOptions = {}): string => createToast(message, options, 'error'),
    warning: (message: string, options: ToastOptions = {}): string => createToast(message, options, 'warning'),
    info: (message: string, options: ToastOptions = {}): string => createToast(message, options, 'info'),
    dismiss: (id: string): void => {
      const index = toastQueue.findIndex(toast => toast.id === id);
      if (index !== -1) {
        toastQueue.splice(index, 1);
      }
    },
    promise: <T,>(
      promise: Promise<T>, 
      { loading, success, error }: { loading: string; success: string | ((data: T) => string); error: string | ((error: any) => string); },
      options?: ToastOptions
    ): Promise<T> => {
      const id = createToast(loading, { ...options, duration: Infinity }, 'default');
      
      return promise
        .then((data) => {
          const successMessage = typeof success === 'function' ? success(data) : success;
          toast.dismiss(id);
          toast.success(successMessage, options);
          return data;
        })
        .catch((err) => {
          const errorMessage = typeof error === 'function' ? error(err) : error;
          toast.dismiss(id);
          toast.error(errorMessage, options);
          throw err;
        });
    }
  }
);

// The Toaster component (just a placeholder, we're not using actual rendering in the polyfill)
export const Toaster: React.FC<{ 
  position?: ToastOptions['position']; 
  theme?: 'light' | 'dark' | 'system';
  className?: string;
  toastOptions?: ToastOptions;
}> = () => {
  return null; // This is just a placeholder for imports to work
};
