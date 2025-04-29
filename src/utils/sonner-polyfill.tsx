
import React from 'react';
import { toast as sonnerToast, Toaster as SonnerToaster, Toast as SonnerToast } from 'sonner';

// Re-export toast function with compatibility layer
export const toast = sonnerToast;

// Re-export all functions and types from sonner
export type { SonnerToast as Toast };
export { SonnerToaster as Toaster };

// Fallback implementation in case sonner is not available
if (typeof sonnerToast !== 'function') {
  console.warn('Sonner toast not found, using fallback');
  
  // Simple fallback for toast
  const createToast = (message: string, options?: any) => {
    console.log('Toast:', message, options);
    return Date.now().toString();
  };
  
  // Add variants
  createToast.success = (message: string, options?: any) => createToast(message, { ...options, type: 'success' });
  createToast.error = (message: string, options?: any) => createToast(message, { ...options, type: 'error' });
  createToast.warning = (message: string, options?: any) => createToast(message, { ...options, type: 'warning' });
  createToast.info = (message: string, options?: any) => createToast(message, { ...options, type: 'info' });
}
