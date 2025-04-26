
import { toast } from 'sonner';

// Extended toast functions to handle single argument case
export const showError = (message: string, options?: any) => {
  if (options) {
    return toast.error(message, options);
  }
  return toast.error(message);
};

export const showSuccess = (message: string, options?: any) => {
  if (options) {
    return toast.success(message, options);
  }
  return toast.success(message);
};

export const showInfo = (message: string, options?: any) => {
  if (options) {
    return toast.info(message, options);
  }
  return toast.info(message);
};
