import { useAuth } from "../../context/AuthContext";
import HeaderText from "../../ui/HeaderText";

export default function UserWelcome({ title, subText, show, userDisplay, classname, trubWidth }) {
  const { userData } = useAuth();

  const displayName =
    userData.username &&
    userData.username.charAt(0).toUpperCase() + userData.username.slice(1);

  return (
    <div className={`whitespace-nowrap ${classname}`}>
      <HeaderText classname="flex items-center">
        {userDisplay ? (
          <>
            Welcome,&nbsp;
            {displayName ? (
              <span className={`truncate ${trubWidth ? `${trubWidth}` : `w-40`}`}>{displayName}</span> 
            ) : ( 
              "Username"
            )}
          </>
        ) : (
          title
        )}
      </HeaderText>
      <p
        className={`text-sm text-slate-500 dark:text-slate-400 ${show ? "medium:block hidden" : ""}`}
      >
        {userDisplay ? "Glad to have you on board." : subText}
      </p>
    </div>
  );
}
