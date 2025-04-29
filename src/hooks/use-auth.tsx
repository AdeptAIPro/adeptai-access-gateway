
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types/auth-types';
import { UserRolePermissions } from '@/services/crm/types';

// Define mock permissions for development
const MOCK_PERMISSIONS: UserRolePermissions = {
  viewCRM: true,
  editCRM: true,
  viewPayroll: true,
  runPayroll: true,
  viewAnalytics: true,
  viewDashboard: true
};

// Mock user for development
const MOCK_USER: User = {
  id: 'user-123',
  email: 'test@example.com',
  name: 'Test User',
  role: 'admin',
  plan: 'pro'
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, check if there's a valid token in localStorage or cookies
        const token = localStorage.getItem('authToken');
        
        if (token) {
          // For development, use mock user data
          setUser(MOCK_USER);
          
          // In production, validate token with backend
          // const userData = await validateTokenWithBackend(token);
          // setUser(userData);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError('Failed to initialize authentication');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In development, just use mock data
      setUser(MOCK_USER);
      localStorage.setItem('authToken', 'mock-token-123');
      
      // In production, would call API:
      // const response = await authApi.login(email, password);
      // setUser(response.user);
      // localStorage.setItem('authToken', response.token);
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to log in. Please check your credentials and try again.');
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In development, just use mock data
      setUser({...MOCK_USER, name, email});
      localStorage.setItem('authToken', 'mock-token-123');
      
      // In production, would call API:
      // const response = await authApi.register(name, email, password);
      // setUser(response.user);
      // localStorage.setItem('authToken', response.token);
    } catch (err) {
      console.error('Registration error:', err);
      setError('Failed to register. This email may already be in use.');
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    
    // In production, may want to call API to invalidate token on server
    // await authApi.logout();
  };

  // Check if user has permission
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    // In a real app, would check against permissions from the user's role
    return MOCK_PERMISSIONS[permission as keyof UserRolePermissions] || false;
  };

  // SignUp is an alias for register
  const signUp = register;

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      register,
      signUp,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
