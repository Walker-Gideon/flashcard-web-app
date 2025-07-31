import { Link } from "react-scroll";
import Button from "../../../ui/Button";
import { LuArrowDown } from "react-icons/lu";
import { LuChevronRight } from "react-icons/lu";

export default function HeroButtons() {
  return (
    <div className="medium:flex-row medium:gap-2 flex flex-col items-center gap-3">
      <Button
        to={"/accounts/signup"}
        color={true}
        btnPaddX={"px-8"}
        classname="flex items-center gap-2"
      >
        Get Started
        <LuChevronRight className="mt-0.5 text-sm font-bold" />
      </Button>

      <Link to="features" smooth={true} spy={true} duration={500} offset={-100}>
        <Button
          variant="outline"
          classname="button border-stone-300 text-slate-700 px-4 py-[7px] font-bold flex items-center gap-2 hover:border-slate-400"
        >
          Explore Features
          <LuArrowDown className="mt-0.5 text-sm font-bold text-slate-700" />
        </Button>
      </Link>
    </div>
  );
}
