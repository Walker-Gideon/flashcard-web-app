import { LuUser } from "react-icons/lu";
import { useAuth } from "../../context/AuthContext";

export default function User({ classname, icon }) {
  const { userData } = useAuth();

  return (
    <div
      className={`transitioningColors z-50 flex items-center justify-center rounded-full bg-slate-500 dark:text-slate-50 ${classname ? `${classname}` : `h-8 w-8`}`}
    >
      {userData.photoURL ? (
        <img
          src={userData.photoURL}
          alt="User profile"
          className="medium:h-8 medium:w-8 h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <LuUser className={`text-white ${icon}`} />
      )}
    </div>
  );
}
