import InfoContent from "./InfoContent";
import InfoHeader from "./InfoHeader";

export default function MoreInfo() {
  return (
    <div className="middle:grid middle:grid-cols-3 middle:items-center middle:gap-10 bg-stone-400/30 p-8 md:p-14 lg:px-35 lg:py-20">
      <InfoHeader />
      <InfoContent />
    </div>
  );
}
