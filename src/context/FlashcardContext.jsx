import { createContext, useContext, useMemo, useState } from "react";

const FlashcardContext = createContext();

function FlashcardProvider({ children }) {
  const [showCreateFlashcard, setShowCreateFlashcard] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [loadingCard, setLoadingCard] = useState(false);
  const [tags, setTags] = useState("");
  const [pairs, setPairs] = useState([
    { term: "", definition: "" },
    { term: "", definition: "" },
  ]);

  // Display the created flashcard
  const [displayCreatedFlashcard, setDisplayCreatedFlashcard] = useState([]);

  const [successFlashcard, setSuccessFlashcard] = useState(false);

  const MAX_PAIRS = 100;

  const value = useMemo(
    () => ({
      showCreateFlashcard,
      setShowCreateFlashcard,
      showPreview,
      setShowPreview,
      pairs,
      setPairs,
      tags,
      setTags,
      MAX_PAIRS,
      loadingCard,
      setLoadingCard,
      successFlashcard,
      setSuccessFlashcard,
      displayCreatedFlashcard,
      setDisplayCreatedFlashcard,
    }),
    [
      showCreateFlashcard,
      showPreview,
      pairs,
      tags,
      loadingCard,
      successFlashcard,
      displayCreatedFlashcard,
    ],
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
