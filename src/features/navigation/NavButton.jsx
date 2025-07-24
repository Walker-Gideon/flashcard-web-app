import { NavLink } from "react-router-dom";
import ButtonNav from "../../ui/ButtonNav";
import { useNav } from "../../context/NavigateContext";

export default function NavButton({ to, text, icon, onClick }) {
  const { resize } = useNav();

  return (
    <ButtonNav navLarge={true} text={text}>
      <NavLink
        to={to}
        end
        onClick={onClick}
        className={({ isActive }) =>
          `navButton medium:w-full flex hover:bg-slate-950 hover:text-white hover:dark:bg-slate-700/50 ${isActive ? "bg-slate-950 text-white dark:bg-slate-700/50" : "dark:text-white"} ${resize ? `items-start justify-start` : ``}`
        }
      >
        {icon}
        <span className={`block text-xs ${resize ? `block` : `medium:hidden`}`}>
          {text}
        </span>
      </NavLink>
    </ButtonNav>
  );
}
