import { useNav } from "../../../context/NavigateContext";
import {
  LuLayoutDashboard,
  LuBookOpen,
  LuFile,
  LuCalendar,
  LuLightbulb,
  LuSettings2,
} from "react-icons/lu";
import { AnimatePresence } from "motion/react";
import NavButton from "../NavButton";
import ProfilePopup from "../ProfilePopup";
import LargeHeader from "./LargeHeader";
import UserProfile from "./UserProfile";

const buttonsData = [
  {
    text: "Dashboard",
    to: "/dashboard",
    icon: <LuLayoutDashboard />,
  },
  {
    text: "Notes",
    to: "notes",
    icon: <LuBookOpen />,
  },
  {
    text: "Flashcards",
    to: "flashcards",
    icon: <LuFile />,
  },
  {
    text: "Schedules",
    to: "schedules",
    icon: <LuCalendar />,
  },
  {
    text: "Inspire",
    to: "inspire",
    icon: <LuLightbulb />,
  },
  {
    text: "Settings",
    to: "settings",
    icon: <LuSettings2 />,
  },
];

export default function NavigateLScreen() {
  const {
    showSidebar,
    setNavShowOverLay,
    setShowSidebar,
    resize,
    setNavigateTitle,
    showProfile,
    setShowProfile,
  } = useNav();

  function handleClick(title) {
    setTimeout(() => {
      setNavShowOverLay(false);
      setShowSidebar(false);
      setNavigateTitle(title);
    }, 1000);
  }

  return (
    <div
      className={`medium:top-0 transitioning defaultColor relative -top-15 z-50 h-screen w-65 transform border-r border-stone-300 transition-transform dark:border-slate-700 ${showSidebar ? `translate-x-0` : `medium:block medium:translate-0 -translate-x-90`} ${resize ? `medium:w-55` : `medium:w-15`}`}
    >
      <div className={`flex flex-col gap-4`}>
        <LargeHeader />

        <div className={`flex h-[86vh] flex-col justify-between`}>
          <div className="w-full px-2">
            <div className={`flex flex-col`}>
              {buttonsData.map((data, index) => (
                <NavButton
                  key={index}
                  text={data.text}
                  to={data.to}
                  icon={data.icon}
                  onClick={() => {
                    handleClick(data.text);
                    setShowProfile(false);
                  }}
                />
              ))}
            </div>
          </div>

          <AnimatePresence initial={false}>
            {showProfile ? <ProfilePopup /> : null}
          </AnimatePresence>
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
