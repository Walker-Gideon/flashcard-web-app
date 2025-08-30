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
  const now = new Date();
  let nearestSessions = [];

  if (todaySessions.length > 0) {
    const futureSessions = todaySessions.filter(
      (session) => session.scheduledAt?.toDate() > now && !session.completed,
    );

    const sessionsWithTimeDiff = futureSessions.map((session) => {
      const sessionTime = session.scheduledAt.toDate();
      const timeDiff = sessionTime - now;
      return { ...session, timeDiff };
    });

    const minTimeDiff = Math.min(
      ...sessionsWithTimeDiff.map((s) => s.timeDiff),
    );

    nearestSessions = sessionsWithTimeDiff.filter(
      (s) => s.timeDiff === minTimeDiff,
    );
  }

  console.log("Nearest session(s):", nearestSessions.at(0));

  function getTimeRemaining(scheduledAt) {
    const now = new Date();
    const targetTime = scheduledAt.toDate(); // assuming Firebase Timestamp
    const diffMs = targetTime - now;

    if (diffMs <= 0) return "Starting now";

    const diffMinutes = Math.floor(diffMs / 1000 / 60);
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours > 0 ? hours + "h " : ""}${minutes}m remaining`;
  }

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
          <p className="mb-4 font-medium">
            {nearestSessions?.at(0)?.tag} starts in{" "}
            {getTimeRemaining(nearestSessions?.at(0)?.scheduledAt)}
          </p>

          <div className="flex items-center justify-between">
            <div>
              {/* This data will come for the user */}
              <p className="text-sm">
                {nearestSessions?.at(0)?.count}{" "}
                {nearestSessions?.at(0)?.count === 1 ? "card" : "cards"} •{" "}
                {nearestSessions?.at(0)?.estimatedTime} min
              </p>
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
