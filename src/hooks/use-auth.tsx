
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface UserRolePermissions {
  viewCRM: boolean;
  editCRM: boolean;
  viewPayroll: boolean;
  runPayroll: boolean;
  viewAnalytics: boolean;
  viewDashboard: boolean; // Added this missing permission
  // Add other permissions as needed
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  plan?: string; // Add plan property for compatibility
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  loading: boolean; // Add for compatibility with ProtectedRoute
  hasPermission: (permission: keyof UserRolePermissions) => boolean; // Add for compatibility with ProtectedRoute
  signUp: (name: string, email: string, password: string) => Promise<void>; // Add signUp method
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isLoading: true,
  loading: true,
  hasPermission: () => false,
  signUp: async () => {}
});

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo: specific email/password combos work
      if (email === "admin@example.com" && password === "password") {
        const userData: User = {
          id: 'admin1',
          name: 'Admin User',
          email: email,
          role: 'admin',
          plan: 'enterprise'
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success("Login successful!");
        return true;
      } else if (email === "user@example.com" && password === "password") {
        const userData: User = {
          id: 'user1',
          name: 'Regular User',
          email: email,
          role: 'user',
          plan: 'free'
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success("Login successful!");
        return true;
      } else {
        toast.error("Invalid credentials");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Create new user (demo implementation)
      const userData = {
        id: Date.now().toString(),
        name,
        email,
        role: "user",
        plan: "free"
      };
      
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Registration successful");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success("Logged out successfully");
    navigate('/login');
  };

  // Permission check function for ProtectedRoute
  const hasPermission = (permission: keyof UserRolePermissions): boolean => {
    // Simple implementation - in reality, this would check against user roles
    if (!user) return false;
    
    // For demo purposes, grant all permissions to admin
    if (user.role === 'admin') return true;
    
    // Grant dashboard access to all users
    if (permission === 'viewDashboard') return true;
    
    // Deny other permissions to non-admin users
    return false;
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoading, 
      loading: isLoading,
      hasPermission,
      signUp
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
