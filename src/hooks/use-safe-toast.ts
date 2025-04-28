
import { useToast } from './use-toast';
import { createToast, createErrorToast, createSuccessToast } from '@/utils/toast-utils';
import { ReactNode } from 'react';

export function useSafeToast() {
  const { toast } = useToast();
  
  const showToast = (
    title: string,
    description?: ReactNode,
    variant: 'default' | 'destructive' = 'default',
    duration?: number
  ) => {
    toast(createToast({ title, description, variant, duration }));
  };
  
  const showError = (title: string = 'Error', message: string = 'Something went wrong') => {
    toast(createErrorToast(title, message));
  };
  
  const showSuccess = (title: string, message?: string) => {
    toast(createSuccessToast(title, message));
  };
  
  return {
    showToast,
    showError,
    showSuccess,
    // Return original toast function too in case it's needed
    toast
  };
}

export default useSafeToast;
