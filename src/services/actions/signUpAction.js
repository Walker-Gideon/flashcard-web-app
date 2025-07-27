import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { app } from "../../firebase";
import { redirect } from "react-router-dom";

export async function signUpAction({ request }) {
  const auth = getAuth(app);
  const db = getFirestore(app);

  const formData = await request.formData();
  const email = formData.get("email")?.trim();
  const username = formData.get("username")?.trim();
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

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

    // await setDoc(doc(db, "users", user.uid), {
    //   uid: user.uid,
    //   email,
    //   username,
    //   photoURL: null,
    //   isGoogleSignIn: false,
    //   createdAt: serverTimestamp(),
    // });

    console.log("successful");
    return redirect("/verify", { replace: true });
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
    return { error: errorMessage };
  }
}
