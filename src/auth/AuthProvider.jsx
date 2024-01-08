/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRol, setUserRol] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserRol = localStorage.getItem("userRol");
    const storedUserName = localStorage.getItem("username");
    const storedUserEmail = localStorage.getItem("userEmail");

    if (storedUserRol && storedUserName && storedUserEmail) {
      setIsAuthenticated(true);
      setUserRol(storedUserRol);
      setUserName(storedUserName);
      setEmail(storedUserEmail);
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    setIsAuthenticated(true);
    setUserRol(data.role);
    setUserName(data.username);
    setEmail(data.email);

    localStorage.setItem("userRol", data.role);
    localStorage.setItem("username", data.username);
    localStorage.setItem("userEmail", data.email);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserName(null);
    setUserRol(null);
    setEmail(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        userRol,
        userName,
        email,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
