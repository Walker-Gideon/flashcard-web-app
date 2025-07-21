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
  const { showNav, showSidebar } = useNav();

  return (
    <div
      className={`h-screen w-auto border-r border-stone-300 px-2 py-1.5 ${showNav ? `` : `medium:block hidden`}`}
    >
      <div className="flex flex-col items-center gap-4">
        <Logo logo={true} />

        {/* h-[88vh] */}
        <div className="flex h-[90dvh] flex-col justify-between">
          <div className="">
            <div className="flex flex-col items-center">
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
            <div className="flex items-center justify-center">
              <ButtonNav navLarge={true} text="Chat">
                <Button
                  variant="outline"
                  className={`mb-2 flex cursor-pointer items-center justify-center gap-2.5 rounded-sm px-2 py-1.5 text-center text-sm font-semibold text-slate-950 transition-colors duration-500 hover:rounded-sm`}
                >
                  <LuMessageCircle />
                </Button>
              </ButtonNav>
            </div>

            <div className="flex flex-col items-center">
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
            <div className="flex flex-col items-center">
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
