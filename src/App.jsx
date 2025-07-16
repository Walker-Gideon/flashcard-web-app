import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./features/home/LandingPage";
import AuthLayout from "./features/auth/AuthLayout";
import Login from "./features/auth/Login";
import Singup from "./features/auth/Singup";
import { LoaderProvider } from "./context/LoaderContext";

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
      },
    ],
  },
]);

export default function App() {
  return (
    <LoaderProvider>
      <RouterProvider router={router} />;
    </LoaderProvider>
  );
}
