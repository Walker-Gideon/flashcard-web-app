import Loader from "../../ui/Loader";
import AuthClose from "./AuthClose";
import AuthHeader from "./AuthHeader";
import SignupForm from "./SignupForm";

export default function Singup() {
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
        </div>
      </div>
    </div>
  );
}
