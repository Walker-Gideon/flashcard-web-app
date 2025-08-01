import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthRedirectRoute({ children }) {
  const { isAuthenticated, isVerify } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;

  /*
  // Define public routes (accessible without authentication)
  const publicRoutes = ["/", "/login", "/signup"];
  const isPublicRoute = publicRoutes.some((route) => pathname === route);

  // Define auth routes (login/signup pages)
  const authRoutes = ["/login", "/signup"];
  const isAuthRoute = authRoutes.some((route) => pathname === route);

  // Define verify route
  const isVerifyRoute = pathname === "/verify";

  // Define dashboard route
  const isDashboardRoute = pathname === "/dashboard";

  // Scenario 1: Unauthenticated user trying to access protected routes
  if (!isAuthenticated && !isPublicRoute) {
    return <Navigate to="/" replace />;
  }

  // Scenario 2: Authenticated user trying to access auth pages or landing page
  if (isAuthenticated && (isAuthRoute || pathname === "/")) {
    return <Navigate to="/verify" replace />;
  }

  // Scenario 3: Verified user trying to access verify page
  if (isAuthenticated && isVerify && isVerifyRoute) {
    return <Navigate to="/dashboard" replace />;
  }

  // Scenario 4: Unverified user trying to access dashboard
  if (isAuthenticated && !isVerify && isDashboardRoute) {
    return <Navigate to="/verify" replace />;
  }
    */

  return <>{children}</>;
}
