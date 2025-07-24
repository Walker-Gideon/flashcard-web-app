import Logo from "../Logo";
import FooterLinks from "./FooterLinks";
import FooterRight from "./FooterRight";

export default function Footer() {
  return (
    <footer className="middle:px-8 px-4 pb-6 md:px-8 lg:px-30">
      <div className="medium:flex-row medium:pt-4 medium:pb-20 flex flex-col justify-between gap-4 border-t border-stone-300 py-8">
        <div className="flex items-center gap-1 font-bold text-slate-950 uppercase">
          <Logo logo={true} />
          <span className={`hidden font-bold md:block`}>walkwise</span>
        </div>
        <FooterLinks />
      </div>

      <FooterRight />
    </footer>
  );
}
