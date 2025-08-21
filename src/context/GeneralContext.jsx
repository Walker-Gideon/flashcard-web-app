import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const GeneralContext = createContext();

function GeneralProvider({ children }) {
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  //   NB on logout set this setProgress(null);
  const [progress, setProgress] = useState(null);
  /*
  const [progress, setProgress] = useState({
    streakCount: 0,
    lastActiveDate: null,
    masteredFlashcards: 0,
    earlyBird: false,
    nightOwl: false,
    subjectMastery: {},
    overallMastery: 0,
  }); */
  const [loadingProgress, setLoadingProgress] = useState(true);

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
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await createInitialProgress(user.uid);
        await fetchProgress(user.uid); // Fetch into local state
      } else {
        setProgress(null); // Clear on logout
      }
    });

    return () => unsubscribe();
  }, []);

  // For the STREAK
  // Get "YYYY-MM-DD" formatted date
  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const getYesterdayDate = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split("T")[0];
  };

  const updateStreak = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const today = getTodayDate();
    const yesterday = getYesterdayDate();
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return;

    const progressRef = doc(db, "users", user.uid, "progress", "metrics");
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

    // Update the user progress
    setProgress(progressRef, {
      streakCount: streak,
      lastActiveDate: today,
    });
  };

  // updat the flashcard mastery achievement
  const updateFlashcardMastery = async (count) => {
    const user = auth.currentUser;
    if (!user) return;

    const progressRef = doc(db, "users", user.uid, "progress", "metrics");
    await updateDoc(progressRef, { masteredFlashcards: count });

    setProgress((prev) => ({ ...prev, masteredFlashcards: count }));
  };

  // used to determine earlyBird or nightOwl achievement
  const updateStudyTime = async (hour) => {
    const user = auth.currentUser;
    if (!user) return;

    const earlyBird = hour < 8;
    const nightOwl = hour >= 22;

    const progressRef = doc(db, "users", user.uid, "progress", "metrics");
    await updateDoc(progressRef, { earlyBird, nightOwl });

    setProgress((prev) => ({
      ...prev,
      earlyBird,
      nightOwl,
    }));
  };

  //  updating the user progress
  const createInitialProgress = async (uid) => {
    if (!uid) return;

    const progressRef = doc(db, "users", uid, "progress", "metrics");
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

  //   Fetch function to update the user progress
  const fetchProgress = async (uid) => {
    if (!uid) return;

    try {
      const progressRef = doc(db, "users", uid, "progress", "metrics");
      const progressSnap = await getDoc(progressRef);

      if (progressSnap.exists()) {
        const data = progressSnap.data();
        setProgress(data);
        console.log("📥 Progress loaded:", data);
      } else {
        console.warn("⚠️ Progress document does not exist.");
      }
    } catch (error) {
      console.error("❌ Error fetching progress:", error);
    } finally {
      setLoadingProgress(false);
    }
  };

  const value = {
    quotes,
    setQuotes,
    currentQuoteIndex,
    progress,
    loadingProgress,
    // functions
    updateStreak,
    updateFlashcardMastery,
    updateStudyTime,
    createInitialProgress,
    fetchProgress,
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
