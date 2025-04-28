
import { ReactNode } from 'react';
import { ToastProps } from '@/components/ui/toast';

// This interface matches what the useToast hook expects
interface ToastOptions {
  title?: string;
  description?: ReactNode;
  variant?: 'default' | 'destructive';
  duration?: number;
}

/**
 * Safely create toast options object with proper typing
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
 * Helper to consistently format error toasts
 */
export function createErrorToast(
  title: string = 'Error',
  message: string = 'Something went wrong'
): ToastProps {
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
