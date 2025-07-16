import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./features/home/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
