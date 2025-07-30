import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const AuthenContext = createContext();

export function AuthenProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
  };

  return (
    <AuthenContext.Provider value={value}>{children}</AuthenContext.Provider>
  );
}

export function useAuthen() {
  return useContext(AuthenContext);
}
