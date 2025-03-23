
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  plan?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check for existing user session in localStorage
    const storedUser = localStorage.getItem("adeptai_user");
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("adeptai_user");
      }
    }
    
    setLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    // This is a mock implementation that would be replaced with an actual API call
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, we would validate credentials with a backend
    // For demo purposes, we're creating a mock user
    const mockUser = {
      id: `user_${Date.now()}`,
      name: email.split("@")[0],
      email,
      plan: "pro"
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
    
    // Create a new user
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email
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
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
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
