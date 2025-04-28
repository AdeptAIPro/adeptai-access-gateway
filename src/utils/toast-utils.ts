
import { ReactNode } from 'react';
import { ToastProps } from '@/components/ui/toast';
import { toast as sonnerToast } from "sonner";

// This interface matches what the useToast hook expects
interface ToastOptions {
  title?: string;
  description?: ReactNode;
  variant?: 'default' | 'destructive';
  duration?: number;
}

/**
 * Safely create toast options object with proper typing for shadcn/ui toast
 */
export function createToast({
  title,
  description,
  variant = 'default',
  duration
}: ToastOptions): ToastProps {
  return {
    title,
    description,
    variant,
    duration
  };
}

/**
 * Convert shadcn toast props to sonner toast format
 */
export function toSonnerFormat(toast: ToastProps): any {
  return {
    description: toast.description,
    duration: toast.duration
  };
}

/**
 * Helper to consistently format error toasts
 */
export function createErrorToast(
  title: string = 'Error',
  message: string = 'Something went wrong'
): ToastProps {
  // Show the toast with sonner for immediate feedback
  sonnerToast.error(title, {
    description: message
  });
  
  return {
    title,
    description: message,
    variant: 'destructive'
  };
}

/**
 * Helper to consistently format success toasts
 */
export function createSuccessToast(
  title: string,
  message?: string
): ToastProps {
  // Show the toast with sonner for immediate feedback
  sonnerToast.success(title, {
    description: message
  });
  
  return {
    title,
    description: message,
    variant: 'default'
  };
}

/**
 * Direct helper functions to show toasts (for simpler imports)
 */
export function showError(
  message: string = 'Something went wrong',
  title: string = 'Error'
): ToastProps {
  return createErrorToast(title, message);
}

export function showSuccess(
  title: string,
  message?: string
): ToastProps {
  return createSuccessToast(title, message);
}

/**
 * Create a safe toast function that works with both shadcn/ui and sonner
 */
export function createSafeToast(toast: any) {
  return (message: string | ToastProps, options?: any) => {
    if (typeof message === 'string') {
      // It's a sonner-style call
      return toast(message, options);
    } else {
      // It's a shadcn-style ToastProps object
      const { title, description, variant } = message;
      if (variant === 'destructive') {
        return toast.error(title, { description });
      } else {
        return toast(title, { description });
      }
    }
  };
}
