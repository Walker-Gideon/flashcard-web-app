import { Outlet } from "react-router-dom";
import NavigationLayout from "./features/navigation/NavigationLayout";

export default function AppLayout() {
  return (
    <div className={`medium:grid medium:grid-cols-[auto_1fr] relative`}>
      <NavigationLayout />
      <Outlet />
    </div>
  );
}
