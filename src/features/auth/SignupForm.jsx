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

export default function SignupForm({ onSigningUp }) {
  const { loading, setIsAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const navigate = useNavigate();

  const auth = getAuth(app);
  const db = getFirestore(app);

  console.log(onSigningUp);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { error: "Please enter a valid email address" };
    }

    if (!username || username.trim().length < 2) {
      return { error: "Username must be at least 2 characters" };
    }

    if (password !== confirmPassword) {
      return { error: "Passwords do not match" };
    }

    if (password.length < 6) {
      return { error: "Password should be at least 6 characters" };
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
      });

      navigate("/verify");
      setIsAuthenticated(true);
    } catch (err) {
      let errorMessage = "Signup failed. Please try again.";
      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email already in use";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/weak-password":
          errorMessage = "Password is too weak";
          break;
      }
      setError(errorMessage);
    }
  };

  const stylings = {
    input: "w-full",
    icon: "text-sm",
    button: "absolute top-2.5 right-2 disabled:cursor-not-allowed",
  };

  return (
    <div className="medium:w-80 mt-6 w-70">
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
            classname={stylings.button}
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

        <div className="relative pb-2">
          <Input
            type={!showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required={true}
            classname={stylings.input}
          />
          <Button
            variant="outline"
            disabled={!loading}
            classname={stylings.button}
            onClick={(e) => {
              e.preventDefault();
              setShowConfirmPassword(!showConfirmPassword);
            }}
          >
            {showConfirmPassword ? (
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
        >
          Sign up
        </Button>
      </form>
    </div>
  );
}
