/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRol, setUserRol] = useState(null);
  const [userName, setUserName] = useState(null);

  const login = (data) => {
    setIsAuthenticated(true);
    localStorage.setItem("userRol", data.role);
    localStorage.setItem("username", data.username);
    setUserRol(localStorage.getItem("userRol"));
    setUserName(localStorage.getItem("username"));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, userRol, userName }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
