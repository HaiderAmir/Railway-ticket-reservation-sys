import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  // Check if user is authenticated and their role is allowed
  const isAuthorized = user && allowedRoles.includes(role);

  return isAuthorized ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default ProtectedRoutes;
