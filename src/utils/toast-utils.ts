
import { toast } from 'sonner';

/**
 * Show a success toast message
 * @param message The message to display
 */
export const showSuccess = (message: string) => {
  toast.success(message);
};

/**
 * Show an error toast message
 * @param message The message to display
 */
export const showError = (message: string) => {
  toast.error(message);
};

/**
 * Show an info toast message
 * @param message The message to display
 */
export const showInfo = (message: string) => {
  toast.info(message);
};

/**
 * Show a warning toast message
 * @param message The message to display
 */
export const showWarning = (message: string) => {
  toast.warning(message);
};
