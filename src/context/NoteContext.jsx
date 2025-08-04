import { createContext, useContext, useReducer, useState } from "react";

const NoteContext = createContext();

const initialState = {
  activeBtn: null, // No default active button
};

function reducer(state, action) {
  switch (action.type) {
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
  const [displayCreatedNote, setDisplayCreatedNote] = useState(false);
  const [addNoteTitle, setAddNoteTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const [textareaRef, setTextareaRef] = useState(null);

  // Function to get current cursor position
  const getCursorPosition = () => {
    if (!textareaRef) return { start: 0, end: 0 };
    return {
      start: textareaRef.selectionStart,
      end: textareaRef.selectionEnd,
    };
  };

  // Function to insert text at cursor position
  const insertTextAtCursor = (textToInsert, selectInserted = false) => {
    if (!textareaRef) return;

    const { start, end } = getCursorPosition();
    const newContent =
      content.substring(0, start) + textToInsert + content.substring(end);

    setContent(newContent);

    // Set cursor position after the inserted text
    setTimeout(() => {
      if (selectInserted) {
        textareaRef.setSelectionRange(start, start + textToInsert.length);
      } else {
        textareaRef.setSelectionRange(
          start + textToInsert.length,
          start + textToInsert.length,
        );
      }
      textareaRef.focus();
    }, 0);
  };

  // Function to wrap selected text with formatting
  const wrapSelectedText = (prefix, suffix = prefix) => {
    if (!textareaRef) return;

    const { start, end } = getCursorPosition();
    const selectedText = content.substring(start, end);

    if (selectedText) {
      // Text is selected - wrap it
      const wrappedText = prefix + selectedText + suffix;
      const newContent =
        content.substring(0, start) + wrappedText + content.substring(end);

      setContent(newContent);

      // Select the wrapped text (excluding the formatting characters)
      setTimeout(() => {
        textareaRef.setSelectionRange(
          start + prefix.length,
          start + prefix.length + selectedText.length,
        );
        textareaRef.focus();
      }, 0);
    } else {
      // No text selected - insert formatting and place cursor between
      const wrappedText = prefix + suffix;
      insertTextAtCursor(wrappedText);

      // Place cursor between the formatting characters
      setTimeout(() => {
        textareaRef.setSelectionRange(
          start + prefix.length,
          start + prefix.length,
        );
        textareaRef.focus();
      }, 0);
    }
  };

  // Function to apply heading formatting
  const applyHeading = (level) => {
    if (!textareaRef) return;

    const { start } = getCursorPosition();

    // Find the start of the current line
    const lineStart = content.lastIndexOf("\n", start - 1) + 1;
    const lineEnd = content.indexOf("\n", start);
    const actualLineEnd = lineEnd === -1 ? content.length : lineEnd;

    const currentLine = content.substring(lineStart, actualLineEnd);

    // Remove existing heading markers
    const cleanLine = currentLine.replace(/^#{1,6}\s*/, "");

    // Add new heading marker
    const headingPrefix = "#".repeat(level) + " ";
    const newLine = headingPrefix + cleanLine;

    // Replace the line
    const newContent =
      content.substring(0, lineStart) +
      newLine +
      content.substring(actualLineEnd);
    setContent(newContent);

    // Set cursor at the end of the heading text
    setTimeout(() => {
      const newCursorPos = lineStart + newLine.length;
      textareaRef.setSelectionRange(newCursorPos, newCursorPos);
      textareaRef.focus();
    }, 0);

    // Set active button temporarily
    dispatch({ type: "SET_ACTIVE_BUTTON", payload: `h${level}` });
    setTimeout(() => {
      dispatch({ type: "CLEAR_ACTIVE_BUTTON" });
    }, 1000);
  };

  // Main formatting function
  const applyFormatting = (formatType) => {
    switch (formatType) {
      case "h1":
        applyHeading(1);
        break;
      case "h2":
        applyHeading(2);
        break;
      case "bold":
        wrapSelectedText("**");
        dispatch({ type: "SET_ACTIVE_BUTTON", payload: "bold" });
        setTimeout(() => dispatch({ type: "CLEAR_ACTIVE_BUTTON" }), 500);
        break;
      case "italic":
        wrapSelectedText("*");
        dispatch({ type: "SET_ACTIVE_BUTTON", payload: "italic" });
        setTimeout(() => dispatch({ type: "CLEAR_ACTIVE_BUTTON" }), 500);
        break;
      case "underline":
        wrapSelectedText("__");
        dispatch({ type: "SET_ACTIVE_BUTTON", payload: "underline" });
        setTimeout(() => dispatch({ type: "CLEAR_ACTIVE_BUTTON" }), 500);
        break;
      default:
        break;
    }
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
    applyFormatting,
    textareaRef,
    setTextareaRef,
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
