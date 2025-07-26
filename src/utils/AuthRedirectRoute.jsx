import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthRedirectRoute() {
  const { user } = useAuth();

  if (!user) return <Outlet />;

  // If user is already logged in, redirect away
  return <Navigate to="/dashboard" />;
}
