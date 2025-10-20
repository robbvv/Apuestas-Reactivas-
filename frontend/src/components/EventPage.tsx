import eventService from "../services/events";
import type { EventData } from '../types/event';
import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import "../styles/event-page.css";

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<EventData | null>(null);
  const [newBetOption, setNewBetOption] = useState<string>("");
  const [newBetAmount, setNewBetAmount] = useState<number>(0);
  
  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      const data = await eventService.getById(id);
      setEvent(data);
    };
    fetchEvent();
  }, [id])

  if (!event) return (<p>LOADING USER</p>)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    eventService.betEvent(id, newBetOption, newBetAmount);
    setNewBetOption("");
    setNewBetAmount(0);
  };

  const handleBetOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewBetOption(event.target.value);
  };

  const handleBetAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBetAmount(Number(event.target.value));
  };

  const isUpcoming = new Date(event.date) > new Date();
  const stateText = isUpcoming ? "upcoming" : "finished";
  const stateColor = isUpcoming ? "green" : "red";
  return (
  <div className="event-item">
    <div className="event-title">
      <b>{event.title}</b>
    </div>
    <div className="event-details">
      Sport: {event.sport} | Organizer: {event.organizer}
    </div>
    <div>
      Last Updated: {event.updatedAt ? new Date(event.updatedAt).toLocaleString() : "-"} | Created: {new Date(event.createdAt).toLocaleString()}
    </div>
    <div className="event-description">
      {event.description}
    </div>
    <div className="event-details2">
      Location: {event.location}
    </div>
    <div className="event-stats">
      Stars: [{event.stars}] | Pool: [{event.pool}] | Gamblers: [{event.betsCount}]
    </div>
    <div className="event-stats2">
      State: <span style={{ color: stateColor }}>{stateText}</span> {new Date(event.date).toLocaleString()}
    </div>
    <div className="event-bet-form-container">
      <form className="event-bet-form" onSubmit={handleSubmit}>
        <label> Options: 
          <select value={newBetOption} onChange={handleBetOptionChange}>
            <option value="">-- Select an option --</option>
            {event.options.map((opt) => (
              <option key={opt.name} value={opt.name}>
                {opt.name} (payout: {opt.payout})
              </option>
            ))}
          </select>
        </label>
        <label> Your bet: <input 
          type="number" 
          min={event.minBet}
          value={newBetAmount}
          placeholder="Type your bet"
          onChange={handleBetAmountChange}
          />
        </label>
        <button type="submit">Bet</button>
      </form>
    </div>
  </div>
)};

export default EventPage;