import { useNav } from "../../../context/NavigateContext";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuBookOpen } from "react-icons/lu";
import { LuFile } from "react-icons/lu";
import { LuCalendarCheck2 } from "react-icons/lu";
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
    icon: <LuCalendarCheck2 />,
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
      className={`medium:top-0 medium:h-screen transitioning defaultColor relative -top-14 z-50 w-65 transform border-r border-stone-300 transition-transform dark:border-slate-700 ${showSidebar ? `translate-x-0` : `medium:block medium:translate-0 -translate-x-90`} ${resize ? `medium:w-55` : `medium:w-15`}`}
    >
      <div className={`flex flex-col gap-4`}>
        <LargeHeader />

        <div
          className={`medium:h-[80.5dvh] flex h-screen flex-col justify-between`}
        >
          <div className="w-full px-3">
            <div
              // medium:items-start medium:justify-items-start medium:w-full ${resize ? `` : `medium:items-center`}
              className={`flex flex-col`}
            >
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

            {/* Ai button here  medium:items-center medium:justify-center */}
            <div className="flex w-full px-0.5">
              <ButtonNav navLarge={true} text="Chat">
                <Button
                  variant="outline"
                  onClick={handleClick}
                  //   justify-center
                  classname={`navButton hover:bg-slate-950 hover:text-white dark:text-white hover:dark:bg-slate-700/50 ${resize ? `flex items-start justify-start` : ``}`}
                >
                  <LuMessageCircle />
                  <span
                    className={`block text-xs ${resize ? `block translate-x-0 delay-75` : `medium:-translate-x-[150px]`} medium:inline-block`}
                  >
                    Chat
                  </span>
                </Button>
              </ButtonNav>
            </div>

            {/* medium:items-center */}
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
