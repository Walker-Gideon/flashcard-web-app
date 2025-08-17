import { createContext, useContext, useState } from "react";

const FlashcardContext = createContext();

function FlashcardProvider({ children }) {
  const [showCreateFlashcard, setShowCreateFlashcard] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [loadingCard, setLoadingCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [tags, setTags] = useState("");
  const [queryFlashcard, setQueryFlashcard] = useState("");
  const [pairs, setPairs] = useState([
    { term: "", definition: "" },
    { term: "", definition: "" },
  ]);

  // For currently reading flashcard
  const [currentFlashcard, setCurrentFlashcard] = useState({
    id: "",
    tags: "",
    pairs: [],
    createdAt: null,
  });

  // For newly created flashcard
  const [newlyFlashcard, setNewlyFlashcard] = useState({
    id: "",
    tags: "",
    pairs: [],
    createdAt: null,
  });

  // for notify the note on delete
  const [flashcardNotify, setFlashcardNotify] = useState(false);
  const [flashcardToDelete, setFlashcardToDelete] = useState(null);

  // Display the created flashcard
  const [displayCreatedFlashcard, setDisplayCreatedFlashcard] = useState([]);
  const [filteredFlashcard, setFilteredFlashcard] = useState([]);

  // This will check if the user want to display already created flashcard
  const [readAlredyFlashcard, setReadAlredyFlashcard] = useState(false);

  // Editing flashcard
  const [editFlashcardData, SetEditFlashcardData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editTags, setEditTags] = useState("");
  const [editPairs, setEditPairs] = useState([]);
  const [editFlashcardId, setEditFlashcardId] = useState("");
  console.log("edit data is ", editFlashcardData);

  const MAX_PAIRS = 100;

  const value = {
    editFlashcardId,
    setEditFlashcardId,
    editPairs,
    setEditPairs,
    editMode,
    setEditMode,
    editTags,
    setEditTags,
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
    displayCreatedFlashcard,
    setDisplayCreatedFlashcard,
    queryFlashcard,
    setQueryFlashcard,
    filteredFlashcard,
    setFilteredFlashcard,
    selectedCard,
    setSelectedCard,
    currentFlashcard,
    setCurrentFlashcard,
    readAlredyFlashcard,
    setReadAlredyFlashcard,
    flashcardToDelete,
    setFlashcardToDelete,
    flashcardNotify,
    setFlashcardNotify,
    newlyFlashcard,
    setNewlyFlashcard,
    editFlashcardData,
    SetEditFlashcardData,
  };

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
