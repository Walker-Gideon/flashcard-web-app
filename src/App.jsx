import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoaderProvider } from "./context/LoaderContext";
import LandingPage from "./features/home/LandingPage";
import AuthLayout from "./features/auth/AuthLayout";
import Login from "./features/auth/Login";
import { loginAction } from "./services/actions/loginAction";
import Singup from "./features/auth/Singup";
import { signUpAction } from "./services/actions/signUpAction";
import ForgetAuthPassword from "./features/auth/ForgetAuthPassword";
import AppLayout from "./AppLayout";
import DashboardLayout from "./features/dashboard/DashboardLayout";
import NoteLayout from "./features/note/NoteLayout";
import { noteAction } from "./services/actions/noteAction";
import FlashcardLayout from "./features/flashcard/FlashcardLayout";
import SchedulesLayout from "./features/schedules/SchedulesLayout";
import InspireLayout from "./features/inspire/InspireLayout";
import SettingsLayout from "./features/settings/SettingsLayout";
import { NavigateProvider } from "./context/NavigateContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { NoteProvider } from "./context/NoteContext";
import Verify from "./ui/Verify";
import { forgetPasswordAction } from "./services/actions/forgetPasswordAction";
import AuthRedirectRoute from "./utils/AuthRedirectRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    element: <AuthRedirectRoute />,
    children: [
      {
        path: "/accounts",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
            action: loginAction,
          },
          {
            path: "signup",
            element: <Singup />,
            action: signUpAction,
          },
          {
            path: "forgotten",
            element: <ForgetAuthPassword />,
            action: forgetPasswordAction,
          },
        ],
      },
    ],
  },
  {
    // ProtectedRoute
    element: <AuthRedirectRoute />,
    children: [
      {
        path: "verify",
        element: <Verify />,
      },
      {
        path: "dashboard",
        //(
        element: (
          // <AuthRedirectRoute>
          <AppLayout />
        ),
        // </AuthRedirectRoute>
        // ),
        children: [
          {
            index: true,
            element: <DashboardLayout />,
          },
          {
            path: "notes",
            element: <NoteLayout />,
            action: noteAction,
          },
          {
            path: "flashcards",
            element: <FlashcardLayout />,
          },
          {
            path: "schedules",
            element: <SchedulesLayout />,
          },
          {
            path: "inspire",
            element: <InspireLayout />,
          },
          {
            path: "settings",
            element: <SettingsLayout />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <NoteProvider>
      <NavigateProvider>
        <AuthProvider>
          <LoaderProvider>
            <RouterProvider router={router} />
          </LoaderProvider>
        </AuthProvider>
      </NavigateProvider>
    </NoteProvider>
  );
}

/*
In your user display components
Will use this later
const displayName = user.displayName || user.email.split('@')[0];
const avatarUrl = user.photoURL || '/default-avatar.png'; // or use initials
*/
