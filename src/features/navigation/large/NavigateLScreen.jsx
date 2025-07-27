import { useNav } from "../../../context/NavigateContext";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuBookOpen } from "react-icons/lu";
import { LuFile } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import { LuLightbulb } from "react-icons/lu";
import { LuMessageCircle } from "react-icons/lu";
import { LuSettings2 } from "react-icons/lu";
import NavButton from "../NavButton";
import ButtonNav from "../../../ui/ButtonNav";
import Button from "../../../ui/Button";
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
];

const nextButtonsData = [
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
  const { showSidebar, setNavShowOverLay, setShowSidebar, resize } = useNav();

  function handleClick() {
    setNavShowOverLay((show) => !show);
    setShowSidebar((show) => !show);
  }

  return (
    <div
      className={`medium:top-0 medium:h-screen transitioning defaultColor relative -top-21 z-50 w-65 transform border-r border-stone-300 transition-transform dark:border-slate-700 ${showSidebar ? `translate-x-0` : `medium:block medium:translate-0 -translate-x-90`} ${resize ? `medium:w-55` : `medium:w-15`}`}
    >
      <div className={`flex flex-col gap-4`}>
        <LargeHeader />

        <div className={`medium:h-[80.5dvh] h- flex flex-col justify-between`}>
          <div className="w-full px-3">
            <div className={`flex flex-col`}>
              {buttonsData.map((data, index) => (
                <NavButton
                  key={index}
                  text={data.text}
                  to={data.to}
                  icon={data.icon}
                  onClick={handleClick}
                />
              ))}
            </div>

            {/* Ai button here   */}
            <div className="flex w-full px-0.5">
              <ButtonNav navLarge={true} text="Chat" classname="w-full">
                <Button
                  variant="outline"
                  onClick={handleClick}
                  classname={`navButton hover:bg-slate-600 hover:text-white dark:text-white  ${resize ? `flex items-start justify-start` : ``}`}
                >
                  <LuMessageCircle />
                  <span
                    className={`block text-xs ${resize ? `block` : `medium:hidden`}`}
                  >
                    Chat
                  </span>
                </Button>
              </ButtonNav>
            </div>

            <div className="flex flex-col">
              {nextButtonsData.map((data, index) => (
                <NavButton
                  key={index}
                  text={data.text}
                  to={data.to}
                  icon={data.icon}
                  onClick={handleClick}
                />
              ))}
            </div>
          </div>

          <UserProfile />
        </div>
      </div>
    </div>
  );
}
