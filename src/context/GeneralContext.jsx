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

    console.log("🔥 Streak updated:", streak);
  };

  const value = { quotes, setQuotes, currentQuoteIndex, updateStreak };

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
