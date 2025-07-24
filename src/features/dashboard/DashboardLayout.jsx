import { useEffect, useState } from "react";
import { LuMoon } from "react-icons/lu";
import { LuSun } from "react-icons/lu";

export default function DashboardLayout() {
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black transition-colors duration-500 dark:bg-zinc-900 dark:text-white">
      <h2>DashboardLayout</h2>
      <h1 className="mb-4 text-3xl font-bold">Hello Walkwise 👋</h1>
    </div>
  );
}

/*
<button
        onClick={toggleDarkMode}
        className="rounded bg-zinc-800 px-4 py-2 text-white transition duration-300 dark:bg-white dark:text-zinc-800"
      >
        Toggle {isDarkMode ? "Light" : "Dark"} Mode
      </button>
      */
