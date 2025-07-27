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
          `navButton medium:w-full flex text-slate-800 hover:bg-slate-600 hover:text-white ${isActive ? "bg-slate-500 text-white" : "dark:text-white"} ${resize ? `items-start justify-start` : ``}`
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
