
import { toast } from "sonner";

type ToastMessage = string | React.ReactNode;
type ToastOptions = {
  description?: ToastMessage;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
};

export function useToast() {
  const showToast = (message: ToastMessage, options?: ToastOptions) => {
    toast(message, {
      ...options,
      duration: options?.duration ?? 5000,
    });
  };

  const showSuccess = (message: ToastMessage, options?: ToastOptions) => {
    toast.success(message, options);
  };

  const showError = (message: ToastMessage, options?: ToastOptions) => {
    toast.error(message, options);
  };

  return {
    toast: showToast,
    success: showSuccess,
    error: showError,
  };
}

// For direct usage without hook
export { toast };
