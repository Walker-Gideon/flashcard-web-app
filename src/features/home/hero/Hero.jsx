import HeroButtons from "./HeroButtons";
import HeroText from "./HeroText";
import HeroImages from "./HeroImages";

export default function Hero() {
  return (
    <div
      id="home"
      className="flex h-screen items-center justify-center flex-col my-20"
    >
      <div className="medium:px-10 flex flex-col items-center px-8 md:px-16">
        <HeroText />
        <HeroButtons />
      </div>

      <HeroImages />
    </div>
  );
}
