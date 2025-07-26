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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const value = {
    createNote,
    setCreateNote,
    title,
    setTitle,
    content,
    setContent,
    activeBtn,
    dispatch,
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
