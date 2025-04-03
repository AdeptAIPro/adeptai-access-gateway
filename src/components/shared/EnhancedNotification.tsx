
import React, { useState, useEffect } from "react";
import { X, AlertCircle, Info, CheckCircle, AlertTriangle, Bell } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const notificationVariants = cva(
  "flex items-start gap-3 p-4 rounded-lg border animate-fade-in",
  {
    variants: {
      variant: {
        default: "bg-background border-border",
        info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-300",
        success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300",
        warning: "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-700 dark:text-amber-300",
        error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface NotificationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof notificationVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  dismissable?: boolean;
  autoDismiss?: boolean;
  dismissTimeout?: number;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
}

export const EnhancedNotification = React.forwardRef<
  HTMLDivElement,
  NotificationProps
>(({
  title,
  description,
  variant,
  icon,
  dismissable = true,
  autoDismiss = false,
  dismissTimeout = 5000,
  className,
  actionLabel,
  onAction,
  onDismiss,
  ...props
}, ref) => {
  const [visible, setVisible] = useState(true);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  
  // Set up auto-dismiss
  useEffect(() => {
    if (autoDismiss && visible) {
      const id = setTimeout(() => {
        handleDismiss();
      }, dismissTimeout);
      
      setTimeoutId(id);
      
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, [autoDismiss, dismissTimeout]);
  
  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) onDismiss();
  };
  
  // Default icons based on variant
  const getDefaultIcon = () => {
    switch (variant) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };
  
  if (!visible) return null;
  
  return (
    <div
      ref={ref}
      className={cn(notificationVariants({ variant }), className)}
      {...props}
    >
      <div className="flex-shrink-0 mt-0.5">
        {icon || getDefaultIcon()}
      </div>
      <div className="flex-1">
        {title && <h4 className="text-sm font-medium mb-1">{title}</h4>}
        {description && <p className="text-sm opacity-90">{description}</p>}
        {(actionLabel || onAction) && (
          <div className="mt-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onAction}
              className={cn(
                "h-8 px-3 text-xs",
                variant === "info" && "border-blue-300 bg-blue-100/50 hover:bg-blue-100",
                variant === "success" && "border-green-300 bg-green-100/50 hover:bg-green-100",
                variant === "warning" && "border-amber-300 bg-amber-100/50 hover:bg-amber-100",
                variant === "error" && "border-red-300 bg-red-100/50 hover:bg-red-100",
              )}
            >
              {actionLabel || "Action"}
            </Button>
          </div>
        )}
      </div>
      
      {dismissable && (
        <button
          onClick={handleDismiss}
          className={cn(
            "rounded-full p-1 opacity-70 hover:opacity-100 hover:bg-background/10",
            "transition-opacity"
          )}
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
});

EnhancedNotification.displayName = "EnhancedNotification";

export default EnhancedNotification;
