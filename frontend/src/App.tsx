
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useAuthStore } from "./store/authStore";
import NavigationBar from "./components/Navbar";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import EventPage from "./components/EventPage";
import UserPage from "./pages/Profile";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Ranking from "./pages/Ranking";
import HomePage from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const user = useAuthStore((state) => state.user);
  const restoreLogin = useAuthStore((state) => state.restoreLogin);
  useEffect(() => {
    restoreLogin();
  }, [restoreLogin]);
    return (
      <Router>
        <Routes>

          <NavigationBar />

          {/* --- RUTAS PÚBLICAS --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/event-list" element={<EventList />} />
          <Route path="/event-page/:id" element={<EventPage />} />
          <Route path="/ranking" element={<Ranking />} />

          {/* --- RUTAS DE AUTH  --- */}
          {/* Si ya existe 'user', redirige al Home ("/") */}
          <Route 
            path="/login" 
            element={!user ? <LoginPage /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/register" 
            element={!user ? <RegisterPage /> : <Navigate to="/" replace />} 
          />

          {/* --- RUTAS PROTEGIDAS (Requieren Login) --- */}
          <Route element={<ProtectedRoute />}>
            <Route path="/me" element={<UserPage />} />
            <Route path="/event-form" element={<EventForm />} />
            <Route path="/event/:eventId" element={<EventForm />} />
          </Route>

          {/* Ruta por defecto (404) -> Redirigir al inicio */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

      </Router>
    )
}

export default App;
