import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function usePreventBackNavigation() {
  const navigate = useNavigate();
  const { isAuthenticated, isVerify } = useAuth();

  useEffect(() => {
    const handlePopState = (event) => {
      // Prevent default back navigation
      event.preventDefault();

      // Determine where to redirect based on auth state
      if (!isAuthenticated) {
        navigate("/", { replace: true });
      } else if (isAuthenticated && !isVerify) {
        navigate("/verify", { replace: true });
      } else if (isAuthenticated && isVerify) {
        navigate("/dashboard", { replace: true });
      }
    };

    // Add event listener for popstate (back/forward button clicks)
    window.addEventListener("popstate", handlePopState);

    // Cleanup
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate, isAuthenticated, isVerify]);
}
