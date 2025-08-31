import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useGen } from "../../../../context/GeneralContext";
import { useFlash } from "../../../../context/FlashcardContext";
import { useAuth } from "../../../../context/AuthContext";
import { LuPlay } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { LuChartColumnIncreasing } from "react-icons/lu";
import CardOverview from "../../../../ui/CardOverview";
import CardHeader from "../../../../ui/CardHeader";
import useLoaderAction from "../../../../utils/LoaderAction";
import QuickActionButton from "../../../../ui/QuickActionButton";

export default function SchedulesQuickActions() {
  const { user } = useAuth();
  const {
    setSessionModel,
    nearestSessions,
    sessions,
    flashcards,
    todaySessions,
  } = useGen();
  const {
    displayCreatedFlashcard,
    setQueryFlashcard,
    setFilteredFlashcard,
    setCurrentFlashcard,
    setShowCreateFlashcard,
    setShowPreview,
    setReadAlredyFlashcard,
    SetEditFlashcardData,
  } = useFlash();
  const navigate = useLoaderAction(1000);

  async function handleScheduleSession(sessionId) {
    const fullSessionToday = sessions.find(
      (session) => session.id === sessionId,
    );

    if (!fullSessionToday) {
      return;
    }

    const sessionTodayId = fullSessionToday.id;

    if (!sessionTodayId) {
      return;
    }

    try {
      const sessionRef = doc(
        db,
        "users",
        user.uid,
        "schedules",
        sessionTodayId,
      );
      const sessionsSnap = await getDoc(sessionRef);

      if (sessionsSnap.exists()) {
        const sessionData = sessionsSnap.data();

        const matchedFlashcard = flashcards.find(
          (f) => f.id === sessionData.tagId,
        );
        if (matchedFlashcard) {
          setCurrentFlashcard({
            id: sessionData.tagId,
            completed: true,
            ...matchedFlashcard,
          });

          setShowPreview(true);
          setShowCreateFlashcard(true);
          setReadAlredyFlashcard(true);

          SetEditFlashcardData({ id: sessionData.tagId, ...matchedFlashcard });
          navigate("/dashboard/flashcards");
        }
      }

      setQueryFlashcard("");
      setFilteredFlashcard(displayCreatedFlashcard);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  }

  return (
    <CardOverview
      classname={`${todaySessions.length === 0 ? `medium:col-span-2 lg:col-span-1` : ``}`}
    >
      <CardHeader title="Quick Actions"></CardHeader>
      <div className="space-y-3">
        {todaySessions.length !== 0 && (
          <QuickActionButton
            text="Start Next Session"
            icon={<LuPlay className="h-5 w-5" />}
            onClick={() => handleScheduleSession(nearestSessions?.at(0)?.id)}
          />
        )}

        <QuickActionButton
          text="Add Session"
          icon={<LuPlus className="h-5 w-5" />}
          onClick={() => {
            setTimeout(() => {
              setSessionModel((show) => !show);
            }, 500);
          }}
        />

        <QuickActionButton
          text="View Detailed Analytics"
          icon={<LuChartColumnIncreasing className="h-5 w-5" />}
          onClick={() => {
            navigate("/dashboard");
          }}
        />
      </div>
    </CardOverview>
  );
}
