import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { NoteProvider } from "./context/NoteContext.jsx";
import { NavigateProvider } from "./context/NavigateContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { LoaderProvider } from "./context/LoaderContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NoteProvider>
      <NavigateProvider>
        <AuthProvider>
          <LoaderProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </LoaderProvider>
        </AuthProvider>
      </NavigateProvider>
    </NoteProvider>
  </StrictMode>,
);
