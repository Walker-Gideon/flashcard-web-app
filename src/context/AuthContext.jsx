import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logoutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
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
