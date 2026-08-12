"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Read authentication data when application starts
  useEffect(() => {
    try {
      // First check sessionStorage
      const sessionUser = sessionStorage.getItem("user");
      const sessionToken = sessionStorage.getItem("token");

      if (sessionUser && sessionToken) {
        setUser(JSON.parse(sessionUser));
        setToken(sessionToken);
        setLoading(false);
        return;
      }

      // If sessionStorage doesn't have data,
      // check localStorage
      const localUser = localStorage.getItem("user");
      const localToken = localStorage.getItem("token");

      if (localUser && localToken) {
        const parsedUser = JSON.parse(localUser);

        // Restore into state
        setUser(parsedUser);
        setToken(localToken);

        // Also restore current session
        sessionStorage.setItem("user", localUser);
        sessionStorage.setItem("token", localToken);
      }
    } catch (error) {
      console.error("Failed to restore authentication:", error);

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }, []);

  // Login
  const login = ({ user, token, rememberMe = true }) => {
    setUser(user);
    setToken(token);

    // Current browser session
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("token", token);

    // Persistent login
    if (rememberMe) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user && !!token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}