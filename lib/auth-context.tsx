"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for logged in user on mount
    const storedUser = localStorage.getItem("course_app_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock validation
    // For demo purposes, we accept any "valid-looking" login or check against stored "registered" user
    // Ideally we might check mock database but for now just create session
    
    const mockUser: User = {
      name: email.split("@")[0],
      email: email,
      avatar: "https://github.com/shadcn.png"
    };

    // If we have a registered user in local storage (separate key), we could check that, 
    // but simplified flow: just log them in.
    
    setUser(mockUser);
    localStorage.setItem("course_app_user", JSON.stringify(mockUser));
    setIsLoading(false);
    router.push("/");
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const newUser: User = {
      name,
      email,
      avatar: "https://github.com/shadcn.png"
    };
    
    setUser(newUser);
    localStorage.setItem("course_app_user", JSON.stringify(newUser));
    setIsLoading(false);
    router.push("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("course_app_user");
    router.push("/login");
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("course_app_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
