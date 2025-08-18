import { useAuth } from "../../context/AuthContext";
import HeaderText from "../../ui/HeaderText";

export default function UserWelcome({ title, subText, show, userDisplay }) {
  const { userData } = useAuth();

  const displayName =
    userData.username &&
    userData.username.charAt(0).toUpperCase() + userData.username.slice(1);

  if (userDisplay)
    return (
      <div>
        <HeaderText>{`Welcome, ${displayName ? displayName : "Username"}!`}</HeaderText>
        <p
          className={`text-sm text-slate-500 dark:text-slate-400 ${show ? "medium:block hidden" : ""}`}
        >
          Glad to have you on board.
        </p>
      </div>
    );

  return (
    <div>
      <HeaderText>{title}</HeaderText>
      <p
        className={`text-sm text-slate-500 dark:text-slate-400 ${show ? "medium:block hidden" : ""}`}
      >
        {subText}
      </p>
    </div>
  );
}
