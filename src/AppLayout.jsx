import { Outlet } from "react-router-dom";
import NavigationLayout from "./features/navigation/NavigationLayout";
import Overlay from "./ui/Overlay";

export default function AppLayout() {
  return (
    <div className={`medium:grid medium:grid-cols-[auto_1fr] relative`}>
      <NavigationLayout />

      <div className="">
        <Outlet />
        <Overlay />
      </div>
    </div>
  );
}
