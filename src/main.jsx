import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { NoteProvider } from "./context/NoteContext.jsx";
import { NavigateProvider } from "./context/NavigateContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { LoaderProvider } from "./context/LoaderContext.jsx";
import { FlashcardProvider } from "./context/FlashcardContext.jsx";
import { ChatProvider } from "./context/ChatContext.jsx";
import { GeneralProvider } from "./context/GeneralContext.jsx";

createRoot(document.getElementById("root")).render(
  <GeneralProvider>
    <ChatProvider>
      <FlashcardProvider>
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
      </FlashcardProvider>
    </ChatProvider>
  </GeneralProvider>,
);
