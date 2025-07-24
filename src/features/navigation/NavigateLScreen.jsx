import { useNav } from "../../context/NavigateContext";
import { LuX } from "react-icons/lu";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuBookOpen } from "react-icons/lu";
import { LuFile } from "react-icons/lu";
import { LuCalendarCheck2 } from "react-icons/lu";
import { LuLightbulb } from "react-icons/lu";
import { LuMessageCircle } from "react-icons/lu";
import { LuSettings2 } from "react-icons/lu";
import Logo from "../../ui/Logo";
import NavButton from "./NavButton";
import ButtonNav from "../../ui/ButtonNav";
import Button from "../../ui/Button";
import { LuChevronRight } from "react-icons/lu";

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
];

export default function NavigateLScreen() {
  const { showSidebar, setNavShowOverLay, setShowSidebar, resize, setResize } =
    useNav();

  function handleClick() {
    setNavShowOverLay((show) => !show);
    setShowSidebar((show) => !show);
  }

  function handleResizeNavWidth() {
    setResize((show) => !show);
  }

  const styling = {
    iconsButton: "cursor-pointer text-xl text-slate-950",
  };

  return (
    <div
      className={`medium:top-0 medium:h-screen relative -top-14 z-50 w-55 transform border-r border-stone-300 bg-white px-2 py-2 transition-all duration-500 ease-in-out ${showSidebar ? `translate-x-0` : `medium:block medium:translate-0 -translate-x-90`} ${resize ? `medium:w-55` : `medium:w-12`}`}
    >
      {/* ${resize ? `medium:items-left` : `medium:items-center`} */}
      <div className={`flex flex-col gap-4`}>
        <div className={`flex items-center justify-between`}>
          <Logo logo={true} />

          <Button
            variant="outline"
            onClick={handleClick}
            classname={`medium:hidden block ${styling.iconsButton}`}
          >
            <LuX />
          </Button>
        </div>

        <div
          className={`flex items-center transition-all duration-500 ease-in-out ${resize ? `justify-end` : `justify-center`}`}
        >
          <Button
            variant="outline"
            onClick={handleResizeNavWidth}
            classname={`medium:block hidden ${styling.iconsButton}`}
          >
            <LuChevronRight
              className={`transform transition-transform duration-500 ease-in-out ${resize ? `rotate-180` : `rotate-0`}`}
            />
          </Button>
        </div>

        {/* h-[88vh] */}
        <div
          className={`medium:h-[83dvh] flex h-screen flex-col justify-between`}
        >
          <div className="">
            <div
              // medium:items-start medium:justify-items-start medium:w-full
              className={`flex flex-col ${resize ? `` : `medium:items-center`}`}
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
            <div className="flex w-full">
              <ButtonNav navLarge={true} text="Chat">
                <Button
                  variant="outline"
                  onClick={handleClick}
                  //   justify-center
                  classname={`navButton hover:bg-slate-950 hover:text-white`}
                >
                  <LuMessageCircle />
                  <span className="medium:hidden block text-xs">Chat</span>
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

          <div>
            {/*medium:items-start  */}
            <div className="flex w-full flex-col">
              <NavButton
                onClick={handleClick}
                text="Settings"
                to="settings"
                icon={<LuSettings2 />}
              />
            </div>

            {/* user image */}
            <div
              // ${lighMode ? `bg-slate-950` : `bg-white`}
              className={`h-9 w-9 rounded-full bg-slate-950`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
