import { useEffect, useState } from "react";
import Button from "./Button";
import { LuSun, LuMoon } from "react-icons/lu";

export default function ThemeCom() {
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

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  return (
    <div className="medium:hidden block">
      <Button
        onClick={toggleDarkMode}
        variant="outline"
        classname="p-2 rounded-sm bg-slate-500 text-sm text-white hover:bg-slate-600 transition-colors"
      >
        {isDarkMode ? <LuSun /> : <LuMoon />}
      </Button>
    </div>
  );
}