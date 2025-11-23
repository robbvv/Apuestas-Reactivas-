import eventService from "../services/events";
import type { EventData } from '../types/event';
import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import "../styles/event-page.css";
import { useAuthStore } from "../store/authStore";

const EventPage = () => {
  const { id } = useParams();
  const { user, restoreLogin } = useAuthStore();
  const [event, setEvent] = useState<EventData | null>(null);
  const [newBetOption, setNewBetOption] = useState<string>("");
  const [newBetAmount, setNewBetAmount] = useState<number>(0);
  
  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      const data = await eventService.getById(id);
      setEvent(data);
      setNewBetAmount(data.minBet)

      restoreLogin();
    };
    fetchEvent();
  }, [id])

  const isOwner = user?.id === event?.owner.id;

  if (!event) return (<p>LOADING USER</p>)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    const updatedEvent = await eventService.betOnEvent(id, newBetOption, newBetAmount);
    setEvent(updatedEvent);
    setNewBetOption("");
    setNewBetAmount(event.minBet);
  };

  const handleBetOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewBetOption(event.target.value);
  };

  const handleBetAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBetAmount(Number(event.target.value));
  };

  const stateText = event.status === "open" ? "upcoming" : event.status === "locked" ? "in progress" : "finished";
  const stateColor = event.status === "open" ? "green" : event.status === "locked" ? "yellow" : "red";
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
    {!user && (
      <div className="event-bet-form-container">
        <label> Options: 
          <select value={newBetOption} onChange={handleBetOptionChange}>
            <option value="">-- Options of the bet --</option>
            {event.options.map((opt) => (
              <option key={opt.name} value={opt.name}>
                {opt.name} (payout: {opt.payout})
              </option>
            ))}
          </select>
        </label>
      </div>
    )}
    {user && !isOwner && (
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
    )}
    {user && isOwner && (
      <div>
        <h3>Owner settings:</h3>
        {status === "open" && (
          <div>
            Betting is currently active.
            If you want to stop new bets, change to a locked state:
            <button>Lock betting</button>
          </div>
        )}
        {status === "closed" && (
          <div>
            Betting is currently active.
            If you want to stop new bets, change to a locked state:
            <button>Lock betting</button>
          </div>
        )}
        {status === "open" && (
          <div>
            Betting is currently active.
            If you want to stop new bets, change to a locked state:
            <button>Lock betting</button>
          </div>
        )}

      </div>
    )}
  </div>
)};

export default EventPage;