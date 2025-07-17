import { useNavigate } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext";
import Loader from "../../ui/Loader";
import AuthClose from "./AuthClose";
import AuthHeader from "./AuthHeader";
import SignupForm from "./SignupForm";
import Button from "../../ui/Button";

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
              onClick={() => startLoadingAndNavigate("/accounts/signup")}
            >
              Log in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
