import Logo from "../Logo";
import FooterRight from "./FooterRight";

export default function Footer() {
  return (
    <footer className="border-t border-stone-300 px-4 py-4 md:px-8 lg:px-30">
      <div className="flex flex-col gap-4 medium:flex-row medium:items-center justify-between">
        <div className="flex items-center gap-1 font-bold text-slate-950 uppercase">
          <Logo logo={true} />
          <span className={`medium:text-base text-sm font-bold text-slate-500`}>
            walkwise
          </span>
        </div>

        <FooterRight />
      </div>
    </footer>
  );
}
