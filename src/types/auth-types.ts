
export interface UserRolePermissions {
  role: string;
  permissions: string[];
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  permissions: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loading: boolean; // Added for compatibility
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  hasPermission: (permission: string) => boolean;
  error: string | null;
}
