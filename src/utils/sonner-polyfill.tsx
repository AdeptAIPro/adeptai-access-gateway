
import React from 'react';

// Define toast option types
export interface ToastOptions {
  id?: string | number;
  icon?: React.ReactNode;
  duration?: number;
  description?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick?: () => void;
  };
  onDismiss?: (id: string | number) => void;
  onAutoClose?: (id: string | number) => void;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  className?: string;
  style?: React.CSSProperties;
  cancelButtonStyle?: React.CSSProperties;
  actionButtonStyle?: React.CSSProperties;
  unstyled?: boolean;
  [key: string]: any;
}

// Export basic toast functionality
export const Toaster = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="toaster-container">
      {children}
    </div>
  );
};

// Basic toast function with variants that accepts options parameter
export const toast = Object.assign(
  (message: string, options?: ToastOptions) => {
    console.log(`Toast: ${message}`, options?.description || '');
    return options?.id || Date.now();
  },
  {
    success: (message: string, options?: ToastOptions) => {
      console.log(`Success toast: ${message}`, options?.description || '');
      return options?.id || Date.now();
    },
    error: (message: string, options?: ToastOptions) => {
      console.log(`Error toast: ${message}`, options?.description || '');
      return options?.id || Date.now();
    },
    warning: (message: string, options?: ToastOptions) => {
      console.log(`Warning toast: ${message}`, options?.description || '');
      return options?.id || Date.now();
    },
    info: (message: string, options?: ToastOptions) => {
      console.log(`Info toast: ${message}`, options?.description || '');
      return options?.id || Date.now();
    },
    promise: (promise: Promise<any>, options?: { loading: string; success: string; error: string }) => {
      console.log(`Promise toast: ${options?.loading || 'Loading'}`);
      return promise
        .then(() => console.log(`Promise resolved: ${options?.success || 'Success'}`))
        .catch(() => console.log(`Promise rejected: ${options?.error || 'Error'}`));
    },
    dismiss: (id?: string | number) => {
      console.log(`Dismiss toast: ${id || 'all'}`);
    },
    custom: (component: React.ReactNode, options?: ToastOptions) => {
      console.log('Custom toast');
      return options?.id || Date.now();
    }
  }
);

export default { toast, Toaster };
