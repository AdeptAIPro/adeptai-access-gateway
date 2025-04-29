
import React from 'react';
import { toast as sonnerToast, Toaster as SonnerToaster } from 'sonner';

// Re-export toast function with compatibility layer
export const toast = sonnerToast;

// Re-export Toaster component
export const Toaster = SonnerToaster;
