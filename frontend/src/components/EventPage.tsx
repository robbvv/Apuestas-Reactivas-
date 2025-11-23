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
  const [winningOption, setWinningOption] = useState<string>("");
  
  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      const data = await eventService.getById(id);
      setEvent(data);
      setNewBetAmount(data.minBet)

      restoreLogin();
    };
    fetchEvent();
  }, [id, user])

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

  const handleLockEvent = async () => {
    if (!id) return;
    const updated = await eventService.changeBetStatus(id, "locked", null);
    setEvent(updated);
  };

  const handleResolveEvent = async () => {
    if (!id || !winningOption) return;
    const updated = await eventService.changeBetStatus(id, "resolved", winningOption);
    setEvent(updated);
    setWinningOption("");
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
      <div>
        {event.status === "open" && ( 
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
        {event.status === "locked" && (
          <div className="locked-message">
            <h3>Betting Closed</h3>
            <p>This event is now <strong>locked</strong>. No more bets can be placed.</p>
            <p>Stay tuned! The organizer will announce the winner soon.</p>
          </div>
        )}
        {event.status === "resolved" && (
          <div className="resolved-message">
            <h3>🏆 Winner</h3>
            <p>The winning option is: <strong>{event.winningOption}</strong></p>
          </div>
        )}
      </div>
    )}
    {user && isOwner && (
      <div>
        <h3>Owner settings:</h3>

        {event.status === "open" && (
          <div>
            <p>Betting is currently <strong>open</strong> — users can still place bets.</p>
            <p>If you're ready to stop new bets:</p>
            <button onClick={handleLockEvent}>Lock betting</button>
          </div>
        )}

        {event.status === "locked" && (
          <div>
            <p>Betting is <strong>locked</strong> — no more bets allowed.</p>
            <p>Once you know the result, select a winner:</p>
            <select
              value={winningOption}
              onChange={(e) => setWinningOption(e.target.value)}
            >
              <option value="">-- Choose a winner --</option>
              {event.options.map((opt) => (
                <option key={opt.name} value={opt.name}>
                  {opt.name}
                </option>
              ))}
            </select>

            <button disabled={!winningOption} onClick={handleResolveEvent}>
              Resolve event
            </button>
          </div>
        )}

        {event.status === "resolved" && (
          <div>
            <p>This bet has been <strong>resolved</strong>.</p>
            <p>The winner was: {event.winningOption}</p>
            <p>Nothing else to manage here</p>
          </div>
        )}
      </div>
    )}
  </div>
)};

export default EventPage;