import { Link } from "react-scroll";
import Button from "../../../ui/Button";

export default function HeroButtons() {
  return (
    <div className="medium:flex-row medium:gap-2 flex flex-col items-center gap-3">
      {/* className={} btnPaddX={} color="" */}
      <Button to={"/accounts/signup"} color={true}>
        Get Started
      </Button>

      <Link to="features" smooth={true} spy={true} duration={500} offset={-100}>
        <Button
          variant="outline"
          className="button medium:px-6 border-gray-600 px-4 py-[7px] font-bold"
        >
          Explore Features
        </Button>
      </Link>
    </div>
  );
}
