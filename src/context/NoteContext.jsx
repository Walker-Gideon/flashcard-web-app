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
  });

  // This will check is the user naw to display already created note
  const [hasNotes, setHasNotes] = useState(false);
  const [readAlredyNote, setReadAlredyNote] = useState(false);

  // for notify the note on delete
  const [noteNotify, setNoteNotify] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  /*
  // Rich text functionality
  const [selectedText, setSelectedText] = useState({
    start: 0,
    end: 0,
    text: "",
  });
  const [textareaRef, setTextareaRef] = useState(null);

  // Function to get current cursor position
  const getCursorPosition = () => {
    if (!textareaRef) return { start: 0, end: 0 };
    return {
      start: textareaRef.selectionStart,
      end: textareaRef.selectionEnd,
    };
  };

  // Function to apply rich text formatting
  const applyRichTextFormatting = (formatType) => {
    if (!textareaRef) return;

    const { start, end } = getCursorPosition();
    const selectedText = content.substring(start, end);

    let formattedText = "";
    let newCursorStart = start;
    let newCursorEnd = end;

    switch (formatType) {
      case "h1":
        if (selectedText) {
          formattedText = `<h1 class="text-2xl font-bold mb-2">${selectedText}</h1>`;
          newCursorStart = start + formattedText.length;
          newCursorEnd = newCursorStart;
        } else {
          formattedText = `<h1 class="text-2xl font-bold mb-2">Heading 1</h1>`;
          newCursorStart = start + formattedText.indexOf(">") + 1;
          newCursorEnd = start + formattedText.length - 6; // exclude </h1>
        }
        break;

      case "h2":
        if (selectedText) {
          formattedText = `<h2 class="text-xl font-semibold mb-2">${selectedText}</h2>`;
          newCursorStart = start + formattedText.length;
          newCursorEnd = newCursorStart;
        } else {
          formattedText = `<h2 class="text-xl font-semibold mb-2">Heading 2</h2>`;
          newCursorStart = start + formattedText.indexOf(">") + 1;
          newCursorEnd = start + formattedText.length - 6; // exclude </h2>
        }
        break;

      case "bold":
        if (selectedText) {
          formattedText = `<strong class="font-bold">${selectedText}</strong>`;
          newCursorStart = start + formattedText.length;
          newCursorEnd = newCursorStart;
        } else {
          formattedText = `<strong class="font-bold">Bold text</strong>`;
          newCursorStart = start + formattedText.indexOf(">") + 1;
          newCursorEnd = start + formattedText.length - 9; // exclude </strong>
        }
        break;

      case "italic":
        if (selectedText) {
          formattedText = `<em class="italic">${selectedText}</em>`;
          newCursorStart = start + formattedText.length;
          newCursorEnd = newCursorStart;
        } else {
          formattedText = `<em class="italic">Italic text</em>`;
          newCursorStart = start + formattedText.indexOf(">") + 1;
          newCursorEnd = start + formattedText.length - 5; // exclude </em>
        }
        break;

      case "underline":
        if (selectedText) {
          formattedText = `<u class="underline">${selectedText}</u>`;
          newCursorStart = start + formattedText.length;
          newCursorEnd = newCursorStart;
        } else {
          formattedText = `<u class="underline">Underlined text</u>`;
          newCursorStart = start + formattedText.indexOf(">") + 1;
          newCursorEnd = start + formattedText.length - 4; // exclude </u>
        }
        break;

      default:
        return;
    }

    // Update content with formatted text
    const newContent =
      content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);

    // Set cursor position after formatting
    setTimeout(() => {
      if (textareaRef) {
        textareaRef.setSelectionRange(newCursorStart, newCursorEnd);
        textareaRef.focus();
      }
    }, 0);

    // Visual feedback
    dispatch({ type: "SET_ACTIVE_BUTTON", payload: formatType });
    setTimeout(() => {
      dispatch({ type: "CLEAR_ACTIVE_BUTTON" });
    }, 500);
  };

  // Function to handle keyboard shortcuts
  const handleKeyboardShortcut = (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case "b":
          e.preventDefault();
          applyRichTextFormatting("bold");
          break;
        case "i":
          e.preventDefault();
          applyRichTextFormatting("italic");
          break;
        case "u":
          e.preventDefault();
          applyRichTextFormatting("underline");
          break;
        case "1":
          if (e.shiftKey) {
            e.preventDefault();
            applyRichTextFormatting("h1");
          }
          break;
        case "2":
          if (e.shiftKey) {
            e.preventDefault();
            applyRichTextFormatting("h2");
          }
          break;
      }
    }
  };

  // Function to track text selection
  const handleTextSelection = (e) => {
    const textarea = e.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    if (selectedText) {
      setSelectedText({
        start,
        end,
        text: selectedText,
      });
    } else {
      setSelectedText({ start: 0, end: 0, text: "" });
    }
  };
  */

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

    /*
    // Rich text functionality
    selectedText,
    setSelectedText,
    textareaRef,
    setTextareaRef,
    applyRichTextFormatting,
    handleKeyboardShortcut,
    handleTextSelection,
    */
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
