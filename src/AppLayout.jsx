import { Outlet } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { useNav } from "./context/NavigateContext";
import { useChat } from "./context/ChatContext";
import NavigationLayout from "./features/navigation/NavigationLayout";
import Overlay from "./ui/Overlay";
import Loader from "./ui/Loader";
import Button from "./ui/Button";
import ChatLayout from "./features/chat/ChatLayout";
import { LuMessageCircle } from "react-icons/lu";


export default function AppLayout() {
  const { navShowOverLay } = useNav();
  const { setIsChatShow  } = useChat();

  return (
    <div className="relative defaultColor overflow-hidden">
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

      <AnimatePresence>
        <ChatLayout />
      </AnimatePresence>


      <Button
        variant="outline"
        onClick={() => {
          setIsChatShow((show) => !show);
        }}
        classname={`absolute bottom-5 right-5 medium:right-8 rounded-full flex items-center justify-center w-10 h-10 bg-slate-500 hover:bg-slate-600 text-white  p-3`}
      >
        <LuMessageCircle className="w-5 h-5" />
      </Button>
    </div>
  );
}
