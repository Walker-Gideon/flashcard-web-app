import CardOverview from "../../ui/CardOverview";
import SettlingsFormHeader from "./SettlingsFormHeader";

export default function SettingsContent() {
  return (
    <div className="medium:w-140 medium:mt-8 mt-0 w-auto lg:w-160">
      <CardOverview>
        <SettlingsFormHeader />
      </CardOverview>
    </div>
  );
}
