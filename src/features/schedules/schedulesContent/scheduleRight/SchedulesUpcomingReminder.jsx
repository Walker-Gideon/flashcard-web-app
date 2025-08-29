import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { LuClock } from "react-icons/lu";
import CardOverview from "../../../../ui/CardOverview";
import Button from "../../../../ui/Button";
import { useGen } from "../../../../context/GeneralContext";
import { useFlash } from "../../../../context/FlashcardContext";
import { useAuth } from "../../../../context/AuthContext";
import useLoaderAction from "../../../../utils/LoaderAction";

export default function SchedulesUpcomingReminder() {
  const { user } = useAuth();
  const { todaySessions, sessions, flashcards } = useGen();
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

  console.log(todaySessions);

  return (
    <div>
      {todaySessions.length !== 0 && (
        <CardOverview classname="medium:col-span-2 mb-18 rounded-2xl dark:text-white lg:col-span-1 bg-slate-500">
          <div className="mb-3 flex items-center space-x-2">
            <LuClock className="h-5 w-5" />
            <h3 className="font-semibold">Next Session</h3>
          </div>

          {/* This data will come for the user */}
          <p className="mb-4 font-medium">Biology review starts in 2 hours</p>

          <div className="flex items-center justify-between">
            <div>
              {/* This data will come for the user */}
              <p className="text-sm">12 cards • 25 min</p>
            </div>

            <Button variant="outline" classname="primaryButton">
              Reschedule
            </Button>
          </div>
        </CardOverview>
      )}
    </div>
  );
}
