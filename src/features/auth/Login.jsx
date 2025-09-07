import { useLoader } from "../../context/LoaderContext";
import Button from "../../ui/Button";
import Loader from "../../ui/Loader";
import AuthClose from "./AuthClose";
import AuthHeader from "./AuthHeader";
import LoginForm from "./LoginForm";
import useLoaderAction from "../../utils/LoaderAction";
import Spinner from "../../ui/Spinner";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { loading } = useLoader();
  const { isSigningUp } = useAuth();
  const navigateLoader = useLoaderAction();

  const stylings = "text-[0.8rem] font-semibold disabled:cursor-not-allowed";

  return (
    <div clacsName="relative">
      <div className="h-1">
        <Loader />
      </div>
      <AuthClose />

      <div className="flex min-h-[95vh] items-center justify-center">
        {/* {isSigningUp ? (
          <Spinner />
        ) : ( */}
          <div className="rounded-xl border border-stone-300 px-6 py-8 shadow-lg">
            <AuthHeader />
            <LoginForm />

            <div className="mt-2 flex items-center justify-between">
              <Button
                variant="outline"
                disabled={loading}
                classname={stylings}
                onClick={() => navigateLoader("/accounts/forgotten")}
              >
                Forget Password?
              </Button>
              <Button
                variant="outline"
                disabled={loading}
                classname={stylings}
                onClick={() => navigateLoader("/accounts/signup")}
              >
                Sign Up
              </Button>
            </div>

            {/* <div>
              <div className="flex items-center justify-center py-4">
                <p className="text-sm text-slate-400">or you can Log In with</p>
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
