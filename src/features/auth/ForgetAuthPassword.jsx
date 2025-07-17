import Loader from "../../ui/Loader";

export default function ForgetAuthPassword() {
  return (
    <div className="relative">
      <div className="h-0.5">
        <Loader />
      </div>

      <div className="flex min-h-[95vh] flex-col items-center justify-center">
        <div className="medium:max-w-3xl px-14">
          <div className="medium:text-base mb-6 text-sm">
            <h1 className="medium:text-2xl middle:text-3xl mt-2 mb-2 text-xl font-bold">
              Reset your password
            </h1>

            <p>
              Enter the email you signed up with. We'll send you a link to log
              in and reset your password. If you signed up with your parent’s
              email, we’ll send them a link.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
