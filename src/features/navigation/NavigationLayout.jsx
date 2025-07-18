import NavigateLScreen from "./NavigateLScreen";
import NavigateSmallScreen from "./NavigateSmallScreen";

export default function NavigationLayout() {
  return (
    <div className="medium:w-auto h-screen border-r border-stone-300">
      <NavigateSmallScreen />
      <NavigateLScreen />
    </div>
  );
}
