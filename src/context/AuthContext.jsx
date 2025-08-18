import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
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
    streakCount: 0,
    lastActiveDate: null,
  });

  // Check for user change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUserData(user.uid);
      } else {
        setUserData(null);
      }
    });

    return unsubscribe;
  }, []);

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

          // New streak fields
          streakCount: data.streakCount || 0,
          lastActiveDate: data.lastActiveDate || null,
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return error;
    }
  };

  // Updata the User Data
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

  // Function to update profile image
  const updateProfileImage = async (downloadURL) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        photoURL: downloadURL,
      });
      setUserData((prev) => ({ ...prev, photoURL: downloadURL }));
      return true;
    } catch (error) {
      console.error("Error updating profile image:", error);
      return false;
    }
  };

  // Function to upload profile image and return the download URL
  const uploadProfileImage = async (file, uid) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_preset"); // Replace with your actual unsigned preset name

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dttlsqszp/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (response.ok && data.secure_url) {
        return data.secure_url;
      } else {
        console.error("Cloudinary upload error", data);
        return null;
      }
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        await fetchUserData(currentUser.uid); // ✅ This must happen after currentUser is available
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    setUser,
    image,
    setImage,
    loading,
    setLoading,
    isAuthenticated,
    setIsAuthenticated,
    isVerify,
    setIsVerify,
    isSigningUp,
    setIsSigningUp,
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
