import Footer from "../../ui/Footer";
import Loader from "../../ui/Loader";
import Hero from "./hero/Hero";
import HomeHeader from "./HomeHeader";
import MainOverview from "./mainoverview/MainOverview";
import MoreInfo from "./info/MoreInfo";
import Testimonial from "./testimonial/Testimonial";

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
