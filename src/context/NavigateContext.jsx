import { createContext, useContext, useMemo, useState } from "react";

const NavigateContext = createContext();

function NavigateProvider({ children }) {
  const [navShowOverLay, setNavShowOverLay] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [resize, setResize] = useState(false);
  const [navigateTitle, setNavigateTitle] = useState("Dashboard");
  const [showProfile, setShowProfile] = useState(false);

  const value = useMemo(
    () => ({
      navShowOverLay,
      setNavShowOverLay,
      showSidebar,
      setShowSidebar,
      resize,
      setResize,
      navigateTitle,
      setNavigateTitle,
      showProfile, 
      setShowProfile,
    }),
    [navShowOverLay, showSidebar, resize, navigateTitle, showProfile],
  );

  return (
    <NavigateContext.Provider value={value}>
      {children}
    </NavigateContext.Provider>
  );
}

function useNav() {
  const context = useContext(NavigateContext);

  if (context === undefined)
    throw new Error("NavigateContext was used outside of the NavigateProvider");

  return context;
}

export { NavigateProvider, useNav };
