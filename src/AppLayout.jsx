import { Outlet } from "react-router-dom";
import NavigationLayout from "./features/navigation/NavigationLayout";
import Overlay from "./ui/Overlay";
import { useNav } from "./context/NavigateContext";
import Loader from "./ui/Loader";
import ChatLayout from "./features/chat/ChatLayout";
import { useAuth } from "./context/AuthContext";
import { auth } from "./firebase";

export default function AppLayout() {
  const { general, setGeneral, fetchUserData } = useAuth;
  const { navShowOverLay } = useNav();

  const users = auth.currentUser;
  console.log(users.uid);
  const userData = async () => {
    await fetchUserData(users.uid);
  };
  console.log(userData());

  return (
    <div className="defaultColor overflow-hidden">
      <div className="z-50 h-0.5">
        <Loader />
      </div>

      <div className="defaultColor z-30 h-[99.9vh] w-full overflow-hidden">
        <div
          className={`medium:grid medium:grid-cols-[auto_1fr] overflow-hidden`}
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
      <ChatLayout />
    </div>
  );
}
