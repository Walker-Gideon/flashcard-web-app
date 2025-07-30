/* eslint-disable no-unused-vars */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthRedirectRoute({ isAuthenticated, children }) {
  const location = useLocation();
  const pathname = location.pathname;

  if (
    !isAuthenticated &&
    !(pathname.includes("/login") || pathname.includes("/signup"))
  ) {
    return <Navigate to="/accounts/login" />;
  }

  if (
    isAuthenticated &&
    (pathname.includes("/login") || pathname.includes("/signup"))
  ) {
    return <Navigate to="/dashboard" />;
  }

  return <div>{children}</div>;
}
