// store/AuthContext.tsx
import React, { createContext, useState, useContext } from 'react';

// Qeexidda xogta aan kaydinayno
const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook aan isticmaali doono si aan xogta u akhrisano
export const useAuth = () => useContext(AuthContext);
