import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { UserData } from "../types/user";
import type { EventData } from "../types/event";
//import axios from "axios";
import "../styles/event-form.css";
import userService from "../services/user"
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
  const [newOptions, setNewOptions] = useState<{ name: string; payout: number }[]>([]);
  const [newOptionName, setNewOptionName] = useState("");
  const [newOptionPayout, setNewOptionPayout] = useState<number>(1);

  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const res = await userService.getUser();
        setUser(res);
      } catch (error) {
        navigate("/login");
      }
    }
    init();
  }, [])

  if (!user) return (<p>LOADING USER</p>)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const eventOwner: Partial<UserData> = {
      id: user.id,
      username: user.username,
    }

    const newEvent: Omit<EventData, "id"> = {
      owner: eventOwner,
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
      options: newOptions,
      participants: [],
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
    setNewOptions([]);
    setNewOptionName("");
    setNewOptionPayout(0);
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

  const handleAddOption = () => {
    if (!newOptionName || newOptionPayout <= 0) return;
    setNewOptions([...newOptions, { name: newOptionName, payout: newOptionPayout }]);
    setNewOptionName("");
    setNewOptionPayout(0);
  };

  const handleRemoveOption = (index: number) => {
    setNewOptions(newOptions.filter((_, i) => i !== index));
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
        <div className="options-container">
          <h3>Bet options</h3>
          <div className="form-inline">
            <input type="text" value={newOptionName} onChange={(e) => setNewOptionName(e.target.value)} placeholder="Option name" />
            <input type="number" min={1} step={0.1} value={newOptionPayout} onChange={(e) => setNewOptionPayout(Number(e.target.value))} placeholder="Payout" />
            <button type="button" onClick={handleAddOption}>Add option</button>
          </div>
          <ul>
            {newOptions.map((opt, index) => (
              <li key={index}>
                {opt.name} - {opt.payout} 
                <button type="button" onClick={() => handleRemoveOption(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Publish event</button>
      </form>
    </div>
  )
}

export default EventForm;

//const starButton = (e_id: number) => <><button onClick={() => addStar(e_id)</>
//}