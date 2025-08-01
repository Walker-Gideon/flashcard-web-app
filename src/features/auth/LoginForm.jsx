import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { loading, loginAndSignup, setIsAuthenticated, setIsSigningUp } =
    useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSigningUp(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
      switch (err.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        case "auth/user-disabled":
          errorMessage = "Your account has been disabled.";
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          errorMessage = "Incorrect email or password.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many login attempts. Please try again later.";
          break;
        default:
          console.error("Firebase login error:", err);
          break;
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
    <div className="medium:w-80 mt-6 w-70">
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
            type={!showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required={true}
            classname={stylings.input}
          />
          <Button
            variant="outline"
            disabled={!loading}
            classname="absolute top-2.5 right-2  disabled:cursor-not-allowed"
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <FiEye className={stylings.icon} />
            ) : (
              <FiEyeOff className={stylings.icon} />
            )}
          </Button>
        </div>

        <Button
          type="submit"
          variant="primary"
          classname="w-full py-2 disabled:bg-gray-400 disabled:cursor-not-allowed
"
          onClick={loginAndSignup}
        >
          Log in
        </Button>
      </form>
    </div>
  );
}
