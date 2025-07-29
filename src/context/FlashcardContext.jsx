import { createContext, useContext, useMemo, useState } from "react";

const FlashcardContext = createContext();

function FlashcardProvider({ children }) {
  const [showCreateFlashcard, setShowCreateFlashcard] = useState();

  const value = useMemo(
    () => ({ showCreateFlashcard, setShowCreateFlashcard }),
    [showCreateFlashcard],
  );

  return (
    <FlashcardContext.Provider value={value}>
      {children}
    </FlashcardContext.Provider>
  );
}

function useFlash() {
  const context = useContext(FlashcardContext);

  if (context === undefined)
    throw new Error("FlashcardContext was called outside of it Provvifer");

  return context;
}

export { FlashcardProvider, useFlash };
