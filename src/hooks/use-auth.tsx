
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the user type
type User = {
  id: string;
  email: string;
  name?: string;
  role: string;
  tenantId: string;
};

// Define the auth context type
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  error: string | null;
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for development
const MOCK_USER: User = {
  id: 'user-123',
  email: 'test@example.com',
  name: 'Test User',
  role: 'admin',
  tenantId: 'tenant-123'
};

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
      
      // In production, call backend API
      // const { user, token } = await api.login(email, password);
      // setUser(user);
      // localStorage.setItem('authToken', token);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login');
      throw new Error(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In development, just use mock data
      setUser({ ...MOCK_USER, email, name });
      localStorage.setItem('authToken', 'mock-token-123');
      
      // In production, call backend API
      // const { user, token } = await api.signup(email, password, name);
      // setUser(user);
      // localStorage.setItem('authToken', token);
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to signup');
      throw new Error(err.message || 'Failed to signup');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    error
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the auth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
