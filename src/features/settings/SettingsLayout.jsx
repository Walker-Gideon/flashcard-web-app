import HeaderText from "../../ui/HeaderText";
import SettingsContent from "./SettingsContent";

export default function SettingsLayout() {
  return (
    <div className="medium:mt-0 medium:px-4 medium:py-3 mt-12 px-6">
      <HeaderText classname={"hidden medium:block"}>Settings</HeaderText>
      <SettingsContent />
    </div>
  );
}
