import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoaderProvider } from "./context/LoaderContext";
import LandingPage from "./features/home/LandingPage";
import AuthLayout from "./features/auth/AuthLayout";
import Login from "./features/auth/Login";
import Singup, { action as signupAction } from "./features/auth/Singup";
import ForgetAuthPassword from "./features/auth/ForgetAuthPassword";
import AuthPicture from "./features/auth/AuthPicture";

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
        action: signupAction,
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
]);

export default function App() {
  return (
    <LoaderProvider>
      <RouterProvider router={router} />;
    </LoaderProvider>
  );
}
