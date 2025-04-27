
import { toast } from '@/utils/sonner-polyfill';

/**
 * Show a success toast message
 */
export const showSuccess = (message: string, options = {}) => {
  toast.success(message, options);
};

/**
 * Show an error toast message
 */
export const showError = (message: string, options = {}) => {
  toast.error(message, options);
};

/**
 * Show a warning toast message
 */
export const showWarning = (message: string, options = {}) => {
  toast.warning ? toast.warning(message, options) : toast(message, {...options, className: 'warning-toast'});
};

/**
 * Show an info toast message
 */
export const showInfo = (message: string, options = {}) => {
  toast(message, options);
};

/**
 * Show a promise toast
 */
export const showPromise = <T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: any) => string);
  },
  options = {}
) => {
  return toast.promise(promise, messages, options);
};
