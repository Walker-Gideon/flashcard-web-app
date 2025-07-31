import useLoaderAction from "../utils/LoaderAction";
import Button from "./Button";
import { LuCheck } from "react-icons/lu";
import Loader from "./Loader";
import CardBadge from "./CardBadge";

export default function Verify() {
  const handelDashboard = useLoaderAction(1000);

  return (
    <div>
      <div className="h-1">
        <Loader />
      </div>

      <div className="flex h-[98vh] items-center justify-center">
        <div className="w-full max-w-sm rounded-xl border border-stone-300 px-6 py-8 shadow-lg">
          <div className="flex flex-col items-center justify-center text-center">
            <CardBadge classname="rounded-full p-3 bg-gradient-to-r from-slate-200 to-slate-300">
              <LuCheck className="h-6 w-6 text-slate-600" />
            </CardBadge>
            <h1 className="medium:text-base middle:text-lg my-4 text-sm font-bold">
              Verification Succeeded
            </h1>
            <p className="text-sm font-medium text-slate-500">
              Your account has been successfully verified. You can now access
              all features of WalkWise.
            </p>
          </div>

          <Button
            variant="primary"
            classname={"w-full mt-8"}
            onClick={() => handelDashboard("/dashboard", { replace: true })}
          >
            Continue to WalkWise
          </Button>
        </div>
      </div>
    </div>
  );
}
