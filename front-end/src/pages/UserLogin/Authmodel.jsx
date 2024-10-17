import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(null); // Store user info (including role)

  const [user, setUser] = useState(() => {
    // Retrieve user data from local storage on initial load
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    setUser(userData); // Set user data upon login
    localStorage.setItem("user", JSON.stringify(userData)); // Store user data in local storage
    localStorage.setItem("userEmail", userData.Email); // Store email if needed
  };

  // const login = (userData) => {
  //   setUser(userData); // Set user data upon login
  //   localStorage.setItem("token", userData.token); // Store token if needed
  //   console.log(`Email = ${userData.Email}`);
  // };
  const logout = () => {
    setUser(null); // Clear user data upon logout
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
