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
          `navButton medium:w-full hover:bg-slate-950 hover:text-white ${isActive ? "bg-slate-950 text-white" : "text-slate-950"}`
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

/*
${
            lighMode
              ? `${isActive ? "bg-slate-900 text-slate-200" : "text-slate-950"}`
              : `${isActive ? "bg-slate-200 text-slate-950" : "text-slate-200"}`
          }*/
