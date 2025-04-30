
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
