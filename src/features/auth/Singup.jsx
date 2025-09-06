import { useLoader } from "../../context/LoaderContext";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../ui/Loader";
import AuthClose from "./AuthClose";
import AuthHeader from "./AuthHeader";
import SignupForm from "./SignupForm";
import Button from "../../ui/Button";
import useLoaderAction from "../../utils/LoaderAction";
import Spinner from "../../ui/Spinner";

export default function Singup() {
  const { loading } = useLoader();
  const { isSigningUp } = useAuth();
  const navigateLoader = useLoaderAction();

  return (
    <div className="relative">
      <div className="h-1">
        <Loader />
      </div>
      <AuthClose />

      <div className="flex min-h-[95vh] items-center justify-center">
        {/* {isSigningUp ? (
          <Spinner />
        ) : ( */}
        <div className="rounded-xl border border-stone-300 p-6 shadow-lg">
          <AuthHeader />
          <SignupForm />

          <div className="mt-2 flex items-center justify-center gap-2">
            <p className="text-[0.8rem] whitespace-nowrap text-slate-400">
              Already have an account?
            </p>

            <Button
              variant="outline"
              classname="text-[0.8rem] font-semibold  disabled:cursor-not-allowed"
              disabled={loading}
              onClick={() => navigateLoader("/accounts/login")}
            >
              Log in
            </Button>
          </div>

          {/* <div>
              <div className="mt-2 mb-4 flex items-center justify-center">
                <p className="text-sm text-slate-400">
                  or you can Sign up with
                </p>
              </div>

              <Button
                disabled={loading}
                classname="w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Continue with Google
              </Button>
            </div> */}
        </div>
        {/* )} */}
      </div>
    </div>
  );
}
