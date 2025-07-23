import Footer from "../../ui/Footer";
import Loader from "../../ui/Loader";
import Hero from "./Hero";
import HomeHeader from "./HomeHeader";
import MainOverview from "./MainOverview";
import MoreInfo from "./MoreInfo";
import Testimonial from "./Testimonial";

export default function LandingPage() {
  return (
    <div>
      <div className="h-1">
        <Loader />
      </div>
      <HomeHeader />

      <main>
        <Hero />
        <MainOverview />
        <MoreInfo />
        <Testimonial />
      </main>

      <Footer />
    </div>
  );
}
