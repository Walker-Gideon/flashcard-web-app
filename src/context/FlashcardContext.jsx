import { createContext, useContext, useMemo, useState } from "react";

const FlashcardContext = createContext();

function FlashcardProvider({ children }) {
  const [showCreateFlashcard, setShowCreateFlashcard] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const value = useMemo(
    () => ({
      showCreateFlashcard,
      setShowCreateFlashcard,
      showPreview,
      setShowPreview,
    }),
    [showCreateFlashcard, showPreview],
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
