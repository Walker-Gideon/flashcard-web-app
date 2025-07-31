import Logo from "../Logo";
import FooterLinks from "./FooterLinks";
import FooterRight from "./FooterRight";

export default function Footer() {
  return (
    <footer className="border-t border-stone-300 px-4 py-8 md:px-8 lg:px-30">
      <div className="medium:flex-row medium:pb-10 medium:items-center flex flex-col justify-between gap-4 pb-2">
        <div className="flex items-center gap-1 font-bold text-slate-950 uppercase">
          <Logo logo={true} />
          <span className={`medium:text-base text-sm font-bold text-slate-500`}>
            walkwise
          </span>
        </div>
        <FooterLinks />
      </div>

      <FooterRight />
    </footer>
  );
}
