import { Link } from "react-scroll";

const links = ["Terms of Service", "Privacy Policy", "Contact"];

export default function FooterLinks() {
  return (
    <div className="medium:mt-3 medium:flex-row medium:gap-6 flex flex-col justify-between gap-4">
      {links.map((link, index) => (
        <div
          key={index}
          className="medium:text-[0.9rem] text-sm font-medium text-stone-400 transition-colors duration-300 hover:text-stone-600"
        >
          <Link className="cursor-pointer">{link}</Link>
        </div>
      ))}
    </div>
  );
}
