import CardStatus from "./dashContent/CardStatus";
import DashHeader from "./DashHeader";

export default function DashboardLayout() {
  return (
    <div className="defaultColor min-h-screen">
      <DashHeader />

      <main className="space-y-6 p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <CardStatus />
        </div>
      </main>
    </div>
  );
}
