import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//import Home from "./components/Home";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import './App.css';

const App = () => {
  const padding = {padding: 10};

    return (
      <Router>
        <div>
          <Link style={padding} to="/">Home</Link>
          <Link style={padding} to="/event-list">Ver eventos</Link>
          <Link style={padding} to="/event-form">Nuevo evento</Link>
        </div>

        <Routes>
          
          <Route
            path="/event-form"
            element={ <EventForm /> }
          />
          <Route
            path="/event-list"
            element={ <EventList /> }
          />          
        </Routes>

      </Router>
    )
}

export default App;
