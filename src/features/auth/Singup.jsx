import Loader from "../../ui/Loader";
import AuthClose from "./AuthClose";

export default function Singup() {
  return (
    <div className="relative">
      <div className="h-1">
        <Loader />
      </div>
      <AuthClose />
    </div>
  );
}
