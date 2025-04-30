
export interface UserRole {
  id: string;
  name: string;
  permissions: UserRolePermissions;
}

export interface UserRolePermissions {
  viewCRM: boolean;
  editCRM: boolean;
  viewPayroll: boolean;
  runPayroll: boolean;
  viewAnalytics: boolean;
  viewDashboard: boolean;
  [key: string]: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  roles?: string[]; // For backward compatibility
  plan?: string; // Add plan property
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loading: boolean; // Adding this for backward compatibility
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>; // Add signUp method
  hasPermission: (permission: string) => boolean; // Add hasPermission method
}
