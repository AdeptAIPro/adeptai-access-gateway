
// Global type declarations for the project

// React declarations
import React from 'react';
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Allow title property in React elements
      [elemName: string]: any;
    }
  }

  // UserRolePermissions definition
  interface UserRolePermissions {
    viewCRM: boolean;
    editCRM: boolean;
    viewPayroll: boolean;
    runPayroll: boolean;
    viewAnalytics: boolean;
    viewDashboard: boolean;
    [key: string]: boolean;
  }
}

// Extend window object
declare global {
  interface Window {
    vite?: any;
  }
}

export {};
