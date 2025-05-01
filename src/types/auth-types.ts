
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role: string;
  plan?: "free_trial" | "pro" | "business" | "enterprise" | null;
  permissions?: string[];
  tenantId?: string;
  metadata?: Record<string, any>;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>; // Added signUp alias
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  name: string;
}

export enum UserRolePermissions {
  VIEW_DASHBOARD = "view_dashboard",
  MANAGE_USERS = "manage_users",
  ADMIN = "admin",
  USE_AI = "use_ai",
  MANAGE_INTEGRATIONS = "manage_integrations"
}
