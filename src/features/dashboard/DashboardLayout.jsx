import { useState } from "react";
import ModelCard from "../../ui/ModelCard";
import CardStatus from "./dashContent/CardStatus";
import MainContent from "./dashContent/mainContent/MainContent";
import QuickAction from "./dashContent/QuickAction";
import RecentActivity from "./dashContent/RecentActivity";
import DashHeader from "./DashHeader";

export default function DashboardLayout() {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);

  return (
    <div className="defaultColor h-screen overflow-hidden">
      <DashHeader />

      <main className="medium:mt-0 mt-7 h-screen space-y-6 overflow-scroll p-6">
        <CardStatus />
        <QuickAction />
        <MainContent
          setShowReviewModal={setShowReviewModal}
          setSelectedFlashcard={setSelectedFlashcard}
        />
        <RecentActivity />
      </main>

      {showReviewModal && selectedFlashcard && (
        <ModelCard
          setShowReviewModal={setShowReviewModal}
          selectedFlashcard={selectedFlashcard}
        />
      )}
    </div>
  );
}
