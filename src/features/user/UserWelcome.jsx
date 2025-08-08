import HeaderText from "../../ui/HeaderText";

export default function UserWelcome({ title, subText, show }) {
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
