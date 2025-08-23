import InspireHeader from "./InspireHeader";
import InspireLeftLayout from "./inspireLeft/InspireLeftLayout";
import InspireRightLAyout from "./inspireRight/InspireRightLAyout";

export default function InspireLayout() {
  return (
    <div className="defaultColor h-screen overflow-hidden">
      <InspireHeader />

      <div className="medium:mt-0 mt-7 grid h-screen grid-cols-1 gap-8 space-y-6 overflow-scroll p-6 lg:grid-cols-3">
        <InspireLeftLayout />
        <InspireRightLAyout />
      </div>
    </div>
  );
}
