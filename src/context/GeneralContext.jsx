import { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const GeneralContext = createContext();

function GeneralProvider({ children }) {
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

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

  const value = { quotes, setQuotes, currentQuoteIndex };

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
