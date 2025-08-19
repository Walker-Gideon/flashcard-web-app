import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function ReviewSummary() {
  const { userData } = useAuth();

  useEffect(() => {
    //    updateStreak(); // only runs once when this screen loads
  }, []);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold">🎉 Review Complete!</h2>
      <p className="mt-2 text-lg">You reviewed all your flashcards.</p>

      <p className="mt-4 text-sm text-gray-600">
        🔥 Current Streak: {userData.streakCount}-day
      </p>

      <div className="mt-6 flex justify-center gap-4">
        <button onClick={() => {}} className="btn-primary">
          Back to Home
        </button>
        <button className="btn-outline">Review Again</button>
      </div>
    </div>
  );
}
