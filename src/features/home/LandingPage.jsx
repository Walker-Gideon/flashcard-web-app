import Loader from "../../ui/Loader";
import HomeHeader from "./HomeHeader";

export default function LandingPage() {
  return (
    <div>
      <div className="h-1">
        <Loader />
      </div>
      <HomeHeader />
    </div>
  );
}
