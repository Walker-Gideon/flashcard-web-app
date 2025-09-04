import { useAuth } from "../../context/AuthContext";
import HeaderText from "../../ui/HeaderText";

export default function UserWelcome({ title, subText, show, userDisplay }) {
  const { userData } = useAuth();

  const displayName =
    userData.username &&
    userData.username.charAt(0).toUpperCase() + userData.username.slice(1);

  return (
    <div>
      <HeaderText>
        {userDisplay ? (
          <>
            Welcome,&nbsp;
            {displayName ? (
              <span className="truncate md:whitespace-normal md:overflow-visible md:text-ellipsis-none w-40 md:w-auto">{displayName}</span> 
            ) : ( 
              "Username"
            )}
            !
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
