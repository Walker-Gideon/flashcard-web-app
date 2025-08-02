import HeaderText from "../../ui/HeaderText";

export default function UserWelcome({ title, subText }) {
  return (
    <div>
      <HeaderText>{title}</HeaderText>
      <p className="text-sm text-slate-500 dark:text-slate-400">{subText}</p>
    </div>
  );
}
