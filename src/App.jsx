import { Routes, Route } from "react-router-dom";
import LandingPage from "./features/home/LandingPage";
import AuthLayout from "./features/auth/AuthLayout";
import Login from "./features/auth/Login";
import Singup from "./features/auth/Singup";
import ForgetAuthPassword from "./features/auth/ForgetAuthPassword";
import AppLayout from "./AppLayout";
import DashboardLayout from "./features/dashboard/DashboardLayout";
import NoteLayout from "./features/note/NoteLayout";
import FlashcardLayout from "./features/flashcard/FlashcardLayout";
import SchedulesLayout from "./features/schedules/SchedulesLayout";
import InspireLayout from "./features/inspire/InspireLayout";
import SettingsLayout from "./features/settings/SettingsLayout";
import ProtectedRoute from "./utils/ProtectedRoute";
import Verify from "./ui/Verify";
import AuthRedirectRoute from "./utils/AuthRedirectRoute";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/accounts"
        element={
          <AuthRedirectRoute isAuthenticated={isAuthenticated}>
            <AuthLayout />
          </AuthRedirectRoute>
        }
      >
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Singup />} />
        <Route path="forgotten" element={<ForgetAuthPassword />} />
      </Route>

      <Route path="/verify" element={<Verify />} />

      <Route
        path="/dashboard"
        element={
          <AuthRedirectRoute isAuthenticated={isAuthenticated}>
            <AppLayout />
          </AuthRedirectRoute>
        }
      >
        <Route index="true" element={<DashboardLayout />} />
        <Route path="notes" element={<NoteLayout />} />
        <Route path="flashcards" element={<FlashcardLayout />} />
        <Route path="schedules" element={<SchedulesLayout />} />
        <Route path="inspire" element={<InspireLayout />} />
        <Route path="settings" element={<SettingsLayout />} />
      </Route>
    </Routes>
  );
}
