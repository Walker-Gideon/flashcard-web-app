import { useNavigate } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext";
import Button from "../../ui/Button";
import Loader from "../../ui/Loader";
import AuthClose from "./AuthClose";
import AuthHeader from "./AuthHeader";
import LoginForm from "./LoginForm";

export default function Login() {
  const { setLoading } = useLoader();

  const navigate = useNavigate();
  const startLoadingAndNavigate = (to) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(to);
    }, 500);
  };

  const clascName = {
    button: "text-[0.8rem] font-semibold",
  };

  return (
    <div clacsName="relative">
      <div className="h-1">
        <Loader />
      </div>
      <AuthClose />

      <div className="flex min-h-[95vh] items-center justify-center">
        <div className="rounded-xl border border-stone-300 px-6 py-4 shadow-lg">
          <AuthHeader />
          <LoginForm />

          <div className="mt-2 flex items-center justify-between">
            <Button
              variant="outline"
              className={clascName.button}
              onClick={() => {
                console.log("forget password");
              }}
            >
              Forget Password?
            </Button>
            <Button
              variant="outline"
              className={clascName.button}
              onClick={() => startLoadingAndNavigate("/accounts/signup")}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
