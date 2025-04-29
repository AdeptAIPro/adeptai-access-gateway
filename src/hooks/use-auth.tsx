
import React, { createContext, useContext, useState, useEffect } from 'react';
import { lambdaApi } from '@/services/backend-api/LambdaApiClient';
import { USER_MANAGEMENT_LAMBDA } from '@/services/aws/config';
import { tryCatch, ErrorType, createAppError } from '@/utils/error-handler';

// Define types
interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
  tenantId: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample user data for development
const mockUser: User = {
  id: '1',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'admin',
  permissions: ['viewDashboard', 'viewCRM', 'viewAnalytics', 'manageUsers'],
  tenantId: 'default-tenant'
};

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isBackendAvailable, setIsBackendAvailable] = useState<boolean | null>(null);

  // Check if backend is available
  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        const isAvailable = await lambdaApi.checkHealth();
        setIsBackendAvailable(isAvailable);
      } catch (err) {
        console.log('Backend health check failed, using mock data');
        setIsBackendAvailable(false);
      }
    };
    
    checkBackendConnection();
  }, []);

  // Load user on initial render
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Wait for backend availability check
        if (isBackendAvailable === null) return;
        
        // If backend is available, verify token and get user data
        if (isBackendAvailable) {
          const sessionToken = localStorage.getItem('authToken');
          
          if (sessionToken) {
            // Verify token with backend
            const [userData, error] = await tryCatch(async () => {
              return await lambdaApi.invoke(
                USER_MANAGEMENT_LAMBDA,
                'verifyToken',
                { token: sessionToken }
              );
            });
            
            if (error || !userData) {
              // Invalid token, clear it
              localStorage.removeItem('authToken');
              setUser(null);
            } else {
              setUser(userData);
            }
          } else {
            // For development with no token, optionally use mock user
            if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_USER === 'true') {
              setUser(mockUser);
              localStorage.setItem('authToken', 'mock-token');
            } else {
              setUser(null);
            }
          }
        } else {
          // Backend not available, use mock user for development
          if (import.meta.env.DEV) {
            console.log('Using mock user since backend is unavailable');
            setUser(mockUser);
            localStorage.setItem('authToken', 'mock-token');
          } else {
            // In production, don't use mock data if backend is down
            setUser(null);
            setError(new Error('Authentication services are currently unavailable.'));
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [isBackendAvailable]);

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    
    try {
      if (!isBackendAvailable) {
        // Mock login for development when backend is unavailable
        if (import.meta.env.DEV) {
          console.log('Using mock login since backend is unavailable');
          setUser(mockUser);
          localStorage.setItem('authToken', 'mock-token');
          return;
        } else {
          throw createAppError(
            'Authentication services are currently unavailable.',
            ErrorType.API
          );
        }
      }
      
      // Real login with backend
      const [authData, error] = await tryCatch(async () => {
        return await lambdaApi.invoke(
          USER_MANAGEMENT_LAMBDA,
          'login',
          { email, password }
        );
      });
      
      if (error || !authData) {
        throw error || new Error('Login failed');
      }
      
      // Store token and user data
      localStorage.setItem('authToken', authData.token);
      setUser(authData.user);
      
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Login failed'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  // Permission check
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
