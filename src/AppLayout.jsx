import { Outlet } from "react-router-dom";
import NavigationLayout from "./features/navigation/NavigationLayout";
import Overlay from "./ui/Overlay";
import { useNav } from "./context/NavigateContext";
import Loader from "./ui/Loader";

export default function AppLayout() {
  const { navShowOverLay } = useNav();

  return (
    <div>
      <div className="h-1">
        <Loader />
      </div>

      <div
        className={`defaultColor medium:grid medium:grid-cols-[auto_1fr] relative h-screen overflow-hidden`}
      >
        <NavigationLayout />

        <div className={`h-screen w-full`}>
          <Outlet />

          <div className="medium:hidden block transition-all duration-500 ease-in-out">
            {navShowOverLay && <Overlay index="z-30" btn={true} />}
          </div>
        </div>
      </div>
    </div>
  );
}
