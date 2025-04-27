
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
  
  // ElementType definition for React components
  type ElementType<P = any> = React.ElementType<P>;
  
  // User definition
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }
  
  // Add AgentTask definition for global use
  interface AgentTask {
    id: string;
    taskType: string;
    description: string;
    goal?: string;
    status: "pending" | "in progress" | "completed" | "failed";
    agentId: string;
    agent?: string;
    createdAt: string;
    completedAt?: string;
    error?: string;
    result?: any;
    title?: string;
  }
  
  // Add Agent definition for global use
  interface Agent {
    id: string;
    name: string;
    type?: string;
    description: string;
    capabilities: string[];
    status: "active" | "inactive" | "busy" | "maintenance";
    createdAt: string;
  }

  // Add Employee interface
  interface Employee {
    id: string;
    name: string;
    employeeId: string;
    email: string;
    type: string;
    phone?: string;
    address?: string | {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    status: "active" | "inactive" | "pending";
    department?: string;
    position?: string;
    hireDate?: string;
    taxInfo?: {
      ssn: string;
      withholding: number;
      w4Status: string;
    };
  }
}

// Extend window object
declare global {
  interface Window {
    vite?: any;
  }
}

export {};
