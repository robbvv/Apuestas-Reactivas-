import type { EventData } from "../types/event";
import "../styles/event-list.css";

interface EventProp {
  event: EventData;
}

const borderStyle = {
  border: "1px solid gray",
  padding: "8px",
  margin: "5px 0"
};

const Event = ({ event: event }: EventProp) => (
  <div className="event-item">
    <div className="event-title">
    Title: {event.title}
    </div>
    <div className="event-details">
    Sport: {event.sport} | Organizer: {event.organizer} | Last Updated: {event.updatedAt ? new Date(event.updatedAt).toLocaleString() : new Date(event.createdAt).toLocaleString()}
    </div>
    <div className="event-stats">
    Stars: [{event.stars}] | Pool: [{event.pool}] | State: {event.active ? "upcoming" : "finished"}
    </div>
  </div>
)

export default Event;
