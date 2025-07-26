import { createContext, useContext, useState } from "react";

const NoteContext = createContext();

function NoteProvider({ children }) {
  const [createNote, setCreateNote] = useState();

  const value = { createNote, setCreateNote };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}

function useNote() {
  const context = useContext(NoteContext);

  if (context === undefined)
    throw new Error("NoteContext was used outside it Provider");

  return context;
}

export { NoteProvider, useNote };
