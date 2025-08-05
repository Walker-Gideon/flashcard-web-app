import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, app } from "../firebase";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    photoURL: null,
    uid: "",
  });

  const storage = getStorage(app);

  // Function to fetch user data from Firestore
  const fetchUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setUserData({
          email: data.email || "",
          username: data.username || "",
          photoURL: data.photoURL || null,
          uid: data.uid || uid,
        });
        console.log("Fetched user data:", data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to update user data in Firestore
  const updateUsername = async (newUsername) => {
    if (!user?.uid) return false;

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { username: newUsername });

    setUserData((prev) => ({
      ...prev,
      username: newUsername,
    }));

    return true;
  };

  // 1️⃣ This must come first
  const updateUserData = async (updates) => {
    try {
      if (!user?.uid) return false;

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, updates);

      setUserData((prev) => ({
        ...prev,
        ...updates,
      }));

      return true;
    } catch (error) {
      console.error("Error updating user data:", error);
      return false;
    }
  };

  // Function to update profile image
  const updateProfileImage = async (photoURL) => {
    return await updateUserData({ photoURL });
  };

  // Function to upload profile image and return the download URL
  const uploadProfileImage = async (file, uid) => {
    if (!file || !uid) return null;

    try {
      const storageRef = ref(storage, `profileImages/${uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  /*
  // Function to update username
  const updateUsername = async (newUsername) => {
    return await updateUserData({ username: newUsername });
  };

  // Function to update profile image
  const updateProfileImage = async (photoURL) => {
    return await updateUserData({ photoURL });
  };

  function loginAndSignup() {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Fetch user data when user is authenticated
        await fetchUserData(currentUser.uid);
      } else {
        // Clear user data when user is not authenticated
        setUserData({
          email: "",
          username: "",
          photoURL: null,
          uid: "",
        });
      }

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
      // Reset all auth states to ensure clean logout
      setLoading(false);
      setIsSigningUp(false);
      // Clear user data
      setUserData({
        email: "",
        username: "",
        photoURL: null,
        uid: "",
      });
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if Firebase logout fails, reset local state
      setUser(null);
      setIsAuthenticated(false);
      setIsVerify(false);
      setUserData({
        email: "",
        username: "",
        photoURL: null,
        uid: "",
      });
    }
  };
  */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth changed:", currentUser); // ✅ Check this logs when user signs in/out

      setUser(currentUser);

      if (currentUser) {
        await fetchUserData(currentUser.uid); // ✅ This must happen after currentUser is available
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("User data updated:", userData);
  }, [userData]);

  const value = {
    user,
    setUser,
    image,
    setImage,
    loading,
    setLoading,
    // logoutUser,
    isAuthenticated,
    setIsAuthenticated,
    // loginAndSignup,
    isVerify,
    setIsVerify,
    isSigningUp,
    setIsSigningUp,
    // User data
    userData,
    setUserData,
    fetchUserData,
    uploadProfileImage,
    updateUsername,
    updateUserData,
    updateProfileImage,
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
