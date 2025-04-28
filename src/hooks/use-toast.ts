
import { toast as sonnerToast } from "sonner";
import { unifiedToast } from "@/utils/toast-adapter";
import { ToastProps } from "@/components/ui/toast";

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
  const showToast = (message: ToastMessage | ToastProps, options?: ToastOptions) => {
    return unifiedToast.toast(message as any, options);
  };

  const showSuccess = (message: ToastMessage | ToastProps, options?: ToastOptions) => {
    return unifiedToast.success(message as any, options);
  };

  const showError = (message: ToastMessage | ToastProps, options?: ToastOptions) => {
    return unifiedToast.error(message as any, options);
  };

  return {
    toast: showToast,
    success: showSuccess,
    error: showError,
  };
}

// For direct usage without hook
export { sonnerToast as toast };
