import { createContext, useContext, useState } from "react";

const NoteContext = createContext();

function NoteProvider({ children }) {
  const [createNote, setCreateNote] = useState(false);
  const [addNoteTitle, setAddNoteTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("<p>Start...</p>");
  const [noteName, setNoteName] = useState("");
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [query, setQuery] = useState("");
  const [currentNote, setCurrentNote] = useState({
    id: "", 
    title: "", 
    content: "", 
    noteName: "",
  });
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  // This will check if the user want to display already created note
  const [hasNotes, setHasNotes] = useState(false);
  const [readAlredyNote, setReadAlredyNote] = useState(false);

  // for notify the note on delete
  const [noteNotify, setNoteNotify] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const value = {
    notes,
    setNotes,
    currentNote,
    setCurrentNote,
    createNote,
    setCreateNote,
    readAlredyNote,
    setReadAlredyNote,
    noteNotify,
    setNoteNotify,
    noteToDelete,
    setNoteToDelete,
    hasNotes,
    setHasNotes,
    filteredNotes,
    setFilteredNotes,
    selectedNoteId,
    setSelectedNoteId,
    query,
    setQuery,
    title,
    setTitle,
    content,
    setContent,
    noteName,
    setNoteName,
    isSubmittingNote,
    setIsSubmittingNote,
    addNoteTitle,
    setAddNoteTitle,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}

function useNote() {
  const context = useContext(NoteContext);

  if (context === undefined)
    throw new Error("NoteContext was used outside it Provider");

  return context;
}

export { NoteProvider, useNote };
