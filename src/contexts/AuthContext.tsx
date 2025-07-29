// src/contexts/AuthContext.tsx
import React, { createContext, useContext } from "react";
import { useAuthStore } from "@/store/authStore";
import type { AuthState } from "@/store/authStore";

const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useAuthStore(); // Executa apenas uma vez no provider

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
