
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "@/utils/router-polyfill";
import { toast } from "sonner";
import { useSecureStorage } from "./use-secure-storage";
import { handleError, ErrorType } from "@/utils/error-handler";
import { jwtDecode } from "jwt-decode";

interface UserRolePermissions {
  viewCRM: boolean;
  editCRM: boolean;
  viewPayroll: boolean;
  runPayroll: boolean;
  viewAnalytics: boolean;
  viewDashboard: boolean; 
  // Add other permissions as needed
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  plan?: string;
  lastLogin?: Date;
  permissions?: UserRolePermissions;
}

interface TokenData {
  token: string;
  refreshToken?: string;
  expiresAt: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  loading: boolean; // Add for compatibility with ProtectedRoute
  hasPermission: (permission: keyof UserRolePermissions) => boolean; // Add for compatibility with ProtectedRoute
  signUp: (name: string, email: string, password: string) => Promise<void>; // Add signUp method
  isAuthenticated: boolean; // Add for compatibility
  refreshSession: () => Promise<boolean>; // Add method to refresh session
  checkTokenExpiration: () => boolean; // Add method to check if token is expired
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isLoading: true,
  loading: true,
  hasPermission: () => false,
  signUp: async () => {},
  isAuthenticated: false,
  refreshSession: async () => false,
  checkTokenExpiration: () => false
});

