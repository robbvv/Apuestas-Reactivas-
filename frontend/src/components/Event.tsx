import type { EventData } from "../types/event";
import "../styles/event-list.css";

interface EventProp {
  event: EventData;
}

const Event = ({ event: event }: EventProp) => (
  <div className="event-item">
    <div className="event-title">
    <b>{event.title}</b>
    </div>
    <div className="event-details">
    Sport: {event.sport} | Organizer: {event.organizer} | Last Updated: {event.updatedAt ? new Date(event.updatedAt).toLocaleString() : new Date(event.createdAt).toLocaleString()}
    </div>
    <div className="event-stats">
    Stars: [{event.stars}] | Pool: [{event.pool}] | State: {event.status}
    </div>
  </div>
)

export default Event;
