import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { app } from "../../firebase";
import { useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const { loading, setIsAuthenticated, setIsSigningUp } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const navigate = useNavigate();
  const auth = getAuth(app);
  const db = getFirestore(app);

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

    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setError("Username is required");
      setIsSigningUp(false);
      return;
    }

    if (trimmedUsername.length < 3) {
      setError("Username must be at least 3 characters");
      setIsSigningUp(false);
      return;
    }

    if (trimmedUsername.length > 20) {
      setError("Username must be less than 20 characters");
      setIsSigningUp(false);
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!usernameRegex.test(trimmedUsername)) {
      setError(
        "Username can only contain letters, numbers, underscores, and hyphens",
      );
      setIsSigningUp(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsSigningUp(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsSigningUp(false);
      return;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      );
      setIsSigningUp(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;
      await updateProfile(user, { displayName: username, photoURL: null });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
        username,
        photoURL: null,
        isGoogleSignIn: false,
        createdAt: serverTimestamp(),
        isNewUser: true,
      });

      setIsAuthenticated(true);
      navigate("/verify", { replace: true });
    } catch (err) {
      let errorMessage = "Signup failed. Please try again.";

      if (err.code) {
        switch (err.code) {
          case "auth/email-already-in-use":
            errorMessage =
              "Email already in use. Please try a different email or sign in.";
            break;
          case "auth/invalid-email":
            errorMessage =
              "Invalid email address. Please check your email format.";
            break;
          case "auth/weak-password":
            errorMessage =
              "Password is too weak. Please choose a stronger password.";
            break;
          case "auth/network-request-failed":
            errorMessage =
              "Network error. Please check your internet connection.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many attempts. Please try again later.";
            break;
          case "auth/operation-not-allowed":
            errorMessage =
              "Email/password signup is not enabled. Please contact support.";
            break;
          default:
            console.error("Firebase Auth Error:", err.code, err.message);
            errorMessage = "An unexpected error occurred. Please try again.";
        }
      } else {
        console.error("Signup Error:", err);
        if (err.message?.includes("network")) {
          errorMessage =
            "Network error. Please check your internet connection.";
        } else {
          errorMessage = "Signup failed. Please try again.";
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
    button: "absolute top-2.5 right-2 disabled:cursor-not-allowed",
  };

  return (
    <div className="medium:w-80 mt-4 w-70">
      <form onSubmit={handleSubmit}>
        {error && <p className="mb-2 text-sm text-red-600">{error}</p>}

        <div className="flex flex-col">
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required={true}
            classname={stylings.input}
          />

          <Input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required={true}
            classname={`mt-2 ${stylings.input}`}
          />
        </div>

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
            disabled={!loading}
            classname={stylings.button}
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

        <div className="relative pb-2">
          <Input
            type={!hideConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Your Password"
            required={true}
            classname={stylings.input}
          />
          <Button
            variant="outline"
            disabled={!loading}
            classname={stylings.button}
            onClick={(e) => {
              e.preventDefault();
              setHideConfirmPassword(!hideConfirmPassword);
            }}
          >
            {hideConfirmPassword ? (
              <FiEye className={stylings.icon} />
            ) : (
              <FiEyeOff className={stylings.icon} />
            )}
          </Button>
        </div>

        <Button
          type="submit"
          disabled={!loading}
          variant="primary"
          classname="w-full py-2 disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          Sign up
        </Button>
      </form>
    </div>
  );
}
