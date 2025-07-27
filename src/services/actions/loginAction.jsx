import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { redirect } from "react-router-dom";

export async function loginAction({ request }) {
  const auth = getAuth(app);

  const formData = await request.formData();
  const email = formData.get("email")?.trim();
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);

    console.log("Login successful");
    return redirect("/verify", { replace: true });
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
    return { error: errorMessage };
  }
}
