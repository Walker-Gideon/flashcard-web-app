import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSigningUp, setIsSigningUp] = useState(false);

  function loginAndSignup() {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }

  const logoutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      setIsVerify(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    logoutUser,
    isAuthenticated,
    setIsAuthenticated,
    loginAndSignup,
    isVerify,
    setIsVerify,
    isSigningUp,
    setIsSigningUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("AuthContext was used outside of it Provider");

  return context;
}

export { AuthProvider, useAuth };
