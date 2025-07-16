import Logo from "../../ui/Logo";

export default function AuthHeader() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Logo logo={true} />

      <p className="medium:text-base middle:text-lg mt-2 text-sm font-bold">
        WalkWise
      </p>
    </div>
  );
}
