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

const GeneralContext = createContext();

function GeneralProvider({ children }) {
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  //   NB on logout set this setProgress(null);
  const [progress, setProgress] = useState(null);
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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

  //   Fetch function to update the user progress
  useEffect(() => {
    fetchProgress();
  }, []);

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
    progress,
    setQuotes,
    loadingProgress,
    currentQuoteIndex,
    // functions
    updateStreak,
    fetchProgress,
    updateStudyTime,
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
