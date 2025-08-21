import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const GeneralContext = createContext();

function GeneralProvider({ children }) {
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [progress, setProgress] = useState({
    streakCount: 0,
    lastActiveDate: null,
    masteredFlashcards: 0,
    earlyBird: false,
    nightOwl: false,
    subjectMastery: {}, // or null if unused
    overallMastery: 0, // new idea
  });
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
    setProgress((prev) => ({
      ...prev,
      streakCount: streak,
      lastActiveDate: today,
    }));

    console.log("🔥 Streak updated:", streak);
  };

  // updat the flashcard mastery achievement
  const updateFlashcardMastery = async (count) => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { masteredFlashcards: count });

    setProgress((prev) => ({ ...prev, masteredFlashcards: count }));
  };

  // used to determine earlyBird or nightOwl achievement
  const updateStudyTime = async (hour) => {
    const user = auth.currentUser;
    if (!user) return;

    const earlyBird = hour < 8;
    const nightOwl = hour >= 22;

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { earlyBird, nightOwl });

    setProgress((prev) => ({
      ...prev,
      earlyBird,
      nightOwl,
    }));
  };

  console.log("progresee is ", progress);

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

/*
Function to update the user streak

const handleReviewComplete = async () => {
  await updateStreak();
  // other logic: show success screen, reset state, etc.
};

// SOmthing about it condition
if (currentCardIndex === totalCards - 1) {
  await handleReviewComplete();
}

*/
