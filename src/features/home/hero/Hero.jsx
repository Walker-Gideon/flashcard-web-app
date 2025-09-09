import HeroButtons from "./HeroButtons";
import HeroText from "./HeroText";
import HeroImages from "./HeroImages";

export default function Hero() {
  return (
    <div
      id="home"
      className="medium:px-10 flex h-screen items-center justify-center px-8 md:px-16"
    >
      <div className="flex flex-col items-center">
        <HeroText />
        <HeroButtons />
        <HeroImages />
      </div>
    </div>
  );
}
