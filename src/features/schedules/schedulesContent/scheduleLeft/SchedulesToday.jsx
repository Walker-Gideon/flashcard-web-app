import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useGen } from "../../../../context/GeneralContext";
import { format, isSameDay } from "date-fns";
import { LuPlay } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { LuClock } from "react-icons/lu";
import { LuZap } from "react-icons/lu";
import Button from "../../../../ui/Button";
import CardHeader from "../../../../ui/CardHeader";
import CardContent from "../../../../ui/CardContent";
import CardDiscription from "../../../../ui/CardDiscription";
import CardOverview from "../../../../ui/CardOverview";
import { useAuth } from "../../../../context/AuthContext";
import useLoaderAction from "../../../../utils/LoaderAction";
import { useFlash } from "../../../../context/FlashcardContext";

export default function SchedulesToday({ activeView }) {
  const { user } = useAuth();
  const { setSessionModel, sessions, flashcards } = useGen();
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

  function getScheduleStatus(schedule) {
    const now = new Date();
    const scheduledTime = schedule.scheduledAt?.toDate();

    if (!scheduledTime) return "Invalid";

    if (now < scheduledTime) {
      return "Pending";
    }

    return "Scheduled";
  }

  function getStatusIcon(status) {
    if (status === "Pending") return <LuClock className="h-3.5 w-3.5" />;
    if (status === "Scheduled")
      return <LuZap className="h-3.5 w-3.5 text-red-500" />;
    if (status === "Completed")
      return <LuCheck className="h-3.5 w-3.5 text-green-500" />;
    return null;
  }

  const todaySessions = sessions
    .filter((session) => isSameDay(session.scheduledAt.toDate(), new Date()))
    .sort((a, b) => a.scheduledAt.toDate() - b.scheduledAt.toDate());

  async function handleScheduleSession(sessionId) {
    // 1. Get full session from sessions array
    const fullSessionToday = sessions.find(
      (session) => session.id === sessionId,
    );

    if (!fullSessionToday) {
      console.log("Session not found");
      return;
    }

    const sessionTodayId = fullSessionToday.id;

    if (!sessionTodayId) {
      console.log("No sessionTodayId in session");
      return;
    }

    try {
      // 2. Fetch flashcards related to that tagId
      const sessionRef = doc(
        db,
        "users",
        user.uid,
        "schedules",
        sessionTodayId,
      );
      const sessionsSnap = await getDoc(sessionRef);
      console.log("card from firebase ", sessionsSnap.data());

      if (sessionsSnap.exists()) {
        const sessionData = sessionsSnap.data();
        console.log("Fetched flashcard tagID:", sessionData.tagId);
        console.log("Fetched flashcards:", flashcards);

        flashcards.forEach((element) => {
          if (element.id === sessionData.tagId) {
            console.log("The flashcards deatils is this ", element);
            navigate("/dashboard/flashcards");

            setCurrentFlashcard({ id: sessionData.tagId, ...element });

            // Display the flashcard on click
            setShowPreview(true);
            setShowCreateFlashcard(true);
            setReadAlredyFlashcard(true);

            // Set the id for the case a user want to edit
            SetEditFlashcardData({ id: sessionData.tagId, ...element });
          }
        });
      }

      setQueryFlashcard("");
      setFilteredFlashcard(displayCreatedFlashcard);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  }

  return (
    <div className={`${activeView === "today" ? `` : `hidden`}`}>
      {activeView === "today" && (
        <CardOverview classname={`h-full w-full lg:col-span-2`}>
          <CardHeader title="Today's Sessions">
            <Button
              variant="outline"
              onClick={() =>
                setTimeout(() => {
                  setSessionModel((show) => !show);
                }, 500)
              }
              classname="button flex items-center border-0 space-x-2 px-4 py-2 bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-300"
            >
              <LuPlus className="h-4 w-4" />
              <span>Add Session</span>
            </Button>
          </CardHeader>

          {/* Working here */}

          <div className="scroll-container h-170 space-y-4 overflow-y-scroll">
            {todaySessions.length !== 0 ? (
              todaySessions.map((schedule) => (
                <CardContent key={schedule.id} role="button" type="innerCard">
                  <CardContent classname="flex items-center space-x-4">
                    <div
                      className={`h-4 w-4 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700`}
                    ></div>
                    <CardDiscription
                      classnameFirst="font-medium text-slate-900 dark:text-white"
                      classnameSecond="text-sm text-slate-500 dark:text-slate-400"
                      textOne={schedule.tag}
                      textTwo={`${schedule.count} cards • ${schedule.estimatedTime} min`}
                    />
                  </CardContent>

                  <CardContent classname="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {schedule.scheduledAt?.toDate
                          ? format(schedule.scheduledAt.toDate(), "HH:mm")
                          : "Invalid Time"}
                      </p>
                      <span className="inline-flex items-center space-x-1 rounded-full bg-slate-200 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-900/30 dark:text-slate-300">
                        {getStatusIcon(getScheduleStatus(schedule))}
                        <span>{getScheduleStatus(schedule)}</span>
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => handleScheduleSession(schedule.id)}
                      classname="rounded-sm bg-slate-500 p-2 text-white opacity-0 transition-colors group-hover:opacity-100 hover:bg-slate-600"
                    >
                      <LuPlay className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </CardContent>
              ))
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <p className="text-sm text-slate-500 dark:text-slate-50">
                  No sessions scheduled for today.
                </p>
              </div>
            )}
          </div>
        </CardOverview>
      )}
    </div>
  );
}
