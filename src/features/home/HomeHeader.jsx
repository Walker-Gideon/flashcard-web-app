import Button from "../../ui/Button";
import Logo from "../../ui/Logo";

export default function HomeHeader() {
  return (
    <div className="sticky top-0 z-50 h-15">
      <header className="flex h-14 items-center justify-between border-b border-stone-300 bg-white/30 px-4 shadow-sm backdrop-blur-sm md:px-8 lg:px-30">
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
            <Button color={true} to={"/accounts/login"}>
              Get started
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
