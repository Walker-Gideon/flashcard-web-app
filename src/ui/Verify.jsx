import Button from "./Button";
import CardOverview from "./CardOverview";
import { LuCheck } from "react-icons/lu";

export default function Verify() {
  return (
    <div className="w-full max-w-md rounded-sm border border-slate-300 bg-white p-6 shadow-2xl">
      <CardOverview>
        <div className="">
          <LuCheck />
        </div>

        <h1>Verification Succeeded</h1>
        <p>
          Your account has been successfully verified. You can now access all
          features of WalkWise.
        </p>

        <Button>Continue to WalkWise</Button>
      </CardOverview>
    </div>
  );
}
