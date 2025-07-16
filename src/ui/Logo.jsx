import { Link } from "react-scroll";

export default function Logo({ to }) {
  return (
    <Link
      to={to}
      smooth={true}
      spy={true}
      duration={500}
      offset={-100}
      className="flex cursor-pointer items-center gap-1 font-bold text-slate-950 uppercase"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-white">
        w
      </span>
      <span className={`hidden font-bold md:block`}>walkwise</span>
    </Link>
  );
}
