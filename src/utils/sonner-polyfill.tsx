
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define toast types
type ToastType = 'default' | 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  onDismiss?: () => void;
}

interface ToasterContextProps {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, 'id'>) => string;
  dismissToast: (id: string) => void;
}

// Create context
const ToasterContext = createContext<ToasterContextProps>({
  toasts: [],
  addToast: () => '',
  dismissToast: () => {},
});

// Create provider
export const ToasterProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (toast: Omit<ToastProps, 'id'>): string => {
    const id = Math.random().toString(36).substring(2);
    const newToast: ToastProps = { ...toast, id };
    
    setToasts((prev) => [...prev, newToast]);
    
    // Auto dismiss
    if (toast.duration !== Infinity) {
      setTimeout(() => {
        dismissToast(id);
      }, toast.duration || 5000);
    }
    
    return id;
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => {
      const toast = prev.find(t => t.id === id);
      if (toast?.onDismiss) toast.onDismiss();
      return prev.filter(t => t.id !== id);
    });
  };

  return (
    <ToasterContext.Provider value={{ toasts, addToast, dismissToast }}>
      {children}
    </ToasterContext.Provider>
  );
};

// Hook to use the context
export const useToaster = () => {
  return useContext(ToasterContext);
};

// Toast component
export const Toast = ({ 
  children,
  ...props
}: { 
  children: ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <div className={`bg-white rounded shadow-md p-4 ${props.className || ''}`}>
      {children}
    </div>
  );
};

// Toaster component
export const Toaster = () => {
  const { toasts, dismissToast } = useToaster();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 min-w-[300px]">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`bg-white rounded shadow-md p-4 animate-in slide-in-from-right-5 
            ${toast.type === 'error' ? 'border-l-4 border-red-500' : ''}
            ${toast.type === 'success' ? 'border-l-4 border-green-500' : ''}
            ${toast.type === 'info' ? 'border-l-4 border-blue-500' : ''}
            ${toast.type === 'warning' ? 'border-l-4 border-yellow-500' : ''}`}
        >
          {toast.title && <h4 className="font-medium">{toast.title}</h4>}
          {toast.description && <p className="text-sm text-gray-500">{toast.description}</p>}
          <button
            onClick={() => dismissToast(toast.id)}
            className="absolute top-1 right-1 p-1 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

// Toast function export
const createToastFunction = (type: ToastType = 'default') => {
  return (titleOrOptions: string | Omit<ToastProps, 'id' | 'type'>, options?: Omit<ToastProps, 'id' | 'type' | 'title'>) => {
    const { addToast } = useContext(ToasterContext);
    
    if (typeof titleOrOptions === 'string') {
      return addToast({ title: titleOrOptions, ...options, type });
    }
    
    return addToast({ ...titleOrOptions, type });
  };
};

// Toast functions
export const toast = {
  success: createToastFunction('success'),
  error: createToastFunction('error'),
  info: createToastFunction('info'),
  warning: createToastFunction('warning'),
  // Default toast
  (...args: Parameters<ReturnType<typeof createToastFunction>>) {
    return createToastFunction('default')(...args);
  },
  // Attach methods directly
  promise: async (promise: Promise<any>, options: any) => {
    // Simple implementation
    try {
      await promise;
      return createToastFunction('success')(options.success || 'Completed successfully');
    } catch (e) {
      return createToastFunction('error')(options.error || 'An error occurred');
    }
  },
  // You can add more methods as needed
};
