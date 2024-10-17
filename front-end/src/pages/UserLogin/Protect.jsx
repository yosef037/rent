import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Authmodel";

const ProtectedRoute = ({
  children,
  requiredRole,
  setShowLogin,
  onRequestClose,
}) => {
  const { user } = useAuth();

  if (!user) {
    setShowLogin(true); // Show the login modal
    return null; // Prevent rendering of protected content
  }

  if (user.role !== requiredRole) {
    alert("You do not have permission to access this page."); // Optional: alert for unauthorized access
    return <Navigate to="/" />; // Redirect if the user does not have the required role
  }

  return children; // Render the protected component if authorized
};

export default ProtectedRoute;
