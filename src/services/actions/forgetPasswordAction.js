import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../../firebase";

export async function forgetPasswordAction({ request }) {
  const auth = getAuth(app);
  const formData = await request.formData();
  const email = formData.get("email")?.trim();

  // Basic validation
  if (!email) {
    return { error: "Email is required." };
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent successfully");
    return {
      success: true,
      message: "Password reset link sent to your email!",
    };
  } catch (err) {
    let errorMessage = "Failed to send reset email. Please try again.";
    switch (err.code) {
      case "auth/user-not-found":
        errorMessage = "No account found with this email address.";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email address.";
        break;
      case "auth/too-many-requests":
        errorMessage = "Too many requests. Please try again later.";
        break;
      default:
        console.error("Firebase password reset error:", err);
        break;
    }
    return { error: errorMessage };
  }
}
