import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useNav } from "../context/NavigateContext";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import ButtonNav from "./ButtonNav";
import { LuSun, LuMoon } from "react-icons/lu";

export default function ThemeCom() {
  const { userData } = useAuth();
  const { resize } = useNav();

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode])

  useEffect(() => {
    if(userData?.uid) {
      const saved = localStorage.getItem(`darkMode_${userData?.uid}`);
      if(saved !== null) {
        setIsDarkMode(JSON.parse(saved))
      } else if(userData.darkMode === undefined) {
        setIsDarkMode(userData.darkMode);
      } else {
        setIsDarkMode(window.matchMedia("(perfers-color-scheme: dark)").matches);
      }
    }
  }, [userData?.uid])

  const toggleDarkMode = async (id) => {
    if(!id) return;
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    localStorage.setItem(`darkMode_${id}`, JSON.stringify(newMode));

    try{
      await updateDoc(doc(db, "users", id), { darkMode: newMode });
    } catch(err) {
      console.log("Failed to save theme ", err);
    }
  }

  /*
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
  */

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