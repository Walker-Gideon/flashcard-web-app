import { createContext, useContext, useReducer, useState } from "react";

const NoteContext = createContext();
const initialState = {
  activeBtn: "h1",
};

function reducer(state, action) {
  switch (action.type) {
    case "SHOW_NORMAL_SIZE":
      return { activeBtn: "h1" };
    case "SHOW_INCREASE_SIZE":
      return { activeBtn: "h2" };
    case "SHOW_BOLD":
      return { activeBtn: "bold" };
    case "SHOW_UNDERLINE":
      return { activeBtn: "underline" };
    case "SHOW_ITALIC":
      return { activeBtn: "italic" };
    case "SET_ACTIVE_BUTTON":
      return { activeBtn: action.payload };
    case "CLEAR_ACTIVE_BUTTON":
      return { activeBtn: null };
    default:
      return state;
  }
}

function NoteProvider({ children }) {
  const [{ activeBtn }, dispatch] = useReducer(reducer, initialState);
  const [createNote, setCreateNote] = useState(false);
  const [addNoteTitle, setAddNoteTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [noteName, setNoteName] = useState("");
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [query, setQuery] = useState("");
  const [currentNote, setCurrentNote] = useState({
    id: "", // Firebase doc ID
    title: "", // Note title
    content: "", // Note content
    noteName: "",
  });
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  // This will check is the user naw to display already created note
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
    activeBtn,
    dispatch,
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
