import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthRedirectRoute() {
  const location = useLocation();
  const pathname = location.pathname;
  const { isAuthenticated } = useAuth();

  if (
    !isAuthenticated &&
    !(pathname.includes("/login") || pathname.includes("/signup"))
  ) {
    return <Navigate to="/accounts/login" />;
  }
  return <Outlet />;
}
