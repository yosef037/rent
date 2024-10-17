// import React from "react";
// // import { Navigate } from "react-router-dom";
// // import jwt_decode from 'jwt-decode';
// // import jwt_decode from "jwt-decode";
// // import { decode } from 'jwt-decode';
// import * as jwt_decode from "jwt-decode";

// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, requiredRole }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     <Navigate to={"/login"} />;
//   };

//   if (!token) {
//     return <Navigate to="/login" />; // Redirect to login if not authenticated
//   }

//   if (requiredRole && !requiredRole.includes(role)) {
//     return <Navigate to="/" />; // Redirect to home if the role is not in allowedRoles
//   }

// //   if (requiredRole && role !== requiredRole) {
// //     return <Navigate to="/" />; // Redirect to home if role does not match
// //   }

//   return children;
// };
// export default ProtectedRoute;

// // const ProtectedRoute = ({ children, allowedRoles }) => {
// //   const token = localStorage.getItem("token");

// //   if (!token) {
// //     // No token, redirect to login
// //     return <Navigate to="/login" />;
// //   }

// //   try {
// //     // Decode the token
// //     const decodedToken = jwt_decode(token);
// //     const userRole = decodedToken.role; // Assuming the JWT contains a "role" field

// //     // Check if the role is allowed to access the route
// //     if (allowedRoles.includes(userRole)) {
// //       return children;
// //     } else {
// //       return <Navigate to="/unauthorized" />; // Redirect to unauthorized page
// //     }
// //   } catch (error) {
// //     // If there's an error decoding the token (e.g. expired token), redirect to login
// //     return <Navigate to="/login" />;
// //   }
// // };
