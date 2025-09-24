import { useState } from "react";
//import axios from "axios";
import "../styles/event-form.css";
import eventService from "../services/events";


const EventForm = () => {
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [newEventOrganizer, setNewEventOrganizer] = useState<string>("");
  const [newEventEmail, setNewEventEmail] = useState<string>("");
  const [newEventDescription, setNewEventDescription] = useState<string>("");
  const [newEventSport, setNewEventSport] = useState<string>("");
  const [newEventLocation, setNewEventLocation] = useState<string>("");
  const [newEventMinimumBet, setNewEventMinimumBet] = useState<number>(0);
  const [newEventDate, setNewEventDate] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEvent = {
      title: newEventTitle,
      organizer: newEventOrganizer,
      email: newEventEmail,
      description: newEventDescription,
      sport: newEventSport,
      location: newEventLocation,
      date: new Date(newEventDate).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: null,
      stars: 0,
      minBet: newEventMinimumBet,
      pool: 0,
      betsCount: 0,
    };

    eventService.createEvent(newEvent);

    setNewEventTitle("");
    setNewEventOrganizer("");
    setNewEventEmail("");
    setNewEventDescription("");
    setNewEventSport("");
    setNewEventLocation("");
    setNewEventMinimumBet(0);
    setNewEventDate("");
  };

  const handleEventTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewEventTitle(event.target.value);
  };

  const handleEventOrganizerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewEventOrganizer(event.target.value);
  };

  const handleEventEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewEventEmail(event.target.value);
  };

  const handleEventDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNewEventDescription(event.target.value);
  };

  const handleEventSportChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewEventSport(event.target.value);
  };

  const handleEventLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewEventLocation(event.target.value);
  };

  const handleEventMinimumBetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewEventMinimumBet(Number(event.target.value));
  };

  const handleEventDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewEventDate(event.target.value);
  };

  return (
    <div className="main-container">
      <h1>Crear un nuevo evento</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <label className="form-inline">Title: <input
          type="text"
          value={newEventTitle}
          placeholder="Type the title"
          onChange={handleEventTitleChange}
        />
        </label>
        <label className="form-inline">Organizer: <input
          type="text"
          value={newEventOrganizer}
          placeholder="Type the organizer's name"
          onChange={handleEventOrganizerChange}
        />
        </label>
        <label className="form-inline">Email: <input
          type="text"
          value={newEventEmail}
          placeholder="Type the organizer's email"
          onChange={handleEventEmailChange}
          />
        </label>
        <label>Description:</label>
        <textarea
          value={newEventDescription}
          placeholder="Describe the event"
          rows={10}
          cols={40}
          onChange={handleEventDescriptionChange}
          />
        <label className="form-inline">Sport: <input
          type="text"
          value={newEventSport}
          placeholder="Type the event sport"
          onChange={handleEventSportChange}
          />
        </label>
        <label className="form-inline">Location: <input
          type="text"
          value={newEventLocation}
          placeholder="Type the event location"
          onChange={handleEventLocationChange}
          />
        </label>
        <label className="form-inline">Date of the event: <input
          type="date"
          value={newEventDate}
          onChange={handleEventDateChange}
          required
          />
        </label>
        <label className="form-inline">Minimum Bet: <input
          type="number"
          value={newEventMinimumBet}
          placeholder="Type the minimum bet"
          onChange={handleEventMinimumBetChange}
          />
        </label>
        <button type="submit">Publish event</button>
      </form>
    </div>
  )
}

export default EventForm;

//const starButton = (e_id: number) => <><button onClick={() => addStar(e_id)</>
//}