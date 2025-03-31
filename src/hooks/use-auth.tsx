
import React, { createContext, useContext, useState, useEffect } from "react";
import { UserRole, UserRolePermissions } from "@/services/crm/types";

interface User {
  id: string;
  name: string;
  email: string;
  plan?: string;
  roles: UserRole[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: keyof UserRolePermissions) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define role permissions
const rolePermissions: Record<UserRole, UserRolePermissions> = {
  admin: {
    viewCRM: true,
    viewDashboard: true,
    editLeads: true,
    viewAnalytics: true
  },
  sales: {
    viewCRM: true,
    viewDashboard: false,
    editLeads: true,
    viewAnalytics: false
  },
  marketing: {
    viewCRM: true,
    viewDashboard: false,
    editLeads: false,
    viewAnalytics: true
  },
  leadership: {
    viewCRM: false,
    viewDashboard: true,
    editLeads: false,
    viewAnalytics: true
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check for existing user session in localStorage
    const storedUser = localStorage.getItem("adeptai_user");
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // If the user doesn't have roles, add a default role (for backward compatibility)
        if (!parsedUser.roles) {
          parsedUser.roles = ['admin'];
          localStorage.setItem("adeptai_user", JSON.stringify(parsedUser));
        }
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("adeptai_user");
      }
    }
    
    setLoading(false);
  }, []);

  const hasPermission = (permission: keyof UserRolePermissions): boolean => {
    if (!user || !user.roles || user.roles.length === 0) return false;
    
    // Check if any of the user's roles have the required permission
    return user.roles.some(role => rolePermissions[role][permission]);
  };
  
  const login = async (email: string, password: string) => {
    // This is a mock implementation that would be replaced with an actual API call
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Determine roles based on email domain or other factors
    let roles: UserRole[] = ['admin']; // Default role
    
    // Example: Assign roles based on email domain or patterns
    if (email.includes('sales') || email.endsWith('sales@adeptaipro.com')) {
      roles = ['sales'];
    } else if (email.includes('marketing') || email.endsWith('marketing@adeptaipro.com')) {
      roles = ['marketing'];
    } else if (email.includes('leadership') || email.includes('exec') || 
               email.endsWith('leadership@adeptaipro.com') || 
               email.endsWith('exec@adeptaipro.com')) {
      roles = ['leadership'];
    } else if (email.includes('admin') || email.endsWith('admin@adeptaipro.com')) {
      roles = ['admin'];
    }
    
    const mockUser = {
      id: `user_${Date.now()}`,
      name: email.split("@")[0],
      email,
      plan: "pro",
      roles
    };
    
    // Store user in localStorage
    localStorage.setItem("adeptai_user", JSON.stringify(mockUser));
    
    // Update state
    setUser(mockUser);
  };
  
  const register = async (name: string, email: string, password: string) => {
    // This is a mock implementation that would be replaced with an actual API call
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Determine roles based on email domain or other factors
    const roles: UserRole[] = ['admin']; // Default role for new registrations
    
    // Create a new user
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      roles
    };
    
    // Store user in localStorage
    localStorage.setItem("adeptai_user", JSON.stringify(newUser));
    
    // Update state
    setUser(newUser);
  };
  
  const logout = () => {
    // Remove user from localStorage
    localStorage.removeItem("adeptai_user");
    
    // Update state
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
