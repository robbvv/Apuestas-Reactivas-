
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
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
    return (
      <Router>

        <NavigationBar />

        <Routes>
          <Route
            path="/"
            element={ <HomePage /> }
          />  
          <Route
            path="/event/:eventId"
            element={ <EventForm /> }
          />
          <Route
            path="/event-list"
            element={ <EventList /> }
          />
          <Route
            path= "/event-page/:id"
            element={ <EventPage />}
          />
          <Route
            path= "/me"
            element={ <UserPage /> }
          />
          <Route
            path="/event-form"
            element={ <EventForm /> }
          />
          <Route
            path="/login"
            element={ <LoginPage /> }
          />     
          <Route
            path="/register"
            element={ <RegisterPage /> }
          />
          <Route
            path="/ranking"
            element={ <Ranking /> }
          />      
        </Routes>

      </Router>
    )
}

export default App;
