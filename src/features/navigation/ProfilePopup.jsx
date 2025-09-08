import { useAuth } from "../../context/AuthContext";
import { useNav } from "../../context/NavigateContext";
import { LuUser } from "react-icons/lu";
import { motion } from "motion/react";
import Button from "../../ui/Button";
import useLoaderAction from "../../utils/LoaderAction";

export default function ProfilePopup() {
  const { userData, logout } = useAuth();
  const { setShowProfile } = useNav();
  const navigate = useLoaderAction()

  const displayName =
    userData.username &&
    userData.username.charAt(0).toUpperCase() + userData.username.slice(1);

  const handleLOgout = async () => {
    navigate("/")

    setTimeout(async () => {
      await logout();
    }, 500)

    setTimeout(() => {
      setShowProfile(false)
    }, 1000)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="absolute bottom-20 left-15 medium:bottom-16 medium:left-8 z-50 flex w-50 flex-col items-center gap-3 rounded-2xl border border-stone-300 bg-white/70 p-6 text-slate-900 backdrop-blur-xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white w-65"
    >
      <div className={`rounded-full flex items-center justify-center bg-gradient-to-r from-slate-200 to-slate-300 transition-colors duration-300 dark:from-slate-600 dark:to-slate-700 medium:h-15 medium:w-15 w-12 h-12 ${userData.photoURL ? `p-0` : `p-3`}`}>
        {userData.photoURL ? (
          <img
            src={userData.photoURL}
            alt="User profile"
            className="rounded-full object-cover medium:h-15 medium:w-15 h-12 w-12"
          />
        ) : (
          <LuUser className={`text-white w-8 h-8`} />
        )}
      </div>

      <div className="text-center flex items-center justify-center flex-col mb-4">
        <p className="text-sm medium:text-lg font-bold whitespace-nowrap text-slate-900 dark:text-white truncate w-30"
        >
          {displayName ? displayName : "Username"}
        </p>
        <p>{userData.email  ? userData.email : "example123@gmail.com"}</p>
      </div>

      <div className="border w-full border-stone-300 dark:border-slate-700" />

      <Button 
        variant="outline" 
        onClick={handleLOgout} 
        classname="primaryButton px-8"
      >Log out</Button>
    </motion.div>
  );
}