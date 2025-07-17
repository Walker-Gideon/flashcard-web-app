import { createContext, useContext, useMemo, useState } from "react";

const LoaderContext = createContext();

function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [toast, setToast] = useState(false);
  const [image, setImage] = useState(null);

  const value = useMemo(
    () => ({
      loading,
      setLoading,
      image,
      setImage,
      spinner,
      setSpinner,
      toast,
      setToast,
    }),
    [loading, image, spinner, toast],
  );

  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
}

function useLoader() {
  const context = useContext(LoaderContext);

  if (context === undefined)
    throw new Error("LoaderContext was used outside of the LoaderProvider");

  return context;
}

export { LoaderProvider, useLoader };
