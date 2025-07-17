import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./features/home/LandingPage";
import AuthLayout from "./features/auth/AuthLayout";
import Login from "./features/auth/Login";
import Singup from "./features/auth/Singup";
import { LoaderProvider } from "./context/LoaderContext";
import ForgetAuthPassword from "./features/auth/ForgetAuthPassword";

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
      {
        path: "forgotten",
        element: <ForgetAuthPassword />,
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
