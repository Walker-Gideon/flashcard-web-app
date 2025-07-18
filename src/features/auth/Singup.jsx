import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { app } from "../../firebase";
import { useLoader } from "../../context/LoaderContext";
import Loader from "../../ui/Loader";
import AuthClose from "./AuthClose";
import AuthHeader from "./AuthHeader";
import SignupForm from "./SignupForm";
import Button from "../../ui/Button";

export async function action({ request }) {
  const auth = getAuth(app);
  const db = getFirestore(app);

  const signupFormData = await request.signupFormData();
  const email = signupFormData.get("email");
  const username = signupFormData.get("username");
  const password = signupFormData.get("password");
  const confirmPassword = signupFormData.get("confirmPassword");

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  if (password.length < 6) {
    return { error: "Password should be at least 6 characters" };
  }
}

export default function Singup() {
  const { setLoading } = useLoader();

  const navigate = useNavigate();
  const startLoadingAndNavigate = (to) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(to);
    }, 500);
  };

  const clascName = "text-[0.8rem] font-semibold";

  return (
    <div className="relative">
      <div className="h-1">
        <Loader />
      </div>
      <AuthClose />

      <div className="flex min-h-[95vh] items-center justify-center">
        <div className="rounded-xl border border-stone-300 px-6 py-8 shadow-lg">
          <AuthHeader />
          <SignupForm />

          <div className="mt-2 flex items-center justify-center gap-2">
            <p className="text-[0.8rem] whitespace-nowrap text-stone-400">
              Already have an account?
            </p>

            <Button
              variant="outline"
              className={clascName}
              onClick={() => startLoadingAndNavigate("/accounts/login")}
            >
              Log in
            </Button>
          </div>

          <div>
            <div className="flex items-center justify-center py-4">
              <p className="text-sm text-stone-400">or you can Sign up with</p>
            </div>

            <Button className="w-full">Continue with Google</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
