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
import { useState } from "react";
import { LuUser } from "react-icons/lu";
import { LuMoon } from "react-icons/lu";
import { LuSun } from "react-icons/lu";

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
  const [isOn, setIsOn] = useState(false);

  function handleClick() {
    setNavShowOverLay((show) => !show);
    setShowSidebar((show) => !show);
  }

  return (
    <div
      // px-2
      className={`medium:top-0 medium:h-screen transitioning relative -top-14 z-50 w-55 transform border-r border-stone-300 bg-white py-2 ${showSidebar ? `translate-x-0` : `medium:block medium:translate-0 -translate-x-90`} ${resize ? `medium:w-55` : `medium:w-15`}`}
    >
      <div className={`flex flex-col gap-4`}>
        <LargeHeader />

        <div
          className={`medium:h-[84dvh] flex h-screen flex-col justify-between`}
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
                  classname={`navButton hover:bg-slate-950 hover:text-white ${resize ? `flex items-start justify-start` : ``}`}
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

          <div className="border-t border-stone-300 px-1 py-2 dark:border-slate-700">
            {/* user */}
            <div className="flex w-full items-center justify-between rounded-sm bg-slate-50 px-2 py-3 dark:bg-slate-700/50">
              <div className="flex items-center gap-2">
                <div
                  className={`z-50 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950`}
                >
                  <LuUser className="text-white" />
                </div>

                <p
                  className={`transitioning z-30 text-sm font-bold whitespace-nowrap text-slate-900 dark:text-white ${resize ? `translate-x-0 delay-75` : `-translate-x-[150px]`} inline-block`}
                >
                  User Name
                </p>
              </div>

              <div
                className={`transitioning z-30 ${resize ? `translate-x-0 delay-150` : `-translate-x-[170px]`} inline-block`}
              >
                <Button
                  variant="outline"
                  classname="p-2 rounded-sm bg-slate-950 dark:bg-slate-600 text-sm text-white hover:bg-slate-900 dark:hover:bg-slate-500 transition-colors"
                >
                  <LuSun />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
