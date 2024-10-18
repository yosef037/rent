import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user data from local storage on initial load
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    setUser(userData); // Set user data upon login
    localStorage.setItem("user", JSON.stringify(userData)); // Store user data in local storage
    localStorage.setItem("userId", userData.User_Id); // Store User_Id if needed
    localStorage.setItem("userEmail", userData.Email); // Store email if needed
  };

  const logout = () => {
    setUser(null); // Clear user data upon logout
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user"); // Clear user data from local storage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
