import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import api from "@/lib/api";

interface User {
  _id: string;
  email: string;
  name: string;
  phoneCode: string;
  phoneNumber: string;
  venueName: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signup: (userData: any) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "elvie_auth_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/venue-partner/signin", { email, password });
      const userData = response.data;
      
      if (userData.success) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      }
      return { success: false, message: userData.message };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || "An error occurred during login" 
      };
    }
  };

  const signup = async (userData: any) => {
    try {
      const response = await api.post("/venue-partner/signup", userData);
      const data = response.data;
      
      if (data.success) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setUser(data);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || "An error occurred during registration" 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
