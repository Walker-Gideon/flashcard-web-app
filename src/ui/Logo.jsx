import { Link } from "react-scroll";

export default function Logo({ to, logo, classname }) {
  const className = {
    logo: "flex h-8 w-8 items-center justify-center rounded-full text-white bg-slate-500 transitioningColors dark:text-slate-50",
  };

  if (logo)
    return (
      <div>
        <h1 className={`${classname} ${className.logo}`}>w</h1>
      </div>
    );

  return (
    <Link
      to={to}
      smooth={true}
      spy={true}
      duration={500}
      offset={-100}
      className="flex cursor-pointer items-center gap-1 font-bold text-slate-500 uppercase"
    >
      <span className={className.logo}>w</span>
      <span className={`hidden font-bold md:block`}>walkwise</span>
    </Link>
  );
}
