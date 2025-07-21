import { useNav } from "../../context/NavigateContext";
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
  const { showSidebar } = useNav();

  return (
    <div
      className={`medium:w-auto medium:top-0 relative -top-13 z-50 h-screen w-65 transform border-r border-stone-300 px-2 py-1.5 transition-transform duration-500 ease-in-out ${showSidebar ? `translate-x-0` : `medium:block medium:translate-0 -translate-x-90`}`}
    >
      <div className="medium:items-center flex flex-col gap-4">
        <Logo logo={true} />

        {/* h-[88vh] */}
        <div className="flex h-[90dvh] flex-col justify-between">
          <div className="">
            <div className="medium:items-center flex flex-col">
              {buttonsData.map((data, index) => (
                <NavButton
                  key={index}
                  text={data.text}
                  to={data.to}
                  icon={data.icon}
                />
              ))}
            </div>

            {/* Ai button here */}
            <div className="medium:items-center medium:justify-center flex">
              <ButtonNav navLarge={true} text="Chat">
                <Button
                  variant="outline"
                  className={`mb-2 flex cursor-pointer items-center justify-center gap-2.5 rounded-sm px-2 py-1.5 text-center text-sm font-semibold text-slate-950 transition-colors duration-500 hover:rounded-sm`}
                >
                  <LuMessageCircle />
                </Button>
              </ButtonNav>
            </div>

            <div className="medium:items-center flex flex-col">
              {nextButtonsData.map((data, index) => (
                <NavButton
                  key={index}
                  text={data.text}
                  to={data.to}
                  icon={data.icon}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="medium:items-center flex flex-col">
              <NavButton text="Settings" to="settings" icon={<LuSettings2 />} />
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
