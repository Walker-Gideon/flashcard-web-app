/* eslint-disable no-unused-vars */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthRedirectRoute({ children }) {
  const { isAuthenticated, isVerify } = useAuth();
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
    return <Navigate to="/verify" />;
  }

  if (isAuthenticated && isVerify && pathname.includes("/verify")) {
    return <Navigate to="/dashboard" />;
  }

  // if (
  //   isAuthenticated &&
  //   (pathname.includes("/login") || pathname.includes("/signup")) &&
  //   pathname.includes("/verify")
  // ) {
  //   return <Navigate to="/dashboard" />;
  // }

  return <>{children}</>;
}