// Interval to check token expiration - every minute
const TOKEN_CHECK_INTERVAL = 60 * 1000;

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const navigate = useNavigate();
  
  const { getItem, setItem, removeItem } = useSecureStorage({
    storageType: 'local',
    encryptionKey: 'adept_auth_key'
  });
  
  // Check token expiration
  const checkTokenExpiration = (): boolean => {
    if (!tokenData) return false;
    
    // Check if token is expired (with 5 minute buffer)
    const currentTime = Date.now();
    const isExpired = tokenData.expiresAt - currentTime < 5 * 60 * 1000;
    return isExpired;
  };
  
  // Load user from secure storage on mount
  useEffect(() => {
    const loadUserData = () => {
      try {
        const savedUser = getItem('user');
        const savedToken = getItem('auth_tokens');
        
        if (savedUser && savedToken) {
          setUser(savedUser);
          setTokenData(savedToken);
          
          // Validate token
          if (savedToken.expiresAt < Date.now()) {
            // Token is expired - try refresh or logout
            refreshSession().catch(() => logout());
          }
        }
      } catch (e) {
        console.error("Failed to parse user data:", e);
        // Clear invalid data
        removeItem('user');
        removeItem('auth_tokens');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [getItem, removeItem]);
  
  // Set up regular token check
  useEffect(() => {
    if (!user) return;
    
    const checkToken = async () => {
      if (checkTokenExpiration()) {
        try {
          await refreshSession();
        } catch (error) {
          console.error("Failed to refresh token:", error);
          logout();
        }
      }
    };
    
    // Check immediately
    checkToken();
    
    // Set up interval
    const interval = setInterval(checkToken, TOKEN_CHECK_INTERVAL);
    
    return () => clearInterval(interval);
  }, [user, tokenData]);
  
  // Refresh the session
  const refreshSession = async (): Promise<boolean> => {
    if (!tokenData?.refreshToken) {
      return false;
    }
    
    try {
      // For demo: simulate token refresh API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, you'd call your refresh token API
      // const response = await apiClient.post('/auth/refresh-token', { 
      //   refreshToken: tokenData.refreshToken 
      // });
      
      // Demo: just extend the current token
      const newExpiresAt = Date.now() + 60 * 60 * 1000; // 1 hour
      const newTokenData = {
        token: `refreshed_${Date.now()}`,
        refreshToken: tokenData.refreshToken,
        expiresAt: newExpiresAt
      };
      
      setTokenData(newTokenData);
      setItem('auth_tokens', newTokenData);
      
      return true;
    } catch (error) {
      handleError({
        type: ErrorType.AUTHENTICATION,
        message: "Failed to refresh session",
        userFriendlyMessage: "Your session has expired. Please log in again.",
        originalError: error
      }, true);
      
      logout();
      return false;
    }
  };
  
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
          plan: 'enterprise',
          lastLogin: new Date(),
          permissions: {
            viewCRM: true,
            editCRM: true,
            viewPayroll: true,
            runPayroll: true,
            viewAnalytics: true,
            viewDashboard: true
          }
        };
        
        const tokenData: TokenData = {
          token: `demo_token_${Date.now()}`,
          refreshToken: `demo_refresh_${Date.now()}`,
          expiresAt: Date.now() + 60 * 60 * 1000 // 1 hour
        };
        
        setUser(userData);
        setTokenData(tokenData);
        
        // Store in secure storage
        setItem('user', userData);
        setItem('auth_tokens', tokenData);
        
        toast.success("Login successful!");
        return true;
      } else if (email === "user@example.com" && password === "password") {
        const userData: User = {
          id: 'user1',
          name: 'Regular User',
          email: email,
          role: 'user',
          plan: 'free',
          lastLogin: new Date(),
          permissions: {
            viewCRM: false,
            editCRM: false,
            viewPayroll: false,
            runPayroll: false,
            viewAnalytics: false,
            viewDashboard: true
          }
        };
        
        const tokenData: TokenData = {
          token: `demo_token_${Date.now()}`,
          refreshToken: `demo_refresh_${Date.now()}`,
          expiresAt: Date.now() + 60 * 60 * 1000 // 1 hour
        };
        
        setUser(userData);
        setTokenData(tokenData);
        
        // Store in secure storage
        setItem('user', userData);
        setItem('auth_tokens', tokenData);
        
        toast.success("Login successful!");
        return true;
      } else {
        handleError({
          type: ErrorType.AUTHENTICATION,
          message: "Invalid credentials",
          userFriendlyMessage: "Invalid email or password",
        }, true);
        return false;
      }
    } catch (error) {
      handleError({
        type: ErrorType.AUTHENTICATION,
        message: "Login failed",
        userFriendlyMessage: "Login failed. Please try again.",
        originalError: error
      }, true);
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
      const userData: User = {
        id: Date.now().toString(),
        name,
        email,
        role: "user",
        plan: "free",
        lastLogin: new Date(),
        permissions: {
          viewCRM: false,
          editCRM: false,
          viewPayroll: false,
          runPayroll: false,
          viewAnalytics: false,
          viewDashboard: true
        }
      };
      
      const tokenData: TokenData = {
        token: `demo_token_${Date.now()}`,
        refreshToken: `demo_refresh_${Date.now()}`,
        expiresAt: Date.now() + 60 * 60 * 1000 // 1 hour
      };
      
      setUser(userData);
      setTokenData(tokenData);
      
      // Store in secure storage
      setItem('user', userData);
      setItem('auth_tokens', tokenData);
      
      toast.success("Registration successful");
    } catch (error) {
      handleError({
        type: ErrorType.AUTHENTICATION,
        message: "Registration failed",
        userFriendlyMessage: "Registration failed. Please try again.",
        originalError: error
      }, true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    setTokenData(null);
    removeItem('user');
    removeItem('auth_tokens');
    toast.success("Logged out successfully");
    navigate('/login');
  };

  // Permission check function for ProtectedRoute
  const hasPermission = (permission: keyof UserRolePermissions): boolean => {
    // Simple implementation - in reality, this would check against user roles
    if (!user) return false;
    
    // Check user permissions directly if available
    if (user.permissions && permission in user.permissions) {
      return user.permissions[permission];
    }
    
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
      signUp,
      isAuthenticated: !!user,
      refreshSession,
      checkTokenExpiration
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Function to safely decode JWT tokens
export const decodeToken = (token: string): any => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
