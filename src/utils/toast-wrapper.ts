
import { toast } from "sonner";
import { AppError } from "./error-handler";

/**
 * Wrapper around toast functions to handle type compatibility issues
 */

export const showToast = {
  success: (title: string, message?: string) => {
    return toast.success(title, {
      description: message
    });
  },
  
  error: (title: string, message?: string) => {
    return toast.error(title, {
      description: message
    });
  },
  
  warning: (title: string, message?: string) => {
    return toast.warning(title, {
      description: message
    });
  },
  
  info: (title: string, message?: string) => {
    return toast.info(title, {
      description: message
    });
  },
  
  // Helper to show appropriate toast for an error
  fromError: (error: Error | AppError | string) => {
    const title = "Error";
    const message = typeof error === 'string' 
      ? error 
      : ('userFriendlyMessage' in error ? error.userFriendlyMessage : error.message);
    
    return toast.error(title, {
      description: message
    });
  }
};

// Export the original toast as well for advanced usage
export { toast };
