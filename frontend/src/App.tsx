import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//import Home from "./components/Home";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import EventPage from "./components/EventPage";
import UserPage from "./components/UserPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import './App.css';

const App = () => {
  const padding = {padding: 10};

    return (
      <Router>
        <div>
          <Link style={padding} to="/">Home</Link>
          <Link style={padding} to="/event-list">Ver eventos</Link>
          <Link style={padding} to="/event-form">Nuevo evento</Link>
          <Link style={padding} to="/me">Ver Perfil</Link>
          <Link style={padding} to="/login">Login</Link>
          <Link style={padding} to="/register">Registrarse</Link>
        </div>

        <Routes>
          
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
        </Routes>

      </Router>
    )
}

export default App;
