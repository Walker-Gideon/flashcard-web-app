import Button from "../../ui/Button";
import Logo from "../../ui/Logo";

export default function HomeHeader() {
  return (
    <div className="sticky top-0 z-50 h-15">
      <header className="flex h-14 items-center justify-between border-b border-stone-200 bg-white/30 px-4 backdrop-blur-sm md:px-8 lg:px-30">
        <Logo to="home" />

        <div>
          <div className="medium:block hidden">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <Button to={"/accounts/login"}>Log In</Button>
              <Button color={true} to={"/accounts/signup"}>
                Sign Up
              </Button>
            </div>
          </div>

          <div className="medium:hidden block">
            <Button color={true}>Get started</Button>
          </div>
        </div>
      </header>
    </div>
  );
}

/*
medium:py-2 medium:text-[0.74rem] cursor-pointer rounded-sm border border-slate-950 bg-transparent py-1.5 text-[0.7rem] font-semibold ${btnPaddX ? `${btnPaddX}` : `medium:px-10 px-8`}*/
