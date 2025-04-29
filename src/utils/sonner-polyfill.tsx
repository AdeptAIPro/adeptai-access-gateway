
import React from 'react';

// Export basic toast functionality
export const Toaster = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="toaster-container">
      {children}
    </div>
  );
};

// Basic toast function with variants
export const toast = Object.assign(
  (message: string) => {
    console.log(`Toast: ${message}`);
  },
  {
    success: (message: string) => console.log(`Success toast: ${message}`),
    error: (message: string) => console.log(`Error toast: ${message}`),
    warning: (message: string) => console.log(`Warning toast: ${message}`),
    info: (message: string) => console.log(`Info toast: ${message}`),
  }
);

