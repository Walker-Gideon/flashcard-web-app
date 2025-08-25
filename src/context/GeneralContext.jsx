import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { format, subDays, getDay, addDays } from "date-fns";

const GeneralContext = createContext();

function GeneralProvider({ children }) {
  // Inspire
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [totalCardsPerTag, setTotalCardsPerTag] = useState({});
  const [consistencyScore, setConsistencyScore] = useState(0);
  const [weeklyData, setWeeklyData] = useState([]);
  //   NB on logout set this setProgress(null);
  const [progress, setProgress] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(true);

  // Schedules
  const [sessionModel, setSessionModel] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [formData, setFormData] = useState({
    tag: "",
    count: "",
    date: "",
    time: "",
    estimatedTime: "",
  });

  //   Fetch the quotes
  useEffect(() => {
    const quoteRef = collection(db, "quotes");

    const unsubscribe = onSnapshot(quoteRef, (snapshot) => {
      const fetchedQuotes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setQuotes(fetchedQuotes);
    });

    return () => unsubscribe();
  }, []);

  //   Effect to display the quote one at a time
  useEffect(() => {
    if (quotes.length === 0) return;

    const quoteTimer = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 10000);

    return () => clearInterval(quoteTimer);
  }, [quotes]);

  //   Update user progress
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await createInitialProgress(user.uid);
        await fetchProgress(user.uid); // Fetch into local state
      } else {
        setProgress(null); // Clear on logout
      }
    });

    return () => unsubscribe();
  }, [progress]);

  //   Fetch function to update the user progress
  useEffect(() => {
    fetchProgress();
  }, []);

  //   Fetching all flashcards
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      const flashcardsRef = collection(db, "users", user.uid, "flashcards");

      const unsubscribeFlashcards = onSnapshot(flashcardsRef, (snapshot) => {
        const fetchedFlashcards = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(fetchedFlashcards);
        // For the add session in the schedule section
        setFlashcards(fetchedFlashcards);

        const tagCount = {};

        fetchedFlashcards.forEach((card) => {
          const tag = card.tags?.trim() || "untagged";
          const count = card.pairs?.length || 0;

          tagCount[tag] = (tagCount[tag] || 0) + count;
        });

        setTotalCardsPerTag(tagCount);
      });

      return () => unsubscribeFlashcards();
    });

    return () => unsubscribe();
  }, []);

  //   updating user weekely progress
  useEffect(() => {
    const today = new Date();
    const startOfWeek = subDays(today, getDay(today));
    const thisWeek = [];

    for (let i = 0; i < 7; i++) {
      const date = addDays(startOfWeek, i);
      const dateStr = format(date, "yyyy-MM-dd");
      const weekday = format(date, "EEE");

      thisWeek.push({
        day: weekday,
        minutes: progress?.studyLogs?.[dateStr] || 0,
      });
    }

    setWeeklyData(thisWeek);

    const studiedDays = thisWeek.filter((day) => day.minutes > 0).length;
    const score = Math.round((studiedDays / 7) * 100);
    setConsistencyScore(score);
  }, [progress?.studyLogs, setConsistencyScore]);

  // Get "YYYY-MM-DD" formatted date
  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const getYesterdayDate = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split("T")[0];
  };

  // For the STREAK
  const updateStreak = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const today = getTodayDate();
    const yesterday = getYesterdayDate();
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return;

    const userData = userSnap.data();
    const lastActive = userData.lastActiveDate;
    let streak = userData.streakCount || 0;

    if (lastActive === today) {
      // Already updated today
      return;
    } else if (lastActive === yesterday) {
      streak += 1;
    } else {
      streak = 1;
    }

    await updateDoc(userRef, {
      streakCount: streak,
      lastActiveDate: today,
    });

    const progressRef = doc(db, "users", user.uid, "progress", "inspire");
    await updateDoc(progressRef, {
      streakCount: streak,
      lastActiveDate: today,
    });

    // Update the user progress
    setProgress((prev) => ({
      ...prev,
      streakCount: streak,
      lastActiveDate: today,
    }));

    await fetchProgress(user.uid);
  };

  // used to determine earlyBird or nightOwl achievement
  const updateStudyTime = async (hour) => {
    const user = auth.currentUser;
    if (!user) return;

    const earlyBird = hour < 8;
    const nightOwl = hour >= 22;

    const progressRef = doc(db, "users", user.uid, "progress", "inspire");
    await updateDoc(progressRef, {
      earlyBird,
      nightOwl,
      studyTimeHour: hour,
      lastStudyDate: getTodayDate(),
    });

    setProgress((prev) => ({
      ...prev,
      earlyBird,
      nightOwl,
      studyTimeHour: hour,
      lastStudyDate: getTodayDate(),
    }));
  };

  const incrementStudiedFlashcards = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const progressRef = doc(db, "users", user.uid, "progress", "inspire");
    const incremented = (progress?.masteredFlashcards || 0) + 1;

    try {
      await updateDoc(progressRef, {
        masteredFlashcards: incremented,
      });

      setProgress((prev) => ({
        ...prev,
        masteredFlashcards: incremented,
      }));
    } catch (error) {
      console.error("Failed to update masteredFlashcards:", error);
    }
  };

  //  updating the user progress
  const createInitialProgress = async (uid) => {
    if (!uid) return;

    const progressRef = doc(db, "users", uid, "progress", "inspire");
    const progressSnap = await getDoc(progressRef);

    if (!progressSnap.exists()) {
      await setDoc(progressRef, {
        streakCount: 0,
        lastActiveDate: null,
        masteredFlashcards: 0,
        earlyBird: false,
        nightOwl: false,
        subjectMastery: {},
        overallMastery: 0,
      });
    }
  };

  //   Tag Master function
  const incrementSubjecMaster = async (tag) => {
    const user = auth.currentUser;
    if (!user || !tag) return;

    const progressRef = doc(db, "users", user.uid, "progress", "inspire");
    const current = progress?.subjectMastery?.[tag] || 0;

    const updatedSubjectMastery = {
      ...progress.subjectMastery,
      [tag]: current + 1,
    };

    await updateDoc(progressRef, { subjectMastery: updatedSubjectMastery });

    setProgress((prev) => ({
      ...prev,
      subjectMastery: updatedSubjectMastery,
    }));
  };

  //   Weekly heap
  const logStudyTime = async (minutes) => {
    const user = auth.currentUser;
    if (!user || !minutes) return;

    const today = getTodayDate();
    const progressRef = doc(db, "users", user.uid, "progress", "inspire");

    const prevLogs = progress?.studyLogs || {};
    const updatedLogs = {
      ...prevLogs,
      [today]: (prevLogs[today] || 0) + minutes,
    };

    try {
      await updateDoc(progressRef, { studyLogs: updatedLogs });

      setProgress((prev) => ({
        ...prev,
        studyLogs: updatedLogs,
      }));
    } catch (error) {
      console.error(" Failed to log study time:", error);
    }
  };

  // For fetching user progress
  const fetchProgress = async (uid) => {
    if (!uid) return;

    try {
      const progressRef = doc(db, "users", uid, "progress", "inspire");
      const progressSnap = await getDoc(progressRef);

      if (progressSnap.exists()) {
        const data = progressSnap.data();
        setProgress(data);

        console.log("📥 Progress loaded:", data);
      } else {
        console.warn("Progress document does not exist.");
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
    } finally {
      setLoadingProgress(false);
    }
  };

  const value = {
    quotes,
    formData,
    progress,
    setQuotes,
    weeklyData,
    flashcards,
    setFormData,
    sessionModel,
    setWeeklyData,
    loadingProgress,
    setSessionModel,
    consistencyScore,
    totalCardsPerTag,
    currentQuoteIndex,
    setConsistencyScore,
    // functions
    logStudyTime,
    updateStreak,
    fetchProgress,
    updateStudyTime,
    incrementSubjecMaster,
    createInitialProgress,
    incrementStudiedFlashcards,
  };

  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  );
}

function useGen() {
  const context = useContext(GeneralContext);

  if (context === undefined)
    throw new Error("GeneralContext was used outside of it provider");

  return context;
}

export { GeneralProvider, useGen };
