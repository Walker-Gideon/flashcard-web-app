import { Link } from "react-scroll";

const links = [
  { text: "Terms of Service", link: "" },
  { text: "Privacy Policy", link: "" },
  { text: "Contact", link: "" },
];

export default function FooterLinks() {
  return (
    <div className="medium:flex-row medium:gap-6 flex flex-col justify-between gap-4">
      {links.map((link, index) => (
        <div
          key={index}
          className="text-sm font-medium text-stone-500 transition-colors duration-300 hover:text-stone-600"
        >
          <Link className="cursor-pointer">{link.text}</Link>
        </div>
      ))}
    </div>
  );
}
