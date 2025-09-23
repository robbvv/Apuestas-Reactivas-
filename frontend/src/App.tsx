import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import EventForm from "./components/EventForm";
import EventList from "./components/SingleEvent";
import './App.css';

const App = () => {
  const padding = {padding: 10};

    return (
      <Router>
        <div>
          <Link style={padding} to="/">Home</Link>
          <Link style={padding} to="/event-form">Event List</Link>
          <Link style={padding} to="/event-list">Event Form</Link>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
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
