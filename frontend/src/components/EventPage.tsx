import eventService from "../services/events";
import type { EventData } from '../types/event';
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/event-page.css";

interface EventProp {
  event: EventData;
}

const handleSubmit = (e: React.FormEvent) => {
//  e.preventDefault();
//
//  const new. = {
//    .: new.,
//  };
//
//  eventService.create.(new.);
//
//  setNew.
};

const EventPage = () => {
  const { id } = useParams<{ id: string }>();
  const [eventState, setEvent] = useState<EventData>();

  const fetchEvent = async () => {
    const events = await eventService.getAllEvents();
    setEvent(events.find(e => e.id === Number(id)));
  };

  fetchEvent();

  const event = eventState!

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
        <input type="number" min={event.minBet}/>
        <button type="submit">Bet</button>
      </form>
    </div>
  </div>
)}

export default EventPage;