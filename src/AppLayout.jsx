import { Outlet } from "react-router-dom";
import NavigationLayout from "./features/navigation/NavigationLayout";

export default function AppLayout() {
  return (
    <div>
      <NavigationLayout />
      <Outlet />
    </div>
  );
}
