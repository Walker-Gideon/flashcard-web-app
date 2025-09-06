import { useLoader } from "../../context/LoaderContext";
import Loader from "../../ui/Loader";
import AuthClose from "./AuthClose";
import AuthHeader from "./AuthHeader";
import SignupForm from "./SignupForm";
import Button from "../../ui/Button";
import useLoaderAction from "../../utils/LoaderAction";

export default function Singup() {
  const { loading } = useLoader();
  const navigateLoader = useLoaderAction();

  return (
    <div className="relative">
      <div className="h-1">
        <Loader />
      </div>
      <AuthClose />

      <div className="flex min-h-[95vh] items-center justify-center">
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
        </div>
      </div>
    </div>
  );
}
