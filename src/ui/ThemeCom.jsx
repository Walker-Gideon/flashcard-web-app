import { useEffect, useState } from "react";
import { useNav } from "../context/NavigateContext";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import ButtonNav from "./ButtonNav";
import { LuSun, LuMoon } from "react-icons/lu";

export default function ThemeCom() {
  const { userData } = useAuth();
  const { resize } = useNav();

  const [isDarkMode, setIsDarkMode] = useState(() => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = (id) => {
    if(id) {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      localStorage.setItem("darkMode", JSON.stringify(newMode));
    }
  };

  return (
    <ButtonNav navLarge={true} text={`${isDarkMode ? "Light" : "Dark"} Theme`}>
      <Button
        onClick={toggleDarkMode}
        variant="outline"
        classname={`navButton bg-slate-500 text-white hover:bg-slate-600 medium:px-3.5`}
      >
        <span className="medium:flex medium:flex medium:justify-center">{isDarkMode ? <LuSun /> : <LuMoon />}</span>
        <span className={`block text-xs block medium:hidden`}>
          {`${isDarkMode ? "Light" : "Dark"} Mode`}
        </span>
      </Button>
    </ButtonNav>
  );
}