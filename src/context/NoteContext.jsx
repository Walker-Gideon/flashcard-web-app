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
    default:
      return state;
  }
}

function NoteProvider({ children }) {
  const [{ activeBtn }, dispatch] = useReducer(reducer, initialState);
  const [createNote, setCreateNote] = useState(false);
  const [displayCreatedNote, setDisplayCreatedNote] = useState(false);
  const [addNoteTitle, setAddNoteTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const [selectedText, setSelectedText] = useState({
    start: 0,
    end: 0,
    text: "",
  });

  // Function to apply formatting to selected text
  const applyFormatting = (formatType) => {
    if (!selectedText.text) return;

    const { start, end, text } = selectedText;
    let formattedText = text;

    switch (formatType) {
      case "bold":
        formattedText = `**${text}**`;
        break;
      case "italic":
        formattedText = `*${text}*`;
        break;
      case "underline":
        formattedText = `__${text}__`;
        break;
      case "h1":
        formattedText = `# ${text}`;
        break;
      case "h2":
        formattedText = `## ${text}`;
        break;
      default:
        return;
    }

    // Update content with formatted text
    const newContent =
      content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);

    // Clear selection
    setSelectedText({ start: 0, end: 0, text: "" });

    // Update active button
    dispatch({ type: "APPLY_FORMATTING", payload: formatType });
  };

  // Function to clear text selection
  const clearSelection = () => {
    setSelectedText({ start: 0, end: 0, text: "" });
  };

  const value = {
    createNote,
    setCreateNote,
    title,
    setTitle,
    content,
    setContent,
    activeBtn,
    dispatch,
    isSubmittingNote,
    setIsSubmittingNote,
    addNoteTitle,
    setAddNoteTitle,
    displayCreatedNote,
    setDisplayCreatedNote,
    selectedText,
    setSelectedText,
    applyFormatting,
    clearSelection,
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
