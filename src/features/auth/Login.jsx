import AuthClose from "./AuthClose";
import AuthHeader from "./AuthHeader";

export default function Login() {
  return (
    <div className="relative">
      <AuthClose />

      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-2xl border border-stone-300 px-6 py-4 shadow-lg">
          <AuthHeader />
        </div>
      </div>
    </div>
  );
}
