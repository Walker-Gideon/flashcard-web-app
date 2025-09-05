import { NavLink, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import ButtonNav from "../../ui/ButtonNav";
import { useNav } from "../../context/NavigateContext";
import { useLoader } from "../../context/LoaderContext";

export default function NavButton({ to, text, icon, onClick }) {
  const { resize } = useNav();
  const { setLoading } = useLoader();
  const navigate = useNavigate()

  const handleClick = useCallback (
    (e) => {
      e.preventDefault();
      if(onClick) onClick();
      setLoading(true);
      
      setTimeout(() => {
        navigate(to)
        setLoading(false)
      }, 1000)
    }, [navigate, to, onClick, setLoading]
  );

  return (
    <ButtonNav navLarge={true} text={text}>
      <NavLink
        to={to}
        end
        onClick={handleClick}
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
