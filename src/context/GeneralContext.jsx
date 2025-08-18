import { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const GeneralContext = createContext();

function GeneralProvider({ children }) {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const quoteRef = collection(db, "quotes");

    const unsubscribe = onSnapshot(quoteRef, (snapshot) => {
      const fetchedQuotes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Example: pick one randomly
      const randomQuote =
        fetchedQuotes[Math.floor(Math.random() * fetchedQuotes.length)];
      setQuote(randomQuote);
    });

    return () => unsubscribe();
  }, []);

  console.log(quote);

  const value = { quote, setQuote };

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
