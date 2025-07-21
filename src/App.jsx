import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoaderProvider } from "./context/LoaderContext";
import LandingPage from "./features/home/LandingPage";
import AuthLayout from "./features/auth/AuthLayout";
import Login from "./features/auth/Login";
import Singup from "./features/auth/Singup";
import { signUpAction } from "./services/actions/signUpAction";
import ForgetAuthPassword from "./features/auth/ForgetAuthPassword";
import AuthPicture from "./features/auth/AuthPicture";
import AppLayout from "./AppLayout";
import DashboardLayout from "./features/dashboard/DashboardLayout";
import NoteLayout from "./features/note/NoteLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/accounts",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Singup />,
        action: signUpAction,
      },
      {
        path: "forgotten",
        element: <ForgetAuthPassword />,
      },
      {
        path: "user",
        element: <AuthPicture />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardLayout />,
      },
      {
        path: "notes",
        element: <NoteLayout />,
      },
    ],
  },
]);

export default function App() {
  return (
    <LoaderProvider>
      <RouterProvider router={router} />
    </LoaderProvider>
  );
}
