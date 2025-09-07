import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { LuLoader } from "react-icons/lu";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { loading, setIsAuthenticated, setIsSigningUp, isSigningUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSigningUp(true);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsSigningUp(false);
      return;
    }

    if (!email || !password) {
      setError("Email and password are required.");
      setIsSigningUp(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      navigate("/verify", { replace: true });
    } catch (err) {
      let errorMessage = "Login failed. Please check your credentials.";

      if (err.code) {
        switch (err.code) {
          case "auth/invalid-email":
            errorMessage =
              "Invalid email address. Please check your email format.";
            break;
          case "auth/user-disabled":
            errorMessage =
              "Your account has been disabled. Please contact support.";
            break;
          case "auth/user-not-found":
            errorMessage =
              "No account found with this email. Please check your email or sign up.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password. Please try again.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many login attempts. Please try again later.";
            break;
          case "auth/network-request-failed":
            errorMessage =
              "Network error. Please check your internet connection.";
            break;
          case "auth/operation-not-allowed":
            errorMessage =
              "Email/password login is not enabled. Please contact support.";
            break;
          default:
            console.error("Firebase Auth Error:", err.code, err.message);
            errorMessage = "An unexpected error occurred. Please try again.";
        }
      } else {
        console.error("Login Error:", err);
        if (err.message?.includes("network")) {
          errorMessage =
            "Network error. Please check your internet connection.";
        } else {
          errorMessage = "Login failed. Please try again.";
        }
      }

      setError(errorMessage);
    } finally {
      setIsSigningUp(false);
    }
  };

  const stylings = {
    input: "w-full",
    icon: "text-sm",
  };

  return (
    <div className="medium:w-80 mt-4 w-70">
      <form onSubmit={handleSubmit}>
        {error && <p className="mb-2 text-sm text-red-600">{error}</p>}

        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required={true}
          classname={stylings.input}
        />

        <div className="relative my-2">
          <Input
            type={!hidePassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required={true}
            classname={stylings.input}
          />
          <Button
            variant="outline"
            disabled={loading}
            classname="absolute top-2.5 right-2 disabled:cursor-not-allowed"
            onClick={(e) => {
              e.preventDefault();
              setHidePassword(!hidePassword);
            }}
          >
            {hidePassword ? (
              <FiEye className={stylings.icon} />
            ) : (
              <FiEyeOff className={stylings.icon} />
            )}
          </Button>
        </div>

        <Button
          type="submit"
          disabled={loading}
          variant="primary"
          classname="w-full py-2 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isSigningUp ? (
            <>
              <LuLoader className="for spinning h-5 w-5 animate-spin" />{" "}
              <span>Signing Up...</span>
            </>
          ) : (
            "Log in"
          )}
        </Button>
      </form>
    </div>
  );
}
