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
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

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

    await new Promise((r) => setTimeout(r, 100));

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email,
      username,
      photoURL: null,
      isGoogleSignIn: false,
      createdAt: serverTimestamp(),
    });

    await new Promise((r) => setTimeout(r, 100));

    console.log("successful");
    return redirect("/user");
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
