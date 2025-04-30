
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { AppError } from '@/utils/error-handler';
import { UserRolePermissions } from '@/types/auth-types';
import { User, AuthContextType } from '@/types/auth-types';

// Create the authentication context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  loading: true, // for backward compatibility
  login: async () => {},
  logout: () => {},
  register: async () => {},
  signUp: async () => {},
  hasPermission: () => false
});

// Default user roles and permissions
const defaultUserRoles: Record<string, UserRolePermissions> = {
  admin: {
    viewCRM: true,
    editCRM: true,
    viewPayroll: true,
    runPayroll: true,
    viewAnalytics: true,
    viewDashboard: true
  },
  user: {
    viewCRM: true,
    editCRM: false,
    viewPayroll: false,
    runPayroll: false,
    viewAnalytics: true,
    viewDashboard: true
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        // Check for user in localStorage (simplified auth for demo)
        const savedUser = localStorage.getItem('user');
        
        if (savedUser) {
          // Parse and validate user data
          const userData = JSON.parse(savedUser) as User;
          setUser(userData);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // In a real app, this would call your API
      // For demo purposes, we'll use dummy data
      
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation for demo
      if (password === 'password') {
        // Mock user
        const newUser: User = {
          id: '1',
          name: email.split('@')[0],
          email,
          role: email.includes('admin') ? 'admin' : 'user'
        };
        
        // Save to localStorage (in production use secure auth tokens)
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('auth_token', 'mock-jwt-token');
        
        setUser(newUser);
        
        toast.success('Login successful', {
          description: `Welcome back, ${newUser.name}!`
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed', {
        description: error instanceof Error ? error.message : 'Please check your credentials.'
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    setUser(null);
    toast.info('Logged out successfully');
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // In a real app, call your API to register the user
      // For demo, we'll simulate an API call
      
      if (!name || !email || !password) {
        throw new Error('All fields are required');
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Registration successful', {
        description: 'Your account has been created. You may now log in.'
      });
      
      // Note: In a real app, you might want to automatically log in the user
      
    } catch (error) {
      toast.error('Registration failed', {
        description: error instanceof Error ? error.message : 'Please check your information.'
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user has specific permission
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    // Get role permissions
    const rolePermissions = defaultUserRoles[user.role] || defaultUserRoles.user;
    
    // Check if permission exists
    return Boolean(rolePermissions[permission]);
  };
  
  // For backward compatibility
  const signUp = register;

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading,
      loading: isLoading, // for backward compatibility
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

export const useAuth = () => useContext(AuthContext);
