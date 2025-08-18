import { createContext, useContext } from "react";

const GeneralContext = createContext();

function GeneralProvider({ children }) {
  const value = {};
  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  );
}

function useGen() {
  const context = useContext(GeneralContext);

  if (context === undefined)
    throw new Error("GeneralContext was used outside of it provider");

  return context;
}

export { GeneralProvider, useGen };
