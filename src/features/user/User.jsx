import { LuUser } from "react-icons/lu";
import { useAuth } from "../../context/AuthContext";

export default function User({ classname, icon }) {
  const { userData } = useAuth();

  return (
    <div
      className={`transitioningColors z-50 flex items-center justify-center rounded-full bg-slate-500 dark:text-slate-50 ${classname ? `${classname}` : `medium:h-8 medium:w-8 w-10 h-10`}`}
    >
      {userData.photoURL ? (
        <div className="medium:h-8 medium:w-8 w-10 h-10 flex items-center justify-center">
          <img
            src={userData.photoURL}
            alt="User profile"
            className="rounded-full object-cover medium:h-8 medium:w-8 h-10 w-10"
          />
        </div>
      ) : (
        <LuUser className={`text-white w-4 h-4 ${icon}`} />
      )}
    </div>
  );
}
