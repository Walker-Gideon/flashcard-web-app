import { useEffect, useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNav } from "../context/NavigateContext";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import ButtonNav from "./ButtonNav";
import { LuSun, LuMoon } from "react-icons/lu";

export default function ThemeCom() {
  const { userData } = useAuth();
  const { resize } = useNav();

  const [isDarkMode, setIsDarkMode] = useState(() => {
  if (typeof window !== "undefined" && id) {
    const saved = localStorage.getItem(`darkMode_${id}`);
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = (id) => {
    if(!id) return;
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem(`darkMode_${id}`, JSON.stringify(newMode));

    try{
      await updateDoc(doc(db, "users", id), {darkMode: newMode})
    } catch(err) {
      console.error("Faild to save theme", err)
    }
    
  };

  return (
    <ButtonNav navLarge={true} text={`${isDarkMode ? "Light" : "Dark"} Theme`}>
      <Button
        onClick={() => toggleDarkMode(userData?.uid)}
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