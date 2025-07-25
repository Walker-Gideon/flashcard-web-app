import CardStatus from "./dashContent/CardStatus";
import MainContent from "./dashContent/MainContent";
import QuickAction from "./dashContent/QuickAction";
import RecentActivity from "./dashContent/RecentActivity";
import DashHeader from "./DashHeader";

export default function DashboardLayout() {
  return (
    <div className="defaultColor h-screen">
      <DashHeader />

      <main className="medium:mt-0 mt-6 h-screen space-y-6 overflow-scroll p-6">
        <CardStatus />
        <QuickAction />
        <MainContent />
        <RecentActivity />
      </main>
    </div>
  );
}
