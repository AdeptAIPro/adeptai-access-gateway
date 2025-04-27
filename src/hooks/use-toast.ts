
// We'll create a thin wrapper around sonner to maintain compatibility
import { toast } from "sonner";

export const useToast = () => {
  return { toast };
};
