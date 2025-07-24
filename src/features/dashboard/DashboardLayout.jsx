import CardStatus from "./dashContent/CardStatus";
import DashHeader from "./DashHeader";

export default function DashboardLayout() {
  return (
    <div className="defaultColor min-h-screen">
      <DashHeader />

      <main className="space-y-6 p-6">
        <CardStatus />
      </main>
    </div>
  );
}
