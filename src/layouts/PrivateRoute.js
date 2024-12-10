import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "Contextapi/MyContext"; // Ensure MyContext provides authentication state

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Replace with your actual auth logic

  // Redirect to login if not authenticated
  return isAuthenticated ? children : <Navigate to="/auth/sign-in" replace />;
};

export default PrivateRoute; // Ensure this is exported as default
