import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function LogoutButton({ variant = "outline", classname = "" }) {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      // Navigate to landing page after logout
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout navigation failed:", error);
      // Force navigation even if there's an error
      navigate("/", { replace: true });
    }
  };

  return (
    <Button variant={variant} classname={classname} onClick={handleLogout}>
      Logout
    </Button>
  );
}
